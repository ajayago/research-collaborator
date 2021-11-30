const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

async function graphQLFetch(query, variables = {}) {
    try {
        const response = await fetch("http://localhost:5000/graphql", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);

        if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code == 'BAD_USER_INPUT') {
                const details = error.extensions.exception.errors.join('\n ');
                alert(`${error.message}:\n ${details}`);
            } else {
                alert(`${error.extensions.code}: ${error.message}`);
            }
        }
        return result.data;
    } catch (e) {
        alert(`Error in sending data to server: ${e.message}`);
    }
}

class AddOrganization extends React.Component {
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.addOrganization;
            const org = {
                org_name: form.org_name.value, org_short_name: form.org_short_name.value,
            }
            console.log(org);
            this.props.createOrganization(org);
            form.org_name.value = "";
            form.org_short_name.value = "";
        }

        return (
            <div className="column">
                <form name="addOrganization" onSubmit={handleSubmit}>
                    <label>
                        Enter Organization Name
                        <br />
                        <input type="text" name="org_name" id="org_name" placeholder="Organization Name" />
                    </label>
                    <br />
                    <label>
                        Enter a three letter identifier for the organization
                        <br />
                        <input type="text" name="org_short_name" id="org_short_name" placeholder="Organization Short Name" />
                    </label>
                    <br />
                    <button className="add_user_button">Add Organization</button>
                </form>
            </div>
        );
    }
}

class DisplayOrgCreationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            organizations: [],
            errormessage: null
        };
        this.createOrganization = this.createOrganization.bind(this);
    }

    async createOrganization(org) {
        if (!org.org_name) {
            this.setState({ errormessage: "Please enter valid organization name!" }); //check for valid org
            return;
        }
        if (!org.org_short_name) {
            this.setState({ errormessage: "Please enter valid organization short name!" });
            return;
        }
        const orgs_query = `query getOrganization($org_short_name: String!){
            getOrganization(org_short_name: $org_short_name) {
                org_short_name
            }
        }`;
        const org_short_name = org.org_short_name;
        console.log(org_short_name);
        const org_data = await graphQLFetch(orgs_query, { org_short_name });
        console.log(org_data.getOrganization);
        if (org_data.getOrganization.length > 0) { // check if org is already present
            console.log("here!!");
            this.setState({ errormessage: "Short name already in use!" });
            return;
        }
        const query = `mutation addOrganization($org: OrganizationInputs!){
            addOrganization(org: $org) {
                _id
            }
        }`;
        const data = await graphQLFetch(query, { org });
        this.setState({ errormessage: null });
    }

    render() {
        return (
            <React.Fragment>
                <AddOrganization createOrganization={this.createOrganization} />
                <br />
                <p>{this.state.errormessage ? this.state.errormessage : null}</p>
            </React.Fragment>
        );
    }
}

const element = <DisplayOrgCreationForm />;
ReactDOM.render(element, document.getElementById("orgcreationpage"));