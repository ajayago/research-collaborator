const initialLitSurvey = [];
const SourceCodeList = [];
const Displist = [];
const activeuser = window.sessionStorage.getItem("username");
console.log(activeuser);

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
// Add Google Sign In user if it doesn't already exist
async function addGoogleUser() {
    const getuser_query = `query getExistingUsers($username : String!)
            {
                getExistingUsers(username : $username)
                {
                    username
                }
            }`;
    const username = activeuser;
    const getuser_query_res = await graphQLFetch(getuser_query, { username });
    console.log(getuser_query_res.getExistingUsers[0]);
    if (getuser_query_res.getExistingUsers.length == 0) { // user does not exist
        const adduser_query = `mutation addNewUser($user: UserInputs!){
            addNewUser(user: $user) {
                _id
            }
        }`;
        const user = {
            username: activeuser,
            password: "xxxxxxxx",
            org_short_name: "XXX",
            google_auth: true,
            pending: [],
            accepted: []
        }
        const adduser_res = await graphQLFetch(adduser_query, { user });
        console.log("Created Google login user");
    }
}
addGoogleUser();

// class DisplayHeader extends React.Component {
//     render() {
//         return (
//             <div className="header" style={{ height: "5%", fontSize: "20px" }}>Open Research Framework</div>
//         );
//     }
// }

class StatusTab extends React.Component {
    render() {
        const content = this.props.tab_name;
        const isactivetab = this.props.isActive;
        return (
            <React.Fragment>
                {isactivetab ? <div className="statusdivactive">{content}</div> : <div className="statusdiv">{content}</div>}
                <br />
            </React.Fragment>

        );
    }
}
class StatusPopup extends React.Component {
    constructor() {
        super();
        this.setStatus = this.setStatus.bind(this);
    }
    onclose = () => { this.props.toggle(); };
    setStatus(e) {
        console.log(e.target.value);
        console.log(this.props.tablist);
        var tablist = this.props.tablist;
        var tab = Number(e.target.value);
        for (var i = 0; i < tablist.length; i++) {
            tablist[i] = false;
        }
        tablist[tab] = true;
        this.props.updateTabList(tablist);
        // this.setState({activeTabList: tablist});
    }
    render() {
        return (
            <React.Fragment>
                <div className="modal">
                    <div className="modal-content">
                        {/* <span className="close" onClick={this.onclose}>&times;</span> */}
                        <input type="radio" value="0" onChange={this.setStatus} name="status" /> Literature Survey
                        <br />
                        <input type="radio" value="1" onChange={this.setStatus} name="status" /> Problem Formulation
                        <br />
                        <input type="radio" value="2" onChange={this.setStatus} name="status" /> Experimentation
                        <br />
                        <input type="radio" value="3" onChange={this.setStatus} name="status" /> Documentation
                        <br />
                        <input type="radio" value="4" onChange={this.setStatus} name="status" /> Review
                        <br />
                        <input type="radio" value="5" onChange={this.setStatus} name="status" /> Publication
                        <br />
                        <input type="submit" className="submitbutton" onClick={this.onclose} value="Submit" />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
class StatusDiv extends React.Component {
    constructor() {
        super();
        this.state = {
            togglePopup: false,
            // activeTabList: [false, false, false, false, false, false]
        };
        this.showStatusPopup = this.showStatusPopup.bind(this);
        // this.updateTabList = this.updateTabList.bind(this);
        // this.setStatus = this.setStatus.bind(this);
    }
    showStatusPopup() {
        this.setState({ togglePopup: !this.state.togglePopup });
    }
    // updateTabList(tablist){
    //     console.log(tablist);
    //     this.setState({activeTabList: tablist});
    // }
    render() {
        const all_tabs = ["Literature Survey", "Problem Formulation", "Experimentation",
            "Documentation", "Review", "Publication"];
        const displayStatus = [];
        const activeTabList = this.props.activeTabList;
        const updateTabList = this.props.updateTabList;
        for (var i = 0; i < all_tabs.length; i++) {
            displayStatus.push(<StatusTab tab_name={all_tabs[i]} isActive={activeTabList[i]} />);
        }
        return (
            <React.Fragment>
                {displayStatus}
                <button className="submitbutton" onClick={this.showStatusPopup}>Update Status</button>
                {this.state.togglePopup ? <StatusPopup toggle={this.showStatusPopup} tablist={activeTabList} updateTabList={updateTabList} /> : null}
            </React.Fragment>
        );
    }
}

class LitSurveyPopup extends React.Component {
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.add_lit_survey_form;
            const litsurvey_item = {
                paper_title: form.paper_title.value,
                publisher_name: form.publisher_name.value,
                doi: form.doi.value
            };
            console.log(litsurvey_item);
            this.props.addLitSurveyItem(litsurvey_item);
            form.paper_title.value = "";
            form.publisher_name.value = "";
            form.doi.value = "";
        }
        return (
            <React.Fragment>
                <form name="add_lit_survey_form" onSubmit={handleSubmit}>
                    <label for="title">Enter Paper Title</label>
                    <br />
                    <input className="project_name" type="text" id="title" name="paper_title" placeholder="Name of Paper" />
                    <br />
                    <label for="publisher">Enter Publisher Name </label>
                    <br />
                    <input type="text" className="project_name" id="publisher" name="publisher_name" placeholder="Publisher" />
                    <br />

                    <label for="doi">Enter DOI </label>
                    <br />
                    <input type="text" className="project_name" id="doi" name="doi" placeholder="Paper DOI Link" />

                    <br />
                    <button className="create_project_button">Add</button>
                </form>
            </React.Fragment>
        );
    }
}

class LitSurveyItem extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="litsurveyitem">
                    <h3 className="card_header">{this.props.item.paper_title}</h3>
                    <p>Publisher Name: {this.props.item.publisher_name}</p>
                    <p>DOI Link: <a href={this.props.item.doi}>{this.props.item.paper_title}</a></p>
                </div>
            </React.Fragment>
        );
    }
}
class DisplayLitSurveyArray extends React.Component {
    render() {
        const litsurvey_array = this.props.litsurvey_array.map(item =>
            <LitSurveyItem item={item} />
        );
        return (
            <React.Fragment>
                {litsurvey_array}
            </React.Fragment>
        );
    }
}

class LiteratureSurvey extends React.Component {
    constructor() {
        super();
        this.state = {
            // togglePopup: false,
            litsurvey_array: initialLitSurvey
        };
        // this.showLitSurveyPopup = this.showLitSurveyPopup.bind(this);
        this.addLitSurveyItem = this.addLitSurveyItem.bind(this);
        // this.setStatus = this.setStatus.bind(this);
    }
    // showLitSurveyPopup(){
    //     this.setState({togglePopup: !this.state.togglePopup});
    // }
    async loadData() {
        const query = `query getProjectDetailsInner($projectID: String!)
        {
            getProjectDetailsInner(projectID: $projectID)
            {
                projectID
                litsurveyarray
                {
                    paper_title
                    publisher_name
                    doi
                }
            }
        }`
        const projectID = this.props.projectID;
        console.log(projectID);
        console.log("In LiteratureSurvey");
        console.log(projectID);
        const response = await graphQLFetch(query, { projectID });
        console.log("before response");
        console.log(response.getProjectDetailsInner.litsurveyarray);
        console.log("after response");
        const litsurveyarraylist = response.getProjectDetailsInner.litsurveyarray;
        // console.log(litsurveyarraylist);
        this.setState({ litsurvey_array: litsurveyarraylist });

    }
    componentDidMount() {

        this.loadData();
        console.log(this.state.litsurvey_array);
    }
    async addLitSurveyItem(litsurvey_item) {
        const litsurvey = this.state.litsurvey_array.slice();
        litsurvey.push(litsurvey_item);
        this.setState({ litsurvey_array: litsurvey });

        console.log(litsurvey);
        const query = `mutation updateLitSurvey($projectID: String!, $litsurveyarray: [LitSurveyItem])
        {
            updateLitSurvey(projectID : $projectID, litsurveyarray: $litsurveyarray)
            {
                projectID
            }
        }`;
        const projectID = this.props.projectID;
        // const litsurveyarray = this.state.litsurvey_array;
        const litsurveyarray = litsurvey;
        console.log(litsurveyarray);
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, litsurveyarray } })
        });
    }
    render() {
        return (
            <React.Fragment>
                {/* <button className="submitbutton" onClick={this.showLitSurveyPopup}>Add Literature Survey</button> */}
                <LitSurveyPopup addLitSurveyItem={this.addLitSurveyItem} />
                <br />
                <DisplayLitSurveyArray litsurvey_array={this.state.litsurvey_array} />
            </React.Fragment>
        );
    }
}

class EditProblem extends React.Component {
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.edit_problem_form;
            const content = form.problem.value;
            console.log(content);
            this.props.updateProblem(content);
        };
        return (
            <React.Fragment>
                <p>Update Problem Statement below</p>
                <form name="edit_problem_form" onSubmit={handleSubmit}>
                    <input className="project_name" type="text" name="problem" defaultValue={this.props.problem} />
                    <button className="create_project_button">Update</button>
                </form>
            </React.Fragment>
        );
    }
}

class ProblemFormulation extends React.Component {
    constructor() {
        super();
        this.state = { problem: "" };
        this.updateProblem = this.updateProblem.bind(this);
    }
    async loadData() {
        const query = `query getProjectDetailsInner($projectID: String!)
        {
            getProjectDetailsInner(projectID: $projectID)
            {
                projectID
                problemstatement
            }
        }`
        const projectID = this.props.projectID;
        console.log("In ProblemFormulation");
        console.log(projectID);
        const response = await graphQLFetch(query, { projectID });
        console.log(response);
        const problemstatement = response.getProjectDetailsInner.problemstatement;
        this.setState({ problem: problemstatement });

    }
    componentDidMount() {
        this.loadData()
    }
    async updateProblem(content) {
        this.setState({ problem: content });
        const query = `mutation updateProblemStatement($projectID: String!, $problemstatement: String!)
        {
            updateProblemStatement(projectID : $projectID, problemstatement: $problemstatement)
            {
                projectID
            }
        }`;
        const projectID = this.props.projectID;
        // const litsurveyarray = this.state.litsurvey_array;
        const problemstatement = content;
        console.log(problemstatement);
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, problemstatement } })
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="problem_statement">
                    {this.state.problem === "" ? null : <h3 className="card_header">Problem Statement</h3>}
                    {this.state.problem}
                </div>
                <EditProblem problem={this.state.problem} updateProblem={this.updateProblem} />
            </React.Fragment>

        );
    }
}

class UpdateSheetLink extends React.Component {
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.update_sheet_form;
            const content = form.sheet_link.value;
            console.log(content);
            this.props.updateSheetLink(content);
        };
        return (
            <React.Fragment>
                <p>{this.props.val}</p>
                <form name="update_sheet_form" onSubmit={handleSubmit}>
                    <input className="project_name" type="text" name="sheet_link" defaultValue={this.props.link} />
                    <button className="create_project_button">Update</button>
                </form>
            </React.Fragment>
        );
    }
}
class Experimentation extends React.Component {
    constructor() {
        super();
        this.state = { google_sheet: "" };
        this.updateSheetLink = this.updateSheetLink.bind(this);
    }
    async loadData() {
        const query = `query getProjectDetailsInner($projectID: String!)
        {
            getProjectDetailsInner(projectID: $projectID)
            {
                projectID
                experimentation
            }
        }`
        const projectID = this.props.projectID;
        console.log("In Experimentation");
        console.log(projectID);
        const response = await graphQLFetch(query, { projectID });
        console.log(response);
        const google_sheet = response.getProjectDetailsInner.experimentation;
        this.setState({ google_sheet: google_sheet });

    }
    componentDidMount() {
        this.loadData()
    }
    async updateSheetLink(link) {
        const link_complete = link;
        console.log(link_complete);
        this.setState({ google_sheet: link_complete });
        const query = `mutation updateExperimentation($projectID: String!, $experimentation: String!)
        {
            updateExperimentation(projectID : $projectID, experimentation: $experimentation)
            {
                projectID
            }
        }`;
        const projectID = this.props.projectID;
        const experimentation = link_complete;
        console.log(experimentation);
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, experimentation } })
        });
    }
    render() {
        return (
            <React.Fragment>
                <UpdateSheetLink updateSheetLink={this.updateSheetLink} link={this.state.google_sheet} val="Update Experimentation below" />
                <div className="experimentation">
                    <iframe src={this.state.google_sheet} className="iframe_sheet"></iframe>
                </div>
            </React.Fragment>
        );
    }
}


class CreateRow extends React.Component {
    render() {
        const t = this.props.r;
        return (
            <tr>
                <td>{t.sno}</td>
                <td><a href={t.codelink}>{t.codelink}</a></td>
                <td>{t.codedes}</td>
            </tr>
        );
    }

}
class SourceTable extends React.Component {
    render() {
        const rows = this.props.data.map(row => <CreateRow r={row} />);
        return (
            <div>
                <table className="sourcetable">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Link</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

}
class Sourcecode extends React.Component {

    constructor() {
        super();
        this.SourceSubmit = this.SourceSubmit.bind(this);
        this.createField = this.createField.bind(this);
        this.loadData = this.loadData.bind(this);
        this.state = { data: [] };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {



        const query = `query getProjectDetailsInner($projectID: String!)
        {
            getProjectDetailsInner(projectID: $projectID)
            {
                sourcecode
                {
                    codelink
                    codedes
                    sno
                }
            }
        }`;

        const projectID = this.props.projectID;
        console.log("In sourcecode");
        console.log(projectID);
        const response = await graphQLFetch(query, { projectID });
        console.log(response);
        const val = response.getProjectDetailsInner.sourcecode;
        console.log(val);

        this.setState({ data: val });

    }
    SourceSubmit(e) {
        e.preventDefault();
        const form = document.forms.sourceadd;
        const l = this.state.data.length;
        const field = { sno: String(l + 1), codelink: form.sourcelink.value, codedes: form.sourcedes.value };
        this.createField(field);
        form.sourcelink.value = "";
        form.sourcedes.value = "";
    }

    async createField(field) {

        const query = `mutation updateSourceCode($projectID : String! , $field : source! )
        {
            updateSourceCode(projectID : $projectID , field : $field)
            {
                projectID
            }
        }`;

        const projectID = this.props.projectID;
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, field } })
        });

        this.loadData();
        /*
        const l = this.state.data.length + 1;
        field.id = l;
        const newList = this.state.data.slice();
        newList.push(field);
        this.setState({ data: newList });
        */
    }
    render() {
        return (
            <div>
                <div>
                    <form name="sourceadd" className="addcode" onSubmit={this.SourceSubmit}>
                        <label for="git_link">Enter Code Link</label>
                        <br />
                        <input className="project_name" type='url' name="sourcelink"></input>
                        <br />
                        <label for="repo_des"> Enter Link Description</label>
                        <br />
                        <input type="text" className="project_name" name="sourcedes"></input>
                        <br />
                        <button className="create_project_button">Add</button>
                    </form>
                </div>
                <br />
                <br />
                <br />

                <hr />
                <div className="SourceTable">
                    <SourceTable data={this.state.data} />
                </div>
            </div>
        )
    }

}
class Adding_Members extends React.Component {
    constructor() {
        super();
        this.state = { d: '1' };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goback = this.goback.bind(this);
    }


    async handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.add_user;

        alert("inside handler");

        const field = {
            name: form.user_id.value, role: form.user_role.value, projectID: form.project_id.value,
            reqfrom: activeuser, projectName: "Machine Learning", desc: ""
        };

        const projectID = String(field.projectID);

        alert(projectID);

        /*
        const get_project_from_ID = `query getProjectDetailsFromProjectID($projectID : String!)
        {
            getProjectDetailsFromProjectID(projectID : $projectID)
            {
                name
                desc
                owner
                projectID
            }
        }`;
        */
        const query = `query getProjectDetailsFromProjectID($projectID: String!)
        {
            getProjectDetailsFromProjectID(projectID : $projectID)
            {
                name
                desc
            }
        }`;


        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID } })
        });

        const body = await response.text();
        const result = JSON.parse(body);

        field.projectName = result.data.getProjectDetailsFromProjectID[0].name;
        field.desc = result.data.getProjectDetailsFromProjectID[0].desc;


        this.props.createUserReq(field);
        // alert("field designed");
        form.user_id.value = "";
        form.user_role.value = "";
        form.project_id.value = "";

    }
    goback() {
        this.setState({ d: '2' });
    }



    render() {
        return (
            <div>
                {
                    this.state.d == '1' &&
                    <div>
                        <form name="add_user" onSubmit={this.handleSubmit}>
                            <div className="input">
                                <label for="user_id">Enter User ID</label>
                                <div>
                                    <input type="text" className="project_name" id="user_id" name="user_id" placeholder="Enter ID"></input>
                                </div>
                            </div>
                            <div className="input">
                                <label for="user_role">Enter User Role</label>
                                <div>
                                    <input type="text" className="project_name" id="user_role" name="user_role" placeholder="Enter Role"></input>
                                </div>
                            </div>
                            <div className="input">
                                <label for="project_id">Enter Project Key</label>
                                <div>
                                    <input type="text" className="project_name" id="project_id" name="project_id" placeholder="Enter Key"></input>
                                </div>
                            </div>
                            <button className="create_project_button">Add User</button>
                        </form>
                        <button className="create_project_button" onClick={this.goback}> Go to Dashboard</button>
                    </div>

                }
                {

                    this.state.d == '2' &&
                    <div>
                        <Dashboard data={this.props.data} />
                    </div>

                }
            </div>
        );
    }
}
class PaperDraft extends React.Component {
    constructor() {
        super();
        this.state = { google_sheet: "" };
        this.updateSheetLink = this.updateSheetLink.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {
        const query = `query getProjectDetailsInner($projectID: String!)
        {
            getProjectDetailsInner(projectID: $projectID)
            {
                PaperDraft
            }
        }`;

        const projectID = this.props.projectID;
        const response = await graphQLFetch(query, { projectID });
        const val = response.getProjectDetailsInner.PaperDraft;
        this.setState({ google_sheet: val });
    }


    async updateSheetLink(link) {
        const field = String(link);
        const query = `mutation updateSheet($projectID : String! , $field : String! )
        {
            updateSheet(projectID : $projectID , field : $field)
            {
                projectID
            }
        }`;

        const projectID = this.props.projectID;
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, field } })
        });
        this.loadData();
    }
    render() {
        return (
            <React.Fragment>
                <UpdateSheetLink updateSheetLink={this.updateSheetLink} link={this.state.google_sheet} val="Update Link to Paper" />
                <div className="experimentation">
                    <iframe src={this.state.google_sheet} className="iframe_sheet"></iframe>
                </div>

            </React.Fragment>
        );
    }
}


class PaperDiv extends React.Component {
    render() {
        const t = this.props.data;
        return (
            <div className="PaperDiv">
                <h1 className="paper_header">{t.name}</h1>
                <div>
                    <h2>Requirements</h2>
                    <p>{t.reqr}</p>
                </div>
                {<h3>Deadline : {t.last_date}</h3>}
            </div>

        );
    }

}
class DispPaper extends React.Component {
    render() {
        const arr = this.props.data.map(d => <PaperDiv data={d} />);
        return (<div>{arr}</div>);
    }

}
class PaperSub extends React.Component {
    constructor() {
        super();
        this.paperSubmit = this.paperSubmit.bind(this);
        this.addField = this.addField.bind(this);
        this.loadData = this.loadData.bind(this);
        this.state = { val: [] };
    }
    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        console.log("in papersub")
        const query = `query getProjectDetailsInner($projectID : String!)
        {
            getProjectDetailsInner(projectID : $projectID)
            {
                submission
                {
                    name
                    reqr
                    last_date
                }
            }
        }`;

        const projectID = this.props.projectID;
        const response = await graphQLFetch(query, { projectID });

        const data = response.getProjectDetailsInner.submission;
        console.log(data);
        this.setState({ val: data });
    }
    paperSubmit(e) {
        e.preventDefault();
        const form = document.forms.addPaper;
        const l = this.state.val.length + 1;
        const field = { id: String(l), name: form.conf.value, reqr: form.reqr.value, last_date: String(new Date(form.date_val.value)) };
        console.log(field.last_date);
        this.addField(field);
        form.conf.value = "";
        form.reqr.value = "";
        form.date_val.value = "";
    }

    async addField(field) {

        const query = `mutation updateSubmissions($projectID : String! , $field : subs!)
        {
            updateSubmissions(projectID: $projectID , field: $field)
            {
                projectID
            }
        }`;

        const projectID = this.props.projectID;
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, field } })
        });

        this.loadData();

        /*
        const l = this.state.val.length + 1;
        field.id = l;
        const newList = this.state.val.slice();
        newList.push(field);
        this.setState({ val: newList });
        */
    }
    render() {
        return (
            <div>
                <form name="addPaper" onSubmit={this.paperSubmit}>
                    <label for="conf">Enter Conference/Journal link</label>
                    <br />
                    <input id="conf" className="project_name" type="text" name="conf"></input>
                    <br />
                    <label for="reqr"> Enter Requirements </label>
                    <br />
                    <input id="reqr" className="project_name" name="reqr"></input>
                    <br />
                    <label>Enter Last Date for Registration</label>
                    <br />
                    <input type='date' className="project_name" name="date_val"></input>
                    <br />
                    <button className="create_project_button">Submit</button>
                </form>
                <br />
                <div>
                    <DispPaper data={this.state.val} />
                </div>
            </div>
        );
    }

}
class ScheduleRow extends React.Component {
    render() {
        const t = this.props.data;
        return (
            <tr>
                <td>{t.id}</td>
                <td>{t.name}</td>
                <td>{t.start}</td>
                <td>{t.end}</td>
                <td>{t.timeleft}</td>
                <td>{t.user}</td>
            </tr>
        );
    }
}
class ScheduleTable extends React.Component {
    render() {
        const arr = this.props.data.map(r => <ScheduleRow data={r} />);
        return (
            <div>
                <table className="sourcetable">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>Task</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Time(Days)</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </table>
            </div>
        );
    }

}
class Scheduling extends React.Component {
    constructor() {
        super();
        this.schSubmit = this.schSubmit.bind(this);
        this.addTask = this.addTask.bind(this);
        this.state = { data: [] };
        this.loadData = this.loadData.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }
    async loadData() {

        const query = `query getProjectDetailsInner($projectID : String!)
        {
            getProjectDetailsInner(projectID : $projectID)
            {
                schedule
                {
                    name
                    start
                    end 
                    user
                    id
                    timeleft
                }
            }
        }`;

        const projectID = this.props.projectID;
        const response = await graphQLFetch(query, { projectID });

        const val = response.getProjectDetailsInner.schedule;
        this.setState({ data: val });
    }
    schSubmit(e) {
        e.preventDefault();
        const form = document.forms.addSch;
        const field = {
            name: form.task.value, start: String(new Date(form.from_date.value)),
            end: String(new Date(form.to_date.value)), user: form.user_text.value
        };
        this.addTask(field);
        form.task.value = "";
        form.from_date.value = "";
        form.to_date.value = "";
        form.user_text.value = "";
    }

    async addTask(field) {
        const l = this.state.data.length + 1;
        field.id = String(l);
        const x = new Date(field.end) - new Date(field.start);
        field.timeleft = String(Number(x) / (3600 * 24 * 1000));

        const query = `mutation updateSchedule($projectID : String! , $field : schedule_type!)
        {
            updateSchedule(projectID: $projectID , field: $field)
            {
                projectID
            }
        }`;

        const projectID = this.props.projectID;
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, field } })
        });

        this.loadData();


        /*
        const newList = this.state.data.slice();
        newList.push(field);
        this.setState({ data: newList });
        */
    }
    render() {
        return (
            <div>
                <div>
                    <form name="addSch" onSubmit={this.schSubmit}>
                        <label for="task" >Enter Task Name</label>
                        <br />
                        <input id="task" className="project_name" name="task"></input>
                        <br />
                        <label for="from_date">Enter Start Date</label>
                        <br />
                        <input id="from_date" className="project_name" name="from_date" type='date'></input>
                        <br />
                        <label for="user">Enter User you want to assign to </label>
                        <br />
                        <input id="user" type='text' className="project_name" name="user_text"></input>
                        <br />
                        <label for="to_date">Enter End Date</label>
                        <br />
                        <input id="to_date" name="to_date" className="project_name" type='date'></input>
                        <br />
                        <button className="create_project_button">Add Task</button>
                    </form>
                    <br />
                </div>
                <div>
                    <ScheduleTable data={this.state.data} />
                </div>

            </div>
        );
    }

}

class AddComment extends React.Component {
    render() {
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.addcomment_form;
            const content = form.comment.value;
            console.log(content);
            this.props.updateComments(content);
            form.comment.value = "";
        };
        return (
            <React.Fragment>
                <p>Add Comment below</p>
                <form name="addcomment_form" onSubmit={handleSubmit}>
                    <input className="project_name" type="text" name="comment" />
                    <button className="create_project_button">Add Comment</button>
                </form>
            </React.Fragment>
        );
    }
}


class Comments extends React.Component {
    constructor() {
        super();
        this.state = { comments: [] };
        this.updateComments = this.updateComments.bind(this);
    }
    async loadData() {
        const query = `query getProjectDetailsInner($projectID: String!)
        {
            getProjectDetailsInner(projectID: $projectID)
            {
                projectID
                comments
            }
        }`
        const projectID = this.props.projectID;
        console.log("In Comments");
        console.log(projectID);
        const response = await graphQLFetch(query, { projectID });
        console.log(response);
        const comments = response.getProjectDetailsInner.comments;
        this.setState({ comments: comments });

    }
    componentDidMount() {
        this.loadData()
    }
    async updateComments(new_comment) {
        const comments = this.state.comments;
        const comment = `${activeuser}: ${new_comment}`;
        comments.push(comment);
        console.log(comment);
        this.setState({ comments: comments });
        const query = `mutation updateComments($projectID: String!, $comments: [String])
        {
            updateComments(projectID : $projectID, comments: $comments)
            {
                projectID
            }
        }`;
        const projectID = this.props.projectID;
        console.log(comments);
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, comments } })
        });
    }
    render() {
        const c = this.state.comments.map(i => <p>{i}</p>);
        return (
            <React.Fragment>
                <div>
                    {c}
                </div>
                <br />
                <AddComment updateComments={this.updateComments} />
            </React.Fragment>
        );
    }
}

class Member_row extends React.Component {
    render() {

        const t = this.props.data;
        return (
            <tr>
                {/* <td>{t.id}</td> */}
                <td>{t.name}</td>
                <td>{t.role}</td>
            </tr>
        );
    }
}

class Member_table extends React.Component {
    render() {
        const arr = this.props.a.map(r => <Member_row data={r} />);
        return (
            <div>
                <table className="sourcetable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr}
                    </tbody>
                </table>
            </div>
        );
    }

}
class DispMembers extends React.Component {
    constructor() {
        super();
        this.state = { p: [], a: [], owner: "" };
        this.loadData = this.loadData.bind(this);
    }
    componentDidMount() {

        this.loadData();
    }
    async loadData() {
        console.log("In my members");
        const projectID = this.props.projectID;
        console.log(projectID);


        const query = `query getProjectMembers($projectID : String!)
        {
            getProjectMembers(projectID : $projectID)
            {
                projectID
                owner
                pending
                {
                    role
                    name
                }
                accepted
                {
                    name
                    role
                }
            }
        }`;


        const response = await graphQLFetch(query, { projectID });
        console.log(response);

        const val = response.getProjectMembers;

        this.setState({ p: val.pending, a: val.accepted, owner: val.owner });
    }
    render() {
        return (
            <div>
                <h1>Creator: {this.state.owner}</h1>

                <h2>Accepted Members</h2>
                <div>
                    <Member_table a={this.state.a} />
                </div>

                <div>
                    <h2>Members who have to accept</h2>
                    <Member_table a={this.state.p} />
                </div>


            </div>

        );
    }

}

class GenericDiv extends React.Component {

    constructor() {
        super();
        this.state = { activeTabList: [false, false, false, false, false, false, false] };
        this.updateTabList = this.updateTabList.bind(this);
    }
    async loadData() {
        const query = `query getProjectDetailsInner($projectID: String!)
        {
            getProjectDetailsInner(projectID: $projectID)
            {
                projectID
                activeTabList
            }
        }`
        const projectID = this.props.projectID;
        console.log("In GenericDiv");
        console.log(projectID);
        const response = await graphQLFetch(query, { projectID });
        console.log(response);
        const tablist = response.getProjectDetailsInner.activeTabList;
        console.log(tablist);
        this.setState({ activeTabList: tablist });

    }
    componentDidMount() {
        this.loadData()
    }
    async updateTabList(tablist) {
        console.log(tablist);
        this.setState({ activeTabList: tablist });
        const query = `mutation updateActiveTabList($projectID : String!, $activeTabList: [Boolean])
        {
            updateActiveTabList(projectID : $projectID, activeTabList: $activeTabList)
            {
                projectID
                activeTabList
            }
        }`;
        const projectID = this.props.projectID;
        const activeTabList = this.state.activeTabList;

        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { projectID, activeTabList } })
        });
    }
    render() {
        const comp_name = this.props.comp_name;
        var google_doc = false;
        if (comp_name === "Paper Draft") {
            var google_doc = true;
        }
        var res = <div>Hi, you are at {comp_name}!</div>;
        if (comp_name === "Status") {
            res = <StatusDiv updateTabList={this.updateTabList} activeTabList={this.state.activeTabList} projectID={this.props.projectID} />;
        }
        if (comp_name === "Literature Survey") {
            res = <LiteratureSurvey projectID={this.props.projectID} />;
        }
        if (comp_name === "Problem Formulation") {
            res = <ProblemFormulation projectID={this.props.projectID} />;
        }
        if (comp_name === "Experimentation") {
            res = <Experimentation projectID={this.props.projectID} />;
        }

        if (comp_name === "Source Code") {
            res = <Sourcecode projectID={this.props.projectID} />;
        }

        if (comp_name === "Paper Draft") {
            res = <PaperDraft projectID={this.props.projectID} />;
        }

        if (comp_name === "Paper Submission") {
            res = <PaperSub projectID={this.props.projectID} />;
        }

        if (comp_name === "Scheduling") {
            res = <Scheduling projectID={this.props.projectID} />;
        }

        if (comp_name === "Comments") {
            res = <Comments projectID={this.props.projectID} />;
        }

        if (comp_name === "ViewMembers") {
            res = <DispMembers projectID={this.props.projectID} />;
        }

        return (
            <React.Fragment>
                {res}
            </React.Fragment>
        );
    }
}

class CreateProject extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goback = this.goback.bind(this);
        this.state = { d: '1' };
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.project_add;

        /*
        const field = {
                    project_name: form.project_name.value, project_desc: form.project_desc.value,
                user_name: form.user_name.value, user_role: form.user_role.value, projectID: form.project_key.value
        };
                */
        const field = {
            name: form.project_name.value, projectID: form.project_key.value, owner: activeuser,
            desc: form.project_desc.value, pending: [], accepted: []
        };

        this.props.addproject(field);
        form.project_name.value = "";
        form.project_desc.value = "";
        form.project_key.value = "";
    }

    goback() {
        this.setState({ d: '2' });
    }

    render() {
        return (
            <div>
                {this.state.d == '1' &&
                    <div className="create_project" >
                        <h3>Create a New Project</h3>

                        <form name="project_add" onSubmit={this.handleSubmit}>
                            <div className="input">
                                <label for="project_name">Enter Project Name</label>
                                <div>
                                    <input type="text" className="project_name" id="project_name" name="project_name" placeholder="Enter Project"></input>
                                </div>
                            </div>
                            <div className="input">
                                <label for="project_description">Enter Project Description</label>
                                <div>
                                    <input type="text" className="project_description" id="project_description" name="project_desc" placeholder="Enter Description"></input>
                                </div>
                            </div>


                            <div className="input">
                                <label for="project_key">Enter 4 letter Project key</label>
                                <div>
                                    <input type="text" className="project_key" id="project_key" name="project_key" placeholder="Enter Project Key"></input>
                                </div>
                            </div>

                            {/*  
                            <div className="add_user">
                                <label className="users_label">Add Other Users to Project</label>

                                <div className="temp">
                                    <label for="username">User Name</label>
                                    <input type="text" id="username" className="username" placeholder="User Name" name="user_name"></input>


                                    <label for="user_role" className="role_label">User Role</label>
                                    <input type="text" id="user_role" className="user_role" placeholder="User Role" name="user_role"></input>
                                </div>
                            </div>
                            */}


                            <button className="create_project_button">Create Project</button>
                        </form>
                        <button className="create_project_button" onClick={this.goback}>Go Back</button>
                    </div>
                }
                {
                    this.state.d == '2' && <Dashboard data={this.props.data} />
                }
            </div>
        );
    }
}
class Temp_display extends React.Component {
    constructor() {
        super();
        this.state = { d: '1' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        this.setState({ d: '2' });
    }
    hideProjects() {
        console.log("dummy function to pass as arg");
    }
    render() {
        const localdata = this.props.data;
        console.log("In Temp_Display");
        console.log(localdata['projectID']);
        const fromtemp = true;
        return (
            <div>
                {this.state.d == '1' &&
                    < div >
                        < React.Fragment >
                            <DisplayTabs projectID={localdata.projectID} />
                        </React.Fragment >
                        <button className="button_navigation_half" onClick={this.handleSubmit}> Go Back </button>
                    </div>
                }
                {
                    this.state.d == '2' &&
                    // <Projects_Display data={this.props.complete_list} />
                    <My_Projects data={this.props.complete_list} fromtemp={true} />
                    // this.props.complete_list.map(r => <Projects_Display data={r} hideProjects={this.hideProjects} />)
                }
            </div>
        );
    }
}
class Projects_Display extends React.Component {
    constructor() {
        super();
        this.state = { d: '1' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({ d: '2' });
        // to hide other projects, pass in selected projectID
        this.props.hideProjects(this.props.data.projectID);
    }
    render() {
        const t = this.props.data;
        console.log("In Projects_Display");
        console.log(t);
        return (
            <div>
                {this.state.d == '1' &&
                    <button className="project_class" onClick={this.handleSubmit}>
                        <div className="project_class">
                            <h3 className="card_header">{t.name}</h3>
                            <p>Project Description: {t.desc}</p>
                            <p>Project Creator: {t.owner}</p>
                            <p>Project ID  : {t.projectID}</p>
                        </div>
                    </button>
                }
                {/* {
                    this.state.d == '2' &&
                    <div>
                        <Temp_display data={this.props.data} />
                    </div>
                } */}
            </div>
        );
    }

}

class My_Projects extends React.Component {
    constructor() {
        super();
        this.state = { d: '1', display: null };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideProjects = this.hideProjects.bind(this);
    }
    componentDidMount() {
        const d = this.props.data.map(r => <Projects_Display data={r} hideProjects={this.hideProjects} />);
        this.setState({ display: d });
    }
    handleSubmit() {
        this.setState({ d: '2' });
    }

    hideProjects(projectID) {
        console.log("In hide project function");
        console.log(projectID);
        let disp;
        for (var i = 0; i < this.props.data.length; i++) {
            if (this.props.data[i].projectID == projectID) {
                disp = <Temp_display data={this.props.data[i]} complete_list={this.props.data} />;
            }
        }
        this.setState({ display: disp });
    }

    render() {
        console.log("In My_Projects");
        if (this.props.fromtemp == true) {
            console.log("from temp");
            this.state.d = '3';
        }
        //console.log(this.props.data);
        // const d = this.props.data.map(r => <Projects_Display data={r} hideProjects={this.hideProjects} />);
        // this.setState({display: d});
        return (
            <div>
                {this.state.d == '1' &&
                    <div>
                        <h1>My Projects</h1>
                        <div>
                            {this.state.display}
                        </div>

                        <button className="button_navigation_half" onClick={this.handleSubmit}>Go to Dashboard</button>
                    </div>
                }
                {
                    this.state.d == '2' &&
                    <div>
                        <Dashboard data={this.props.data} />
                    </div>
                }
                {
                    this.state.d == '3' &&
                    <div>
                        <div>
                            {this.state.display}
                        </div>
                    </div>
                }
            </div >
        );

    }
}
class CreateDiv extends React.Component {
    constructor() {
        super();
        this.state = { d: '1', val: [] }
        this.handleAccept = this.handleAccept.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.loadData = this.loadData.bind(this);
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({ val: this.props.data });
    }
    async handleAccept() {
        // alert("in accept");
        // alert(this.state.val.projectName);
        const t = this.props.data;

        alert(activeuser);
        const field = {
            name: activeuser,
            role: t.role,
            projectID: t.projectID,
            reqfrom: t.reqfrom,
            projectName: t.projectName,
            desc: t.desc
        }



        const query = `mutation UpdatePendingProject($field: pending_input_user!)
        {
            UpdatePendingProject(field : $field)
            {
                name
            }
        }`;

        const response = await fetch("http://localhost:5000/graphql", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { field } })
        });

        this.setState({ d: '2' });
    }

    async handleReject() {
        alert("in reject");
        const t = this.props.data;

        const field = {
            name: activeuser,
            role: t.role,
            projectID: t.projectID,
            reqfrom: t.reqfrom,
            projectName: t.projectName,
            desc: t.desc
        }

        const query = `mutation UpdatePendingProjectReject($field: pending_input_user!)
        {
            UpdatePendingProjectReject(field: $field)
            {
                name
            }  
        }`;


        const response = await fetch("http://localhost:5000/graphql", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { field } })
        });
        this.setState({ d: '2' });
    }
    render() {
        const t = this.props.data;
        const role = t.role;
        const id = t.projectID;
        const reqfrom = t.reqfrom;
        const projName = t.projectName;
        const projDesc = t.desc;
        //console.log(t);
        return (
            <div>
                {this.state.d == '1' &&
                    <div className="project_class" >
                        <div className="project_class">
                            <h3 className="card_header">{projName}</h3>
                            <p>Project Name: {projName}</p>
                            <p>Project Role: {role}</p>
                            <p>Project ID: {id}</p>
                            <p>Project Desc: {projDesc}</p>
                            <p>Invite from: {reqfrom} </p>
                            <button onClick={this.handleAccept}>Accept</button>
                            <button onClick={this.handleReject}>Reject</button>
                        </div>
                    </div>
                }
                {
                    this.state.d == '2' &&
                    <div></div>
                }
            </div>
        );
    }
}
class RequestDiv extends React.Component {
    render() {
        const t = this.props.data;
        const user = t.username;
        const p = t.pending;
        const temp_div = p.map(val => <CreateDiv data={val} add_f={this.props.add_f} />);
        // alert("data read");
        // alert(user);
        return (
            <div>
                {temp_div}
            </div>
        );
    }

}
class ViewRequests extends React.Component {
    constructor() {
        super();
        this.state = { d: '1', values: [] };
        this.handle = this.handle.bind(this);
    }

    handle() {
        this.setState({ d: '2' });
    }
    render() {
        const t = this.props.data;
        // alert("in view requests");
        // console.log(t);
        const temp_div = t.map(val => <RequestDiv data={val} add_f={this.props.f} />);

        return (
            <div>
                {
                    this.state.d == '1' &&
                    < div >
                        <h3>MyRequests</h3>
                        <div>
                            {temp_div}
                        </div>

                        <button className="create_project_button" onClick={this.handle}> Go To Dashboard</button>
                    </div >
                }
                {
                    this.state.d == '2' &&
                    <div>
                        <Dashboard />
                    </div>
                }
            </div>
        );
    }
}

class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = { data: [], d: '1', userReq: [] };
        this.create = this.create.bind(this);
        this.displayproj = this.displayproj.bind(this);
        this.addproject = this.addproject.bind(this);
        this.addMembers = this.addMembers.bind(this);
        this.createUserReq = this.createUserReq.bind(this);
        this.viewReq = this.viewReq.bind(this);
        this.addToAccepted = this.addToAccepted.bind(this);
    }

    componentDidMount() {
        this.loadData()
    }

    addMembers() {

        this.setState({ dat: this.state.data, d: '4' });
    }
    create() {
        this.setState({ data: this.state.data, d: '2' });
    }

    displayproj() {
        this.setState({ data: this.state.data, d: '3' });
    }

    viewReq() {
        this.setState({ data: this.state.data, d: '5' });
    }

    async loadData() {

        const query = `query getExistingUsers($username : String!)
                {
                    getExistingUsers(username : $username)
                {
                    username
                pending
                {
                    name
                    role
                projectID
                desc
                reqfrom
                projectName
                
                }
                accepted
                {
                    projectID
                }
            }
        }`;

        //const username = "e0674494@u.nus.edu";
        //const response = await graphQLFetch(query, {username});
        const username = activeuser;
        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { username } })
        });

        const body = await response.text();
        const result = JSON.parse(body);
        // console.log(result.data.getExistingUsers);
        // get list of project IDs for the user and assign to data state
        const proj_query = await graphQLFetch(query, { username });
        const user_accepted_projects = [];
        console.log("User accepted projects");
        const get_project_from_ID = `query getProjectDetailsFromProjectID($projectID : String!)
                {
                    getProjectDetailsFromProjectID(projectID : $projectID)
                {
                    name
                desc
                owner
                projectID
            }
        }`;
        var data_obtained = [];
        for (var i = 0; i < proj_query.getExistingUsers[0].accepted.length; i++) {
            user_accepted_projects.push(proj_query.getExistingUsers[0].accepted[i].projectID);
            const projectID = proj_query.getExistingUsers[0].accepted[i].projectID;
            const proj_data = await graphQLFetch(get_project_from_ID, { projectID });
            data_obtained.push(proj_data.getProjectDetailsFromProjectID[0]);
        }
        console.log(data_obtained);
        this.setState({ userReq: result.data.getExistingUsers, data: data_obtained });

    }


    async addproject(field) {


        const query = `mutation addProjectDetails($field: ProjectData!) {
                    addProjectDetails(field : $field)
                {
                    name
                }
        }`;

        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { field } })
        });


        /*
        const l = this.state.data.length + 1;
        const newList = this.state.data.slice();
        newList.push(field);
        this.setState({data: newList, d: '2' });
                */
    }
    async addToAccepted(field) {

        alert("in add to Accepted");

    }
    async createUserReq(field) {
        const query = `mutation addNewRequests($field: Requests!){
                    addNewRequests(field : $field)
                {
                    name
                }
        }`;

        const response = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { field } })
        });

    }

    render() {
        return (
            <div>
                {
                    this.state.d == '1' &&
                    <div className="dashboard_buttons">
                        <button className="create_pro_button" onClick={this.create}>Create Project</button>
                        <button className="view_pro_button" onClick={this.displayproj}>View My Projects</button>
                        <button className="view_pro_button" onClick={this.addMembers}>Add Members to Projects</button>
                        <button className="view_pro_button" onClick={this.viewReq}>View Requests</button>
                        {/* <button className="view_pro_button" onClicl = {this.}>View My Invitations</button> */}
                    </div>
                }

                {
                    this.state.d == '2' &&
                    <div>
                        <CreateProject addproject={this.addproject} data={this.state.data} />
                    </div>
                }

                {
                    this.state.d == '3' &&
                    <div>
                        <My_Projects data={this.state.data} fromtemp={false} />
                    </div>
                }
                {
                    this.state.d == '4' &&
                    <div>
                        <Adding_Members createUserReq={this.createUserReq} data={this.props.data} />
                    </div>
                }
                {
                    this.state.d == '5' &&
                    <div>
                        <ViewRequests data={this.state.userReq} f={this.addToAccepted} />
                    </div>
                }
            </div >
        );
    }
}



class DisplayTabs extends React.Component {
    constructor() {
        super();
        this.state = {
            isStatusButtonPressed: false,
            isLiteratureSurveyButtonPressed: false,
            isProblemFormulationButtonPressed: false,
            isExperimentationButtonPressed: false,
            isSourceCodeButtonPressed: false,
            isPaperDraftButtonPressed: false,
            isPaperSubmissionButtonPressed: false,
            isSchedulingButtonPressed: false,
            isDashboardButtonPressed: false,
            isCommentsButtonPressed: false,
            isViewMembersButtonPressed: false
        };
    }
    render() {
        console.log("In DisplayTabs");
        console.log(this.props.projectID);
        const onClickStatus = () => {
            this.setState({
                isStatusButtonPressed: true,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false

            });
        };
        const onClickLiteratureSurvey = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: true,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false


            });
        };
        const onClickProblemFormulation = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: true,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false


            });
        };
        const onClickExperimentation = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: true,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false

            });
        };
        const onClickSourceCode = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: true,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false

            });
        };
        const onClickPaperDraft = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: true,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false

            });
        };
        const onClickPaperSubmission = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: true,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false
            });
        };
        const onClickScheduling = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: true,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: false

            });
        };
        const onClickComments = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: true,
                isViewMembersButtonPressed: false

            });
        };

        const onClickView = () => {
            this.setState({
                isStatusButtonPressed: false,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false,
                isCommentsButtonPressed: false,
                isViewMembersButtonPressed: true

            });
        };

        return (
            <React.Fragment>
                <h1>{this.props.projectID}</h1>
                <div className="row">
                    <div className="button_navigation">
                        <button className="projectbutton" onClick={onClickStatus}>Status</button>
                        <br />
                        <button className="projectbutton" onClick={onClickLiteratureSurvey}>Literature Survey</button>
                        <br />
                        <button className="projectbutton" onClick={onClickProblemFormulation}>Problem Formulation</button>
                        <br />
                        <button className="projectbutton" onClick={onClickExperimentation}>Experimentation</button>
                        <br />
                        <button className="projectbutton" onClick={onClickSourceCode}>Source Code</button>
                        <br />
                        <button className="projectbutton" onClick={onClickPaperDraft}>Paper Draft</button>
                        <br />
                        <button className="projectbutton" onClick={onClickPaperSubmission}>Paper Submission</button>
                        <br />
                        <button className="projectbutton" onClick={onClickScheduling}>Scheduling</button>
                        <br />
                        <button className="projectbutton" onClick={onClickComments}>Comments</button>
                        <br />
                        <button className="projectbutton" onClick={onClickView}>View Members</button>
                        <br />
                    </div>
                    <div className="projectdiv">
                        {this.state.isStatusButtonPressed ? <GenericDiv comp_name="Status" projectID={this.props.projectID} /> : ""}
                        {this.state.isLiteratureSurveyButtonPressed ? <GenericDiv comp_name="Literature Survey" projectID={this.props.projectID} /> : ""}
                        {this.state.isProblemFormulationButtonPressed ? <GenericDiv comp_name="Problem Formulation" projectID={this.props.projectID} /> : ""}
                        {this.state.isExperimentationButtonPressed ? <GenericDiv comp_name="Experimentation" projectID={this.props.projectID} /> : ""}
                        {this.state.isSourceCodeButtonPressed ? <GenericDiv comp_name="Source Code" projectID={this.props.projectID} /> : ""}
                        {this.state.isPaperDraftButtonPressed ? <GenericDiv comp_name="Paper Draft" projectID={this.props.projectID} /> : ""}
                        {this.state.isPaperSubmissionButtonPressed ? <GenericDiv comp_name="Paper Submission" projectID={this.props.projectID} /> : ""}
                        {this.state.isSchedulingButtonPressed ? <GenericDiv comp_name="Scheduling" projectID={this.props.projectID} /> : ""}
                        {this.state.isCommentsButtonPressed ? <GenericDiv comp_name="Comments" projectID={this.props.projectID} /> : ""}
                        {this.state.isViewMembersButtonPressed ? <GenericDiv comp_name="ViewMembers" projectID={this.props.projectID} /> : ""}

                    </div>
                </div>
            </React.Fragment>
        );
    }
}
class RenderProjectDetailsPage extends React.Component {
    constructor() {
        super();
        this.state = { data: [], d: '1' };
    }

    render() {
        return (
            <div>
                {
                    this.state.d == '1' &&
                    <div>
                        {/* <DisplayHeader /> */}
                        <Dashboard data={this.state.data} />
                    </div>
                }
            </div>
        );
    }
}

const element = <RenderProjectDetailsPage />;
ReactDOM.render(element, document.getElementById("project_details"));