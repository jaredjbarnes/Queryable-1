"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValueExpression = require("./ValueExpression");

var _ValueExpression2 = _interopRequireDefault(_ValueExpression);

var _OperationExpression = require("./OperationExpression");

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _Expression = require("./Expression");

var _Expression2 = _interopRequireDefault(_Expression);

var _ExpressionBuilder = require("./ExpressionBuilder");

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OperationExpressionBuilder = function () {
    function OperationExpressionBuilder(type, property, rootExpression, currentExpression) {
        _classCallCheck(this, OperationExpressionBuilder);

        this.type = type;
        this.propertyName = property;
        this.rootExpression = rootExpression;
        this.currentExpression = currentExpression || rootExpression;

        if (type == null) {
            throw new Error("Null Argument Exception: type cannot be null.");
        }

        if (rootExpression == null) {
            throw new Error("Null Argement Exception: rootExpression cannot be null.");
        }
    }

    _createClass(OperationExpressionBuilder, [{
        key: "_createArrayOperationExpression",
        value: function _createArrayOperationExpression(type, array) {
            var propertyAccessExpression = this._createPropertyAccessExpression();

            if (Array.isArray(array)) {
                var constant = this._getConstant(array);
                var arrayExpression = new _OperationExpression2.default(type);
                arrayExpression.children.push(propertyAccessExpression, constant);

                this.currentExpression.children.push(arrayExpression);
                return this.rootExpression;
            } else {
                throw new Error("Invalid Argument: Expected an array.");
            }
        }
    }, {
        key: "_createLambdaOperationExpression",
        value: function _createLambdaOperationExpression(type, lambda) {
            if (typeof lambda !== "function") {
                throw new Error("Invalid Argument: Expected a function.");
            }

            var propertyNavigationExpression = this._createPropertyNavigationExpression();

            var expressionBuilder = new _ExpressionBuilder2.default();
            var expression = lambda(expressionBuilder);
            var expressionExpression = new _OperationExpression2.default("expression");

            expressionExpression.children.push(expression);

            var lambdaExpression = new _OperationExpression2.default(type);
            lambdaExpression.children.push(propertyNavigationExpression, expressionExpression);

            this.currentExpression.children.push(lambdaExpression);

            return this.rootExpression;
        }
    }, {
        key: "_createOperationExpression",
        value: function _createOperationExpression(type, value) {
            var propertyAccessExpression = this._createPropertyAccessExpression();

            var constant = this._getConstant(value);
            var expression = new _OperationExpression2.default(type);
            expression.children.push(propertyAccessExpression, constant);

            this.currentExpression.children.push(expression);

            return this.rootExpression;
        }
    }, {
        key: "_createPropertyAccessExpression",
        value: function _createPropertyAccessExpression() {
            var propertyAccessExpression = new _OperationExpression2.default("propertyAccess");
            propertyAccessExpression.children.push(new _ValueExpression2.default("type", this.type), new _ValueExpression2.default("property", this.propertyName));

            return propertyAccessExpression;
        }
    }, {
        key: "_createPropertyNavigationExpression",
        value: function _createPropertyNavigationExpression() {
            var propertyNavigationExpression = new _OperationExpression2.default("propertyNavigation");
            propertyNavigationExpression.children.push(new _ValueExpression2.default("type", this.type), new _ValueExpression2.default("property", this.propertyName));

            return propertyNavigationExpression;
        }
    }, {
        key: "_getConstant",
        value: function _getConstant(value) {
            if (value instanceof _Expression2.default) {
                return value;
            }

            if (typeof value === "string") {
                return new _ValueExpression2.default("string", value);
            } else if (typeof value === "function") {
                return new _ValueExpression2.default("function", value);
            } else if (typeof value === "number") {
                return new _ValueExpression2.default("number", value);
            } else if (typeof value === "boolean") {
                return new _ValueExpression2.default("boolean", value);
            } else if (value === null) {
                return new _ValueExpression2.default("null", value);
            } else if (Array.isArray(value)) {
                return new _ValueExpression2.default("array", value);
            } else if (value instanceof Date) {
                return new _ValueExpression2.default("date", value);
            } else {
                return new _ValueExpression2.default("object", value);
            }
        }
    }, {
        key: "any",
        value: function any(lambda) {
            return this._createLambdaOperationExpression("any", lambda);
        }
    }, {
        key: "all",
        value: function all(lambda) {
            return this._createLambdaOperationExpression("all", lambda);
        }
    }, {
        key: "contains",
        value: function contains(value) {
            return this._createOperationExpression("contains", value);
        }
    }, {
        key: "isEqualTo",
        value: function isEqualTo(value) {
            return this._createOperationExpression("isEqualTo", value);
        }
    }, {
        key: "isNotEqualTo",
        value: function isNotEqualTo(value) {
            return this._createOperationExpression("isNotEqualTo", value);
        }
    }, {
        key: "isIn",
        value: function isIn(array) {
            return this._createArrayOperationExpression("isIn", array);
        }
    }, {
        key: "isNotIn",
        value: function isNotIn(array) {
            return this._createArrayOperationExpression("isNotIn", array);
        }
    }, {
        key: "isGreaterThan",
        value: function isGreaterThan(value) {
            return this._createOperationExpression("isGreaterThan", value);
        }
    }, {
        key: "isGreaterThanOrEqualTo",
        value: function isGreaterThanOrEqualTo(value) {
            return this._createOperationExpression("isGreaterThanOrEqualTo", value);
        }
    }, {
        key: "isLessThanOrEqualTo",
        value: function isLessThanOrEqualTo(value) {
            return this._createOperationExpression("isLessThanOrEqualTo", value);
        }
    }, {
        key: "isLessThan",
        value: function isLessThan(value) {
            return this._createOperationExpression("isLessThan", value);
        }
    }, {
        key: "endsWith",
        value: function endsWith(value) {
            return this._createOperationExpression("endsWith", value);
        }
    }, {
        key: "startsWith",
        value: function startsWith(value) {
            return this._createOperationExpression("startsWith", value);
        }
    }, {
        key: "property",
        value: function property(value) {
            var propertyNavigation = this._createPropertyNavigationExpression();
            this.currentExpression.children.push(propertyNavigation);
            return new OperationExpressionBuilder("Object", value, this.rootExpression, propertyNavigation);
        }
    }, {
        key: "getExpression",
        value: function getExpression() {
            var propertyAccessExpression = this._createPropertyAccessExpression();
            this.currentExpression.children.push(propertyAccessExpression);

            return this.rootExpression;
        }
    }]);

    return OperationExpressionBuilder;
}();

exports.default = OperationExpressionBuilder;
//# sourceMappingURL=OperationExpressionBuilder.js.map