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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Expression; });
/* unused harmony export ValueExpression */
/* unused harmony export OperationExpression */
class Expression {
    constructor() {
        this.nodeName = "expression";
    }

    copy() {
        throw new Error("Meant to be overriden");
    }

    isEqualTo() {
        throw new Error("Meant to be overriden");
    }

    static getExpressionType(value) {
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

    static property(value) {
        return new ValueExpression("property", value);
    }

    static constant(value) {
        return new ValueExpression("constant", value);
    }

    static boolean(value) {
        var expression = new ValueExpression("boolean");
        expression.value = value;
        return expression;
    }

    static string(value) {
        var expression = new ValueExpression("string");
        expression.value = value;
        return expression;
    }

    static number(value) {
        var expression = new ValueExpression("number");
        expression.value = value;
        return expression;
    }

    static object(value) {
        var expression = new ValueExpression("object");
        expression.value = value;
        return expression;
    }

    static date(value) {
        var expression = new ValueExpression("date");
        expression.value = value;
        return expression;
    }

    static function(value) {
        var expression = new ValueExpression("function");
        expression.value = value;
        return expression;
    }

    static type(value) {
        var expression = new ValueExpression("type");
        expression.value = value || Object;
        return expression;
    }

    static null(value) {
        var expression = new ValueExpression("null");
        expression.value = value;
        return expression;
    }

    static undefined(value) {
        var expression = new ValueExpression("undefined");
        expression.value = value;
        return expression;
    }

    static array(value) {
        var expression = new ValueExpression("array");
        expression.value = value;
        return expression;
    }

    static queryable(leftExpression, rightExpression) {
        var expression = new OperationExpression("queryable");
        expression.children.push(leftExpression, rightExpression);
        return expression;
    }

    //
    // OperationExpression helpers
    //

    static equalTo() {
        var expression = new OperationExpression("equalTo");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static notEqualTo() {
        var expression = new OperationExpression("notEqualTo");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static or() {
        var expression = new OperationExpression("or");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static and() {
        var expression = new OperationExpression("and");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static where() {
        var expression = new OperationExpression("where");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static greaterThan() {
        var expression = new OperationExpression("greaterThan");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static lessThan() {
        var expression = new OperationExpression("lessThan");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static greaterThanOrEqualTo() {
        var expression = new OperationExpression("greaterThanOrEqualTo");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static lessThanOrEqualTo() {
        var expression = new OperationExpression("lessThanOrEqualTo");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static orderBy() {
        var expression = new OperationExpression("orderBy");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static descending() {
        var expression = new OperationExpression("descending");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static ascending() {
        var expression = new OperationExpression("ascending");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static skip(value) {
        var expression = new OperationExpression("skip");
        var valueExpression = Expression.constant(value);
        expression.children.push(valueExpression);

        return expression;
    }

    static take(value) {
        var expression = new OperationExpression("take");
        var valueExpression = Expression.constant(value);
        expression.children.push(valueExpression);

        return expression;
    }

    static buildOperatorExpression(name) {
        var expression = new OperationExpression(name);
        var args = Array.prototype.slice.call(arguments, 1);
        args.forEach(arg => {
            expression.children.push(arg);
        });

        return expression;
    }

    static guid() {
        var expression = new OperationExpression("guid");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static substring() {
        var expression = new OperationExpression("substring");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static substringOf() {
        var expression = new OperationExpression("substringOf");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static startsWith() {
        var expression = new OperationExpression("startsWith");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static endsWith() {
        var expression = new OperationExpression("endsWith");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static isIn(property, array) {
        var expression = new OperationExpression("isIn");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static isNotIn(property, array) {
        var expression = new OperationExpression("isNotIn");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static include() {
        var expression = new OperationExpression("include");
        Array.prototype.slice.call(arguments, 0).forEach(arg => {
            expression.children.push(arg);
        });
        return expression;
    }

    static any(propertyAccessExpression, expression) {
        var anyExpression = new OperationExpression("any");
        var expressionExpression = Expression.expression(expression);

        anyExpression.children.push(propertyAccessExpression, expressionExpression);
        return anyExpression;
    }

    static all(propertyAccessExpression, expression) {
        var allExpression = new OperationExpression("all");
        var expressionExpression = Expression.expression(expression);

        allExpression.children.push(propertyAccessExpression, expressionExpression);
        return allExpression;
    }

    static expression(value) {
        var expresssionExpression = new ValueExpression("expression", value);

        return expresssionExpression;
    }

    static propertyAccess(leftExpression, propertyName) {
        var propertyExpression = Expression.property(propertyName);
        var propertyAccessExpression = new OperationExpression("propertyAccess");
        propertyAccessExpression.children.push(leftExpression, propertyExpression);

        return propertyAccessExpression;
    }

    static contains(type, namespace, expression) {
        var containsExpression = new OperationExpression("contains");
        var ofTypeExpression = new ValueExpression("ofType", type);
        var propertyExpression = new ValueExpression("property", namespace);

        containsExpression.children.push(ofTypeExpression, propertyExpression, expression);

        return containsExpression;
    }

    static intersects(type, namespace, expression) {
        var intersectsExpression = new OperationExpression("intersects");
        var ofTypeExpression = new ValueExpression("ofType", type);
        var propertyExpression = new ValueExpression("property", namespace);

        intersectsExpression.children.push(ofTypeExpression, propertyExpression, expression);

        return intersectsExpression;
    }
}

class ValueExpression extends Expression {
    constructor(nodeName, value) {
        super();
        this.value = value;
        this.nodeName = nodeName;
    }

    copy() {
        return new ValueExpression(this.nodeName, this.value);
    }

    isEqualTo(node) {
        if (node && this.nodeName === node.nodeName && this.value === node.value) {
            return true;
        }
        return false;
    }

    contains(node) {
        return this.isEqualTo(node);
    }
}

class OperationExpression extends Expression {
    constructor(nodeName) {
        super();
        var args = Array.prototype.slice.call(arguments, 0);

        this.nodeName = nodeName;
        this.children = args.slice(1);
    }
    copy() {
        var children = [];
        var copy = new OperationExpression(this.nodeName);

        this.children.forEach(expression => {
            copy.children.push(expression.copy());
        });

        return copy;
    }

    isEqualTo() {
        if (!Array.isArray(node.children) || this.nodeName !== node.nodeName) {
            return false;
        }

        if (node.children.length !== this.children.length) {
            return false;
        }

        return this.children.every((expression, index) => {
            return expression.isEqualTo(node.children[index]);
        });
    }

    contains(node) {
        if (node.nodeName === this.nodeName && Array.isArray(node.children)) {
            var matched = node.children.every((childNode, index) => {
                return childNode.contains(this.children[index]);
            });

            if (matched) {
                return true;
            }
        }

        return this.children.some(childNode => {
            return childNode.contains(node);
        });
    }

    getMatchingNodes(node, matchedNodes) {
        matchedNodes = Array.isArray(matchedNodes) ? matchedNodes : [];

        if (node.nodeName === this.nodeName && Array.isArray(node.children)) {
            var matched = node.children.every((childNode, index) => {
                return childNode.contains(this.children[index], matchedNodes);
            });

            if (matched) {
                matchedNodes.push(this);
            }
        }

        this.children.forEach(childNode => {
            if (Array.isArray(childNode.children)) {
                childNode.getMatchingNodes(node, matchedNodes);
            }
        }, matchedNodes);

        return matchedNodes;
    }
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpressionBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return OperationExpressionBuilder; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Expression__ = __webpack_require__(0);


const returnExpression = expression => {
    return expression;
};

class OperationExpressionBuilder {
    constructor(getLeftExpression) {
        this.getLeftExpression = getLeftExpression || returnExpression;
    }

    any(fn) {
        var expressionBuilder = new ExpressionBuilder();
        var expression = fn(expressionBuilder);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].any(this.getLeftExpression(), expression);
    }

    where(fn) {
        var propertyAccessExpression = this.getLeftExpression();

        this.getLeftExpression = () => {
            var expressionBuilder = new ExpressionBuilder(Object);
            var expression = fn(expressionBuilder);

            return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].queryable(propertyAccessExpression, __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].expression(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].where(expression)));
        };

        return this;
    }

    all(fn) {
        var expressionBuilder = new ExpressionBuilder();
        var expression = fn(expressionBuilder);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].all(this.getLeftExpression(), expression);
    }

    isEqualTo(value) {
        var constant = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].getExpressionType(value);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].equalTo(this.getLeftExpression(), constant);
    }

    isNotEqualTo(value) {
        var constant = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].getExpressionType(value);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].notEqualTo(this.getLeftExpression(), constant);
    }

    contains(value) {
        var constant = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].getExpressionType(value);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].substringOf(this.getLeftExpression(), constant);
    }

    isIn(array) {
        if (Array.isArray(array)) {
            return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].isIn(this.getLeftExpression(), __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].array(array));
        } else {
            throw new Error("isIn is expecting to be passed an array!");
        }
    }

    isNotIn(array) {
        if (Array.isArray(array)) {
            return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].isNotIn(this.getLeftExpression(), __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].array(array));
        } else {
            throw new Error("isNotIn is expecting to be passed an array!");
        }
    }

    isGreaterThan(value) {
        var constant = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].getExpressionType(value);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].greaterThan(this.getLeftExpression(), constant);
    }

    isGreaterThanOrEqualTo(value) {
        var constant = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].getExpressionType(value);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].greaterThanOrEqualTo(this.getLeftExpression(), constant);
    }

    isLessThanOrEqualTo(value) {
        var constant = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].getExpressionType(value);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].lessThanOrEqualTo(this.getLeftExpression(), constant);
    }

    isLessThan(value) {
        var constant = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].getExpressionType(value);
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].lessThan(this.getLeftExpression(), constant);
    }

    endsWith(value) {
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].endsWith(this.getLeftExpression(), __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].string(value));
    }

    startsWith(value) {
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].startsWith(this.getLeftExpression(), __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].string(value));
    }

    property(value) {
        return new OperationExpressionBuilder(() => {
            return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].propertyAccess(this.getLeftExpression(), value);
        });
    }

    getExpression() {
        return this.getLeftExpression();
    }
}

class ExpressionBuilder {
    constructor(type) {
        this.type = type || Object;
    }

    property(property) {
        return new OperationExpressionBuilder(() => {
            return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].propertyAccess(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].type(this.type), property);
        });
    }

    and() {
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].and.apply(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */], arguments);
    }

    or() {
        return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].or.apply(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */], arguments);
    }

    value() {
        return new OperationExpressionBuilder(() => {
            return __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].type(this.type);
        });
    }
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Queryable__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Expression__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ExpressionBuilder__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ExpressionVisitor__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Queryable", function() { return __WEBPACK_IMPORTED_MODULE_0__Queryable__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Expression", function() { return __WEBPACK_IMPORTED_MODULE_1__Expression__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionBuilder", function() { return __WEBPACK_IMPORTED_MODULE_2__ExpressionBuilder__["default"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ExpressionVisitor", function() { return __WEBPACK_IMPORTED_MODULE_3__ExpressionVisitor__["a"]; });







/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Expression__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__ = __webpack_require__(1);



const assertHasProvider = queryable => {
    if (!queryable.provider) {
        throw new Error("No provider found.");
    }
};

const copyQuery = query => {
    var copy = {};

    copy.where = query.where.copy();
    copy.orderBy = query.orderBy.copy();
    copy.include = query.include.copy();
    copy.parameters = JSON.parse(JSON.stringify(query.parameters));
    copy.take = query.take;
    copy.skip = query.skip;

    return copy;
};

class Queryable {
    constructor(type, query) {
        query = query || {};

        this.type = type || "Object";
        this.provider = null;
        this.query = {};
        this.query.parameters = (query && query.parameters) || {};

        if (query.where != null && query.where.nodeName === "where") {
            this.query.where = query.where;
        } else {
            this.query.where = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].where();
        }

        if (query.skip != null && query.skip.nodeName === "skip") {
            this.query.skip = query.skip;
        } else {
            this.query.skip = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].skip(0);
        }

        if (query.take != null && query.take.nodeName === "take") {
            this.query.take = query.take;
        } else {
            this.query.take = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].take(Infinity);
        }

        if (query.include != null && query.include.nodeName === "include") {
            this.query.include = query.include;
        } else {
            this.query.include = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].include();
        }

        if (query.orderBy != null && query.orderBy.nodeName === "orderBy") {
            this.query.orderBy = query.orderBy;
        } else {
            this.query.orderBy = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].orderBy();
        }
    }

    getExpression() {
        return this.query;
    }

    getQuery() {
        return this.query;
    }

    or(lambda) {
        var rightExpression;
        var query = copyQuery(this.getQuery());

        if (typeof lambda === "function") {
            lambda = lambda || function() {};
            rightExpression = lambda.call(__WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */], new __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */](this.type));
        } else if (lambda instanceof __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */]) {
            rightExpression = lambda;
        } else {
            throw new Error("Expected an expression to be supplied.");
        }

        if (query.where.children.length === 0) {
            query.where.children.push(rightExpression);
        } else {
            var leftExpression = query.where.children.pop();
            query.where.children.push(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].or(leftExpression, rightExpression));
        }

        return this.copy(query);
    }

    where(lambda) {
        var rightExpression;
        var query = copyQuery(this.getQuery());

        if (typeof lambda === "function") {
            lambda = lambda || function() {};
            rightExpression = lambda.call(__WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */], new __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */](this.type));
        } else if (lambda instanceof __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */]) {
            rightExpression = lambda;
        } else {
            throw new Error("Expected an expression to be supplied.");
        }

        if (query.where.children.length === 0) {
            query.where.children.push(rightExpression);
        } else {
            var leftExpression = query.where.children.pop();
            query.where.children.push(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].and(leftExpression, rightExpression));
        }

        return this.copy(query);
    }

    and(lambda) {
        return this.where(lambda);
    }

    take(value) {
        if (typeof value !== "number") {
            throw new Error("Illegal Argument Exception: value needs to be a number.");
        }

        var query = copyQuery(this.getQuery());
        query.take = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].take(value);

        return this.copy(query);
    }

    skip(value) {
        if (typeof value !== "number") {
            throw new Error("Illegal Argument Exception: value needs to be a number.");
        }

        var query = copyQuery(this.getQuery());
        query.skip = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].skip(value);

        return this.copy(query);
    }

    orderByDesc(lambda) {
        var propertyExpression;
        var query = copyQuery(this.getQuery());

        if (typeof lambda === "function") {
            lambda = lambda || function() {};
            propertyExpression = lambda.call(__WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */], new __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */](this.type)).getExpression();
        } else if (lambda instanceof __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["b" /* OperationExpressionBuilder */]) {
            propertyExpression = lambda.getExpression();
        } else {
            throw new Error("Expected a property to orderByDesc.");
        }

        var descendingExpression = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].descending(propertyExpression);

        if (!query.orderBy.contains(propertyExpression)) {
            query.orderBy.children.push(descendingExpression);
            return this.copy(query);
        } else {
            return this;
        }
    }

    orderBy(lambda) {
        var propertyExpression;
        var query = copyQuery(this.getQuery());

        if (typeof lambda === "function") {
            lambda = lambda || function() {};
            propertyExpression = lambda.call(__WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */], new __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */](this.type)).getExpression();
        } else if (lambda instanceof __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["b" /* OperationExpressionBuilder */]) {
            propertyExpression = lambda.getExpression();
        } else {
            throw new Error("Expected a property to orderBy.");
        }

        var ascendingExpression = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].ascending(propertyExpression);

        if (!query.orderBy.contains(propertyExpression)) {
            query.orderBy.children.push(ascendingExpression);
            return this.copy(query);
        } else {
            return this;
        }
    }

    setParameters(params) {
        if (!params) {
            throw new Error("Expected parameters to be passed in.");
        }
        var parameters = this.query.parameters;

        Object.keys(params).forEach(function(key) {
            parameters[key] = params[key];
        });
        return this;
    }

    withParameters(params) {
        if (!params) {
            throw new Error("Expected parameters to be passed in.");
        }

        var parameters = (this.query.parameters = {});
        Object.keys(params).forEach(function(key) {
            parameters[key] = params[key];
        });
        return this;
    }

    include(lambda) {
        var propertyExpression;
        var query = copyQuery(this.getQuery());

        if (typeof lambda === "function") {
            lambda = lambda || function() {};
            propertyExpression = lambda.call(__WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */], new __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["a" /* ExpressionBuilder */](this.type)).getExpression();
        } else if (lambda instanceof __WEBPACK_IMPORTED_MODULE_1__ExpressionBuilder__["b" /* OperationExpressionBuilder */]) {
            propertyExpression = lambda.getExpression();
        } else {
            throw new Error("Expected a property to include.");
        }

        if (propertyExpression.nodeName !== "queryable") {
            propertyExpression = __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].queryable(propertyExpression, __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].expression(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].where()));
        }

        query.include.children.push(propertyExpression);
        return this.copy(query);
    }

    merge(queryable) {
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
                cloneQuery.where.children.push(__WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */].and(leftExpression, rightExpression.copy()));
            }
        }

        query.include.children.forEach(function(expression) {
            cloneQuery.include.children.push(expression.copy());
        });

        query.orderBy.children.forEach(function(expression) {
            if (!cloneQuery.orderBy.contains(expression)) {
                cloneQuery.orderBy.children.push(expression.copy());
            }
        });

        return this.copy(cloneQuery);
    }

    toArrayAsync() {
        assertHasProvider(this);
        return this.provider.toArrayAsync(this);
    }

    countAsync() {
        assertHasProvider(this);
        return this.provider.countAsync(this);
    }

    toArrayWithCountAsync() {
        assertHasProvider(this);
        return this.provider.toArrayWithCountAsync(this);
    }

    ofType(type) {
        var queryable = new Queryable(type);
        queryable.provider = this.provider;
        return queryable;
    }

    copy(query) {
        var queryable = new Queryable(this.type, query || copyQuery(this.query));
        queryable.provider = this.provider;
        return queryable;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Queryable;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Expression__ = __webpack_require__(0);


class ExpressionVisitor {

    parse(expression) {
        let children = [];

        if (!expression) {
            return null;
        }

        expression.children.forEach((expression) => {
            if (!expression.children) {
                children.push(expression);
            } else {
                children.push(this.parse(expression));
            }
        });

        let func = this[expression.nodeName];

        if (!func) {
            throw new Error("The builder doesn't support the \"" + expression.nodeName + "\" expression.");
        }

        children.forEach((child, index) => {
            if (child instanceof __WEBPACK_IMPORTED_MODULE_0__Expression__["a" /* Expression */]) {
                var func = this[child.nodeName];
                if (!func) {
                    throw new Error("The builder doesn't support the \"" + child.nodeName + "\" expression.");
                }
                children[index] = func.call(this, child);
            }
        });

        return func.apply(this, children);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = ExpressionVisitor;



/***/ })
/******/ ]);
});