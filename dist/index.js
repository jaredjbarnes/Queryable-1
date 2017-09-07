(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Expression = function () {
    function Expression() {
        _classCallCheck(this, Expression);

        this.nodeName = "expression";
    }

    _createClass(Expression, [{
        key: "copy",
        value: function copy() {
            throw new Error("Meant to be overriden");
        }
    }, {
        key: "isEqualTo",
        value: function isEqualTo() {
            throw new Error("Meant to be overriden");
        }
    }], [{
        key: "getExpressionType",
        value: function getExpressionType(value) {
            if (value instanceof Expression) {
                return value;
            }

            if (typeof value === "string") {
                return Expression.string(value);
            } else if (typeof value === "function") {
                return Expression["function"](value);
            } else if (typeof value === "number") {
                return Expression.number(value);
            } else if (typeof value === "boolean") {
                return Expression.boolean(value);
            } else if (value === null) {
                return Expression["null"](value);
                return Expression["undefined"](value);
            } else if (Array.isArray(value)) {
                return Expression.array(value);
            } else if (value instanceof Date) {
                return Expression.date(value);
            } else {
                return Expression.object(value);
            }
        }
    }, {
        key: "property",
        value: function property(value) {
            return new ValueExpression("property", value);
        }
    }, {
        key: "constant",
        value: function constant(value) {
            return new ValueExpression("constant", value);
        }
    }, {
        key: "boolean",
        value: function boolean(value) {
            var expression = new ValueExpression("boolean");
            expression.value = value;
            return expression;
        }
    }, {
        key: "string",
        value: function string(value) {
            var expression = new ValueExpression("string");
            expression.value = value;
            return expression;
        }
    }, {
        key: "number",
        value: function number(value) {
            var expression = new ValueExpression("number");
            expression.value = value;
            return expression;
        }
    }, {
        key: "object",
        value: function object(value) {
            var expression = new ValueExpression("object");
            expression.value = value;
            return expression;
        }
    }, {
        key: "date",
        value: function date(value) {
            var expression = new ValueExpression("date");
            expression.value = value;
            return expression;
        }
    }, {
        key: "function",
        value: function _function(value) {
            var expression = new ValueExpression("function");
            expression.value = value;
            return expression;
        }
    }, {
        key: "type",
        value: function type(value) {
            var expression = new ValueExpression("type");
            expression.value = value || Object;
            return expression;
        }
    }, {
        key: "null",
        value: function _null(value) {
            var expression = new ValueExpression("null");
            expression.value = value;
            return expression;
        }
    }, {
        key: "undefined",
        value: function undefined(value) {
            var expression = new ValueExpression("undefined");
            expression.value = value;
            return expression;
        }
    }, {
        key: "array",
        value: function array(value) {
            var expression = new ValueExpression("array");
            expression.value = value;
            return expression;
        }
    }, {
        key: "queryable",
        value: function queryable(leftExpression, rightExpression) {
            var expression = new OperationExpression("queryable");
            expression.children.push(leftExpression, rightExpression);
            return expression;
        }

        //
        // OperationExpression helpers
        //

    }, {
        key: "equalTo",
        value: function equalTo() {
            var expression = new OperationExpression("equalTo");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "notEqualTo",
        value: function notEqualTo() {
            var expression = new OperationExpression("notEqualTo");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "or",
        value: function or() {
            var expression = new OperationExpression("or");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "and",
        value: function and() {
            var expression = new OperationExpression("and");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "where",
        value: function where() {
            var expression = new OperationExpression("where");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "greaterThan",
        value: function greaterThan() {
            var expression = new OperationExpression("greaterThan");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "lessThan",
        value: function lessThan() {
            var expression = new OperationExpression("lessThan");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "greaterThanOrEqualTo",
        value: function greaterThanOrEqualTo() {
            var expression = new OperationExpression("greaterThanOrEqualTo");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "lessThanOrEqualTo",
        value: function lessThanOrEqualTo() {
            var expression = new OperationExpression("lessThanOrEqualTo");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "orderBy",
        value: function orderBy() {
            var expression = new OperationExpression("orderBy");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "descending",
        value: function descending() {
            var expression = new OperationExpression("descending");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "ascending",
        value: function ascending() {
            var expression = new OperationExpression("ascending");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "skip",
        value: function skip(value) {
            var expression = new OperationExpression("skip");
            var valueExpression = Expression.constant(value);
            expression.children.push(valueExpression);

            return expression;
        }
    }, {
        key: "take",
        value: function take(value) {
            var expression = new OperationExpression("take");
            var valueExpression = Expression.constant(value);
            expression.children.push(valueExpression);

            return expression;
        }
    }, {
        key: "buildOperatorExpression",
        value: function buildOperatorExpression(name) {
            var expression = new OperationExpression(name);
            var args = Array.prototype.slice.call(arguments, 1);
            args.forEach(function (arg) {
                expression.children.push(arg);
            });

            return expression;
        }
    }, {
        key: "guid",
        value: function guid() {
            var expression = new OperationExpression("guid");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "substring",
        value: function substring() {
            var expression = new OperationExpression("substring");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "substringOf",
        value: function substringOf() {
            var expression = new OperationExpression("substringOf");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "startsWith",
        value: function startsWith() {
            var expression = new OperationExpression("startsWith");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "endsWith",
        value: function endsWith() {
            var expression = new OperationExpression("endsWith");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "isIn",
        value: function isIn(property, array) {
            var expression = new OperationExpression("isIn");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "isNotIn",
        value: function isNotIn(property, array) {
            var expression = new OperationExpression("isNotIn");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "include",
        value: function include() {
            var expression = new OperationExpression("include");
            Array.prototype.slice.call(arguments, 0).forEach(function (arg) {
                expression.children.push(arg);
            });
            return expression;
        }
    }, {
        key: "any",
        value: function any(propertyAccessExpression, expression) {
            var anyExpression = new OperationExpression("any");
            var expressionExpression = Expression.expression(expression);

            anyExpression.children.push(propertyAccessExpression, expressionExpression);
            return anyExpression;
        }
    }, {
        key: "all",
        value: function all(propertyAccessExpression, expression) {
            var allExpression = new OperationExpression("all");
            var expressionExpression = Expression.expression(expression);

            allExpression.children.push(propertyAccessExpression, expressionExpression);
            return allExpression;
        }
    }, {
        key: "expression",
        value: function expression(value) {
            var expresssionExpression = new ValueExpression("expression", value);

            return expresssionExpression;
        }
    }, {
        key: "propertyAccess",
        value: function propertyAccess(leftExpression, propertyName) {
            var propertyExpression = Expression.property(propertyName);
            var propertyAccessExpression = new OperationExpression("propertyAccess");
            propertyAccessExpression.children.push(leftExpression, propertyExpression);

            return propertyAccessExpression;
        }
    }, {
        key: "contains",
        value: function contains(type, namespace, expression) {
            var containsExpression = new OperationExpression("contains");
            var ofTypeExpression = new ValueExpression("ofType", type);
            var propertyExpression = new ValueExpression("property", namespace);

            containsExpression.children.push(ofTypeExpression, propertyExpression, expression);

            return containsExpression;
        }
    }, {
        key: "intersects",
        value: function intersects(type, namespace, expression) {
            var intersectsExpression = new OperationExpression("intersects");
            var ofTypeExpression = new ValueExpression("ofType", type);
            var propertyExpression = new ValueExpression("property", namespace);

            intersectsExpression.children.push(ofTypeExpression, propertyExpression, expression);

            return intersectsExpression;
        }
    }]);

    return Expression;
}();

var ValueExpression = function (_Expression) {
    _inherits(ValueExpression, _Expression);

    function ValueExpression(nodeName, value) {
        _classCallCheck(this, ValueExpression);

        var _this = _possibleConstructorReturn(this, (ValueExpression.__proto__ || Object.getPrototypeOf(ValueExpression)).call(this));

        _this.value = value;
        _this.nodeName = nodeName;
        return _this;
    }

    _createClass(ValueExpression, [{
        key: "copy",
        value: function copy() {
            return new ValueExpression(this.nodeName, this.value);
        }
    }, {
        key: "isEqualTo",
        value: function isEqualTo(node) {
            if (node && this.nodeName === node.nodeName && this.value === node.value) {
                return true;
            }
            return false;
        }
    }, {
        key: "contains",
        value: function contains(node) {
            return this.isEqualTo(node);
        }
    }]);

    return ValueExpression;
}(Expression);

var OperationExpression = function (_Expression2) {
    _inherits(OperationExpression, _Expression2);

    function OperationExpression(nodeName) {
        _classCallCheck(this, OperationExpression);

        var _this2 = _possibleConstructorReturn(this, (OperationExpression.__proto__ || Object.getPrototypeOf(OperationExpression)).call(this));

        var args = Array.prototype.slice.call(arguments, 0);

        _this2.nodeName = nodeName;
        _this2.children = args.slice(1);
        return _this2;
    }

    _createClass(OperationExpression, [{
        key: "copy",
        value: function copy() {
            var children = [];
            var copy = new OperationExpression(this.nodeName);

            this.children.forEach(function (expression) {
                copy.children.push(expression.copy());
            });

            return copy;
        }
    }, {
        key: "isEqualTo",
        value: function isEqualTo() {
            if (!Array.isArray(node.children) || this.nodeName !== node.nodeName) {
                return false;
            }

            if (node.children.length !== this.children.length) {
                return false;
            }

            return this.children.every(function (expression, index) {
                return expression.isEqualTo(node.children[index]);
            });
        }
    }, {
        key: "contains",
        value: function contains(node) {
            var _this3 = this;

            if (node.nodeName === this.nodeName && Array.isArray(node.children)) {
                var matched = node.children.every(function (childNode, index) {
                    return childNode.contains(_this3.children[index]);
                });

                if (matched) {
                    return true;
                }
            }

            return this.children.some(function (childNode) {
                return childNode.contains(node);
            });
        }
    }, {
        key: "getMatchingNodes",
        value: function getMatchingNodes(node, matchedNodes) {
            var _this4 = this;

            matchedNodes = Array.isArray(matchedNodes) ? matchedNodes : [];

            if (node.nodeName === this.nodeName && Array.isArray(node.children)) {
                var matched = node.children.every(function (childNode, index) {
                    return childNode.contains(_this4.children[index], matchedNodes);
                });

                if (matched) {
                    matchedNodes.push(this);
                }
            }

            this.children.forEach(function (childNode) {
                if (Array.isArray(childNode.children)) {
                    childNode.getMatchingNodes(node, matchedNodes);
                }
            }, matchedNodes);

            return matchedNodes;
        }
    }]);

    return OperationExpression;
}(Expression);

exports.Expression = Expression;
exports.ValueExpression = ValueExpression;
exports.OperationExpression = OperationExpression;
//# sourceMappingURL=Expression.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.OperationExpressionBuilder = exports.ExpressionBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var returnExpression = function returnExpression(expression) {
    return expression;
};

var OperationExpressionBuilder = function () {
    function OperationExpressionBuilder(getLeftExpression) {
        _classCallCheck(this, OperationExpressionBuilder);

        this.getLeftExpression = getLeftExpression || returnExpression;
    }

    _createClass(OperationExpressionBuilder, [{
        key: "any",
        value: function any(fn) {
            var expressionBuilder = new ExpressionBuilder();
            var expression = fn(expressionBuilder);
            return _Expression.Expression.any(this.getLeftExpression(), expression);
        }
    }, {
        key: "where",
        value: function where(fn) {
            var propertyAccessExpression = this.getLeftExpression();

            this.getLeftExpression = function () {
                var expressionBuilder = new ExpressionBuilder(Object);
                var expression = fn(expressionBuilder);

                return _Expression.Expression.queryable(propertyAccessExpression, _Expression.Expression.expression(_Expression.Expression.where(expression)));
            };

            return this;
        }
    }, {
        key: "all",
        value: function all(fn) {
            var expressionBuilder = new ExpressionBuilder();
            var expression = fn(expressionBuilder);
            return _Expression.Expression.all(this.getLeftExpression(), expression);
        }
    }, {
        key: "isEqualTo",
        value: function isEqualTo(value) {
            var constant = _Expression.Expression.getExpressionType(value);
            return _Expression.Expression.equalTo(this.getLeftExpression(), constant);
        }
    }, {
        key: "isNotEqualTo",
        value: function isNotEqualTo(value) {
            var constant = _Expression.Expression.getExpressionType(value);
            return _Expression.Expression.notEqualTo(this.getLeftExpression(), constant);
        }
    }, {
        key: "contains",
        value: function contains(value) {
            var constant = _Expression.Expression.getExpressionType(value);
            return _Expression.Expression.substringOf(this.getLeftExpression(), constant);
        }
    }, {
        key: "isIn",
        value: function isIn(array) {
            if (Array.isArray(array)) {
                return _Expression.Expression.isIn(this.getLeftExpression(), _Expression.Expression.array(array));
            } else {
                throw new Error("isIn is expecting to be passed an array!");
            }
        }
    }, {
        key: "isNotIn",
        value: function isNotIn(array) {
            if (Array.isArray(array)) {
                return _Expression.Expression.isNotIn(this.getLeftExpression(), _Expression.Expression.array(array));
            } else {
                throw new Error("isNotIn is expecting to be passed an array!");
            }
        }
    }, {
        key: "isGreaterThan",
        value: function isGreaterThan(value) {
            var constant = _Expression.Expression.getExpressionType(value);
            return _Expression.Expression.greaterThan(this.getLeftExpression(), constant);
        }
    }, {
        key: "isGreaterThanOrEqualTo",
        value: function isGreaterThanOrEqualTo(value) {
            var constant = _Expression.Expression.getExpressionType(value);
            return _Expression.Expression.greaterThanOrEqualTo(this.getLeftExpression(), constant);
        }
    }, {
        key: "isLessThanOrEqualTo",
        value: function isLessThanOrEqualTo(value) {
            var constant = _Expression.Expression.getExpressionType(value);
            return _Expression.Expression.lessThanOrEqualTo(this.getLeftExpression(), constant);
        }
    }, {
        key: "isLessThan",
        value: function isLessThan(value) {
            var constant = _Expression.Expression.getExpressionType(value);
            return _Expression.Expression.lessThan(this.getLeftExpression(), constant);
        }
    }, {
        key: "endsWith",
        value: function endsWith(value) {
            return _Expression.Expression.endsWith(this.getLeftExpression(), _Expression.Expression.string(value));
        }
    }, {
        key: "startsWith",
        value: function startsWith(value) {
            return _Expression.Expression.startsWith(this.getLeftExpression(), _Expression.Expression.string(value));
        }
    }, {
        key: "property",
        value: function property(value) {
            var _this = this;

            return new OperationExpressionBuilder(function () {
                return _Expression.Expression.propertyAccess(_this.getLeftExpression(), value);
            });
        }
    }, {
        key: "getExpression",
        value: function getExpression() {
            return this.getLeftExpression();
        }
    }]);

    return OperationExpressionBuilder;
}();

var ExpressionBuilder = function () {
    function ExpressionBuilder(type) {
        _classCallCheck(this, ExpressionBuilder);

        this.type = type || Object;
    }

    _createClass(ExpressionBuilder, [{
        key: "property",
        value: function property(_property) {
            var _this2 = this;

            return new OperationExpressionBuilder(function () {
                return _Expression.Expression.propertyAccess(_Expression.Expression.type(_this2.type), _property);
            });
        }
    }, {
        key: "and",
        value: function and() {
            return _Expression.Expression.and.apply(_Expression.Expression, arguments);
        }
    }, {
        key: "or",
        value: function or() {
            return _Expression.Expression.or.apply(_Expression.Expression, arguments);
        }
    }, {
        key: "value",
        value: function value() {
            var _this3 = this;

            return new OperationExpressionBuilder(function () {
                return _Expression.Expression.type(_this3.type);
            });
        }
    }]);

    return ExpressionBuilder;
}();

exports.ExpressionBuilder = ExpressionBuilder;
exports.OperationExpressionBuilder = OperationExpressionBuilder;
//# sourceMappingURL=ExpressionBuilder.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpressionVisitor = exports.ExpressionBuilder = exports.Expression = exports.Queryable = undefined;

var _Queryable = __webpack_require__(3);

var _Queryable2 = _interopRequireDefault(_Queryable);

var _Expression = __webpack_require__(0);

var _Expression2 = _interopRequireDefault(_Expression);

var _ExpressionBuilder = __webpack_require__(1);

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

var _ExpressionVisitor = __webpack_require__(4);

var _ExpressionVisitor2 = _interopRequireDefault(_ExpressionVisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Queryable = _Queryable2.default;
exports.Expression = _Expression2.default;
exports.ExpressionBuilder = _ExpressionBuilder2.default;
exports.ExpressionVisitor = _ExpressionVisitor2.default;
//# sourceMappingURL=index.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression = __webpack_require__(0);

var _ExpressionBuilder = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var assertHasProvider = function assertHasProvider(queryable) {
    if (!queryable.provider) {
        throw new Error("No provider found.");
    }
};

var copyQuery = function copyQuery(query) {
    var copy = {};

    copy.where = query.where.copy();
    copy.orderBy = query.orderBy.copy();
    copy.include = query.include.copy();
    copy.parameters = JSON.parse(JSON.stringify(query.parameters));
    copy.take = query.take;
    copy.skip = query.skip;

    return copy;
};

var Queryable = function () {
    function Queryable(type, query) {
        _classCallCheck(this, Queryable);

        query = query || {};

        this.type = type || "Object";
        this.provider = null;
        this.query = {};
        this.query.parameters = query && query.parameters || {};

        if (query.where != null && query.where.nodeName === "where") {
            this.query.where = query.where;
        } else {
            this.query.where = _Expression.Expression.where();
        }

        if (query.skip != null && query.skip.nodeName === "skip") {
            this.query.skip = query.skip;
        } else {
            this.query.skip = _Expression.Expression.skip(0);
        }

        if (query.take != null && query.take.nodeName === "take") {
            this.query.take = query.take;
        } else {
            this.query.take = _Expression.Expression.take(Infinity);
        }

        if (query.include != null && query.include.nodeName === "include") {
            this.query.include = query.include;
        } else {
            this.query.include = _Expression.Expression.include();
        }

        if (query.orderBy != null && query.orderBy.nodeName === "orderBy") {
            this.query.orderBy = query.orderBy;
        } else {
            this.query.orderBy = _Expression.Expression.orderBy();
        }
    }

    _createClass(Queryable, [{
        key: "getExpression",
        value: function getExpression() {
            return this.query;
        }
    }, {
        key: "getQuery",
        value: function getQuery() {
            return this.query;
        }
    }, {
        key: "or",
        value: function or(lambda) {
            var rightExpression;
            var query = copyQuery(this.getQuery());

            if (typeof lambda === "function") {
                lambda = lambda || function () {};
                rightExpression = lambda.call(_ExpressionBuilder.ExpressionBuilder, new _ExpressionBuilder.ExpressionBuilder(this.type));
            } else if (lambda instanceof _Expression.Expression) {
                rightExpression = lambda;
            } else {
                throw new Error("Expected an expression to be supplied.");
            }

            if (query.where.children.length === 0) {
                query.where.children.push(rightExpression);
            } else {
                var leftExpression = query.where.children.pop();
                query.where.children.push(_Expression.Expression.or(leftExpression, rightExpression));
            }

            return this.copy(query);
        }
    }, {
        key: "where",
        value: function where(lambda) {
            var rightExpression;
            var query = copyQuery(this.getQuery());

            if (typeof lambda === "function") {
                lambda = lambda || function () {};
                rightExpression = lambda.call(_ExpressionBuilder.ExpressionBuilder, new _ExpressionBuilder.ExpressionBuilder(this.type));
            } else if (lambda instanceof _Expression.Expression) {
                rightExpression = lambda;
            } else {
                throw new Error("Expected an expression to be supplied.");
            }

            if (query.where.children.length === 0) {
                query.where.children.push(rightExpression);
            } else {
                var leftExpression = query.where.children.pop();
                query.where.children.push(_Expression.Expression.and(leftExpression, rightExpression));
            }

            return this.copy(query);
        }
    }, {
        key: "and",
        value: function and(lambda) {
            return this.where(lambda);
        }
    }, {
        key: "take",
        value: function take(value) {
            if (typeof value !== "number") {
                throw new Error("Illegal Argument Exception: value needs to be a number.");
            }

            var query = copyQuery(this.getQuery());
            query.take = _Expression.Expression.take(value);

            return this.copy(query);
        }
    }, {
        key: "skip",
        value: function skip(value) {
            if (typeof value !== "number") {
                throw new Error("Illegal Argument Exception: value needs to be a number.");
            }

            var query = copyQuery(this.getQuery());
            query.skip = _Expression.Expression.skip(value);

            return this.copy(query);
        }
    }, {
        key: "orderByDesc",
        value: function orderByDesc(lambda) {
            var propertyExpression;
            var query = copyQuery(this.getQuery());

            if (typeof lambda === "function") {
                lambda = lambda || function () {};
                propertyExpression = lambda.call(_ExpressionBuilder.ExpressionBuilder, new _ExpressionBuilder.ExpressionBuilder(this.type)).getExpression();
            } else if (lambda instanceof _ExpressionBuilder.OperationExpressionBuilder) {
                propertyExpression = lambda.getExpression();
            } else {
                throw new Error("Expected a property to orderByDesc.");
            }

            var descendingExpression = _Expression.Expression.descending(propertyExpression);

            if (!query.orderBy.contains(propertyExpression)) {
                query.orderBy.children.push(descendingExpression);
                return this.copy(query);
            } else {
                return this;
            }
        }
    }, {
        key: "orderBy",
        value: function orderBy(lambda) {
            var propertyExpression;
            var query = copyQuery(this.getQuery());

            if (typeof lambda === "function") {
                lambda = lambda || function () {};
                propertyExpression = lambda.call(_ExpressionBuilder.ExpressionBuilder, new _ExpressionBuilder.ExpressionBuilder(this.type)).getExpression();
            } else if (lambda instanceof _ExpressionBuilder.OperationExpressionBuilder) {
                propertyExpression = lambda.getExpression();
            } else {
                throw new Error("Expected a property to orderBy.");
            }

            var ascendingExpression = _Expression.Expression.ascending(propertyExpression);

            if (!query.orderBy.contains(propertyExpression)) {
                query.orderBy.children.push(ascendingExpression);
                return this.copy(query);
            } else {
                return this;
            }
        }
    }, {
        key: "setParameters",
        value: function setParameters(params) {
            if (!params) {
                throw new Error("Expected parameters to be passed in.");
            }
            var parameters = this.query.parameters;

            Object.keys(params).forEach(function (key) {
                parameters[key] = params[key];
            });
            return this;
        }
    }, {
        key: "withParameters",
        value: function withParameters(params) {
            if (!params) {
                throw new Error("Expected parameters to be passed in.");
            }

            var parameters = this.query.parameters = {};
            Object.keys(params).forEach(function (key) {
                parameters[key] = params[key];
            });
            return this;
        }
    }, {
        key: "include",
        value: function include(lambda) {
            var propertyExpression;
            var query = copyQuery(this.getQuery());

            if (typeof lambda === "function") {
                lambda = lambda || function () {};
                propertyExpression = lambda.call(_ExpressionBuilder.ExpressionBuilder, new _ExpressionBuilder.ExpressionBuilder(this.type)).getExpression();
            } else if (lambda instanceof _ExpressionBuilder.OperationExpressionBuilder) {
                propertyExpression = lambda.getExpression();
            } else {
                throw new Error("Expected a property to include.");
            }

            if (propertyExpression.nodeName !== "queryable") {
                propertyExpression = _Expression.Expression.queryable(propertyExpression, _Expression.Expression.expression(_Expression.Expression.where()));
            }

            query.include.children.push(propertyExpression);
            return this.copy(query);
        }
    }, {
        key: "merge",
        value: function merge(queryable) {
            if (!(queryable instanceof Queryable)) {
                throw new Error("Expected a queryable to be passed in.");
            }

            var clone = this.copy();
            var cloneQuery = clone.getQuery();
            var query = queryable.getQuery();
            var rightExpression = query.where.children[0];

            if (rightExpression != null) {
                // No need to copy if there is nothing to copy.
                if (cloneQuery.where.children.length === 0) {
                    cloneQuery.where.children.push(rightExpression.copy());
                } else if (cloneQuery.where.children.length === 1 && cloneQuery.where.children[0].nodeName === "and") {
                    cloneQuery.where.children[0].children.push(rightExpression.copy());
                } else {
                    var leftExpression = cloneQuery.where.children.pop();
                    cloneQuery.where.children.push(_Expression.Expression.and(leftExpression, rightExpression.copy()));
                }
            }

            query.include.children.forEach(function (expression) {
                cloneQuery.include.children.push(expression.copy());
            });

            query.orderBy.children.forEach(function (expression) {
                if (!cloneQuery.orderBy.contains(expression)) {
                    cloneQuery.orderBy.children.push(expression.copy());
                }
            });

            return this.copy(cloneQuery);
        }
    }, {
        key: "toArrayAsync",
        value: function toArrayAsync() {
            assertHasProvider(this);
            return this.provider.toArrayAsync(this);
        }
    }, {
        key: "countAsync",
        value: function countAsync() {
            assertHasProvider(this);
            return this.provider.countAsync(this);
        }
    }, {
        key: "toArrayWithCountAsync",
        value: function toArrayWithCountAsync() {
            assertHasProvider(this);
            return this.provider.toArrayWithCountAsync(this);
        }
    }, {
        key: "ofType",
        value: function ofType(type) {
            var queryable = new Queryable(type);
            queryable.provider = this.provider;
            return queryable;
        }
    }, {
        key: "copy",
        value: function copy(query) {
            var queryable = new Queryable(this.type, query || copyQuery(this.query));
            queryable.provider = this.provider;
            return queryable;
        }
    }]);

    return Queryable;
}();

exports.default = Queryable;
//# sourceMappingURL=Queryable.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressionVisitor = function () {
    function ExpressionVisitor() {
        _classCallCheck(this, ExpressionVisitor);
    }

    _createClass(ExpressionVisitor, [{
        key: "parse",
        value: function parse(expression) {
            var _this = this;

            var children = [];

            if (!expression) {
                return null;
            }

            expression.children.forEach(function (expression) {
                if (!expression.children) {
                    children.push(expression);
                } else {
                    children.push(_this.parse(expression));
                }
            });

            var func = this[expression.nodeName];

            if (!func) {
                throw new Error("The builder doesn't support the \"" + expression.nodeName + "\" expression.");
            }

            children.forEach(function (child, index) {
                if (child instanceof _Expression.Expression) {
                    var func = _this[child.nodeName];
                    if (!func) {
                        throw new Error("The builder doesn't support the \"" + child.nodeName + "\" expression.");
                    }
                    children[index] = func.call(_this, child);
                }
            });

            return func.apply(this, children);
        }
    }]);

    return ExpressionVisitor;
}();

exports.default = ExpressionVisitor;
//# sourceMappingURL=ExpressionVisitor.js.map

/***/ })
/******/ ]);
});