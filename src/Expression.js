export default class Expression {
    constructor() {
        this.nodeName = "expression";
    }

    copy() {
        throw new Error("Meant to be overriden");
    }

    isEqualTo() {
        throw new Error("Meant to be overriden");
    }
}