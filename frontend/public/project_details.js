class DisplayHeader extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "header",
      style: {
        height: "5%",
        fontSize: "20px"
      }
    }, "Open Research Framework")
    /* Need to add a button to link back to Project Dashboard */
    ;
  }

}

class GenericDiv extends React.Component {
  render() {
    const comp_name = this.props.comp_name;
    return /*#__PURE__*/React.createElement("div", null, "Hi, you are at ", comp_name, "!");
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
      isSchedulingButtonPressed: false
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

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "button_navigation"
    }, /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickStatus
    }, "Status"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickLiteratureSurvey
    }, "Literature Survey"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickProblemFormulation
    }, "Problem Formulation"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickExperimentation
    }, "Experimentation"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickSourceCode
    }, "Source Code"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickPaperDraft
    }, "Paper Draft"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickPaperSubmission
    }, "Paper Submission"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
      className: "projectbutton",
      onClick: onClickScheduling
    }, "Scheduling"), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
      className: "projectdiv"
    }, this.state.isStatusButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Status"
    }) : "", this.state.isLiteratureSurveyButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Literature Survey"
    }) : "", this.state.isProblemFormulationButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Problem Formulation"
    }) : "", this.state.isExperimentationButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Experimentation"
    }) : "", this.state.isSourceCodeButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Source Code"
    }) : "", this.state.isPaperDraftButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Paper Draft"
    }) : "", this.state.isPaperSubmissionButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Paper Submission"
    }) : "", this.state.isSchedulingButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
      comp_name: "Scheduling"
    }) : "")));
  }

}

class RenderProjectDetailsPage extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DisplayHeader, null), /*#__PURE__*/React.createElement(DisplayTabs, null));
  }

}

const element = /*#__PURE__*/React.createElement(RenderProjectDetailsPage, null);
ReactDOM.render(element, document.getElementById("project_details"));