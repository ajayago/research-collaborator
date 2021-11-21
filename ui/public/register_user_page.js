"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

function graphQLFetch(_x) {
  return _graphQLFetch.apply(this, arguments);
}

function _graphQLFetch() {
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args3 = arguments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            variables = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            _context3.prev = 1;
            _context3.next = 4;
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
            response = _context3.sent;
            _context3.next = 7;
            return response.text();

          case 7:
            body = _context3.sent;
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

            return _context3.abrupt("return", result.data);

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](1);
            alert("Error in sending data to server: ".concat(_context3.t0.message));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var AddUser = /*#__PURE__*/function (_React$Component) {
  _inherits(AddUser, _React$Component);

  var _super = _createSuper(AddUser);

  function AddUser() {
    var _this;

    _classCallCheck(this, AddUser);

    _this = _super.call(this);
    _this.state = {
      google_auth: false,
      password: "xxxxxxxx",
      selected_value: "No"
    };
    _this.change = _this.change.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddUser, [{
    key: "change",
    value: function change(event) {
      console.log(event.target.value);

      if (event.target.value == "Yes") {
        this.setState({
          google_auth: true,
          selected_value: "Yes",
          password: "xxxxxxxx"
        });
      } else {
        this.setState({
          google_auth: false,
          selected_value: "No"
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.addUser;
        var pass;

        if (_this2.state.google_auth) {
          pass = _this2.state.password;
        } else {
          pass = form.password.value;
        }

        var user = {
          username: form.username.value,
          password: pass,
          org_short_name: form.org_short_name.value,
          google_auth: _this2.state.google_auth
        };
        console.log(user);

        _this2.props.createUser(user);

        form.username.value = "";

        if (!_this2.state.google_auth) {
          form.password.value = "";
        }

        form.org_short_name.value = "";
      };

      return /*#__PURE__*/React.createElement("div", {
        className: "column"
      }, /*#__PURE__*/React.createElement("form", {
        name: "addUser",
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement("label", null, "Enter User Email Address", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "username",
        id: "username",
        placeholder: "User email address"
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", null, "Are you signing in with Google?", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("select", {
        name: "is_google_auth",
        id: "google_auth",
        value: this.state.selected_value,
        className: "dropdown",
        onChange: this.change
      }, /*#__PURE__*/React.createElement("option", {
        key: "No",
        value: "No"
      }, "No"), /*#__PURE__*/React.createElement("option", {
        key: "Yes",
        value: "Yes"
      }, "Yes"))), /*#__PURE__*/React.createElement("br", null), this.state.google_auth ? null : /*#__PURE__*/React.createElement("label", null, "Enter password", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "password",
        name: "password",
        id: "password",
        placeholder: "Password"
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", null, "Select Organization", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("select", {
        name: "org_short_name",
        id: "org_short_name",
        className: "dropdown"
      }, this.props.orgs.map(function (name) {
        return /*#__PURE__*/React.createElement("option", {
          key: name.org_short_name,
          value: name.org_short_name
        }, name.org_short_name);
      }))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "add_user_button"
      }, "Add User")));
    }
  }]);

  return AddUser;
}(React.Component);

var DisplayUserCreationForm = /*#__PURE__*/function (_React$Component2) {
  _inherits(DisplayUserCreationForm, _React$Component2);

  var _super2 = _createSuper(DisplayUserCreationForm);

  function DisplayUserCreationForm() {
    var _this3;

    _classCallCheck(this, DisplayUserCreationForm);

    _this3 = _super2.call(this);
    _this3.state = {
      organizations: [],
      errormessage: null
    };
    _this3.createUser = _this3.createUser.bind(_assertThisInitialized(_this3));
    _this3.getOrgs = _this3.getOrgs.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(DisplayUserCreationForm, [{
    key: "getOrgs",
    value: function () {
      var _getOrgs = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var allorgs, teststring, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                allorgs = "query getAllOrganization($org: String){\n            getAllOrganization(org: $org) {\n                org_short_name\n            }\n        }";
                teststring = "";
                _context.next = 4;
                return graphQLFetch(allorgs, {
                  teststring: teststring
                });

              case 4:
                data = _context.sent;
                this.setState({
                  organizations: data.getAllOrganization
                }); // to list all orgs for user to select from

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOrgs() {
        return _getOrgs.apply(this, arguments);
      }

      return getOrgs;
    }()
  }, {
    key: "createUser",
    value: function () {
      var _createUser = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
        var users_query, username, user_data, query, data;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (user.username) {
                  _context2.next = 3;
                  break;
                }

                this.setState({
                  errormessage: "Please enter valid user name!"
                });
                return _context2.abrupt("return");

              case 3:
                if (user.password) {
                  _context2.next = 6;
                  break;
                }

                this.setState({
                  errormessage: "Please enter valid password!"
                });
                return _context2.abrupt("return");

              case 6:
                users_query = "query getExistingUsers($username: String!){\n            getExistingUsers(username: $username) {\n                username\n            }\n        }";
                username = user.username;
                _context2.next = 10;
                return graphQLFetch(users_query, {
                  username: username
                });

              case 10:
                user_data = _context2.sent;

                if (!(user_data.getExistingUsers.length > 0)) {
                  _context2.next = 14;
                  break;
                }

                this.setState({
                  errormessage: "User name already in use!"
                });
                return _context2.abrupt("return");

              case 14:
                query = "mutation addNewUser($user: UserInputs!){\n            addNewUser(user: $user) {\n                _id\n            }\n        }";
                _context2.next = 17;
                return graphQLFetch(query, {
                  user: user
                });

              case 17:
                data = _context2.sent;
                this.setState({
                  errormessage: "User Added!"
                });

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createUser(_x2) {
        return _createUser.apply(this, arguments);
      }

      return createUser;
    }()
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.getOrgs();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AddUser, {
        createUser: this.createUser,
        orgs: this.state.organizations
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, this.state.errormessage ? this.state.errormessage : null));
    }
  }]);

  return DisplayUserCreationForm;
}(React.Component);

var element = /*#__PURE__*/React.createElement(DisplayUserCreationForm, null);
ReactDOM.render(element, document.getElementById("usercreationpage"));