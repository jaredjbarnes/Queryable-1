import OperationExpression from "./OperationExpression";
import ValueExpression from "./ValueExpression";

export default class JsonQueryBuilder {
    _convertNode(node) {
        if (node == null) {
            return node;
        }

        if (node.type === "value") {
            
            if (node.nodeName === "queryable") {
                node.value.where = this._convertNode(node.value.where);
                return new ValueExpression(node.nodeName, node.value);
            } else {
                return new ValueExpression(node.nodeName, node.value);
            }

        } else if (node.type === "operation") {
            let operationExpression = new OperationExpression(node.nodeName);

            if (!Array.isArray(node.children)) {
                throw new Error("Invalid Operation Node. It didn't contain a children property of type array.");
            }

            node.children.forEach((childNode) => {
                let expression = this._convertNode(childNode);
                operationExpression.children.push(expression);
            });

            return operationExpression;
        } else if (node.type == null) {
            return node;
        }
    }

    convert(json) {
        let object = JSON.parse(json);

        return Object.keys(object).reduce((query, key) => {
            query[key] = this._convertNode(object[key]);
            return query;
        }, {});

    }
}