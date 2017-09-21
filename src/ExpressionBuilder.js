import OperationExpressionBuilder from "./OperationExpressionBuilder";
import OperationExpression from "./OperationExpression";

export default class ExpressionBuilder {
    constructor(type) {
        this.type = type || "Object";
    }

    property(property) {
        let whereExpression = new OperationExpression("where");
        return new OperationExpressionBuilder(this.type, property, whereExpression);
    }

    and() {
        let andExpression = new OperationExpression("and");
        andExpression.children = Array.from(arguments);

        return andExpression;
    }

    or() {
        let orExpression = new OperationExpression("or");
        orExpression.children = Array.from(arguments);

        return orExpression;
    }

    value() {
        let whereExpression = new OperationExpression("where");
        return new OperationExpressionBuilder(this.type, null, whereExpression);
    }
}
