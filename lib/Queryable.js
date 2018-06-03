"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _QueryConverter = require("./QueryConverter");

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