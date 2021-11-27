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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var initialLitSurvey = [];
var SourceCodeList = [];
var Displist = [];
var activeuser = window.sessionStorage.getItem("username");
console.log(activeuser);
var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
} // Add Google Sign In user if it doesn't already exist


function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args15 = arguments;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            variables = _args15.length > 1 && _args15[1] !== undefined ? _args15[1] : {};
            _context15.prev = 1;
            _context15.next = 4;
            return fetch("http://localhost:5000/graphql", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: variables
              })
            });

          case 4:
            response = _context15.sent;
            _context15.next = 7;
            return response.text();

          case 7:
            body = _context15.sent;
            result = JSON.parse(body, jsonDateReviver);

            if (result.errors) {
              error = result.errors[0];

              if (error.extensions.code == 'BAD_USER_INPUT') {
                details = error.extensions.exception.errors.join('\n ');
                alert("".concat(error.message, ":\n ").concat(details));
              } else {
                alert("".concat(error.extensions.code, ": ").concat(error.message));
              }
            }

            return _context15.abrupt("return", result.data);

          case 13:
            _context15.prev = 13;
            _context15.t0 = _context15["catch"](1);
            alert("Error in sending data to server: ".concat(_context15.t0.message));

          case 16:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

function addGoogleUser() {
  return _addGoogleUser.apply(this, arguments);
}

function _addGoogleUser() {
  _addGoogleUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
    var getuser_query, username, getuser_query_res, adduser_query, user, adduser_res;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            getuser_query = "query getExistingUsers($username : String!)\n            {\n                getExistingUsers(username : $username)\n                {\n                    username\n                }\n            }";
            username = activeuser;
            _context16.next = 4;
            return graphQLFetch(getuser_query, {
              username: username
            });

          case 4:
            getuser_query_res = _context16.sent;
            console.log(getuser_query_res.getExistingUsers[0]);

            if (!(getuser_query_res.getExistingUsers.length == 0)) {
              _context16.next = 13;
              break;
            }

            // user does not exist
            adduser_query = "mutation addNewUser($user: UserInputs!){\n            addNewUser(user: $user) {\n                _id\n            }\n        }";
            user = {
              username: activeuser,
              password: "xxxxxxxx",
              org_short_name: "XXX",
              google_auth: true,
              pending: [],
              accepted: []
            };
            _context16.next = 11;
            return graphQLFetch(adduser_query, {
              user: user
            });

          case 11:
            adduser_res = _context16.sent;
            console.log("Created Google login user");

          case 13:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return _addGoogleUser.apply(this, arguments);
}

addGoogleUser(); // class DisplayHeader extends React.Component {
//     render() {
//         return (
//             <div className="header" style={{ height: "5%", fontSize: "20px" }}>Open Research Framework</div>
//         );
//     }
// }

var StatusTab = /*#__PURE__*/function (_React$Component) {
  _inherits(StatusTab, _React$Component);

  var _super = _createSuper(StatusTab);

  function StatusTab() {
    _classCallCheck(this, StatusTab);

    return _super.apply(this, arguments);
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

var StatusPopup = /*#__PURE__*/function (_React$Component2) {
  _inherits(StatusPopup, _React$Component2);

  var _super2 = _createSuper(StatusPopup);

  function StatusPopup() {
    var _this;

    _classCallCheck(this, StatusPopup);

    _this = _super2.call(this);

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

var StatusDiv = /*#__PURE__*/function (_React$Component3) {
  _inherits(StatusDiv, _React$Component3);

  var _super3 = _createSuper(StatusDiv);

  function StatusDiv() {
    var _this2;

    _classCallCheck(this, StatusDiv);

    _this2 = _super3.call(this);
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

var LitSurveyPopup = /*#__PURE__*/function (_React$Component4) {
  _inherits(LitSurveyPopup, _React$Component4);

  var _super4 = _createSuper(LitSurveyPopup);

  function LitSurveyPopup() {
    _classCallCheck(this, LitSurveyPopup);

    return _super4.apply(this, arguments);
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

var LitSurveyItem = /*#__PURE__*/function (_React$Component5) {
  _inherits(LitSurveyItem, _React$Component5);

  var _super5 = _createSuper(LitSurveyItem);

  function LitSurveyItem() {
    _classCallCheck(this, LitSurveyItem);

    return _super5.apply(this, arguments);
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

var DisplayLitSurveyArray = /*#__PURE__*/function (_React$Component6) {
  _inherits(DisplayLitSurveyArray, _React$Component6);

  var _super6 = _createSuper(DisplayLitSurveyArray);

  function DisplayLitSurveyArray() {
    _classCallCheck(this, DisplayLitSurveyArray);

    return _super6.apply(this, arguments);
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

var LiteratureSurvey = /*#__PURE__*/function (_React$Component7) {
  _inherits(LiteratureSurvey, _React$Component7);

  var _super7 = _createSuper(LiteratureSurvey);

  function LiteratureSurvey() {
    var _this4;

    _classCallCheck(this, LiteratureSurvey);

    _this4 = _super7.call(this);
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
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var query, projectID, response, litsurveyarraylist;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                query = "query getProjectDetailsInner($projectID: String!)\n        {\n            getProjectDetailsInner(projectID: $projectID)\n            {\n                projectID\n                litsurveyarray\n                {\n                    paper_title\n                    publisher_name\n                    doi\n                }\n            }\n        }";
                projectID = this.props.projectID;
                console.log("In LiteratureSurvey");
                console.log(projectID);
                _context.next = 6;
                return graphQLFetch(query, {
                  projectID: projectID
                });

              case 6:
                response = _context.sent;
                console.log(response);
                litsurveyarraylist = response.getProjectDetailsInner.litsurveyarray; // console.log(litsurveyarraylist);

                this.setState({
                  litsurvey_array: litsurveyarraylist
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "addLitSurveyItem",
    value: function () {
      var _addLitSurveyItem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(litsurvey_item) {
        var litsurvey, query, projectID, litsurveyarray, response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                litsurvey = this.state.litsurvey_array.slice();
                litsurvey.push(litsurvey_item);
                this.setState({
                  litsurvey_array: litsurvey
                });
                console.log(litsurvey);
                query = "mutation updateLitSurvey($projectID: String!, $litsurveyarray: [LitSurveyItem])\n        {\n            updateLitSurvey(projectID : $projectID, litsurveyarray: $litsurveyarray)\n            {\n                projectID\n            }\n        }";
                projectID = this.props.projectID; // const litsurveyarray = this.state.litsurvey_array;

                litsurveyarray = litsurvey;
                console.log(litsurveyarray);
                _context2.next = 10;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      projectID: projectID,
                      litsurveyarray: litsurveyarray
                    }
                  })
                });

              case 10:
                response = _context2.sent;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addLitSurveyItem(_x2) {
        return _addLitSurveyItem.apply(this, arguments);
      }

      return addLitSurveyItem;
    }()
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

var EditProblem = /*#__PURE__*/function (_React$Component8) {
  _inherits(EditProblem, _React$Component8);

  var _super8 = _createSuper(EditProblem);

  function EditProblem() {
    _classCallCheck(this, EditProblem);

    return _super8.apply(this, arguments);
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

var ProblemFormulation = /*#__PURE__*/function (_React$Component9) {
  _inherits(ProblemFormulation, _React$Component9);

  var _super9 = _createSuper(ProblemFormulation);

  function ProblemFormulation() {
    var _this6;

    _classCallCheck(this, ProblemFormulation);

    _this6 = _super9.call(this);
    _this6.state = {
      problem: ""
    };
    _this6.updateProblem = _this6.updateProblem.bind(_assertThisInitialized(_this6));
    return _this6;
  }

  _createClass(ProblemFormulation, [{
    key: "loadData",
    value: function () {
      var _loadData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var query, projectID, response, problemstatement;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                query = "query getProjectDetailsInner($projectID: String!)\n        {\n            getProjectDetailsInner(projectID: $projectID)\n            {\n                projectID\n                problemstatement\n            }\n        }";
                projectID = this.props.projectID;
                console.log("In ProblemFormulation");
                console.log(projectID);
                _context3.next = 6;
                return graphQLFetch(query, {
                  projectID: projectID
                });

              case 6:
                response = _context3.sent;
                console.log(response);
                problemstatement = response.getProjectDetailsInner.problemstatement;
                this.setState({
                  problem: problemstatement
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function loadData() {
        return _loadData2.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "updateProblem",
    value: function () {
      var _updateProblem = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(content) {
        var query, projectID, problemstatement, response;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.setState({
                  problem: content
                });
                query = "mutation updateProblemStatement($projectID: String!, $problemstatement: String!)\n        {\n            updateProblemStatement(projectID : $projectID, problemstatement: $problemstatement)\n            {\n                projectID\n            }\n        }";
                projectID = this.props.projectID; // const litsurveyarray = this.state.litsurvey_array;

                problemstatement = content;
                console.log(problemstatement);
                _context4.next = 7;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      projectID: projectID,
                      problemstatement: problemstatement
                    }
                  })
                });

              case 7:
                response = _context4.sent;

              case 8:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateProblem(_x3) {
        return _updateProblem.apply(this, arguments);
      }

      return updateProblem;
    }()
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

var UpdateSheetLink = /*#__PURE__*/function (_React$Component10) {
  _inherits(UpdateSheetLink, _React$Component10);

  var _super10 = _createSuper(UpdateSheetLink);

  function UpdateSheetLink() {
    _classCallCheck(this, UpdateSheetLink);

    return _super10.apply(this, arguments);
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

var Experimentation = /*#__PURE__*/function (_React$Component11) {
  _inherits(Experimentation, _React$Component11);

  var _super11 = _createSuper(Experimentation);

  function Experimentation() {
    var _this8;

    _classCallCheck(this, Experimentation);

    _this8 = _super11.call(this);
    _this8.state = {
      google_sheet: ""
    };
    _this8.updateSheetLink = _this8.updateSheetLink.bind(_assertThisInitialized(_this8));
    return _this8;
  }

  _createClass(Experimentation, [{
    key: "loadData",
    value: function () {
      var _loadData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var query, projectID, response, google_sheet;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                query = "query getProjectDetailsInner($projectID: String!)\n        {\n            getProjectDetailsInner(projectID: $projectID)\n            {\n                projectID\n                experimentation\n            }\n        }";
                projectID = this.props.projectID;
                console.log("In Experimentation");
                console.log(projectID);
                _context5.next = 6;
                return graphQLFetch(query, {
                  projectID: projectID
                });

              case 6:
                response = _context5.sent;
                console.log(response);
                google_sheet = response.getProjectDetailsInner.experimentation;
                this.setState({
                  google_sheet: google_sheet
                });

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function loadData() {
        return _loadData3.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "updateSheetLink",
    value: function () {
      var _updateSheetLink = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(link) {
        var link_complete, query, projectID, experimentation, response;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                link_complete = link;
                console.log(link_complete);
                this.setState({
                  google_sheet: link_complete
                });
                query = "mutation updateExperimentation($projectID: String!, $experimentation: String!)\n        {\n            updateExperimentation(projectID : $projectID, experimentation: $experimentation)\n            {\n                projectID\n            }\n        }";
                projectID = this.props.projectID;
                experimentation = link_complete;
                console.log(experimentation);
                _context6.next = 9;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      projectID: projectID,
                      experimentation: experimentation
                    }
                  })
                });

              case 9:
                response = _context6.sent;

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateSheetLink(_x4) {
        return _updateSheetLink.apply(this, arguments);
      }

      return updateSheetLink;
    }()
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

var CreateRow = /*#__PURE__*/function (_React$Component12) {
  _inherits(CreateRow, _React$Component12);

  var _super12 = _createSuper(CreateRow);

  function CreateRow() {
    _classCallCheck(this, CreateRow);

    return _super12.apply(this, arguments);
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

var SourceTable = /*#__PURE__*/function (_React$Component13) {
  _inherits(SourceTable, _React$Component13);

  var _super13 = _createSuper(SourceTable);

  function SourceTable() {
    _classCallCheck(this, SourceTable);

    return _super13.apply(this, arguments);
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

var Sourcecode = /*#__PURE__*/function (_React$Component14) {
  _inherits(Sourcecode, _React$Component14);

  var _super14 = _createSuper(Sourcecode);

  function Sourcecode() {
    var _this9;

    _classCallCheck(this, Sourcecode);

    _this9 = _super14.call(this);
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

var Adding_Members = /*#__PURE__*/function (_React$Component15) {
  _inherits(Adding_Members, _React$Component15);

  var _super15 = _createSuper(Adding_Members);

  function Adding_Members() {
    var _this10;

    _classCallCheck(this, Adding_Members);

    _this10 = _super15.call(this);
    _this10.state = {
      d: '1'
    };
    _this10.handleSubmit = _this10.handleSubmit.bind(_assertThisInitialized(_this10));
    _this10.goback = _this10.goback.bind(_assertThisInitialized(_this10));
    return _this10;
  }

  _createClass(Adding_Members, [{
    key: "handleSubmit",
    value: function () {
      var _handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(e) {
        var form, field, projectID, query, response, body, result;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                e.preventDefault();
                form = document.forms.add_user;
                alert("inside handler");
                field = {
                  name: form.user_id.value,
                  role: form.user_role.value,
                  projectID: form.project_id.value,
                  reqfrom: activeuser,
                  projectName: "Machine Learning"
                };
                projectID = String(field.projectID);
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

                query = "query getProjectDetailsFromProjectID($projectID: String!)\n        {\n            getProjectDetailsFromProjectID(projectID : $projectID)\n            {\n                name\n            }\n        }";
                _context7.next = 9;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      projectID: projectID
                    }
                  })
                });

              case 9:
                response = _context7.sent;
                _context7.next = 12;
                return response.text();

              case 12:
                body = _context7.sent;
                result = JSON.parse(body);
                field.projectName = result.data.getProjectDetailsFromProjectID[0].name;
                this.props.createUserReq(field); // alert("field designed");

                form.user_id.value = "";
                form.user_role.value = "";
                form.project_id.value = "";

              case 19:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function handleSubmit(_x5) {
        return _handleSubmit.apply(this, arguments);
      }

      return handleSubmit;
    }()
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
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
        name: "add_user",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "input"
      }, /*#__PURE__*/React.createElement("label", {
        for: "user_id"
      }, "Enter User ID"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_name",
        id: "user_id",
        name: "user_id",
        placeholder: "Enter ID"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "input"
      }, /*#__PURE__*/React.createElement("label", {
        for: "user_role"
      }, "Enter User Role"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_name",
        id: "user_role",
        name: "user_role",
        placeholder: "Enter Role"
      }))), /*#__PURE__*/React.createElement("div", {
        className: "input"
      }, /*#__PURE__*/React.createElement("label", {
        for: "project_id"
      }, "Enter Project Key"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_name",
        id: "project_id",
        name: "project_id",
        placeholder: "Enter Key"
      }))), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Add User")), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button",
        onClick: this.goback
      }, " Go to Dashboard")), this.state.d == '2' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dashboard, {
        data: this.props.data
      })));
    }
  }]);

  return Adding_Members;
}(React.Component);

var PaperDraft = /*#__PURE__*/function (_React$Component16) {
  _inherits(PaperDraft, _React$Component16);

  var _super16 = _createSuper(PaperDraft);

  function PaperDraft() {
    var _this11;

    _classCallCheck(this, PaperDraft);

    _this11 = _super16.call(this);
    _this11.state = {
      google_sheet: ""
    };
    _this11.updateSheetLink = _this11.updateSheetLink.bind(_assertThisInitialized(_this11));
    return _this11;
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
    var _this12;

    _classCallCheck(this, PaperSub);

    _this12 = _super19.call(this);
    _this12.paperSubmit = _this12.paperSubmit.bind(_assertThisInitialized(_this12));
    _this12.addField = _this12.addField.bind(_assertThisInitialized(_this12));
    _this12.state = {
      val: []
    };
    return _this12;
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
    var _this13;

    _classCallCheck(this, Scheduling);

    _this13 = _super22.call(this);
    _this13.schSubmit = _this13.schSubmit.bind(_assertThisInitialized(_this13));
    _this13.addTask = _this13.addTask.bind(_assertThisInitialized(_this13));
    _this13.state = {
      data: []
    };
    return _this13;
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

var AddComment = /*#__PURE__*/function (_React$Component23) {
  _inherits(AddComment, _React$Component23);

  var _super23 = _createSuper(AddComment);

  function AddComment() {
    _classCallCheck(this, AddComment);

    return _super23.apply(this, arguments);
  }

  _createClass(AddComment, [{
    key: "render",
    value: function render() {
      var _this14 = this;

      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.addcomment_form;
        var content = form.comment.value;
        console.log(content);

        _this14.props.updateComments(content);

        form.comment.value = "";
      };

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "Add Comment below"), /*#__PURE__*/React.createElement("form", {
        name: "addcomment_form",
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        className: "project_name",
        type: "text",
        name: "comment"
      }), /*#__PURE__*/React.createElement("button", {
        className: "create_project_button"
      }, "Add Comment")));
    }
  }]);

  return AddComment;
}(React.Component);

var Comments = /*#__PURE__*/function (_React$Component24) {
  _inherits(Comments, _React$Component24);

  var _super24 = _createSuper(Comments);

  function Comments() {
    var _this15;

    _classCallCheck(this, Comments);

    _this15 = _super24.call(this);
    _this15.state = {
      comments: []
    };
    _this15.updateComments = _this15.updateComments.bind(_assertThisInitialized(_this15));
    return _this15;
  }

  _createClass(Comments, [{
    key: "loadData",
    value: function () {
      var _loadData4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var query, projectID, response, comments;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                query = "query getProjectDetailsInner($projectID: String!)\n        {\n            getProjectDetailsInner(projectID: $projectID)\n            {\n                projectID\n                comments\n            }\n        }";
                projectID = this.props.projectID;
                console.log("In Comments");
                console.log(projectID);
                _context8.next = 6;
                return graphQLFetch(query, {
                  projectID: projectID
                });

              case 6:
                response = _context8.sent;
                console.log(response);
                comments = response.getProjectDetailsInner.comments;
                this.setState({
                  comments: comments
                });

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function loadData() {
        return _loadData4.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "updateComments",
    value: function () {
      var _updateComments = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(new_comment) {
        var comments, comment, query, projectID, response;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                comments = this.state.comments;
                comment = "".concat(activeuser, ": ").concat(new_comment);
                comments.push(comment);
                console.log(comment);
                this.setState({
                  comments: comments
                });
                query = "mutation updateComments($projectID: String!, $comments: [String])\n        {\n            updateComments(projectID : $projectID, comments: $comments)\n            {\n                projectID\n            }\n        }";
                projectID = this.props.projectID;
                console.log(comments);
                _context9.next = 10;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      projectID: projectID,
                      comments: comments
                    }
                  })
                });

              case 10:
                response = _context9.sent;

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function updateComments(_x6) {
        return _updateComments.apply(this, arguments);
      }

      return updateComments;
    }()
  }, {
    key: "render",
    value: function render() {
      var c = this.state.comments.map(function (i) {
        return /*#__PURE__*/React.createElement("p", null, i);
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", null, c), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AddComment, {
        updateComments: this.updateComments
      }));
    }
  }]);

  return Comments;
}(React.Component);

var GenericDiv = /*#__PURE__*/function (_React$Component25) {
  _inherits(GenericDiv, _React$Component25);

  var _super25 = _createSuper(GenericDiv);

  function GenericDiv() {
    var _this16;

    _classCallCheck(this, GenericDiv);

    _this16 = _super25.call(this);
    _this16.state = {
      activeTabList: [false, false, false, false, false, false]
    };
    _this16.updateTabList = _this16.updateTabList.bind(_assertThisInitialized(_this16));
    return _this16;
  }

  _createClass(GenericDiv, [{
    key: "loadData",
    value: function () {
      var _loadData5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var query, projectID, response, tablist;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                query = "query getProjectDetailsInner($projectID: String!)\n        {\n            getProjectDetailsInner(projectID: $projectID)\n            {\n                projectID\n                activeTabList\n            }\n        }";
                projectID = this.props.projectID;
                console.log("In GenericDiv");
                console.log(projectID);
                _context10.next = 6;
                return graphQLFetch(query, {
                  projectID: projectID
                });

              case 6:
                response = _context10.sent;
                console.log(response);
                tablist = response.getProjectDetailsInner.activeTabList;
                console.log(tablist);
                this.setState({
                  activeTabList: tablist
                });

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function loadData() {
        return _loadData5.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "updateTabList",
    value: function () {
      var _updateTabList = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(tablist) {
        var query, projectID, activeTabList, response;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log(tablist);
                this.setState({
                  activeTabList: tablist
                });
                query = "mutation updateActiveTabList($projectID : String!, $activeTabList: [Boolean])\n        {\n            updateActiveTabList(projectID : $projectID, activeTabList: $activeTabList)\n            {\n                projectID\n                activeTabList\n            }\n        }";
                projectID = this.props.projectID;
                activeTabList = this.state.activeTabList;
                _context11.next = 7;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      projectID: projectID,
                      activeTabList: activeTabList
                    }
                  })
                });

              case 7:
                response = _context11.sent;

              case 8:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function updateTabList(_x7) {
        return _updateTabList.apply(this, arguments);
      }

      return updateTabList;
    }()
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
          activeTabList: this.state.activeTabList,
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Literature Survey") {
        res = /*#__PURE__*/React.createElement(LiteratureSurvey, {
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Problem Formulation") {
        res = /*#__PURE__*/React.createElement(ProblemFormulation, {
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Experimentation") {
        res = /*#__PURE__*/React.createElement(Experimentation, {
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Source Code") {
        res = /*#__PURE__*/React.createElement(Sourcecode, {
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Paper Draft") {
        res = /*#__PURE__*/React.createElement(PaperDraft, {
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Paper Submission") {
        res = /*#__PURE__*/React.createElement(PaperSub, {
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Scheduling") {
        res = /*#__PURE__*/React.createElement(Scheduling, {
          projectID: this.props.projectID
        });
      }

      if (comp_name === "Comments") {
        res = /*#__PURE__*/React.createElement(Comments, {
          projectID: this.props.projectID
        });
      }

      return /*#__PURE__*/React.createElement(React.Fragment, null, res);
    }
  }]);

  return GenericDiv;
}(React.Component);

var CreateProject = /*#__PURE__*/function (_React$Component26) {
  _inherits(CreateProject, _React$Component26);

  var _super26 = _createSuper(CreateProject);

  function CreateProject() {
    var _this17;

    _classCallCheck(this, CreateProject);

    _this17 = _super26.call(this);
    _this17.handleSubmit = _this17.handleSubmit.bind(_assertThisInitialized(_this17));
    _this17.goback = _this17.goback.bind(_assertThisInitialized(_this17));
    _this17.state = {
      d: '1'
    };
    return _this17;
  }

  _createClass(CreateProject, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.project_add;
      /*
      const field = {
                  project_name: form.project_name.value, project_desc: form.project_desc.value,
              user_name: form.user_name.value, user_role: form.user_role.value, projectID: form.project_key.value
      };
              */

      var field = {
        name: form.project_name.value,
        projectID: form.project_key.value,
        owner: activeuser,
        desc: form.project_desc.value,
        pending: [],
        collab: []
      };
      this.props.addproject(field);
      form.project_name.value = "";
      form.project_desc.value = "";
      form.project_key.value = "";
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
        className: "input"
      }, /*#__PURE__*/React.createElement("label", {
        for: "project_key"
      }, "Enter 4 letter Project key"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
        type: "text",
        className: "project_key",
        id: "project_key",
        name: "project_key",
        placeholder: "Enter Project Key"
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

var Temp_display = /*#__PURE__*/function (_React$Component27) {
  _inherits(Temp_display, _React$Component27);

  var _super27 = _createSuper(Temp_display);

  function Temp_display() {
    var _this18;

    _classCallCheck(this, Temp_display);

    _this18 = _super27.call(this);
    _this18.state = {
      d: '1'
    };
    _this18.handleSubmit = _this18.handleSubmit.bind(_assertThisInitialized(_this18));
    return _this18;
  }

  _createClass(Temp_display, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      this.setState({
        d: '2'
      });
    }
  }, {
    key: "hideProjects",
    value: function hideProjects() {
      console.log("dummy function to pass as arg");
    }
  }, {
    key: "render",
    value: function render() {
      var localdata = this.props.data;
      console.log("In Temp_Display");
      console.log(localdata['projectID']);
      var fromtemp = true;
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DisplayTabs, {
        projectID: localdata.projectID
      })), /*#__PURE__*/React.createElement("button", {
        className: "button_navigation_half",
        onClick: this.handleSubmit
      }, " Go Back ")), this.state.d == '2' &&
      /*#__PURE__*/
      // <Projects_Display data={this.props.complete_list} />
      React.createElement(My_Projects, {
        data: this.props.complete_list,
        fromtemp: true
      }) // this.props.complete_list.map(r => <Projects_Display data={r} hideProjects={this.hideProjects} />)
      );
    }
  }]);

  return Temp_display;
}(React.Component);

var Projects_Display = /*#__PURE__*/function (_React$Component28) {
  _inherits(Projects_Display, _React$Component28);

  var _super28 = _createSuper(Projects_Display);

  function Projects_Display() {
    var _this19;

    _classCallCheck(this, Projects_Display);

    _this19 = _super28.call(this);
    _this19.state = {
      d: '1'
    };
    _this19.handleSubmit = _this19.handleSubmit.bind(_assertThisInitialized(_this19));
    return _this19;
  }

  _createClass(Projects_Display, [{
    key: "handleSubmit",
    value: function handleSubmit() {
      this.setState({
        d: '2'
      }); // to hide other projects, pass in selected projectID

      this.props.hideProjects(this.props.data.projectID);
    }
  }, {
    key: "render",
    value: function render() {
      var t = this.props.data;
      console.log("In Projects_Display");
      console.log(t);
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("button", {
        className: "project_class",
        onClick: this.handleSubmit
      }, /*#__PURE__*/React.createElement("div", {
        className: "project_class"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "card_header"
      }, t.name), /*#__PURE__*/React.createElement("p", null, "Project Description: ", t.desc), /*#__PURE__*/React.createElement("p", null, "Project Member: ", t.owner), /*#__PURE__*/React.createElement("p", null, "Project ID  : ", t.projectID))));
    }
  }]);

  return Projects_Display;
}(React.Component);

var My_Projects = /*#__PURE__*/function (_React$Component29) {
  _inherits(My_Projects, _React$Component29);

  var _super29 = _createSuper(My_Projects);

  function My_Projects() {
    var _this20;

    _classCallCheck(this, My_Projects);

    _this20 = _super29.call(this);
    _this20.state = {
      d: '1',
      display: null
    };
    _this20.handleSubmit = _this20.handleSubmit.bind(_assertThisInitialized(_this20));
    _this20.hideProjects = _this20.hideProjects.bind(_assertThisInitialized(_this20));
    return _this20;
  }

  _createClass(My_Projects, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this21 = this;

      var d = this.props.data.map(function (r) {
        return /*#__PURE__*/React.createElement(Projects_Display, {
          data: r,
          hideProjects: _this21.hideProjects
        });
      });
      this.setState({
        display: d
      });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit() {
      this.setState({
        d: '2'
      });
    }
  }, {
    key: "hideProjects",
    value: function hideProjects(projectID) {
      console.log("In hide project function");
      console.log(projectID);
      var disp;

      for (var i = 0; i < this.props.data.length; i++) {
        if (this.props.data[i].projectID == projectID) {
          disp = /*#__PURE__*/React.createElement(Temp_display, {
            data: this.props.data[i],
            complete_list: this.props.data
          });
        }
      }

      this.setState({
        display: disp
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.log("In My_Projects");

      if (this.props.fromtemp == true) {
        console.log("from temp");
        this.state.d = '3';
      } //console.log(this.props.data);
      // const d = this.props.data.map(r => <Projects_Display data={r} hideProjects={this.hideProjects} />);
      // this.setState({display: d});


      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "My Projects"), /*#__PURE__*/React.createElement("div", null, this.state.display), /*#__PURE__*/React.createElement("button", {
        className: "button_navigation_half",
        onClick: this.handleSubmit
      }, "Go to Dashboard")), this.state.d == '2' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dashboard, {
        data: this.props.data
      })), this.state.d == '3' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, this.state.display)));
    }
  }]);

  return My_Projects;
}(React.Component);

var CreateDiv = /*#__PURE__*/function (_React$Component30) {
  _inherits(CreateDiv, _React$Component30);

  var _super30 = _createSuper(CreateDiv);

  function CreateDiv() {
    _classCallCheck(this, CreateDiv);

    return _super30.apply(this, arguments);
  }

  _createClass(CreateDiv, [{
    key: "render",
    value: function render() {
      var t = this.props.data;
      var role = t.role;
      var id = t.projectID;
      var reqfrom = t.reqfrom;
      var projName = t.projectName;
      console.log(t);
      return /*#__PURE__*/React.createElement("div", {
        className: "project_class"
      }, /*#__PURE__*/React.createElement("div", {
        className: "project_class"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "card_header"
      }, projName), /*#__PURE__*/React.createElement("p", null, "Project Name: ", projName), /*#__PURE__*/React.createElement("p", null, "Project Role: ", role), /*#__PURE__*/React.createElement("p", null, "Project ID: ", id), /*#__PURE__*/React.createElement("p", null, "Invite from: ", reqfrom, " "), /*#__PURE__*/React.createElement("button", null, "Accept"), /*#__PURE__*/React.createElement("button", null, "Reject")));
    }
  }]);

  return CreateDiv;
}(React.Component);

var RequestDiv = /*#__PURE__*/function (_React$Component31) {
  _inherits(RequestDiv, _React$Component31);

  var _super31 = _createSuper(RequestDiv);

  function RequestDiv() {
    _classCallCheck(this, RequestDiv);

    return _super31.apply(this, arguments);
  }

  _createClass(RequestDiv, [{
    key: "render",
    value: function render() {
      var t = this.props.data;
      var user = t.username;
      var p = t.pending;
      var temp_div = p.map(function (val) {
        return /*#__PURE__*/React.createElement(CreateDiv, {
          data: val
        });
      });
      alert("data read");
      alert(user);
      return /*#__PURE__*/React.createElement("div", null, temp_div);
    }
  }]);

  return RequestDiv;
}(React.Component);

var ViewRequests = /*#__PURE__*/function (_React$Component32) {
  _inherits(ViewRequests, _React$Component32);

  var _super32 = _createSuper(ViewRequests);

  function ViewRequests() {
    var _this22;

    _classCallCheck(this, ViewRequests);

    _this22 = _super32.call(this);
    _this22.state = {
      d: '1',
      values: []
    };
    return _this22;
  }

  _createClass(ViewRequests, [{
    key: "render",
    value: function render() {
      var t = this.props.data;
      alert("in view requests");
      console.log(t);
      var temp_div = t.map(function (val) {
        return /*#__PURE__*/React.createElement(RequestDiv, {
          data: val
        });
      });
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, "MyRequests"), /*#__PURE__*/React.createElement("div", null, temp_div));
    }
  }]);

  return ViewRequests;
}(React.Component);

var Dashboard = /*#__PURE__*/function (_React$Component33) {
  _inherits(Dashboard, _React$Component33);

  var _super33 = _createSuper(Dashboard);

  function Dashboard() {
    var _this23;

    _classCallCheck(this, Dashboard);

    _this23 = _super33.call(this);
    _this23.state = {
      data: [],
      d: '1',
      userReq: []
    };
    _this23.create = _this23.create.bind(_assertThisInitialized(_this23));
    _this23.displayproj = _this23.displayproj.bind(_assertThisInitialized(_this23));
    _this23.addproject = _this23.addproject.bind(_assertThisInitialized(_this23));
    _this23.addMembers = _this23.addMembers.bind(_assertThisInitialized(_this23));
    _this23.createUserReq = _this23.createUserReq.bind(_assertThisInitialized(_this23));
    _this23.viewReq = _this23.viewReq.bind(_assertThisInitialized(_this23));
    return _this23;
  }

  _createClass(Dashboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "addMembers",
    value: function addMembers() {
      this.setState({
        dat: this.state.data,
        d: '4'
      });
    }
  }, {
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
    key: "viewReq",
    value: function viewReq() {
      this.setState({
        data: this.state.data,
        d: '5'
      });
    }
  }, {
    key: "loadData",
    value: function () {
      var _loadData6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var query, username, response, body, result, proj_query, user_accepted_projects, get_project_from_ID, data_obtained, i, projectID, proj_data;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                query = "query getExistingUsers($username : String!)\n        {\n            getExistingUsers(username : $username)\n            {\n                username\n                pending\n                {\n                    name\n                    role\n                    projectID\n                    reqfrom\n                    projectName\n                \n                }\n                accepted\n                {\n                    projectID\n                }\n            }\n        }"; //const username = "e0674494@u.nus.edu";
                //const response = await graphQLFetch(query, { username });

                username = activeuser;
                _context12.next = 4;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      username: username
                    }
                  })
                });

              case 4:
                response = _context12.sent;
                _context12.next = 7;
                return response.text();

              case 7:
                body = _context12.sent;
                result = JSON.parse(body); // console.log(result.data.getExistingUsers);
                // get list of project IDs for the user and assign to data state

                _context12.next = 11;
                return graphQLFetch(query, {
                  username: username
                });

              case 11:
                proj_query = _context12.sent;
                user_accepted_projects = [];
                console.log("User accepted projects");
                get_project_from_ID = "query getProjectDetailsFromProjectID($projectID : String!)\n        {\n            getProjectDetailsFromProjectID(projectID : $projectID)\n            {\n                name\n                desc\n                owner\n                projectID\n            }\n        }";
                data_obtained = [];
                i = 0;

              case 17:
                if (!(i < proj_query.getExistingUsers[0].accepted.length)) {
                  _context12.next = 27;
                  break;
                }

                user_accepted_projects.push(proj_query.getExistingUsers[0].accepted[i].projectID);
                projectID = proj_query.getExistingUsers[0].accepted[i].projectID;
                _context12.next = 22;
                return graphQLFetch(get_project_from_ID, {
                  projectID: projectID
                });

              case 22:
                proj_data = _context12.sent;
                data_obtained.push(proj_data.getProjectDetailsFromProjectID[0]);

              case 24:
                i++;
                _context12.next = 17;
                break;

              case 27:
                console.log(data_obtained);
                this.setState({
                  userReq: result.data.getExistingUsers,
                  data: data_obtained
                });

              case 29:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function loadData() {
        return _loadData6.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "addproject",
    value: function () {
      var _addproject = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(field) {
        var query, response;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                query = "mutation addProjectDetails($field: ProjectData!) {\n                    addProjectDetails(field : $field)\n                {\n                    name\n                }\n        }";
                _context13.next = 3;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      field: field
                    }
                  })
                });

              case 3:
                response = _context13.sent;

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function addproject(_x8) {
        return _addproject.apply(this, arguments);
      }

      return addproject;
    }()
  }, {
    key: "createUserReq",
    value: function () {
      var _createUserReq = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(field) {
        var query, response;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                query = "mutation addNewRequests($field: Requests!){\n                    addNewRequests(field : $field)\n                {\n                    name\n                }\n        }";
                _context14.next = 3;
                return fetch('http://localhost:5000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    query: query,
                    variables: {
                      field: field
                    }
                  })
                });

              case 3:
                response = _context14.sent;

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function createUserReq(_x9) {
        return _createUserReq.apply(this, arguments);
      }

      return createUserReq;
    }()
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
      }, "View My Projects"), /*#__PURE__*/React.createElement("button", {
        className: "view_pro_button",
        onClick: this.addMembers
      }, "Add Members to Projects"), /*#__PURE__*/React.createElement("button", {
        className: "view_pro_button",
        onClick: this.viewReq
      }, "View Requests")), this.state.d == '2' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CreateProject, {
        addproject: this.addproject,
        data: this.state.data
      })), this.state.d == '3' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(My_Projects, {
        data: this.state.data,
        fromtemp: false
      })), this.state.d == '4' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Adding_Members, {
        createUserReq: this.createUserReq,
        data: this.props.data
      })), this.state.d == '5' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ViewRequests, {
        data: this.state.userReq
      })));
    }
  }]);

  return Dashboard;
}(React.Component);

var DisplayTabs = /*#__PURE__*/function (_React$Component34) {
  _inherits(DisplayTabs, _React$Component34);

  var _super34 = _createSuper(DisplayTabs);

  function DisplayTabs() {
    var _this24;

    _classCallCheck(this, DisplayTabs);

    _this24 = _super34.call(this);
    _this24.state = {
      isStatusButtonPressed: false,
      isLiteratureSurveyButtonPressed: false,
      isProblemFormulationButtonPressed: false,
      isExperimentationButtonPressed: false,
      isSourceCodeButtonPressed: false,
      isPaperDraftButtonPressed: false,
      isPaperSubmissionButtonPressed: false,
      isSchedulingButtonPressed: false,
      isDashboardButtonPressed: false,
      isCommentsButtonPressed: false
    };
    return _this24;
  }

  _createClass(DisplayTabs, [{
    key: "render",
    value: function render() {
      var _this25 = this;

      console.log("In DisplayTabs");
      console.log(this.props.projectID);

      var onClickStatus = function onClickStatus() {
        _this25.setState({
          isStatusButtonPressed: true,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: false
        });
      };

      var onClickLiteratureSurvey = function onClickLiteratureSurvey() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: true,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: false
        });
      };

      var onClickProblemFormulation = function onClickProblemFormulation() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: true,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: false
        });
      };

      var onClickExperimentation = function onClickExperimentation() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: true,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: false
        });
      };

      var onClickSourceCode = function onClickSourceCode() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: true,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: false
        });
      };

      var onClickPaperDraft = function onClickPaperDraft() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: true,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: false
        });
      };

      var onClickPaperSubmission = function onClickPaperSubmission() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: true,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: false
        });
      };

      var onClickScheduling = function onClickScheduling() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: true,
          isCommentsButtonPressed: false
        });
      };

      var onClickComments = function onClickComments() {
        _this25.setState({
          isStatusButtonPressed: false,
          isLiteratureSurveyButtonPressed: false,
          isProblemFormulationButtonPressed: false,
          isExperimentationButtonPressed: false,
          isSourceCodeButtonPressed: false,
          isPaperDraftButtonPressed: false,
          isPaperSubmissionButtonPressed: false,
          isSchedulingButtonPressed: false,
          isCommentsButtonPressed: true
        });
      };

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, this.props.projectID), /*#__PURE__*/React.createElement("div", {
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
      }, "Scheduling"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "projectbutton",
        onClick: onClickComments
      }, "Comments"), /*#__PURE__*/React.createElement("br", null)), /*#__PURE__*/React.createElement("div", {
        className: "projectdiv"
      }, this.state.isStatusButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Status",
        projectID: this.props.projectID
      }) : "", this.state.isLiteratureSurveyButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Literature Survey",
        projectID: this.props.projectID
      }) : "", this.state.isProblemFormulationButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Problem Formulation",
        projectID: this.props.projectID
      }) : "", this.state.isExperimentationButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Experimentation",
        projectID: this.props.projectID
      }) : "", this.state.isSourceCodeButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Source Code",
        projectID: this.props.projectID
      }) : "", this.state.isPaperDraftButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Paper Draft",
        projectID: this.props.projectID
      }) : "", this.state.isPaperSubmissionButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Paper Submission",
        projectID: this.props.projectID
      }) : "", this.state.isSchedulingButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Scheduling",
        projectID: this.props.projectID
      }) : "", this.state.isCommentsButtonPressed ? /*#__PURE__*/React.createElement(GenericDiv, {
        comp_name: "Comments",
        projectID: this.props.projectID
      }) : "")));
    }
  }]);

  return DisplayTabs;
}(React.Component);

var RenderProjectDetailsPage = /*#__PURE__*/function (_React$Component35) {
  _inherits(RenderProjectDetailsPage, _React$Component35);

  var _super35 = _createSuper(RenderProjectDetailsPage);

  function RenderProjectDetailsPage() {
    var _this26;

    _classCallCheck(this, RenderProjectDetailsPage);

    _this26 = _super35.call(this);
    _this26.state = {
      data: [],
      d: '1'
    };
    return _this26;
  }

  _createClass(RenderProjectDetailsPage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.state.d == '1' && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dashboard, {
        data: this.state.data
      })));
    }
  }]);

  return RenderProjectDetailsPage;
}(React.Component);

var element = /*#__PURE__*/React.createElement(RenderProjectDetailsPage, null);
ReactDOM.render(element, document.getElementById("project_details"));