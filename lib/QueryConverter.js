"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OperationExpression = require("./OperationExpression");

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _ValueExpression = require("./ValueExpression");

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