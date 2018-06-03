(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
    function Expression(type) {
        _classCallCheck(this, Expression);

        this.type = type;
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

        var _this = _possibleConstructorReturn(this, (OperationExpression.__proto__ || Object.getPrototypeOf(OperationExpression)).call(this, "operation"));

        _this.nodeName = nodeName;
        _this.children = [];
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
                } else if (childNode.nodeName === node.nodeName) {
                    matchedNodes.push(childNode);
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

        var _this = _possibleConstructorReturn(this, (ValueExpression.__proto__ || Object.getPrototypeOf(ValueExpression)).call(this, "value"));

        _this.value = value;
        _this.nodeName = nodeName;
        return _this;
    }

    _createClass(ValueExpression, [{
        key: "_cloneObject",
        value: function _cloneObject(obj) {
            var _this2 = this;

            var clone = void 0;

            if (obj instanceof Date) {
                return new Date(obj);
            } else if (this._isObject(obj)) {
                clone = {};
            } else if (Array.isArray(obj)) {
                clone = [];
            } else {
                return obj;
            }

            Object.keys(obj).forEach(function (key) {
                clone[key] = _this2._cloneObject(obj[key]);
            });

            return clone;
        }
    }, {
        key: "copy",
        value: function copy() {
            var value = this._cloneObject(this.value);

            return new ValueExpression(this.nodeName, value);
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
        key: "_isObject",
        value: function _isObject(obj) {
            return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj != null && !Array.isArray(obj);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OperationExpressionBuilder = __webpack_require__(5);

var _OperationExpressionBuilder2 = _interopRequireDefault(_OperationExpressionBuilder);

var _OperationExpression = __webpack_require__(1);

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
            andExpression.children = Array.from(arguments).map(function (whereExpression) {
                return whereExpression.children[0];
            });

            return andExpression;
        }
    }, {
        key: "or",
        value: function or() {
            var orExpression = new _OperationExpression2.default("or");
            orExpression.children = Array.from(arguments).map(function (whereExpression) {
                return whereExpression.children[0];
            });

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression = __webpack_require__(0);

var _Expression2 = _interopRequireDefault(_Expression);

var _ExpressionBuilder = __webpack_require__(3);

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

var _OperationExpression = __webpack_require__(1);

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _OperationExpressionBuilder = __webpack_require__(5);

var _OperationExpressionBuilder2 = _interopRequireDefault(_OperationExpressionBuilder);

var _ValueExpression = __webpack_require__(2);

var _ValueExpression2 = _interopRequireDefault(_ValueExpression);

var _QueryConverter = __webpack_require__(6);

var _QueryConverter2 = _interopRequireDefault(_QueryConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var queryConverter = new _QueryConverter2.default();

var Queryable = function () {
    function Queryable(type) {
        var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Queryable);

        this.type = type || "Object";
        this.provider = null;
        this.query = query;
        this._applyQuery(query);
    }

    _createClass(Queryable, [{
        key: "_applyQuery",
        value: function _applyQuery(query) {
            var _this = this;

            if (query.where != null && query.where.nodeName === "where") {
                this.query.where = query.where;
            } else {
                this.query.where = new _OperationExpression2.default("where");
            }

            if (typeof query.skip === "number") {
                this.query.skip = query.skip;
            } else {
                this.query.skip = 0;
            }

            if (typeof query.take === "number") {
                this.query.take = query.take;
            } else {
                this.query.take = Infinity;
            }

            if (Array.isArray(query.orderBy)) {
                this.query.orderBy = query.orderBy.filter(function (orderBy) {
                    return _this._isValidOrderBy(orderBy);
                });
            } else {
                this.query.orderBy = [];
            }

            if (this._isValidMapping(this.query.select)) {
                this.query.select = query.select;
            } else {
                this.query.select = {};
            }

            this.query.type = this.type;
        }
    }, {
        key: "_assertHasProvider",
        value: function _assertHasProvider() {
            if (!this.provider) {
                throw new Error("No provider found.");
            }
        }

        // _cloneObject(object){
        //     return JSON.parse(JSON.stringify(object));
        // }

    }, {
        key: "_cloneObject",
        value: function _cloneObject(obj) {
            var _this2 = this;

            var clone = void 0;

            if (obj instanceof Date) {
                return new Date(obj);
            } else if (this._isObject(obj)) {
                clone = {};
            } else if (Array.isArray(obj)) {
                clone = [];
            } else {
                return obj;
            }

            Object.keys(obj).forEach(function (key) {
                clone[key] = _this2._cloneObject(obj[key]);
            });

            return clone;
        }
    }, {
        key: "_copyQuery",
        value: function _copyQuery(query) {
            var copy = {};

            copy.where = query.where.copy();
            copy.orderBy = this._cloneObject(query.orderBy);
            copy.select = this._cloneObject(query.select);
            copy.take = query.take;
            copy.skip = query.skip;
            copy.type = query.type;

            return copy;
        }
    }, {
        key: "_createQueryableFromLambda",
        value: function _createQueryableFromLambda(type) {
            var lambda = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

            var query = this._copyQuery(this.getQuery());
            var whereExpression = void 0;

            if (typeof lambda === "function") {
                whereExpression = lambda(new _ExpressionBuilder2.default(this.type));
            } else if (lambda instanceof _Expression2.default) {
                whereExpression = lambda;
            } else {
                throw new Error("Invalid Argument: Expected an expression, or function.");
            }

            if (!(whereExpression instanceof _Expression2.default)) {
                throw new Error("Invalid expression: You may be missing a return.");
            }

            if (whereExpression.nodeName !== "where") {
                var wrapper = new _OperationExpression2.default("where");
                wrapper.children.push(whereExpression);
                whereExpression = wrapper;
            }

            if (query.where.children.length === 0) {
                query.where = whereExpression;
            } else {

                var rightExpression = whereExpression.children[0];
                var leftExpression = query.where.children.pop();
                var expression = new _OperationExpression2.default(type);

                expression.children.push(leftExpression, rightExpression);

                query.where.children.push(expression);
            }

            return this.copy(query);
        }
    }, {
        key: "_isObject",
        value: function _isObject(obj) {
            return (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj != null && !Array.isArray(obj);
        }
    }, {
        key: "_isValidMapping",
        value: function _isValidMapping(mapping) {
            if (mapping == null) {
                return false;
            }

            return Object.keys(mapping).every(function (key) {
                return typeof key === "string" && typeof mapping[key] === "string";
            });
        }
    }, {
        key: "_isValidOrderBy",
        value: function _isValidOrderBy(orderBy) {
            var keys = Object.keys(orderBy);

            if (keys.length !== 2) {
                return false;
            }

            if (orderBy.type !== "ASC" && orderBy.type !== "DESC") {
                return false;
            }

            if (typeof orderBy.column !== "string") {
                return false;
            }

            return true;
        }
    }, {
        key: "_validatePropertyName",
        value: function _validatePropertyName(name) {
            return typeof name === "string" && name.length > 0 && isNaN(parseInt(name.charAt(0), 10));
        }
    }, {
        key: "_selectArray",
        value: function _selectArray(properties) {
            var _this3 = this;

            var hasValidMapping = properties.every(function (property) {
                return _this3._validatePropertyName(property);
            });

            if (!hasValidMapping) {
                throw new Error("Invalid mapping: The mappings need to be a string that is at least one character long and doesn't start with a number.");
            }

            var query = this._copyQuery(this.getQuery());
            var existingMapping = query.select;

            properties.forEach(function (property) {
                existingMapping[property] = property;
            });

            return this.copy(query);
        }
    }, {
        key: "_selectObject",
        value: function _selectObject(mapping) {
            var _this4 = this;

            var mappingKeys = Object.keys(mapping);
            var hasValidMapping = mappingKeys.every(function (key) {
                return _this4._validatePropertyName(key) && _this4._validatePropertyName(mapping[key]);
            });

            if (!hasValidMapping) {
                throw new Error("Invalid mapping: The mappings need to be a string that is at least one character long and doesn't start with a number.");
            }

            var query = this._copyQuery(this.getQuery());
            var existingMapping = query.select;

            mappingKeys.forEach(function (key) {
                existingMapping[key] = mapping[key];
            });

            return this.copy(query);
        }
    }, {
        key: "and",
        value: function and(lambda) {
            return this._createQueryableFromLambda("and", lambda);
        }
    }, {
        key: "copy",
        value: function copy(query) {
            var queryable = new Queryable(this.type, query || this._copyQuery(this.query));
            queryable.provider = this.provider;
            return queryable;
        }
    }, {
        key: "countAsync",
        value: function countAsync() {
            this._assertHasProvider(this);
            return this.provider.countAsync(this);
        }
    }, {
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
        key: "merge",
        value: function merge(queryable) {
            var _this5 = this;

            if (!(queryable instanceof Queryable)) {
                throw new Error("Expected a queryable to be passed in.");
            }

            var cloneQuery = this._copyQuery(this.getQuery());
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
                    var andExpression = new _OperationExpression2.default("and");

                    andExpression.children.push(leftExpression, rightExpression.copy());

                    cloneQuery.where.children.push(andExpression);
                }
            }

            Object.keys(query.select).forEach(function (key) {
                cloneQuery.select[key] = _this5._cloneObject(query.select[key]);
            });

            query.orderBy.forEach(function (orderBy) {
                var index = cloneQuery.orderBy.findIndex(function (cloneOrderBy) {
                    return cloneOrderBy.column === orderBy.column;
                });

                if (index === -1) {
                    cloneQuery.orderBy.push(_this5._cloneObject(orderBy));
                }
            });

            cloneQuery.type = query.type;
            cloneQuery.take = query.take;
            cloneQuery.skip = query.skip;

            return this.copy(cloneQuery);
        }
    }, {
        key: "or",
        value: function or(lambda) {
            return this._createQueryableFromLambda("or", lambda);
        }
    }, {
        key: "orderBy",
        value: function orderBy(property) {
            if (typeof property !== "string") {
                throw new Error("Illegal Argument: property needs to be of type string.");
            }

            var query = this._copyQuery(this.getQuery());

            var index = query.orderBy.findIndex(function (orderBy) {
                return orderBy.column === property;
            });

            if (index === -1) {
                query.orderBy.push({
                    type: "ASC",
                    column: property
                });
            }

            return this.copy(query);
        }
    }, {
        key: "orderByDesc",
        value: function orderByDesc(property) {
            if (typeof property !== "string") {
                throw new Error("Illegal Argument: property needs to be of type string.");
            }

            var query = this._copyQuery(this.getQuery());

            var index = query.orderBy.findIndex(function (orderBy) {
                return orderBy.column === property;
            });

            if (index === -1) {
                query.orderBy.push({
                    type: "DESC",
                    column: property
                });
            }

            return this.copy(query);
        }
    }, {
        key: "select",
        value: function select(mapping) {
            if (Array.isArray(mapping)) {
                return this._selectArray(mapping);
            } else {
                return this._selectObject(mapping);
            }
        }
    }, {
        key: "skip",
        value: function skip(value) {
            if (typeof value !== "number") {
                throw new Error("Illegal Argument: skip needs to be a number.");
            }

            var query = this._copyQuery(this.getQuery());
            query.skip = value;

            return this.copy(query);
        }
    }, {
        key: "take",
        value: function take(value) {
            if (typeof value !== "number") {
                throw new Error("Illegal Argument: take needs to be a number.");
            }

            var query = this._copyQuery(this.getQuery());
            query.take = value;

            return this.copy(query);
        }
    }, {
        key: "toArrayAsync",
        value: function toArrayAsync() {
            this._assertHasProvider(this);
            return this.provider.toArrayAsync(this);
        }
    }, {
        key: "toArrayWithCountAsync",
        value: function toArrayWithCountAsync() {
            this._assertHasProvider(this);
            return this.provider.toArrayWithCountAsync(this);
        }
    }, {
        key: "toJson",
        value: function toJson() {
            return JSON.stringify(this.getQuery());
        }
    }, {
        key: "where",
        value: function where(lambda) {
            return this._createQueryableFromLambda("and", lambda);
        }
    }], [{
        key: "fromJson",
        value: function fromJson(jsonQuery) {
            var query = queryConverter.convert(jsonQuery);
            return new Queryable(query.type, query);
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

var _ValueExpression = __webpack_require__(2);

var _ValueExpression2 = _interopRequireDefault(_ValueExpression);

var _OperationExpression = __webpack_require__(1);

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _Expression = __webpack_require__(0);

var _Expression2 = _interopRequireDefault(_Expression);

var _ExpressionBuilder = __webpack_require__(3);

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

var _Queryable = __webpack_require__(4);

var _Queryable2 = _interopRequireDefault(_Queryable);

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
        key: "_createResultsOperationExpression",
        value: function _createResultsOperationExpression(type, results) {
            var propertyAccessExpression = this._createPropertyAccessExpression();

            if (Array.isArray(results)) {
                var constant = this._getConstant(results);
                var operationExpression = new _OperationExpression2.default(type);
                operationExpression.children.push(propertyAccessExpression, constant);

                this.currentExpression.children.push(operationExpression);
                return this.rootExpression;
            } else if (results instanceof _Queryable2.default) {
                var _operationExpression = new _OperationExpression2.default(type);
                var queryableExpression = new _ValueExpression2.default("queryable", results.getQuery());

                _operationExpression.children.push(propertyAccessExpression, queryableExpression);

                this.currentExpression.children.push(_operationExpression);
                return this.rootExpression;
            } else {
                throw new Error("Invalid Argument: Expected an array or a queryable.");
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
            return this._createResultsOperationExpression("isIn", array);
        }
    }, {
        key: "isNotIn",
        value: function isNotIn(array) {
            return this._createResultsOperationExpression("isNotIn", array);
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OperationExpression = __webpack_require__(1);

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _ValueExpression = __webpack_require__(2);

var _ValueExpression2 = _interopRequireDefault(_ValueExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QueryBuilder = function () {
    function QueryBuilder() {
        _classCallCheck(this, QueryBuilder);
    }

    _createClass(QueryBuilder, [{
        key: "_convertNode",
        value: function _convertNode(node) {
            var _this = this;

            if (node == null) {
                return node;
            }

            if (node.type === "value") {

                if (node.nodeName === "queryable") {
                    node.value.where = this._convertNode(node.value.where);
                    return new _ValueExpression2.default(node.nodeName, node.value);
                } else {
                    return new _ValueExpression2.default(node.nodeName, node.value);
                }
            } else if (node.type === "operation") {
                var operationExpression = new _OperationExpression2.default(node.nodeName);

                if (!Array.isArray(node.children)) {
                    throw new Error("Invalid Operation Node. It didn't contain a children property of type array.");
                }

                node.children.forEach(function (childNode) {
                    var expression = _this._convertNode(childNode);
                    operationExpression.children.push(expression);
                });

                return operationExpression;
            } else if (node.type == null) {
                return node;
            }
        }
    }, {
        key: "convertJson",
        value: function convertJson(json) {
            var object = JSON.parse(json);
            return this.convertObject(object);
        }
    }, {
        key: "convertObject",
        value: function convertObject(object) {
            var _this2 = this;

            return Object.keys(object).reduce(function (query, key) {
                query[key] = _this2._convertNode(object[key]);
                return query;
            }, {});
        }
    }, {
        key: "convert",
        value: function convert(json) {
            return this.convertJson(json);
        }
    }]);

    return QueryBuilder;
}();

exports.default = QueryBuilder;
//# sourceMappingURL=QueryConverter.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QueryConverter = exports.OperationExpression = exports.ValueExpression = exports.ExpressionVisitor = exports.ExpressionBuilder = exports.Expression = exports.Queryable = undefined;

var _Queryable = __webpack_require__(4);

var _Queryable2 = _interopRequireDefault(_Queryable);

var _Expression = __webpack_require__(0);

var _Expression2 = _interopRequireDefault(_Expression);

var _ExpressionBuilder = __webpack_require__(3);

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

var _ExpressionVisitor = __webpack_require__(8);

var _ExpressionVisitor2 = _interopRequireDefault(_ExpressionVisitor);

var _ValueExpression = __webpack_require__(2);

var _ValueExpression2 = _interopRequireDefault(_ValueExpression);

var _OperationExpression = __webpack_require__(1);

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _QueryConverter = __webpack_require__(6);

var _QueryConverter2 = _interopRequireDefault(_QueryConverter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Queryable = _Queryable2.default;
exports.Expression = _Expression2.default;
exports.ExpressionBuilder = _ExpressionBuilder2.default;
exports.ExpressionVisitor = _ExpressionVisitor2.default;
exports.ValueExpression = _ValueExpression2.default;
exports.OperationExpression = _OperationExpression2.default;
exports.QueryConverter = _QueryConverter2.default;
//# sourceMappingURL=index.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression = __webpack_require__(0);

var _Expression2 = _interopRequireDefault(_Expression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

            if (expression == null) {
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
                if (child instanceof _Expression2.default) {
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