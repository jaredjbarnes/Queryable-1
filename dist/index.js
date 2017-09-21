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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
    }]);

    return Expression;
}();

exports.default = Expression;
//# sourceMappingURL=Expression.js.map

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OperationExpressionBuilder = __webpack_require__(5);

var _OperationExpressionBuilder2 = _interopRequireDefault(_OperationExpressionBuilder);

var _OperationExpression = __webpack_require__(2);

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpressionBuilder = function () {
    function ExpressionBuilder(type) {
        _classCallCheck(this, ExpressionBuilder);

        this.type = type || "Object";
    }

    _createClass(ExpressionBuilder, [{
        key: "property",
        value: function property(_property) {
            var whereExpression = new _OperationExpression2.default("where");
            return new _OperationExpressionBuilder2.default(this.type, _property, whereExpression);
        }
    }, {
        key: "and",
        value: function and() {
            var andExpression = new _OperationExpression2.default("and");
            andExpression.children = Array.from(arguments);

            return andExpression;
        }
    }, {
        key: "or",
        value: function or() {
            var orExpression = new _OperationExpression2.default("or");
            orExpression.children = Array.from(arguments);

            return orExpression;
        }
    }, {
        key: "value",
        value: function value() {
            var whereExpression = new _OperationExpression2.default("where");
            return new _OperationExpressionBuilder2.default(this.type, null, whereExpression);
        }
    }]);

    return ExpressionBuilder;
}();

exports.default = ExpressionBuilder;
//# sourceMappingURL=ExpressionBuilder.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression2 = __webpack_require__(0);

var _Expression3 = _interopRequireDefault(_Expression2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OperationExpression = function (_Expression) {
    _inherits(OperationExpression, _Expression);

    function OperationExpression(nodeName) {
        _classCallCheck(this, OperationExpression);

        var _this = _possibleConstructorReturn(this, (OperationExpression.__proto__ || Object.getPrototypeOf(OperationExpression)).call(this));

        _this.nodeName = nodeName;
        return _this;
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
            var _this2 = this;

            if (node.nodeName === this.nodeName && Array.isArray(node.children)) {
                var matched = node.children.every(function (childNode, index) {
                    return childNode.contains(_this2.children[index]);
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
            var _this3 = this;

            matchedNodes = Array.isArray(matchedNodes) ? matchedNodes : [];

            if (node.nodeName === this.nodeName && Array.isArray(node.children)) {
                var matched = node.children.every(function (childNode, index) {
                    return childNode.contains(_this3.children[index], matchedNodes);
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
}(_Expression3.default);

exports.default = OperationExpression;
//# sourceMappingURL=OperationExpression.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExpressionVisitor = exports.ExpressionBuilder = exports.Expression = exports.Queryable = undefined;

var _Queryable = __webpack_require__(4);

var _Queryable2 = _interopRequireDefault(_Queryable);

var _Expression = __webpack_require__(0);

var _Expression2 = _interopRequireDefault(_Expression);

var _ExpressionBuilder = __webpack_require__(1);

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

var _ExpressionVisitor = __webpack_require__(7);

var _ExpressionVisitor2 = _interopRequireDefault(_ExpressionVisitor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Queryable = _Queryable2.default;
exports.Expression = _Expression2.default;
exports.ExpressionBuilder = _ExpressionBuilder2.default;
exports.ExpressionVisitor = _ExpressionVisitor2.default;
//# sourceMappingURL=index.js.map

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ValueExpression = __webpack_require__(6);

var _ValueExpression2 = _interopRequireDefault(_ValueExpression);

var _OperationExpression = __webpack_require__(2);

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OperationExpressionBuilder = function () {
    function OperationExpressionBuilder(type, property, rootExpression, currentExpression) {
        _classCallCheck(this, OperationExpressionBuilder);

        this.type = type;
        this.propertyName = property;
        this.rootExpression = rootExpression;
        this.currentExpression = currentExpression || rootExpression;
    }

    _createClass(OperationExpressionBuilder, [{
        key: "_createArrayOperationExpression",
        value: function _createArrayOperationExpression(type, array) {
            var propertyAccessExpression = new _OperationExpression2.default("propertyAccess");
            propertyAccessExpression.children.push(new _ValueExpression2.default("type", this.type), new _ValueExpression2.default("property", this.propertyName));

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

            var propertyAccessExpression = new _OperationExpression2.default("propertyAccess");
            propertyAccessExpression.children.push(new _ValueExpression2.default("type", this.type), new _ValueExpression2.default("property", this.propertyName));

            var expressionBuilder = new ExpressionBuilder();
            var expression = lambda(expressionBuilder);

            var lambdaExpression = new _OperationExpression2.default(type);
            lambdaExpression.children.push(propertyAccessExpression, expression);

            this.currentExpression.children.push(lambdaExpression);

            return this.rootExpression;
        }
    }, {
        key: "_createOperationExpression",
        value: function _createOperationExpression(type, value) {
            var propertyAccessExpression = new _OperationExpression2.default("propertyAccess");
            propertyAccessExpression.children.push(new _ValueExpression2.default("type", this.type), new _ValueExpression2.default("property", this.propertyName));

            var constant = this._getConstant(value);
            var expression = new _OperationExpression2.default(type);
            expression.children.push(propertyAccessExpression, constant);

            this.currentExpression.children.push(expression);

            return this.rootExpression;
        }
    }, {
        key: "_getConstant",
        value: function _getConstant(value) {
            if (value instanceof Expression) {
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
        value: function (_property) {
            function property(_x) {
                return _property.apply(this, arguments);
            }

            property.toString = function () {
                return _property.toString();
            };

            return property;
        }(function (value) {
            var propertyNavigation = Expression.propertyNavigation(this.type, this.propertyName);
            this.currentExpression.push(propertyNavigation);
            return new PropertyNavigationExpressionBuilder(this.type, property, this.rootExpression, propertyNavigation);
        })
    }, {
        key: "getExpression",
        value: function getExpression() {
            var propertyAccess = Expression.propertyAccess(Expression.type(this.type), this.propertyName);
            this.currentExpression.children.push(propertyAccess);

            return this.rootExpression;
        }
    }]);

    return OperationExpressionBuilder;
}();

exports.default = OperationExpressionBuilder;
//# sourceMappingURL=OperationExpressionBuilder.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression2 = __webpack_require__(0);

var _Expression3 = _interopRequireDefault(_Expression2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
}(_Expression3.default);

exports.default = ValueExpression;
//# sourceMappingURL=ValueExpression.js.map

/***/ }),
/* 7 */
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