"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _OperationExpressionBuilder = require("./OperationExpressionBuilder");

var _OperationExpressionBuilder2 = _interopRequireDefault(_OperationExpressionBuilder);

var _OperationExpression = require("./OperationExpression");

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