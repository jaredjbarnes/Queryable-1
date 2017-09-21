"use strict";

var _assert = require("assert");

var assert = _interopRequireWildcard(_assert);

var _OperationExpression = require("./../OperationExpression");

var _OperationExpression2 = _interopRequireDefault(_OperationExpression);

var _ExpressionBuilder = require("./../ExpressionBuilder");

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

var _OperationExpressionBuilder = require("./../OperationExpressionBuilder");

var _OperationExpressionBuilder2 = _interopRequireDefault(_OperationExpressionBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports["ExpressionBuilder: Constructor."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    assert.ok(true);
};

exports["ExpressionBuilder: Constructor with and."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.and();

    assert.equal("and", expression.nodeName);
};

exports["ExpressionBuilder: Constructor with or."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.or();

    assert.equal("or", expression.nodeName);
};

exports["ExpressionBuilder: Constructor with value."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var value = expressionBuilder.value();
    assert.ok(true);
};

exports["ExpressionBuilder: Constructor with expression (isEqualTo)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isEqualTo("Jared");

    assert.equal("isEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isNotEqualTo)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isNotEqualTo("Jared");

    assert.equal("isNotEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (contains)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").contains("Jared");

    assert.equal("contains", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isIn)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var testArray = ["test"];
    var expression = expressionBuilder.property("firstName").isIn(testArray);

    assert.equal("isIn", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.deepEqual(testArray, expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isIn: w/o passing in Array)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();

    assert.throws(function () {
        expressionBuilder.property("firstName").isIn("test");
    });
};

exports["ExpressionBuilder: Constructor with expression (isNotIn)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var testArray = ["test"];
    var expression = expressionBuilder.property("firstName").isNotIn(testArray);

    assert.equal("isNotIn", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.deepEqual(testArray, expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isNotIn: w/o passing in Array)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();

    assert.throws(function () {
        expressionBuilder.property("firstName").isNotIn("test");
    });
};

exports["ExpressionBuilder: Constructor with expression (isGreaterThan)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isGreaterThan("Jared");

    assert.equal("isGreaterThan", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isGreaterThanOrEqualTo)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isGreaterThanOrEqualTo("Jared");

    assert.equal("isGreaterThanOrEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isLessThan)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isLessThan("Jared");

    assert.equal("isLessThan", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isLessThanOrEqualTo)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isLessThanOrEqualTo("Jared");

    assert.equal("isLessThanOrEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (endsWith)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").endsWith("Jared");

    assert.equal("endsWith", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (startsWith)."] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").startsWith("Jared");

    assert.equal("startsWith", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};
//# sourceMappingURL=ExpressionBuilder.js.map