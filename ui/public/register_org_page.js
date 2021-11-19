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
  _graphQLFetch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(query) {
    var variables,
        response,
        body,
        result,
        error,
        details,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            variables = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            _context2.prev = 1;
            _context2.next = 4;
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
            response = _context2.sent;
            _context2.next = 7;
            return response.text();

          case 7:
            body = _context2.sent;
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

            return _context2.abrupt("return", result.data);

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](1);
            alert("Error in sending data to server: ".concat(_context2.t0.message));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 13]]);
  }));
  return _graphQLFetch.apply(this, arguments);
}

var AddOrganization = /*#__PURE__*/function (_React$Component) {
  _inherits(AddOrganization, _React$Component);

  var _super = _createSuper(AddOrganization);

  function AddOrganization() {
    _classCallCheck(this, AddOrganization);

    return _super.apply(this, arguments);
  }

  _createClass(AddOrganization, [{
    key: "render",
    value: function render() {
      var _this = this;

      var handleSubmit = function handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.addOrganization;
        var org = {
          org_name: form.org_name.value,
          org_short_name: form.org_short_name.value
        };
        console.log(org);

        _this.props.createOrganization(org);

        form.org_name.value = "";
        form.org_short_name.value = "";
      };

      return /*#__PURE__*/React.createElement("div", {
        className: "column"
      }, /*#__PURE__*/React.createElement("form", {
        name: "addOrganization",
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement("label", null, "Enter Organization Name", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "org_name",
        id: "org_name",
        placeholder: "Organization Name"
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", null, "Enter a three letter identifier for the organization", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "org_short_name",
        id: "org_short_name",
        placeholder: "Organization Short Name"
      })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        className: "add_user_button"
      }, "Add Organization")));
    }
  }]);

  return AddOrganization;
}(React.Component);

var DisplayOrgCreationForm = /*#__PURE__*/function (_React$Component2) {
  _inherits(DisplayOrgCreationForm, _React$Component2);

  var _super2 = _createSuper(DisplayOrgCreationForm);

  function DisplayOrgCreationForm() {
    var _this2;

    _classCallCheck(this, DisplayOrgCreationForm);

    _this2 = _super2.call(this);
    _this2.state = {
      organizations: [],
      errormessage: null
    };
    _this2.createOrganization = _this2.createOrganization.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(DisplayOrgCreationForm, [{
    key: "createOrganization",
    value: function () {
      var _createOrganization = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(org) {
        var orgs_query, org_short_name, org_data, query, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (org.org_name) {
                  _context.next = 3;
                  break;
                }

                this.setState({
                  errormessage: "Please enter valid organization name!"
                });
                return _context.abrupt("return");

              case 3:
                if (org.org_short_name) {
                  _context.next = 6;
                  break;
                }

                this.setState({
                  errormessage: "Please enter valid organization short name!"
                });
                return _context.abrupt("return");

              case 6:
                orgs_query = "query getOrganization($org_short_name: String!){\n            getOrganization(org_short_name: $org_short_name) {\n                org_short_name\n            }\n        }";
                org_short_name = org.org_short_name;
                console.log(org_short_name);
                _context.next = 11;
                return graphQLFetch(orgs_query, {
                  org_short_name: org_short_name
                });

              case 11:
                org_data = _context.sent;
                console.log(org_data.getOrganization);

                if (!(org_data.getOrganization.length > 0)) {
                  _context.next = 17;
                  break;
                }

                console.log("here!!");
                this.setState({
                  errormessage: "Short name already in use!"
                });
                return _context.abrupt("return");

              case 17:
                query = "mutation addOrganization($org: OrganizationInputs!){\n            addOrganization(org: $org) {\n                _id\n            }\n        }";
                _context.next = 20;
                return graphQLFetch(query, {
                  org: org
                });

              case 20:
                data = _context.sent;
                this.setState({
                  errormessage: null
                });

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createOrganization(_x2) {
        return _createOrganization.apply(this, arguments);
      }

      return createOrganization;
    }()
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AddOrganization, {
        createOrganization: this.createOrganization
      }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, this.state.errormessage ? this.state.errormessage : null));
    }
  }]);

  return DisplayOrgCreationForm;
}(React.Component);

var element = /*#__PURE__*/React.createElement(DisplayOrgCreationForm, null);
ReactDOM.render(element, document.getElementById("orgcreationpage"));