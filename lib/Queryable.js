"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Expression = require("./Expression");

var _Expression2 = _interopRequireDefault(_Expression);

var _ExpressionBuilder = require("./ExpressionBuilder");

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

var _OperationExpression = require("./OperationExpression");

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _OperationExpressionBuilder = require("./OperationExpressionBuilder");

var _OperationExpressionBuilder2 = _interopRequireDefault(_OperationExpressionBuilder);

var _ValueExpression = require("./ValueExpression");

var _ValueExpression2 = _interopRequireDefault(_ValueExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Queryable = function () {
    function Queryable(type) {
        var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Queryable);

        this.type = type || "Object";
        this.provider = null;
        this.query = query;
        this.query.parameters = query && query.parameters || {};
        this._applyQuery(query);
    }

    _createClass(Queryable, [{
        key: "_applyQuery",
        value: function _applyQuery(query) {
            if (query.where != null && query.where.nodeName === "where") {
                this.query.where = query.where;
            } else {
                this.query.where = new _OperationExpression2.default("where");
            }

            if (query.skip != null && query.skip.nodeName === "skip") {
                this.query.skip = query.skip;
            } else {
                this.query.skip = new _ValueExpression2.default("skip", 0);
            }

            if (query.take != null && query.take.nodeName === "take") {
                this.query.take = query.take;
            } else {
                this.query.take = new _ValueExpression2.default("take", Infinity);
            }

            if (query.include != null && query.include.nodeName === "include") {
                this.query.include = query.include;
            } else {
                this.query.include = new _OperationExpression2.default("include");
            }

            if (query.orderBy != null && query.orderBy.nodeName === "orderBy") {
                this.query.orderBy = query.orderBy;
            } else {
                this.query.orderBy = new _OperationExpression2.default("orderBy");
            }

            if (query.select != null && query.select.nodeName === "select") {
                this.query.select = query.select;
            } else {
                this.query.select = new _OperationExpression2.default("select");
            }
        }
    }, {
        key: "_assertHasProvider",
        value: function _assertHasProvider() {
            if (!this.provider) {
                throw new Error("No provider found.");
            }
        }
    }, {
        key: "_copyQuery",
        value: function _copyQuery(query) {
            var copy = {};

            copy.where = query.where.copy();
            copy.orderBy = query.orderBy.copy();
            copy.include = query.include.copy();
            copy.select = query.select.copy();
            copy.parameters = JSON.parse(JSON.stringify(query.parameters));
            copy.take = query.take.copy();
            copy.skip = query.skip.copy();

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
        key: "_createQueryableFromNumber",
        value: function _createQueryableFromNumber(type, value) {
            if (typeof value !== "number") {
                throw new Error("Invalid Argument: Expected a number.");
            }

            var query = this._copyQuery(this.getQuery());
            query[type] = new _ValueExpression2.default(type, value);

            return this.copy(query);
        }
    }, {
        key: "_createQueryableFromOrderBy",
        value: function _createQueryableFromOrderBy(type) {
            var lambda = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

            var whereExpression = void 0;
            var propertyExpression = void 0;
            var query = this._copyQuery(this.getQuery());

            if (typeof lambda === "function") {
                whereExpression = lambda(new _ExpressionBuilder2.default(this.type)).getExpression();
            } else if (lambda instanceof _OperationExpressionBuilder2.default) {
                whereExpression = lambda.getExpression();
            } else {
                throw new Error("Invalid Argument: Expected a OperationExpressionBuilder, or a function.");
            }

            if (!(whereExpression instanceof _Expression2.default)) {
                throw new Error("Invalid expression: You may be missing a return.");
            }

            var expression = new _OperationExpression2.default(type);
            propertyExpression = whereExpression.children[0];
            expression.children.push(propertyExpression);

            if (!query.orderBy.contains(propertyExpression)) {
                query.orderBy.children.push(expression);
                return this.copy(query);
            } else {
                return this;
            }
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
        key: "include",
        value: function include(propertyName) {
            if (typeof propertyName !== "string") {
                throw new Error("Illegal Argument: Expected a string.");
            }

            var query = this._copyQuery(this.getQuery());
            var propertyAccess = new _OperationExpression2.default("propertyAccess");

            propertyAccess.children.push(new _ValueExpression2.default("type", "Object"), new _ValueExpression2.default("property", propertyName));

            if (!query.include.contains(propertyAccess)) {
                query.include.children.push(propertyAccess);
                return this.copy(query);
            } else {
                return this;
            }
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
                    var andExpression = new _OperationExpression2.default("and");

                    andExpression.children.push(leftExpression, rightExpression.copy());

                    cloneQuery.where.children.push(andExpression);
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
        key: "ofType",
        value: function ofType(type) {
            var queryable = new Queryable(type);
            queryable.provider = this.provider;
            return queryable;
        }
    }, {
        key: "or",
        value: function or(lambda) {
            return this._createQueryableFromLambda("or", lambda);
        }
    }, {
        key: "orderBy",
        value: function orderBy(lambda) {
            return this._createQueryableFromOrderBy("ascending", lambda);
        }
    }, {
        key: "orderBy",
        value: function orderBy(lambda) {
            return this._createQueryableFromOrderBy("ascending", lambda);
        }
    }, {
        key: "orderByDesc",
        value: function orderByDesc(lambda) {
            return this._createQueryableFromOrderBy("descending", lambda);
        }
    }, {
        key: "take",
        value: function take(value) {
            return this._createQueryableFromNumber("take", value);
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
        key: "setParameters",
        value: function setParameters(params) {
            if (params == null) {
                throw new Error("Null Argument Exception.");
            }
            var parameters = this.query.parameters;

            Object.keys(params).forEach(function (key) {
                parameters[key] = params[key];
            });
            return this;
        }
    }, {
        key: "select",
        value: function select(properties) {
            var _this = this;

            if (!Array.isArray(properties)) {
                throw new Error("Illegal Argument: Expected an array of strings.");
            }

            var query = this._copyQuery(this.getQuery());

            properties.forEach(function (propertyName) {
                if (typeof propertyName !== "string") {
                    throw new Error("Illegal Argument: Expected a string.");
                }

                var propertyAccess = new _OperationExpression2.default("propertyAccess");

                propertyAccess.children.push(new _ValueExpression2.default("type", _this.type), new _ValueExpression2.default("property", propertyName));

                if (!query.select.contains(propertyAccess)) {
                    query.select.children.push(propertyAccess);
                }
            });

            return this.copy(query);
        }
    }, {
        key: "skip",
        value: function skip(value) {
            return this._createQueryableFromNumber("skip", value);
        }
    }, {
        key: "where",
        value: function where(lambda) {
            return this._createQueryableFromLambda("and", lambda);
        }
    }, {
        key: "withParameters",
        value: function withParameters(params) {
            if (params == null) {
                throw new Error("Null ArgumentException");
            }

            var parameters = this.query.parameters = {};
            Object.keys(params).forEach(function (key) {
                parameters[key] = params[key];
            });
            return this;
        }
    }]);

    return Queryable;
}();

exports.default = Queryable;
//# sourceMappingURL=Queryable.js.map