import * as assert from "assert";
import OperationExpression from "./../OperationExpression";
import ExpressionBuilder from "./../ExpressionBuilder";
import OperationExpressionBuilder from "./../OperationExpressionBuilder";

exports["ExpressionBuilder: Constructor."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    assert.ok(true);
};

exports["ExpressionBuilder: Constructor with and."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.and();

    assert.equal("and", expression.nodeName);
};

exports["ExpressionBuilder: Constructor with or."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.or();

    assert.equal("or", expression.nodeName);
};

exports["ExpressionBuilder: Constructor with value."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const value = expressionBuilder.value();
    assert.ok(true);
};

exports["ExpressionBuilder: Constructor with expression (isEqualTo)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isEqualTo("Jared");

    assert.equal("isEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isNotEqualTo)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isNotEqualTo("Jared");

    assert.equal("isNotEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (contains)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").contains("Jared");

    assert.equal("contains", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isIn)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const testArray = ["test"];
    const expression = expressionBuilder.property("firstName").isIn(testArray);

    assert.equal("isIn", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.deepEqual(testArray, expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isIn: w/o passing in Array)."] = function () {
    const expressionBuilder = new ExpressionBuilder();

    assert.throws(() => {
        expressionBuilder.property("firstName").isIn("test");
    });
};

exports["ExpressionBuilder: Constructor with expression (isNotIn)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const testArray = ["test"];
    const expression = expressionBuilder.property("firstName").isNotIn(testArray);

    assert.equal("isNotIn", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.deepEqual(testArray, expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isNotIn: w/o passing in Array)."] = function () {
    const expressionBuilder = new ExpressionBuilder();

    assert.throws(() => {
        expressionBuilder.property("firstName").isNotIn("test");
    });
};

exports["ExpressionBuilder: Constructor with expression (isGreaterThan)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isGreaterThan("Jared");

    assert.equal("isGreaterThan", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isGreaterThanOrEqualTo)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isGreaterThanOrEqualTo("Jared");

    assert.equal("isGreaterThanOrEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isLessThan)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isLessThan("Jared");

    assert.equal("isLessThan", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (isLessThanOrEqualTo)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isLessThanOrEqualTo("Jared");

    assert.equal("isLessThanOrEqualTo", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (endsWith)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").endsWith("Jared");

    assert.equal("endsWith", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};

exports["ExpressionBuilder: Constructor with expression (startsWith)."] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").startsWith("Jared");

    assert.equal("startsWith", expression.children[0].nodeName);
    assert.equal("firstName", expression.children[0].children[0].children[1].value);
    assert.equal("Jared", expression.children[0].children[1].value);
};