import Expression from "./Expression";

export default class ValueExpression extends Expression {
    constructor(nodeName, value) {
        super("value");
        this.value = value;
        this.nodeName = nodeName;
    }

    _cloneObject(obj) {
        let clone;

        if (obj instanceof Date) {
            return new Date(obj);
        } else if (this._isObject(obj)) {
            clone = {};
        } else if (Array.isArray(obj)) {
            clone = [];
        } else {
            return obj;
        }

        Object.keys(obj).forEach((key) => {
            clone[key] = this._cloneObject(obj[key]);
        });

        return clone;
    }

    copy() {
        const value = this._cloneObject(this.value);
        return new ValueExpression(this.nodeName, value);
    }

    isEqualTo(node) {
        if (node && this.nodeName === node.nodeName && this.value === node.value) {
            return true;
        }
        return false;
    }

    _isObject(obj) {
        return typeof obj === "object" && obj != null && !Array.isArray(obj);
    }

    contains(node) {
        return this.isEqualTo(node);
    }
}