const initialLitSurvey = [];

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

    tablist[tab] = true;
    this.props.updateTabList(tablist); // this.setState({activeTabList: tablist});
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "modal"
    }, /*#__PURE__*/React.createElement("div", {
      className: "modal-content"
    }, /*#__PURE__*/React.createElement("input", {
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
    }), " Publication", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      className: "submitbutton",
      onClick: this.onclose,
      value: "Submit"
    }))));
  }

}

class StatusDiv extends React.Component {
  constructor() {
    super();
    this.state = {
      togglePopup: false // activeTabList: [false, false, false, false, false, false]

    };
    this.showStatusPopup = this.showStatusPopup.bind(this); // this.updateTabList = this.updateTabList.bind(this);
    // this.setStatus = this.setStatus.bind(this);
  }

  showStatusPopup() {
    this.setState({
      togglePopup: !this.state.togglePopup
    });
  } // updateTabList(tablist){
  //     console.log(tablist);
  //     this.setState({activeTabList: tablist});
  // }


  render() {
    const all_tabs = ["Literature Survey", "Problem Formulation", "Experimentation", "Documentation", "Review", "Publication"];
    const displayStatus = [];
    const activeTabList = this.props.activeTabList;
    const updateTabList = this.props.updateTabList;

    for (var i = 0; i < all_tabs.length; i++) {
      displayStatus.push( /*#__PURE__*/React.createElement(StatusTab, {
        tab_name: all_tabs[i],
        isActive: activeTabList[i]
      }));
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, displayStatus, /*#__PURE__*/React.createElement("button", {
      className: "submitbutton",
      onClick: this.showStatusPopup
    }, "Update Status"), this.state.togglePopup ? /*#__PURE__*/React.createElement(StatusPopup, {
      toggle: this.showStatusPopup,
      tablist: activeTabList,
      updateTabList: updateTabList
    }) : null);
  }

}

class LitSurveyPopup extends React.Component {
  render() {
    const handleSubmit = e => {
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
    };

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
      name: "add_lit_survey_form",
      onSubmit: handleSubmit
    }, /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "paper_title",
      placeholder: "Name of Paper"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "publisher_name",
      placeholder: "Publisher"
    }), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "doi",
      placeholder: "Paper DOI Link"
    }), /*#__PURE__*/React.createElement("button", {
      className: "submitbutton"
    }, "Add")));
  }

}

class LitSurveyItem extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "litsurveyitem"
    }, /*#__PURE__*/React.createElement("p", null, "Paper Title: ", this.props.item.paper_title, " "), /*#__PURE__*/React.createElement("p", null, "Publisher Name: ", this.props.item.publisher_name), /*#__PURE__*/React.createElement("p", null, "DOI Link: ", this.props.item.doi)));
  }

}

class DisplayLitSurveyArray extends React.Component {
  render() {
    const litsurvey_array = this.props.litsurvey_array.map(item => /*#__PURE__*/React.createElement(LitSurveyItem, {
      item: item
    }));
    return /*#__PURE__*/React.createElement(React.Fragment, null, litsurvey_array);
  }

}

class LiteratureSurvey extends React.Component {
  constructor() {
    super();
    this.state = {
      // togglePopup: false,
      litsurvey_array: initialLitSurvey
    }; // this.showLitSurveyPopup = this.showLitSurveyPopup.bind(this);

    this.addLitSurveyItem = this.addLitSurveyItem.bind(this); // this.setStatus = this.setStatus.bind(this);
  } // showLitSurveyPopup(){
  //     this.setState({togglePopup: !this.state.togglePopup});
  // }


  addLitSurveyItem(litsurvey_item) {
    const litsurvey = this.state.litsurvey_array.slice();
    litsurvey.push(litsurvey_item);
    this.setState({
      litsurvey_array: litsurvey
    });
    console.log(this.state.litsurvey_array);
  }

  render() {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DisplayLitSurveyArray, {
      litsurvey_array: this.state.litsurvey_array
    }), /*#__PURE__*/React.createElement(LitSurveyPopup, {
      addLitSurveyItem: this.addLitSurveyItem
    }));
  }

}

class GenericDiv extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTabList: [false, false, false, false, false, false]
    };
    this.updateTabList = this.updateTabList.bind(this);
  }

  updateTabList(tablist) {
    console.log(tablist);
    this.setState({
      activeTabList: tablist
    });
  }

  render() {
    const comp_name = this.props.comp_name;
    var google_doc = false;

    if (comp_name === "Paper Draft") {
      var google_doc = true;
    }

    var res = /*#__PURE__*/React.createElement("div", null, "Hi, you are at ", comp_name, "!");

    if (comp_name === "Status") {
      res = /*#__PURE__*/React.createElement(StatusDiv, {
        updateTabList: this.updateTabList,
        activeTabList: this.state.activeTabList
      });
    }

    if (comp_name === "Literature Survey") {
      res = /*#__PURE__*/React.createElement(LiteratureSurvey, null);
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