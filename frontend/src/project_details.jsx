const initialLitSurvey = [];
class DisplayHeader extends React.Component{
    render(){
        return(
            <div className="header" style={{height: "5%", fontSize: "20px"}}>Open Research Framework</div>
            /* Need to add a button to link back to Project Dashboard */
        );
    }
}
class StatusTab extends React.Component{
    render(){
        const content = this.props.tab_name;
        const isactivetab = this.props.isActive;
        return(
            <React.Fragment>
                {isactivetab ? <div className="statusdivactive">{content}</div>: <div className="statusdiv">{content}</div>}
                <br />
            </React.Fragment>

        );
    }
}
class StatusPopup extends React.Component{
    constructor(){
        super();
        this.setStatus = this.setStatus.bind(this);
    }
    onclose = () => {this.props.toggle();};
    setStatus(e){
        console.log(e.target.value);
        console.log(this.props.tablist);
        var tablist = this.props.tablist;
        var tab = Number(e.target.value);
        for(var i = 0; i < tablist.length; i ++)
        {
            tablist[i] = false;
        }
        tablist[tab] = true;
        this.props.updateTabList(tablist);
        // this.setState({activeTabList: tablist});
    }
    render(){
        return(
            <React.Fragment>
                <div className="modal">
                    <div className="modal-content">
                        {/* <span className="close" onClick={this.onclose}>&times;</span> */}
                        <input type="radio" value="0" onChange={this.setStatus} /> Literature Survey
                        <br />
                        <input type="radio" value="1" onChange={this.setStatus} /> Problem Formulation
                        <br />
                        <input type="radio" value="2" onChange={this.setStatus} /> Experimentation
                        <br />
                        <input type="radio" value="3" onChange={this.setStatus} /> Documentation
                        <br />
                        <input type="radio" value="4" onChange={this.setStatus} /> Review
                        <br />
                        <input type="radio" value="5" onChange={this.setStatus} /> Publication
                        <br />
                        <input type="submit" className="submitbutton" onClick={this.onclose} value="Submit"/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
class StatusDiv extends React.Component{
    constructor(){
        super();
        this.state = {
            togglePopup: false,
            // activeTabList: [false, false, false, false, false, false]
        };
        this.showStatusPopup = this.showStatusPopup.bind(this);
        // this.updateTabList = this.updateTabList.bind(this);
        // this.setStatus = this.setStatus.bind(this);
    }
    showStatusPopup(){
        this.setState({togglePopup: !this.state.togglePopup});
    }
    // updateTabList(tablist){
    //     console.log(tablist);
    //     this.setState({activeTabList: tablist});
    // }
    render(){
        const all_tabs = ["Literature Survey", "Problem Formulation", "Experimentation",
                            "Documentation", "Review", "Publication"];
        const displayStatus = [];
        const activeTabList= this.props.activeTabList;
        const updateTabList = this.props.updateTabList;
        for (var i=0;i<all_tabs.length;i++){
            displayStatus.push(<StatusTab tab_name={all_tabs[i]} isActive={activeTabList[i]} />);
        }
        return(
            <React.Fragment>
                {displayStatus}
                <button className="submitbutton" onClick={this.showStatusPopup}>Update Status</button>
                {this.state.togglePopup ? <StatusPopup toggle={this.showStatusPopup} tablist={activeTabList} updateTabList={updateTabList}/>:null}
            </React.Fragment>
        );
    }
}

class LitSurveyPopup extends React.Component{
    render(){
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
        return(
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

class LitSurveyItem extends React.Component{
    render(){
        return(
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
class DisplayLitSurveyArray extends React.Component{
    render()
    {
        const litsurvey_array = this.props.litsurvey_array.map(item =>
            <LitSurveyItem item={item} />
            );
        return(
            <React.Fragment>
                {litsurvey_array}
            </React.Fragment>
        );
    }
}

class LiteratureSurvey extends React.Component{
    constructor(){
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
    addLitSurveyItem(litsurvey_item){
        const litsurvey = this.state.litsurvey_array.slice();
        litsurvey.push(litsurvey_item);
        this.setState({litsurvey_array: litsurvey});
        console.log(this.state.litsurvey_array);
    }
    render(){
        return(
            <React.Fragment>
                <DisplayLitSurveyArray litsurvey_array={this.state.litsurvey_array}/>
                {/* <button className="submitbutton" onClick={this.showLitSurveyPopup}>Add Literature Survey</button> */}
                <LitSurveyPopup addLitSurveyItem={this.addLitSurveyItem}/>
            </React.Fragment>
        );
    }
}

class EditProblem extends React.Component {
    render(){
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.edit_problem_form;
            const content = form.problem.value;
            console.log(content);
            this.props.updateProblem(content);
        };
        return(
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
    constructor(){
        super();
        this.state = {problem: ""};
        this.updateProblem = this.updateProblem.bind(this);
    }
    updateProblem(content){
        this.setState({problem: content});
    }
    render(){
        return(
            <React.Fragment>
                <div className="problem_statement">
                    {this.state.problem === "" ? null: <h3 className="card_header">Problem Statement</h3>}
                    {this.state.problem}
                </div>
                <EditProblem problem={this.state.problem} updateProblem={this.updateProblem}/>
            </React.Fragment>

        );
    }
}

class UpdateSheetLink extends React.Component{
    render(){
        const handleSubmit = (e) => {
            e.preventDefault();
            const form = document.forms.update_sheet_form;
            const content = form.sheet_link.value;
            console.log(content);
            this.props.updateSheetLink(content);
        };
        return(
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
class Experimentation extends React.Component{
    constructor(){
        super();
        this.state = {google_sheet: ""};
        this.updateSheetLink = this.updateSheetLink.bind(this);
    }
    updateSheetLink(link){
        const link_complete = link;
        console.log(link_complete);
        this.setState({google_sheet: link_complete});
    }
    render(){
        return(
            <React.Fragment>
                <div className="experimentation">
                    <iframe src={this.state.google_sheet} className="iframe_sheet"></iframe>
                </div>
                <UpdateSheetLink updateSheetLink={this.updateSheetLink} link={this.state.google_sheet}/>
            </React.Fragment>
        );
    }
}
class GenericDiv extends React.Component{
    constructor(){
        super();
        this.state = {activeTabList: [false, false, false, false, false, false]};
        this.updateTabList = this.updateTabList.bind(this);
    }
    updateTabList(tablist){
        console.log(tablist);
        this.setState({activeTabList: tablist});
    }
    render(){
        const comp_name=this.props.comp_name;
        var google_doc = false;
        if (comp_name === "Paper Draft"){
            var google_doc = true;
        }
        var res=<div>Hi, you are at {comp_name}!</div>;
        if (comp_name === "Status"){
            res=<StatusDiv updateTabList={this.updateTabList} activeTabList={this.state.activeTabList}/>;
        }
        if (comp_name === "Literature Survey"){
            res=<LiteratureSurvey />;
        }
        if (comp_name === "Problem Formulation"){
            res=<ProblemFormulation />;
        }
        if (comp_name === "Experimentation"){
            res=<Experimentation />;
        }
        return(
            <React.Fragment>
                {res}
            </React.Fragment>
        );
    }
}
class DisplayTabs extends React.Component{
    constructor(){
        super();
        this.state = {
            isStatusButtonPressed: false,
            isLiteratureSurveyButtonPressed: false,
            isProblemFormulationButtonPressed: false,
            isExperimentationButtonPressed: false,
            isSourceCodeButtonPressed: false,
            isPaperDraftButtonPressed: false,
            isPaperSubmissionButtonPressed: false,
            isSchedulingButtonPressed: false
        };
    }
    render(){
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
                isSchedulingButtonPressed: false});
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
        return(
            <React.Fragment>
                <div className="row">
                <div className="button_navigation">
                    <button className="projectbutton" onClick={onClickStatus}>Status</button>
                    <br />
                    <button className="projectbutton"onClick={onClickLiteratureSurvey}>Literature Survey</button>
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
                    {this.state.isStatusButtonPressed ? <GenericDiv comp_name="Status" />: ""}
                    {this.state.isLiteratureSurveyButtonPressed ? <GenericDiv comp_name="Literature Survey" />: ""}
                    {this.state.isProblemFormulationButtonPressed ? <GenericDiv comp_name="Problem Formulation" />: ""}
                    {this.state.isExperimentationButtonPressed ? <GenericDiv comp_name="Experimentation" />: ""}
                    {this.state.isSourceCodeButtonPressed ? <GenericDiv comp_name="Source Code" />: ""}
                    {this.state.isPaperDraftButtonPressed ? <GenericDiv comp_name="Paper Draft" />: ""}
                    {this.state.isPaperSubmissionButtonPressed ? <GenericDiv comp_name="Paper Submission" />: ""}
                    {this.state.isSchedulingButtonPressed ? <GenericDiv comp_name="Scheduling" />: ""}
                </div>
                </div>
            </React.Fragment>
        );
    }
}
class RenderProjectDetailsPage extends React.Component{
    render(){
        return(
            <React.Fragment>
                <DisplayHeader />
                <DisplayTabs />
            </React.Fragment>
        );
    }
}

const element = <RenderProjectDetailsPage />;
ReactDOM.render(element, document.getElementById("project_details"));