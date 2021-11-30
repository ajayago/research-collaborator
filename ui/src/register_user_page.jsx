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

class AddUser extends React.Component {
    constructor() {
        super();
        this.state = {
            google_auth: false,
            password: "xxxxxxxx",
            selected_value: "No"
        };
        this.change = this.change.bind(this);
    }
    change(event) {
        console.log(event.target.value);
        if (event.target.value == "Yes") {
            this.setState({ google_auth: true, selected_value: "Yes", password: "xxxxxxxx" });
        }
        else {
            this.setState({ google_auth: false, selected_value: "No" });
        }
    }
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.addUser;
            let pass;
            if (this.state.google_auth) {
                pass = this.state.password;
            }
            else {
                pass = form.password.value;
            }
            const user = {
                username: form.username.value,
                password: pass,
                org_short_name: form.org_short_name.value,
                google_auth: this.state.google_auth,
                pending: [],
                accepted: []
            }
            console.log(user);
            this.props.createUser(user);
            form.username.value = "";
            if (!this.state.google_auth) {
                form.password.value = "";
            }
            form.org_short_name.value = "";
        }

        return (
            <div className="column">
                <form name="addUser" onSubmit={handleSubmit}>
                    <label>
                        Enter User Email Address
                        <br />
                        <input type="text" name="username" id="username" placeholder="User email address" />
                    </label>
                    <br />
                    <label>
                        Are you signing in with Google?
                        <br />
                        <select name="is_google_auth" id="google_auth" value={this.state.selected_value} className="dropdown" onChange={this.change}>
                            <option key="No" value="No">No</option>
                            <option key="Yes" value="Yes">Yes</option>
                        </select>
                    </label>
                    <br />
                    {this.state.google_auth ? null :
                        <label>
                            Enter password
                            <br />
                            <input type="password" name="password" id="password" placeholder="Password" />
                        </label>}
                    <br />
                    <label>
                        Select Organization
                        <br />
                        <select name="org_short_name" id="org_short_name" className="dropdown">
                            {this.props.orgs.map(name => (
                                <option key={name.org_short_name} value={name.org_short_name}>
                                    {name.org_short_name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <button className="add_user_button">Add User</button>
                </form>
            </div>
        );
    }
}

class DisplayUserCreationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            organizations: [],
            errormessage: null
        };
        this.createUser = this.createUser.bind(this);
        this.getOrgs = this.getOrgs.bind(this);
    };

    async getOrgs() {
        const allorgs = `query getAllOrganization($org: String){
            getAllOrganization(org: $org) {
                org_short_name
            }
        }`;
        const teststring = "";
        const data = await graphQLFetch(allorgs, { teststring });
        this.setState({ organizations: data.getAllOrganization }); // to list all orgs for user to select from
    }

    async createUser(user) {
        if (!user.username) {
            this.setState({ errormessage: "Please enter valid user name!" }); //check for ID
            return;
        }
        if (!user.password) {
            this.setState({ errormessage: "Please enter valid password!" }); //check for password
            return;
        }
        const users_query = `query getExistingUsers($username: String!){
            getExistingUsers(username: $username) {
                username
            }
        }`;

        const username = user.username;
        const user_data = await graphQLFetch(users_query, { username });
        if (user_data.getExistingUsers.length > 0) { // check if user already exists
            this.setState({ errormessage: "User name already in use!" });
            return;
        }
        const query = `mutation addNewUser($user: UserInputs!){
            addNewUser(user: $user) {
                _id
            }
        }`;
        const data = await graphQLFetch(query, { user });
        this.setState({ errormessage: "User Added!" });
    }

    componentDidMount() {
        this.getOrgs();
    }

    render() {
        return (
            <React.Fragment>
                <AddUser createUser={this.createUser} orgs={this.state.organizations} />
                <br />
                <p>{this.state.errormessage ? this.state.errormessage : null}</p>
            </React.Fragment>
        );
    }
}

const element = <DisplayUserCreationForm />;
ReactDOM.render(element, document.getElementById("usercreationpage"));