const initialLitSurvey = [];
const SourceCodeList = [];
const Displist = []
class DisplayHeader extends React.Component {
    render() {
        return (
            <div className="header" style={{ height: "5%", fontSize: "20px" }}>Open Research Framework</div>
            /* Need to add a button to link back to Project Dashboard */
        );
    }
}
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
                    <input type="text" name="paper_title" placeholder="Name of Paper" />
                    <input type="text" name="publisher_name" placeholder="Publisher" />
                    <input type="text" name="doi" placeholder="Paper DOI Link" />
                    <button className="submitbutton">Add</button>
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
    addLitSurveyItem(litsurvey_item) {
        const litsurvey = this.state.litsurvey_array.slice();
        litsurvey.push(litsurvey_item);
        this.setState({ litsurvey_array: litsurvey });
        console.log(this.state.litsurvey_array);
    }
    render() {
        return (
            <React.Fragment>
                <DisplayLitSurveyArray litsurvey_array={this.state.litsurvey_array} />
                {/* <button className="submitbutton" onClick={this.showLitSurveyPopup}>Add Literature Survey</button> */}
                <LitSurveyPopup addLitSurveyItem={this.addLitSurveyItem} />
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
                    <input type="text" name="problem" defaultValue={this.props.problem} />
                    <button className="submitbutton">Update</button>
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
    updateProblem(content) {
        this.setState({ problem: content });
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
                <p>Update Experimentation below</p>
                <form name="update_sheet_form" onSubmit={handleSubmit}>
                    <input type="text" name="sheet_link" defaultValue={this.props.link} />
                    <button className="submitbutton">Update</button>
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
    updateSheetLink(link) {
        const link_complete = link;
        console.log(link_complete);
        this.setState({ google_sheet: link_complete });
    }
    render() {
        return (
            <React.Fragment>
                <div className="experimentation">
                    <iframe src={this.state.google_sheet} className="iframe_sheet"></iframe>
                </div>
                <UpdateSheetLink updateSheetLink={this.updateSheetLink} link={this.state.google_sheet} />
            </React.Fragment>
        );
    }
}


class CreateRow extends React.Component {
    render() {
        const t = this.props.r;
        return (
            <tr>
                <td>{t.id}</td>
                <td>{t.link}</td>
                <td>{t.des}</td>
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
        this.state = { data: [] };
    }

    SourceSubmit(e) {
        e.preventDefault();
        const form = document.forms.sourceadd;
        const field = { link: form.sourcelink.value, des: form.sourcedes.value };
        this.createField(field);
        form.sourcelink.value = "";
        form.sourcedes.value = "";
    }

    createField(field) {
        const l = this.state.data.length + 1;
        field.id = l;
        const newList = this.state.data.slice();
        newList.push(field);
        this.setState({ data: newList });
    }
    render() {
        return (
            <div>
                <div>
                    <form name="sourceadd" className="addcode" onSubmit={this.SourceSubmit}>
                        <label for="git_link">Enter Code Link</label>
                        <input type='url' name="sourcelink"></input>
                        <label for="repo_des"> Enter Link Description</label>
                        <input type="text" name="sourcedes"></input>
                        <button className="add_button">Add</button>
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
class PaperDraft extends React.Component {
    constructor() {
        super();
        this.state = { google_sheet: "" };
        this.updateSheetLink = this.updateSheetLink.bind(this);
    }
    updateSheetLink(link) {
        const link_complete = link;
        console.log(link_complete);
        this.setState({ google_sheet: link_complete });
    }
    render() {
        return (
            <React.Fragment>
                <div className="experimentation">
                    <iframe src={this.state.google_sheet} className="iframe_sheet"></iframe>
                </div>
                <UpdateSheetLink updateSheetLink={this.updateSheetLink} link={this.state.google_sheet} />
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
                <h3>Deadline : {t.last_date}</h3>
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
        this.state = { val: [] };
    }

    paperSubmit(e) {
        e.preventDefault();
        const form = document.forms.addPaper;
        const field = { name: form.conf.value, reqr: form.reqr.value, last_date: form.date_val.value };
        this.addField(field);
        form.conf.value = "";
        form.reqr.value = "";
        form.date_val.value = "";
    }

    addField(field) {
        const l = this.state.val.length + 1;
        field.id = l;
        const newList = this.state.val.slice();
        newList.push(field);
        this.setState({ val: newList });
    }
    render() {
        return (
            <div>
                <div>
                    <DispPaper data={this.state.val} />
                </div>
                <form name="addPaper" onSubmit={this.paperSubmit}>
                    <label for="conf">Enter Conference/Journal link</label>
                    <input id="conf" type="text" name="conf"></input>

                    <label for="reqr"> Enter Requirements </label>
                    <input id="reqr" name="reqr"></input>

                    <label>Enter Last Date for Registration</label>
                    <input type='date' name="date_val"></input>
                    <button>Submit</button>
                </form>
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
                <table>
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
    }

    schSubmit(e) {
        e.preventDefault();
        const form = document.forms.addSch;
        const field = { name: form.task.value, start: form.from_date.value, end: form.to_date.value, user: form.user_text.value };
        this.addTask(field);
        form.task.value = "";
        form.from_date.value = "";
        form.to_date.value = "";
        form.user_text.value = "";
    }

    addTask(field) {
        const l = this.state.data.length + 1;
        field.id = l;
        const x = new Date(field.end) - new Date(field.start);
        field.timeleft = Number(x) / (3600 * 24 * 1000);
        const newList = this.state.data.slice();
        newList.push(field);
        this.setState({ data: newList });
    }
    render() {
        return (
            <div>
                <div>
                    <form name="addSch" onSubmit={this.schSubmit}>
                        <label for="task" >Enter Task Name</label>
                        <input id="task" name="task"></input>

                        <label for="from_date">Enter Start Date</label>
                        <input id="from_date" name="from_date" type='date'></input>

                        <label for="user">Enter User you want to assign to </label>
                        <input id="user" type='text' name="user_text"></input>

                        <label for="to_date">Enter End Date</label>
                        <input id="to_date" name="to_date" type='date'></input>

                        <button>Add Task</button>
                    </form>
                </div>
                <div>
                    <ScheduleTable data={this.state.data} />
                </div>

            </div>
        );
    }

}


class GenericDiv extends React.Component {

    constructor() {
        super();
        this.state = { activeTabList: [false, false, false, false, false, false] };
        this.updateTabList = this.updateTabList.bind(this);
    }
    updateTabList(tablist) {
        console.log(tablist);
        this.setState({ activeTabList: tablist });
    }
    render() {
        const comp_name = this.props.comp_name;
        var google_doc = false;
        if (comp_name === "Paper Draft") {
            var google_doc = true;
        }
        var res = <div>Hi, you are at {comp_name}!</div>;
        if (comp_name === "Status") {
            res = <StatusDiv updateTabList={this.updateTabList} activeTabList={this.state.activeTabList} />;
        }
        if (comp_name === "Literature Survey") {
            res = <LiteratureSurvey />;
        }
        if (comp_name === "Problem Formulation") {
            res = <ProblemFormulation />;
        }
        if (comp_name === "Experimentation") {
            res = <Experimentation />;
        }

        if (comp_name === "Source Code") {
            res = <Sourcecode />;
        }

        if (comp_name === "Paper Draft") {
            res = <PaperDraft />;
        }

        if (comp_name === "Paper Submission") {
            res = <PaperSub />;
        }

        if (comp_name === "Scheduling") {
            res = <Scheduling />;
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
        alert("in handle");
        const form = document.forms.project_add;
        const field = {
            proj_name: form.project_name.value, proj_desc: form.project_desc.value,
            user_name: form.user_name.value, user_role: form.user_role.value
        }

        this.props.addproject(field);
        form.project_name.value = "";
        form.project_desc.value = "";
        form.user_name.value = "";
        form.user_role.value = "";

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
                                <label for="project_description">Enter Project Project Description</label>
                                <div>
                                    <input type="text" className="project_description" id="project_description" name="project_desc" placeholder="Enter Description"></input>
                                </div>
                            </div>

                            <div className="add_user">
                                <label className="users_label">Add Other Users to Project</label>

                                <div className="temp">
                                    <label for="username">User Name</label>
                                    <input type="text" id="username" className="username" placeholder="User Name" name="user_name"></input>


                                    <label for="user_role" className="role_label">User Role</label>
                                    <input type="text" id="user_role" className="user_role" placeholder="User Role" name="user_role"></input>
                                </div>
                            </div>

                            <button className="create_project_button">Create Project</button>
                        </form>
                        <button onClick={this.goback}>Go Back</button>
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
    render() {
        return (
            <div>
                {this.state.d == '1' &&
                    < div >
                        < React.Fragment >
                            <DisplayHeader />
                            <DisplayTabs />
                        </React.Fragment >
                        <button onClick={this.handleSubmit}> Go Back </button>
                    </div>
                }
                {
                    this.state.d == '2' &&
                    <Projects_Display data={this.props.data} />
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
    }
    render() {
        const t = this.props.data;
        return (
            <div>
                {this.state.d == '1' &&
                    <button onClick={this.handleSubmit}>
                        <div className="litsurveyitem">
                            <h3 className="card_header">{t.project_name}</h3>
                            <p>Project Description: {t.project_desc}</p>
                            <p>Project Member: {t.user_name}</p>
                            <p>Member Role : {t.user_role}</p>
                        </div>
                    </button>
                }
                {
                    this.state.d == '2' &&
                    <div>
                        <Temp_display data={this.props.data} />
                    </div>
                }
            </div>
        );
    }

}

class My_Projects extends React.Component {
    constructor() {
        super();
        this.state = { d: '1' };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.setState({ d: '2' });
    }
    render() {
        const d = this.props.data.map(r => <Projects_Display data={r} />);
        return (
            <div>
                {this.state.d == '1' &&
                    <div>
                        <h1>My Projects</h1>
                        <div>
                            {d}
                        </div>
                        <button onClick={this.handleSubmit}>Go to Dashboard</button>
                    </div>
                }
                {
                    this.state.d == '2' &&
                    <div>
                        <Dashboard data={this.props.data} />
                    </div>
                }
            </div >
        );

    }
}
class Dashboard extends React.Component {

    constructor() {
        super();
        this.state = { data: [], d: '1' };
        this.create = this.create.bind(this);
        this.displayproj = this.displayproj.bind(this);
        this.addproject = this.addproject.bind(this);
    }
    create() {
        this.setState({ data: this.state.data, d: '2' });
    }

    displayproj() {
        this.setState({ data: this.state.data, d: '3' });
    }

    addproject(field) {
        const l = this.state.data.length + 1;
        const newList = this.state.data.slice();
        newList.push(field);
        this.setState({ data: newList, d: '2' });
    }

    render() {
        return (
            <div>
                {
                    this.state.d == '1' &&
                    <div>
                        <button classname="create_pro" onClick={this.create}>Create Project</button>
                        <button classname="view_pro" onClick={this.displayproj}>View My Projects</button>
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
                        <My_Projects data={this.props.data} />
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
            isDashboardButtonPressed: false
        };
    }
    render() {
        const onClickStatus = () => {
            this.setState({
                isStatusButtonPressed: true,
                isLiteratureSurveyButtonPressed: false,
                isProblemFormulationButtonPressed: false,
                isExperimentationButtonPressed: false,
                isSourceCodeButtonPressed: false,
                isPaperDraftButtonPressed: false,
                isPaperSubmissionButtonPressed: false,
                isSchedulingButtonPressed: false

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
                isSchedulingButtonPressed: false

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
                isSchedulingButtonPressed: false

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
                isSchedulingButtonPressed: false

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
                isSchedulingButtonPressed: false

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
                isSchedulingButtonPressed: false

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
                isSchedulingButtonPressed: false

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
                isSchedulingButtonPressed: true

            });
        };

        return (
            <React.Fragment>
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
                    </div>
                    <div className="projectdiv">
                        {this.state.isStatusButtonPressed ? <GenericDiv comp_name="Status" /> : ""}
                        {this.state.isLiteratureSurveyButtonPressed ? <GenericDiv comp_name="Literature Survey" /> : ""}
                        {this.state.isProblemFormulationButtonPressed ? <GenericDiv comp_name="Problem Formulation" /> : ""}
                        {this.state.isExperimentationButtonPressed ? <GenericDiv comp_name="Experimentation" /> : ""}
                        {this.state.isSourceCodeButtonPressed ? <GenericDiv comp_name="Source Code" /> : ""}
                        {this.state.isPaperDraftButtonPressed ? <GenericDiv comp_name="Paper Draft" /> : ""}
                        {this.state.isPaperSubmissionButtonPressed ? <GenericDiv comp_name="Paper Submission" /> : ""}
                        {this.state.isSchedulingButtonPressed ? <GenericDiv comp_name="Scheduling" /> : ""}

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
                    <Dashboard data={this.state.data} />
                }
            </div>
        );
    }
}

const element = <RenderProjectDetailsPage />;
ReactDOM.render(element, document.getElementById("project_details"));