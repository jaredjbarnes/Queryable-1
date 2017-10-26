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

var JsonQueryBuilder = function () {
    function JsonQueryBuilder() {
        _classCallCheck(this, JsonQueryBuilder);
    }

    _createClass(JsonQueryBuilder, [{
        key: "_convertNode",
        value: function _convertNode(node) {
            var _this = this;

            if (node == null) {
                return node;
            }

            if (node.type === "value") {
                var valueExpression = new _ValueExpression2.default(node.nodeName, node.value);
                return valueExpression;
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
        key: "convert",
        value: function convert(json) {
            var _this2 = this;

            var object = JSON.parse(json);

            return Object.keys(object).reduce(function (query, key) {
                query[key] = _this2._convertNode(object[key]);
                return query;
            }, {});
        }
    }]);

    return JsonQueryBuilder;
}();

exports.default = JsonQueryBuilder;
//# sourceMappingURL=JsonQueryConverter.js.map