class DisplayHeader extends React.Component{
    render(){
        return(
            <div className="header" style={{height: "5%", fontSize: "20px"}}>Open Research Framework</div>
            /* Need to add a button to link back to Project Dashboard */
        );
    }
}
class GenericDiv extends React.Component{
    render(){
        const comp_name=this.props.comp_name;
        return(
            <div>Hi, you are at {comp_name}!</div>
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