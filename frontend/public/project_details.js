"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var initialLitSurvey = [];
var SourceCodeList = [];
var Displist = [];

var DisplayHeader = /*#__PURE__*/function (_React$Component) {
  _inherits(DisplayHeader, _React$Component);

  var _super = _createSuper(DisplayHeader);

  function DisplayHeader() {
    _classCallCheck(this, DisplayHeader);

    return _super.apply(this, arguments);
  }

  _createClass(DisplayHeader, [{
    key: "render",
    value: function render() {
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
  }]);

  return DisplayHeader;
}(React.Component);

var StatusTab = /*#__PURE__*/function (_React$Component2) {
  _inherits(StatusTab, _React$Component2);

  var _super2 = _createSuper(StatusTab);

  function StatusTab() {
    _classCallCheck(this, StatusTab);

    return _super2.apply(this, arguments);
  }

  _createClass(StatusTab, [{
    key: "render",
    value: function render() {
      var content = this.props.tab_name;
      var isactivetab = this.props.isActive;
      return /*#__PURE__*/React.createElement(React.Fragment, null, isactivetab ? /*#__PURE__*/React.createElement("div", {
        className: "statusdivactive"
      }, content) : /*#__PURE__*/React.createElement("div", {
        className: "statusdiv"
      }, content), /*#__PURE__*/React.createElement("br", null));
    }
  }]);

  return StatusTab;
}(React.Component);

var StatusPopup = /*#__PURE__*/function (_React$Component3) {
  _inherits(StatusPopup, _React$Component3);

  var _super3 = _createSuper(StatusPopup);

  function StatusPopup() {
    var _this;

    _classCallCheck(this, StatusPopup);

    _this = _super3.call(this);

    _defineProperty(_assertThisInitialized(_this), "onclose", function () {
      _this.props.toggle();
    });

    _this.setStatus = _this.setStatus.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(StatusPopup, [{
    key: "setStatus",
    value: function setStatus(e) {
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
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "modal"
      }, /*#__PURE__*/React.createElement("div", {
        className: "modal-content"
      }, /*#__PURE__*/React.createElement("input", {
        type: "radio",
        value: "0",
        onChange: this.setStatus,
        name: "status"
      }), " Literature Survey", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "radio",
        value: "1",
        onChange: this.setStatus,
        name: "status"
      }), " Problem Formulation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "radio",
        value: "2",
        onChange: this.setStatus,
        name: "status"
      }), " Experimentation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "radio",
        value: "3",
        onChange: this.setStatus,
        name: "status"
      }), " Documentation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "radio",
        value: "4",
        onChange: this.setStatus,
        name: "status"
      }), " Review", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "radio",
        value: "5",
        onChange: this.setStatus,
        name: "status"
      }), " Publication", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "submit",
        className: "submitbutton",
        onClick: this.onclose,
        value: "Submit"
      }))));
    }
  }]);

  return StatusPopup;
}(React.Component);

var StatusDiv = /*#__PURE__*/function (_React$Component4) {
  _inherits(StatusDiv, _React$Component4);

  var _super4 = _createSuper(StatusDiv);

  function StatusDiv() {
    var _this2;

    _classCallCheck(this, StatusDiv);

    _this2 = _super4.call(this);
    _this2.state = {
      togglePopup: false // activeTabList: [false, false, false, false, false, false]

    };
    _this2.showStatusPopup = _this2.showStatusPopup.bind(_assertThisInitialized(_this2)); // this.updateTabList = this.updateTabList.bind(this);
    // this.setStatus = this.setStatus.bind(this);

    return _this2;
  }

  _createClass(StatusDiv, [{
    key: "showStatusPopup",
    value: function showStatusPopup() {
      this.setState({
        togglePopup: !this.state.togglePopup
      });
    } // updateTabList(tablist){
    //     console.log(tablist);
    //     this.setState({activeTabList: tablist});
    // }

  }, {
    key: "render",
    value: function render() {
      var all_tabs = ["Literature Survey", "Problem Formulation", "Experimentation", "Documentation", "Review", "Publication"];
      var displayStatus = [];
      var activeTabList = this.props.activeTabList;
      var updateTabList = this.props.updateTabList;

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
  }]);

  return StatusDiv;
}(React.Component);

var LitSurveyPopup = /*#__PURE__*/function (_React$Component5) {
  _inherits(LitSurveyPopup, _React$Component5);

  var _super5 = _createSuper(LitSurveyPopup);

  function LitSurveyPopup() {
    _classCallCheck(this, LitSurveyPopup);

    return _super5.apply(this, arguments);
  }

  _createClass(LitSurveyPopup, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.add_lit_survey_form;
        var litsurvey_item = {
          paper_title: form.paper_title.value,
          publisher_name: form.publisher_name.value,
          doi: form.doi.value
        };
        console.log(litsurvey_item);

        _this3.props.addLitSurveyItem(litsurvey_item);

        form.paper_title.value = "";
        form.publisher_name.value = "";
        form.doi.value = "";
      };

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
        name: "add_lit_survey_form",
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement("label", {
        for: "title"
      }, "Enter Paper Title"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        className: "project_name",
        type: "text",
        id: "title",
        name: "paper_title",
        placeholder: "Name of Paper"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "publisher"
      }, "Enter Publisher Name "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_name",
        id: "publisher",
        name: "publisher_name",
        placeholder: "Publisher"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "doi"
      }, "Enter DOI "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_name",
        id: "doi",
        name: "doi",
        placeholder: "Paper DOI Link"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Add")));
    }
  }]);

  return LitSurveyPopup;
}(React.Component);

var LitSurveyItem = /*#__PURE__*/function (_React$Component6) {
  _inherits(LitSurveyItem, _React$Component6);

  var _super6 = _createSuper(LitSurveyItem);

  function LitSurveyItem() {
    _classCallCheck(this, LitSurveyItem);

    return _super6.apply(this, arguments);
  }

  _createClass(LitSurveyItem, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "litsurveyitem"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "card_header"
      }, this.props.item.paper_title), /*#__PURE__*/React.createElement("p", null, "Publisher Name: ", this.props.item.publisher_name), /*#__PURE__*/React.createElement("p", null, "DOI Link: ", /*#__PURE__*/React.createElement("a", {
        href: this.props.item.doi
      }, this.props.item.paper_title))));
    }
  }]);

  return LitSurveyItem;
}(React.Component);

var DisplayLitSurveyArray = /*#__PURE__*/function (_React$Component7) {
  _inherits(DisplayLitSurveyArray, _React$Component7);

  var _super7 = _createSuper(DisplayLitSurveyArray);

  function DisplayLitSurveyArray() {
    _classCallCheck(this, DisplayLitSurveyArray);

    return _super7.apply(this, arguments);
  }

  _createClass(DisplayLitSurveyArray, [{
    key: "render",
    value: function render() {
      var litsurvey_array = this.props.litsurvey_array.map(function (item) {
        return /*#__PURE__*/React.createElement(LitSurveyItem, {
          item: item
        });
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, litsurvey_array);
    }
  }]);

  return DisplayLitSurveyArray;
}(React.Component);

var LiteratureSurvey = /*#__PURE__*/function (_React$Component8) {
  _inherits(LiteratureSurvey, _React$Component8);

  var _super8 = _createSuper(LiteratureSurvey);

  function LiteratureSurvey() {
    var _this4;

    _classCallCheck(this, LiteratureSurvey);

    _this4 = _super8.call(this);
    _this4.state = {
      // togglePopup: false,
      litsurvey_array: initialLitSurvey
    }; // this.showLitSurveyPopup = this.showLitSurveyPopup.bind(this);

    _this4.addLitSurveyItem = _this4.addLitSurveyItem.bind(_assertThisInitialized(_this4)); // this.setStatus = this.setStatus.bind(this);

    return _this4;
  } // showLitSurveyPopup(){
  //     this.setState({togglePopup: !this.state.togglePopup});
  // }


  _createClass(LiteratureSurvey, [{
    key: "addLitSurveyItem",
    value: function addLitSurveyItem(litsurvey_item) {
      var litsurvey = this.state.litsurvey_array.slice();
      litsurvey.push(litsurvey_item);
      this.setState({
        litsurvey_array: litsurvey
      });
      console.log(this.state.litsurvey_array);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(LitSurveyPopup, {
        addLitSurveyItem: this.addLitSurveyItem
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(DisplayLitSurveyArray, {
        litsurvey_array: this.state.litsurvey_array
      }));
    }
  }]);

  return LiteratureSurvey;
}(React.Component);

var EditProblem = /*#__PURE__*/function (_React$Component9) {
  _inherits(EditProblem, _React$Component9);

  var _super9 = _createSuper(EditProblem);

  function EditProblem() {
    _classCallCheck(this, EditProblem);

    return _super9.apply(this, arguments);
  }

  _createClass(EditProblem, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.edit_problem_form;
        var content = form.problem.value;
        console.log(content);

        _this5.props.updateProblem(content);
      };

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "Update Problem Statement below"), /*#__PURE__*/React.createElement("form", {
        name: "edit_problem_form",
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        className: "project_name",
        type: "text",
        name: "problem",
        defaultValue: this.props.problem
      }), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Update")));
    }
  }]);

  return EditProblem;
}(React.Component);

var ProblemFormulation = /*#__PURE__*/function (_React$Component10) {
  _inherits(ProblemFormulation, _React$Component10);

  var _super10 = _createSuper(ProblemFormulation);

  function ProblemFormulation() {
    var _this6;

    _classCallCheck(this, ProblemFormulation);

    _this6 = _super10.call(this);
    _this6.state = {
      problem: ""
    };
    _this6.updateProblem = _this6.updateProblem.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(ProblemFormulation, [{
    key: "updateProblem",
    value: function updateProblem(content) {
      this.setState({
        problem: content
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: "problem_statement"
      }, this.state.problem === "" ? null : /*#__PURE__*/React.createElement("h3", {
        className: "card_header"
      }, "Problem Statement"), this.state.problem), /*#__PURE__*/React.createElement(EditProblem, {
        problem: this.state.problem,
        updateProblem: this.updateProblem
      }));
    }
  }]);

  return ProblemFormulation;
}(React.Component);

var UpdateSheetLink = /*#__PURE__*/function (_React$Component11) {
  _inherits(UpdateSheetLink, _React$Component11);

  var _super11 = _createSuper(UpdateSheetLink);

  function UpdateSheetLink() {
    _classCallCheck(this, UpdateSheetLink);

    return _super11.apply(this, arguments);
  }

  _createClass(UpdateSheetLink, [{
    key: "render",
    value: function render() {
      var _this7 = this;

      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.update_sheet_form;
        var content = form.sheet_link.value;
        console.log(content);

        _this7.props.updateSheetLink(content);
      };

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, this.props.val), /*#__PURE__*/React.createElement("form", {
        name: "update_sheet_form",
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        className: "project_name",
        type: "text",
        name: "sheet_link",
        defaultValue: this.props.link
      }), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Update")));
    }
  }]);

  return UpdateSheetLink;
}(React.Component);

var Experimentation = /*#__PURE__*/function (_React$Component12) {
  _inherits(Experimentation, _React$Component12);

  var _super12 = _createSuper(Experimentation);

  function Experimentation() {
    var _this8;

    _classCallCheck(this, Experimentation);

    _this8 = _super12.call(this);
    _this8.state = {
      google_sheet: ""
    };
    _this8.updateSheetLink = _this8.updateSheetLink.bind(_assertThisInitialized(_this8));
    return _this8;
  }

  _createClass(Experimentation, [{
    key: "updateSheetLink",
    value: function updateSheetLink(link) {
      var link_complete = link;
      console.log(link_complete);
      this.setState({
        google_sheet: link_complete
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UpdateSheetLink, {
        updateSheetLink: this.updateSheetLink,
        link: this.state.google_sheet,
        val: "Update Experimentation below"
      }), /*#__PURE__*/React.createElement("div", {
        className: "experimentation"
      }, /*#__PURE__*/React.createElement("iframe", {
        src: this.state.google_sheet,
        className: "iframe_sheet"
      })));
    }
  }]);

  return Experimentation;
}(React.Component);

var CreateRow = /*#__PURE__*/function (_React$Component13) {
  _inherits(CreateRow, _React$Component13);

  var _super13 = _createSuper(CreateRow);

  function CreateRow() {
    _classCallCheck(this, CreateRow);

    return _super13.apply(this, arguments);
  }

  _createClass(CreateRow, [{
    key: "render",
    value: function render() {
      var t = this.props.r;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, t.id), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("a", {
        href: t.link
      }, t.link)), /*#__PURE__*/React.createElement("td", null, t.des));
    }
  }]);

  return CreateRow;
}(React.Component);

var SourceTable = /*#__PURE__*/function (_React$Component14) {
  _inherits(SourceTable, _React$Component14);

  var _super14 = _createSuper(SourceTable);

  function SourceTable() {
    _classCallCheck(this, SourceTable);

    return _super14.apply(this, arguments);
  }

  _createClass(SourceTable, [{
    key: "render",
    value: function render() {
      var rows = this.props.data.map(function (row) {
        return /*#__PURE__*/React.createElement(CreateRow, {
          r: row
        });
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
        className: "sourcetable"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Serial Number"), /*#__PURE__*/React.createElement("th", null, "Link"), /*#__PURE__*/React.createElement("th", null, "Description"))), /*#__PURE__*/React.createElement("tbody", null, rows)));
    }
  }]);

  return SourceTable;
}(React.Component);

var Sourcecode = /*#__PURE__*/function (_React$Component15) {
  _inherits(Sourcecode, _React$Component15);

  var _super15 = _createSuper(Sourcecode);

  function Sourcecode() {
    var _this9;

    _classCallCheck(this, Sourcecode);

    _this9 = _super15.call(this);
    _this9.SourceSubmit = _this9.SourceSubmit.bind(_assertThisInitialized(_this9));
    _this9.createField = _this9.createField.bind(_assertThisInitialized(_this9));
    _this9.state = {
      data: []
    };
    return _this9;
  }

  _createClass(Sourcecode, [{
    key: "SourceSubmit",
    value: function SourceSubmit(e) {
      e.preventDefault();
      var form = document.forms.sourceadd;
      var field = {
        link: form.sourcelink.value,
        des: form.sourcedes.value
      };
      this.createField(field);
      form.sourcelink.value = "";
      form.sourcedes.value = "";
    }
  }, {
    key: "createField",
    value: function createField(field) {
      var l = this.state.data.length + 1;
      field.id = l;
      var newList = this.state.data.slice();
      newList.push(field);
      this.setState({
        data: newList
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        name: "sourceadd",
        className: "addcode",
        onSubmit: this.SourceSubmit
      }, /*#__PURE__*/React.createElement("label", {
        for: "git_link"
      }, "Enter Code Link"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        className: "project_name",
        type: "url",
        name: "sourcelink"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "repo_des"
      }, " Enter Link Description"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_name",
        name: "sourcedes"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Add"))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
        className: "SourceTable"
      }, /*#__PURE__*/React.createElement(SourceTable, {
        data: this.state.data
      })));
    }
  }]);

  return Sourcecode;
}(React.Component);

var PaperDraft = /*#__PURE__*/function (_React$Component16) {
  _inherits(PaperDraft, _React$Component16);

  var _super16 = _createSuper(PaperDraft);

  function PaperDraft() {
    var _this10;

    _classCallCheck(this, PaperDraft);

    _this10 = _super16.call(this);
    _this10.state = {
      google_sheet: ""
    };
    _this10.updateSheetLink = _this10.updateSheetLink.bind(_assertThisInitialized(_this10));
    return _this10;
  }

  _createClass(PaperDraft, [{
    key: "updateSheetLink",
    value: function updateSheetLink(link) {
      var link_complete = link;
      console.log(link_complete);
      this.setState({
        google_sheet: link_complete
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(UpdateSheetLink, {
        updateSheetLink: this.updateSheetLink,
        link: this.state.google_sheet,
        val: "Update Link to Paper"
      }), /*#__PURE__*/React.createElement("div", {
        className: "experimentation"
      }, /*#__PURE__*/React.createElement("iframe", {
        src: this.state.google_sheet,
        className: "iframe_sheet"
      })));
    }
  }]);

  return PaperDraft;
}(React.Component);

var PaperDiv = /*#__PURE__*/function (_React$Component17) {
  _inherits(PaperDiv, _React$Component17);

  var _super17 = _createSuper(PaperDiv);

  function PaperDiv() {
    _classCallCheck(this, PaperDiv);

    return _super17.apply(this, arguments);
  }

  _createClass(PaperDiv, [{
    key: "render",
    value: function render() {
      var t = this.props.data;
      return /*#__PURE__*/React.createElement("div", {
        className: "PaperDiv"
      }, /*#__PURE__*/React.createElement("h1", {
        className: "paper_header"
      }, t.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", null, "Requirements"), /*#__PURE__*/React.createElement("p", null, t.reqr)), /*#__PURE__*/React.createElement("h3", null, "Deadline : ", t.last_date));
    }
  }]);

  return PaperDiv;
}(React.Component);

var DispPaper = /*#__PURE__*/function (_React$Component18) {
  _inherits(DispPaper, _React$Component18);

  var _super18 = _createSuper(DispPaper);

  function DispPaper() {
    _classCallCheck(this, DispPaper);

    return _super18.apply(this, arguments);
  }

  _createClass(DispPaper, [{
    key: "render",
    value: function render() {
      var arr = this.props.data.map(function (d) {
        return /*#__PURE__*/React.createElement(PaperDiv, {
          data: d
        });
      });
      return /*#__PURE__*/React.createElement("div", null, arr);
    }
  }]);

  return DispPaper;
}(React.Component);

var PaperSub = /*#__PURE__*/function (_React$Component19) {
  _inherits(PaperSub, _React$Component19);

  var _super19 = _createSuper(PaperSub);

  function PaperSub() {
    var _this11;

    _classCallCheck(this, PaperSub);

    _this11 = _super19.call(this);
    _this11.paperSubmit = _this11.paperSubmit.bind(_assertThisInitialized(_this11));
    _this11.addField = _this11.addField.bind(_assertThisInitialized(_this11));
    _this11.state = {
      val: []
    };
    return _this11;
  }

  _createClass(PaperSub, [{
    key: "paperSubmit",
    value: function paperSubmit(e) {
      e.preventDefault();
      var form = document.forms.addPaper;
      var field = {
        name: form.conf.value,
        reqr: form.reqr.value,
        last_date: form.date_val.value
      };
      this.addField(field);
      form.conf.value = "";
      form.reqr.value = "";
      form.date_val.value = "";
    }
  }, {
    key: "addField",
    value: function addField(field) {
      var l = this.state.val.length + 1;
      field.id = l;
      var newList = this.state.val.slice();
      newList.push(field);
      this.setState({
        val: newList
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        name: "addPaper",
        onSubmit: this.paperSubmit
      }, /*#__PURE__*/React.createElement("label", {
        for: "conf"
      }, "Enter Conference/Journal link"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        id: "conf",
        className: "project_name",
        type: "text",
        name: "conf"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "reqr"
      }, " Enter Requirements "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        id: "reqr",
        className: "project_name",
        name: "reqr"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", null, "Enter Last Date for Registration"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "date",
        className: "project_name",
        name: "date_val"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Submit")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DispPaper, {
        data: this.state.val
      })));
    }
  }]);

  return PaperSub;
}(React.Component);

var ScheduleRow = /*#__PURE__*/function (_React$Component20) {
  _inherits(ScheduleRow, _React$Component20);

  var _super20 = _createSuper(ScheduleRow);

  function ScheduleRow() {
    _classCallCheck(this, ScheduleRow);

    return _super20.apply(this, arguments);
  }

  _createClass(ScheduleRow, [{
    key: "render",
    value: function render() {
      var t = this.props.data;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, t.id), /*#__PURE__*/React.createElement("td", null, t.name), /*#__PURE__*/React.createElement("td", null, t.start), /*#__PURE__*/React.createElement("td", null, t.end), /*#__PURE__*/React.createElement("td", null, t.timeleft), /*#__PURE__*/React.createElement("td", null, t.user));
    }
  }]);

  return ScheduleRow;
}(React.Component);

var ScheduleTable = /*#__PURE__*/function (_React$Component21) {
  _inherits(ScheduleTable, _React$Component21);

  var _super21 = _createSuper(ScheduleTable);

  function ScheduleTable() {
    _classCallCheck(this, ScheduleTable);

    return _super21.apply(this, arguments);
  }

  _createClass(ScheduleTable, [{
    key: "render",
    value: function render() {
      var arr = this.props.data.map(function (r) {
        return /*#__PURE__*/React.createElement(ScheduleRow, {
          data: r
        });
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("table", {
        className: "sourcetable"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Serial Number"), /*#__PURE__*/React.createElement("th", null, "Task"), /*#__PURE__*/React.createElement("th", null, "Start Date"), /*#__PURE__*/React.createElement("th", null, "End Date"), /*#__PURE__*/React.createElement("th", null, "Time(Days)"), /*#__PURE__*/React.createElement("th", null, "User"))), /*#__PURE__*/React.createElement("tbody", null, arr)));
    }
  }]);

  return ScheduleTable;
}(React.Component);

var Scheduling = /*#__PURE__*/function (_React$Component22) {
  _inherits(Scheduling, _React$Component22);

  var _super22 = _createSuper(Scheduling);

  function Scheduling() {
    var _this12;

    _classCallCheck(this, Scheduling);

    _this12 = _super22.call(this);
    _this12.schSubmit = _this12.schSubmit.bind(_assertThisInitialized(_this12));
    _this12.addTask = _this12.addTask.bind(_assertThisInitialized(_this12));
    _this12.state = {
      data: []
    };
    return _this12;
  }

  _createClass(Scheduling, [{
    key: "schSubmit",
    value: function schSubmit(e) {
      e.preventDefault();
      var form = document.forms.addSch;
      var field = {
        name: form.task.value,
        start: form.from_date.value,
        end: form.to_date.value,
        user: form.user_text.value
      };
      this.addTask(field);
      form.task.value = "";
      form.from_date.value = "";
      form.to_date.value = "";
      form.user_text.value = "";
    }
  }, {
    key: "addTask",
    value: function addTask(field) {
      var l = this.state.data.length + 1;
      field.id = l;
      var x = new Date(field.end) - new Date(field.start);
      field.timeleft = Number(x) / (3600 * 24 * 1000);
      var newList = this.state.data.slice();
      newList.push(field);
      this.setState({
        data: newList
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        name: "addSch",
        onSubmit: this.schSubmit
      }, /*#__PURE__*/React.createElement("label", {
        for: "task"
      }, "Enter Task Name"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        id: "task",
        className: "project_name",
        name: "task"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "from_date"
      }, "Enter Start Date"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        id: "from_date",
        className: "project_name",
        name: "from_date",
        type: "date"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "user"
      }, "Enter User you want to assign to "), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        id: "user",
        type: "text",
        className: "project_name",
        name: "user_text"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
        for: "to_date"
      }, "Enter End Date"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        id: "to_date",
        name: "to_date",
        className: "project_name",
        type: "date"
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Add Task")), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ScheduleTable, {
        data: this.state.data
      })));
    }
  }]);

  return Scheduling;
}(React.Component);

var GenericDiv = /*#__PURE__*/function (_React$Component23) {
  _inherits(GenericDiv, _React$Component23);

  var _super23 = _createSuper(GenericDiv);

  function GenericDiv() {
    var _this13;

    _classCallCheck(this, GenericDiv);

    _this13 = _super23.call(this);
    _this13.state = {
      activeTabList: [false, false, false, false, false, false]
    };
    _this13.updateTabList = _this13.updateTabList.bind(_assertThisInitialized(_this13));
    return _this13;
  }

  _createClass(GenericDiv, [{
    key: "updateTabList",
    value: function updateTabList(tablist) {
      console.log(tablist);
      this.setState({
        activeTabList: tablist
      });
    }
  }, {
    key: "render",
    value: function render() {
      var comp_name = this.props.comp_name;
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

      if (comp_name === "Problem Formulation") {
        res = /*#__PURE__*/React.createElement(ProblemFormulation, null);
      }

      if (comp_name === "Experimentation") {
        res = /*#__PURE__*/React.createElement(Experimentation, null);
      }

      if (comp_name === "Source Code") {
        res = /*#__PURE__*/React.createElement(Sourcecode, null);
      }

      if (comp_name === "Paper Draft") {
        res = /*#__PURE__*/React.createElement(PaperDraft, null);
      }

      if (comp_name === "Paper Submission") {
        res = /*#__PURE__*/React.createElement(PaperSub, null);
      }

      if (comp_name === "Scheduling") {
        res = /*#__PURE__*/React.createElement(Scheduling, null);
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, res);
    }
  }]);

  return GenericDiv;
}(React.Component);

var CreateProject = /*#__PURE__*/function (_React$Component24) {
  _inherits(CreateProject, _React$Component24);

  var _super24 = _createSuper(CreateProject);

  function CreateProject() {
    var _this14;

    _classCallCheck(this, CreateProject);

    _this14 = _super24.call(this);
    _this14.handleSubmit = _this14.handleSubmit.bind(_assertThisInitialized(_this14));
    _this14.goback = _this14.goback.bind(_assertThisInitialized(_this14));
    _this14.state = {
      d: '1'
    };
    return _this14;
  }

  _createClass(CreateProject, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.project_add;
      var field = {
        project_name: form.project_name.value,
        project_desc: form.project_desc.value,
        user_name: form.user_name.value,
        user_role: form.user_role.value
      };
      this.props.addproject(field);
      form.project_name.value = "";
      form.project_desc.value = "";
      form.user_name.value = "";
      form.user_role.value = "";
    }
  }, {
    key: "goback",
    value: function goback() {
      this.setState({
        d: '2'
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", {
        className: "create_project"
      }, /*#__PURE__*/React.createElement("h3", null, "Create a New Project"), /*#__PURE__*/React.createElement("form", {
        name: "project_add",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "input"
      }, /*#__PURE__*/React.createElement("label", {
        for: "project_name"
      }, "Enter Project Name"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_name",
        id: "project_name",
        name: "project_name",
        placeholder: "Enter Project"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "input"
      }, /*#__PURE__*/React.createElement("label", {
        for: "project_description"
      }, "Enter Project Description"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_description",
        id: "project_description",
        name: "project_desc",
        placeholder: "Enter Description"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "add_user"
      }, /*#__PURE__*/React.createElement("label", {
        className: "users_label"
      }, "Add Other Users to Project"), /*#__PURE__*/React.createElement("div", {
        className: "temp"
      }, /*#__PURE__*/React.createElement("label", {
        for: "username"
      }, "User Name"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "username",
        className: "username",
        placeholder: "User Name",
        name: "user_name"
      }), /*#__PURE__*/React.createElement("label", {
        for: "user_role",
        className: "role_label"
      }, "User Role"), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "user_role",
        className: "user_role",
        placeholder: "User Role",
        name: "user_role"
      }))), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Create Project")), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button",
        onClick: this.goback
      }, "Go Back")), this.state.d == '2' && /*#__PURE__*/React.createElement(Dashboard, {
        data: this.props.data
      }));
    }
  }]);

  return CreateProject;
}(React.Component);

var Temp_display = /*#__PURE__*/function (_React$Component25) {
  _inherits(Temp_display, _React$Component25);

  var _super25 = _createSuper(Temp_display);

  function Temp_display() {
    var _this15;

    _classCallCheck(this, Temp_display);

    _this15 = _super25.call(this);
    _this15.state = {
      d: '1'
    };
    _this15.handleSubmit = _this15.handleSubmit.bind(_assertThisInitialized(_this15));
    return _this15;
  }

  _createClass(Temp_display, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      this.setState({
        d: '2'
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DisplayTabs, null)), /*#__PURE__*/React.createElement("button", {
        className: "button_navigation_half",
        onClick: this.handleSubmit
      }, " Go Back ")), this.state.d == '2' && /*#__PURE__*/React.createElement(Projects_Display, {
        data: this.props.data
      }));
    }
  }]);

  return Temp_display;
}(React.Component);

var Projects_Display = /*#__PURE__*/function (_React$Component26) {
  _inherits(Projects_Display, _React$Component26);

  var _super26 = _createSuper(Projects_Display);

  function Projects_Display() {
    var _this16;

    _classCallCheck(this, Projects_Display);

    _this16 = _super26.call(this);
    _this16.state = {
      d: '1'
    };
    _this16.handleSubmit = _this16.handleSubmit.bind(_assertThisInitialized(_this16));
    return _this16;
  }

  _createClass(Projects_Display, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      this.setState({
        d: '2'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var t = this.props.data;
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("button", {
        className: "project_class",
        onClick: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "project_class"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "card_header"
      }, t.project_name), /*#__PURE__*/React.createElement("p", null, "Project Description: ", t.project_desc), /*#__PURE__*/React.createElement("p", null, "Project Member: ", t.user_name), /*#__PURE__*/React.createElement("p", null, "Member Role : ", t.user_role))), this.state.d == '2' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Temp_display, {
        data: this.props.data
      })));
    }
  }]);

  return Projects_Display;
}(React.Component);

var My_Projects = /*#__PURE__*/function (_React$Component27) {
  _inherits(My_Projects, _React$Component27);

  var _super27 = _createSuper(My_Projects);

  function My_Projects() {
    var _this17;

    _classCallCheck(this, My_Projects);

    _this17 = _super27.call(this);
    _this17.state = {
      d: '1'
    };
    _this17.handleSubmit = _this17.handleSubmit.bind(_assertThisInitialized(_this17));
    return _this17;
  }

  _createClass(My_Projects, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      this.setState({
        d: '2'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var d = this.props.data.map(function (r) {
        return /*#__PURE__*/React.createElement(Projects_Display, {
          data: r
        });
      });
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Projects"), /*#__PURE__*/React.createElement("div", null, d), /*#__PURE__*/React.createElement("button", {
        className: "button_navigation_half",
        onClick: this.handleSubmit
      }, "Go to Dashboard")), this.state.d == '2' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dashboard, {
        data: this.props.data
      })));
    }
  }]);

  return My_Projects;
}(React.Component);

var Dashboard = /*#__PURE__*/function (_React$Component28) {
  _inherits(Dashboard, _React$Component28);

  var _super28 = _createSuper(Dashboard);

  function Dashboard() {
    var _this18;

    _classCallCheck(this, Dashboard);

    _this18 = _super28.call(this);
    _this18.state = {
      data: [],
      d: '1'
    };
    _this18.create = _this18.create.bind(_assertThisInitialized(_this18));
    _this18.displayproj = _this18.displayproj.bind(_assertThisInitialized(_this18));
    _this18.addproject = _this18.addproject.bind(_assertThisInitialized(_this18));
    return _this18;
  }

  _createClass(Dashboard, [{
    key: "create",
    value: function create() {
      this.setState({
        data: this.state.data,
        d: '2'
      });
    }
  }, {
    key: "displayproj",
    value: function displayproj() {
      this.setState({
        data: this.state.data,
        d: '3'
      });
    }
  }, {
    key: "addproject",
    value: function addproject(field) {
      var l = this.state.data.length + 1;
      var newList = this.state.data.slice();
      newList.push(field);
      this.setState({
        data: newList,
        d: '2'
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", {
        className: "dashboard_buttons"
      }, /*#__PURE__*/React.createElement("button", {
        className: "create_pro_button",
        onClick: this.create
      }, "Create Project"), /*#__PURE__*/React.createElement("button", {
        className: "view_pro_button",
        onClick: this.displayproj
      }, "View My Projects")), this.state.d == '2' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CreateProject, {
        addproject: this.addproject,
        data: this.state.data
      })), this.state.d == '3' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(My_Projects, {
        data: this.props.data
      })));
    }
  }]);

  return Dashboard;
}(React.Component);

var DisplayTabs = /*#__PURE__*/function (_React$Component29) {
  _inherits(DisplayTabs, _React$Component29);

  var _super29 = _createSuper(DisplayTabs);

  function DisplayTabs() {
    var _this19;

    _classCallCheck(this, DisplayTabs);

    _this19 = _super29.call(this);
    _this19.state = {
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
    return _this19;
  }

  _createClass(DisplayTabs, [{
    key: "render",
    value: function render() {
      var _this20 = this;

      var onClickStatus = function onClickStatus() {
        _this20.setState({
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

      var onClickLiteratureSurvey = function onClickLiteratureSurvey() {
        _this20.setState({
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

      var onClickProblemFormulation = function onClickProblemFormulation() {
        _this20.setState({
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

      var onClickExperimentation = function onClickExperimentation() {
        _this20.setState({
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

      var onClickSourceCode = function onClickSourceCode() {
        _this20.setState({
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

      var onClickPaperDraft = function onClickPaperDraft() {
        _this20.setState({
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

      var onClickPaperSubmission = function onClickPaperSubmission() {
        _this20.setState({
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

      var onClickScheduling = function onClickScheduling() {
        _this20.setState({
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
  }]);

  return DisplayTabs;
}(React.Component);

var RenderProjectDetailsPage = /*#__PURE__*/function (_React$Component30) {
  _inherits(RenderProjectDetailsPage, _React$Component30);

  var _super30 = _createSuper(RenderProjectDetailsPage);

  function RenderProjectDetailsPage() {
    var _this21;

    _classCallCheck(this, RenderProjectDetailsPage);

    _this21 = _super30.call(this);
    _this21.state = {
      data: [],
      d: '1'
    };
    return _this21;
  }

  _createClass(RenderProjectDetailsPage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(DisplayHeader, null), /*#__PURE__*/React.createElement(Dashboard, {
        data: this.state.data
      })));
    }
  }]);

  return RenderProjectDetailsPage;
}(React.Component);

var element = /*#__PURE__*/React.createElement(RenderProjectDetailsPage, null);
ReactDOM.render(element, document.getElementById("project_details"));