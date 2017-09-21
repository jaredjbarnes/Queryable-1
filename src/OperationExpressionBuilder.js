import ValueExpression from "./ValueExpression";
import OperationExpression from "./OperationExpression";
import Expression from "./Expression";
import ExpressionBuilder from "./ExpressionBuilder";

export default class OperationExpressionBuilder {
    constructor(type, property, rootExpression, currentExpression) {
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

    _createArrayOperationExpression(type, array) {
        let propertyAccessExpression = this._createPropertyAccessExpression();

        if (Array.isArray(array)) {
            let constant = this._getConstant(array);
            let arrayExpression = new OperationExpression(type);
            arrayExpression.children.push(propertyAccessExpression, constant);

            this.currentExpression.children.push(arrayExpression);
            return this.rootExpression;
        } else {
            throw new Error("Invalid Argument: Expected an array.");
        }
    }

    _createLambdaOperationExpression(type, lambda) {
        if (typeof lambda !== "function") {
            throw new Error("Invalid Argument: Expected a function.");
        }

        let propertyNavigationExpression = this._createPropertyNavigationExpression();

        let expressionBuilder = new ExpressionBuilder();
        let expression = lambda(expressionBuilder);
        let expressionExpression = new OperationExpression("expression");

        expressionExpression.children.push(expression);

        let lambdaExpression = new OperationExpression(type);
        lambdaExpression.children.push(
            propertyNavigationExpression,
            expressionExpression
        );

        this.currentExpression.children.push(lambdaExpression);

        return this.rootExpression;
    }

    _createOperationExpression(type, value) {
        let propertyAccessExpression = this._createPropertyAccessExpression();

        let constant = this._getConstant(value);
        let expression = new OperationExpression(type);
        expression.children.push(propertyAccessExpression, constant);

        this.currentExpression.children.push(expression);

        return this.rootExpression;
    }

    _createPropertyAccessExpression() {
        let propertyAccessExpression = new OperationExpression("propertyAccess");
        propertyAccessExpression.children.push(
            new ValueExpression("type", this.type),
            new ValueExpression("property", this.propertyName)
        );

        return propertyAccessExpression;
    }

    _createPropertyNavigationExpression() {
        let propertyNavigationExpression = new OperationExpression("propertyNavigation");
        propertyNavigationExpression.children.push(
            new ValueExpression("type", this.type),
            new ValueExpression("property", this.propertyName)
        );

        return propertyNavigationExpression;
    }

    _getConstant(value) {
        if (value instanceof Expression) {
            return value;
        }

        if (typeof value === "string") {
            return new ValueExpression("string", value);
        } else if (typeof value === "function") {
            return new ValueExpression("function", value);
        } else if (typeof value === "number") {
            return new ValueExpression("number", value);
        } else if (typeof value === "boolean") {
            return new ValueExpression("boolean", value);
        } else if (value === null) {
            return new ValueExpression("null", value);
        } else if (Array.isArray(value)) {
            return new ValueExpression("array", value);
        } else if (value instanceof Date) {
            return new ValueExpression("date", value);
        } else {
            return new ValueExpression("object", value);
        }
    }

    any(lambda) {
        return this._createLambdaOperationExpression("any", lambda);
    }

    all(lambda) {
        return this._createLambdaOperationExpression("all", lambda);
    }

    contains(value) {
        return this._createOperationExpression("contains", value);
    }

    isEqualTo(value) {
        return this._createOperationExpression("isEqualTo", value);
    }

    isNotEqualTo(value) {
        return this._createOperationExpression("isNotEqualTo", value);
    }

    isIn(array) {
        return this._createArrayOperationExpression("isIn", array);
    }

    isNotIn(array) {
        return this._createArrayOperationExpression("isNotIn", array);
    }

    isGreaterThan(value) {
        return this._createOperationExpression("isGreaterThan", value);
    }

    isGreaterThanOrEqualTo(value) {
        return this._createOperationExpression("isGreaterThanOrEqualTo", value);
    }

    isLessThanOrEqualTo(value) {
        return this._createOperationExpression("isLessThanOrEqualTo", value);
    }

    isLessThan(value) {
        return this._createOperationExpression("isLessThan", value);
    }

    endsWith(value) {
        return this._createOperationExpression("endsWith", value);
    }

    startsWith(value) {
        return this._createOperationExpression("startsWith", value);
    }

    property(value) {
        let propertyNavigation = this._createPropertyNavigationExpression();
        this.currentExpression.children.push(propertyNavigation);
        return new OperationExpressionBuilder("Object", value, this.rootExpression, propertyNavigation);
    }

    getExpression() {
        let propertyAccessExpression = this._createPropertyAccessExpression();
        this.currentExpression.children.push(propertyAccessExpression);

        return this.rootExpression;
    }
}