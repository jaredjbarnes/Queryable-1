import Expression from "./Expression";

export default class ValueExpression extends Expression {
    constructor(nodeName, value) {
        super();
        this.value = value;
        this.nodeName = nodeName;
    }

    copy() {
        let value = this.value;

        if (typeof value === "object" && value != null) {
            value = JSON.parse(JSON.stringify(value));
        }

        return new ValueExpression(this.nodeName, value);
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