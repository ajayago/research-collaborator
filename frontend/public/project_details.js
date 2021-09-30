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

class StatusTab extends React.Component {
  render() {
    const content = this.props.tab_name;
    const isactivetab = this.props.isActive;
    return /*#__PURE__*/React.createElement(React.Fragment, null, isactivetab ? /*#__PURE__*/React.createElement("div", {
      className: "statusdivactive"
    }, content) : /*#__PURE__*/React.createElement("div", {
      className: "statusdiv"
    }, content), /*#__PURE__*/React.createElement("br", null));
  }

}

class StatusPopup extends React.Component {
  constructor() {
    super();
    this.setStatus = this.setStatus.bind(this);
  }

  onclose = () => {
    this.props.toggle();
  };

  setStatus(e) {
    console.log(e.target.value);
    console.log(this.props.tablist);
    var tablist = this.props.tablist;
    var tab = Number(e.target.value);

    for (var i = 0; i < tablist.length; i++) {
      tablist[i] = false;
    }

    tablist[tab] = true; // this.setState({activeTabList: tablist});
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "modal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("span", {
      className: "close",
      onClick: this.onclose
    }, "\xD7"), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      value: "0",
      onChange: this.setStatus
    }), " Literature Survey", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      value: "1",
      onChange: this.setStatus
    }), " Problem Formulation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      value: "2",
      onChange: this.setStatus
    }), " Experimentation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      value: "3",
      onChange: this.setStatus
    }), " Documentation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      value: "4",
      onChange: this.setStatus
    }), " Review", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      value: "5",
      onChange: this.setStatus
    }), " Publication", /*#__PURE__*/React.createElement("br", null))));
  }

}

class StatusDiv extends React.Component {
  constructor() {
    super();
    this.state = {
      togglePopup: false,
      activeTabList: [false, false, false, false, false, false]
    };
    this.showStatusPopup = this.showStatusPopup.bind(this); // this.setStatus = this.setStatus.bind(this);
  }

  showStatusPopup() {
    this.setState({
      togglePopup: !this.state.togglePopup
    });
  }

  render() {
    const all_tabs = ["Literature Survey", "Problem Formulation", "Experimentation", "Documentation", "Review", "Publication"];
    const displayStatus = [];

    for (var i = 0; i < all_tabs.length; i++) {
      displayStatus.push( /*#__PURE__*/React.createElement(StatusTab, {
        tab_name: all_tabs[i],
        isActive: this.state.activeTabList[i]
      }));
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, displayStatus, /*#__PURE__*/React.createElement("button", {
      className: "submitbutton",
      onClick: this.showStatusPopup
    }, "Update Status"), this.state.togglePopup ? /*#__PURE__*/React.createElement(StatusPopup, {
      toggle: this.showStatusPopup,
      tablist: this.state.activeTabList
    }) : null);
  }

}

class GenericDiv extends React.Component {
  render() {
    const comp_name = this.props.comp_name;
    var google_doc = false;

    if (comp_name === "Paper Draft") {
      var google_doc = true;
    }

    var res = /*#__PURE__*/React.createElement("div", null, "Hi, you are at ", comp_name, "!");

    if (comp_name === "Status") {
      res = /*#__PURE__*/React.createElement(StatusDiv, null);
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, res);
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