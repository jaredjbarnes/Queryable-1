import Expression from "./Expression";
import ExpressionBuilder from "./ExpressionBuilder";
import OperationExpression from "./OperationExpression";
import OperationExpressionBuilder from "./OperationExpressionBuilder";
import ValueExpression from "./ValueExpression";
import QueryConverter from "./QueryConverter";

const queryConverter = new QueryConverter();

export default class Queryable {
    constructor(type, query = {}) {
        this.type = type || "Object";
        this.provider = null;
        this.query = query;
        this._applyQuery(query);
    }

    _applyQuery(query) {
        if (query.where != null && query.where.nodeName === "where") {
            this.query.where = query.where;
        } else {
            this.query.where = new OperationExpression("where");
        }

        if (typeof query.skip === "number") {
            this.query.skip = query.skip;
        } else {
            this.query.skip = 0;
        }

        if (typeof query.take === "number") {
            this.query.take = query.take;
        } else {
            this.query.take = Infinity;
        }

        if (Array.isArray(query.orderBy)) {
            this.query.orderBy = query.orderBy.filter((orderBy) => {
                return this._isValidOrderBy(orderBy);
            });
        } else {
            this.query.orderBy = [];
        }

        if (this._isValidMapping(this.query.select)) {
            this.query.select = query.select;
        } else {
            this.query.select = {};
        }

        this.query.type = this.type;

    }

    _assertHasProvider() {
        if (!this.provider) {
            throw new Error("No provider found.");
        }
    }

    // _cloneObject(object){
    //     return JSON.parse(JSON.stringify(object));
    // }

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

    _copyQuery(query) {
        let copy = {};

        copy.where = query.where.copy();
        copy.orderBy = this._cloneObject(query.orderBy);
        copy.select = this._cloneObject(query.select);
        copy.take = query.take;
        copy.skip = query.skip;
        copy.type = query.type;

        return copy;
    }

    _createQueryableFromLambda(type, lambda = () => { }) {
        let query = this._copyQuery(this.getQuery());
        let whereExpression;

        if (typeof lambda === "function") {
            whereExpression = lambda(new ExpressionBuilder(this.type));
        } else if (lambda instanceof Expression) {
            whereExpression = lambda;
        } else {
            throw new Error("Invalid Argument: Expected an expression, or function.");
        }

        if (!(whereExpression instanceof Expression)) {
            throw new Error("Invalid expression: You may be missing a return.");
        }

        if (whereExpression.nodeName !== "where") {
            let wrapper = new OperationExpression("where");
            wrapper.children.push(whereExpression);
            whereExpression = wrapper;
        }

        if (query.where.children.length === 0) {
            query.where = whereExpression;
        } else {

            let rightExpression = whereExpression.children[0];
            let leftExpression = query.where.children.pop();
            let expression = new OperationExpression(type);

            expression.children.push(
                leftExpression,
                rightExpression
            );

            query.where.children.push(expression);
        }

        return this.copy(query);
    }

    _isObject(obj) {
        return typeof obj === "object" && obj != null && !Array.isArray(obj);
    }

    _isValidMapping(mapping) {
        if (mapping == null) {
            return false;
        }

        return Object.keys(mapping).every((key) => {
            return typeof key === "string" && typeof mapping[key] === "string";
        });
    }

    _isValidOrderBy(orderBy) {
        let keys = Object.keys(orderBy);

        if (keys.length !== 2) {
            return false;
        }

        if (orderBy.type !== "ASC" && orderBy.type !== "DESC") {
            return false;
        }

        if (typeof orderBy.column !== "string") {
            return false;
        }

        return true;
    }

    _validatePropertyName(name) {
        return typeof name === "string" && name.length > 0 && isNaN(parseInt(name.charAt(0), 10))
    }

    _selectArray(properties) {
        let hasValidMapping = properties.every((property) => {
            return this._validatePropertyName(property);
        });

        if (!hasValidMapping) {
            throw new Error("Invalid mapping: The mappings need to be a string that is at least one character long and doesn't start with a number.");
        }

        let query = this._copyQuery(this.getQuery());
        let existingMapping = query.select;

        properties.forEach((property) => {
            existingMapping[property] = property;
        });

        return this.copy(query);
    }

    _selectObject(mapping) {
        let mappingKeys = Object.keys(mapping);
        let hasValidMapping = mappingKeys.every((key) => {
            return this._validatePropertyName(key) && this._validatePropertyName(mapping[key]);
        });

        if (!hasValidMapping) {
            throw new Error("Invalid mapping: The mappings need to be a string that is at least one character long and doesn't start with a number.");
        }

        let query = this._copyQuery(this.getQuery());
        let existingMapping = query.select;

        mappingKeys.forEach((key) => {
            existingMapping[key] = mapping[key];
        });

        return this.copy(query);
    }

    and(lambda) {
        return this._createQueryableFromLambda("and", lambda);
    }

    copy(query) {
        let queryable = new Queryable(this.type, query || this._copyQuery(this.query));
        queryable.provider = this.provider;
        return queryable;
    }

    countAsync() {
        this._assertHasProvider(this);
        return this.provider.countAsync(this);
    }

    getExpression() {
        return this.query;
    }

    getQuery() {
        return this.query;
    }

    merge(queryable) {
        if (!(queryable instanceof Queryable)) {
            throw new Error("Expected a queryable to be passed in.");
        }

        let cloneQuery = this._copyQuery(this.getQuery());
        let query = queryable.getQuery();

        let rightExpression = query.where.children[0];

        if (rightExpression != null) {
            // No need to copy if there is nothing to copy.
            if (cloneQuery.where.children.length === 0) {
                cloneQuery.where.children.push(rightExpression.copy());
            } else if (cloneQuery.where.children.length === 1 && cloneQuery.where.children[0].nodeName === "and") {
                cloneQuery.where.children[0].children.push(rightExpression.copy());
            } else {
                let leftExpression = cloneQuery.where.children.pop();
                let andExpression = new OperationExpression("and");

                andExpression.children.push(
                    leftExpression,
                    rightExpression.copy()
                );

                cloneQuery.where.children.push(andExpression);
            }
        }

        Object.keys(query.select).forEach((key) => {
            cloneQuery.select[key] = this._cloneObject(query.select[key]);
        });

        query.orderBy.forEach((orderBy) => {
            let index = cloneQuery.orderBy.findIndex((cloneOrderBy) => {
                return cloneOrderBy.column === orderBy.column;
            });

            if (index === -1) {
                cloneQuery.orderBy.push(this._cloneObject(orderBy));
            }
        });

        cloneQuery.type = query.type;
        cloneQuery.take = query.take;
        cloneQuery.skip = query.skip;

        return this.copy(cloneQuery);
    }

    or(lambda) {
        return this._createQueryableFromLambda("or", lambda);
    }

    orderBy(property) {
        if (typeof property !== "string") {
            throw new Error("Illegal Argument: property needs to be of type string.");
        }

        let query = this._copyQuery(this.getQuery());

        let index = query.orderBy.findIndex((orderBy) => {
            return orderBy.column === property;
        });

        if (index === -1) {
            query.orderBy.push({
                type: "ASC",
                column: property
            });
        }

        return this.copy(query);
    }

    orderByDesc(property) {
        if (typeof property !== "string") {
            throw new Error("Illegal Argument: property needs to be of type string.");
        }

        let query = this._copyQuery(this.getQuery());

        let index = query.orderBy.findIndex((orderBy) => {
            return orderBy.column === property;
        });

        if (index === -1) {
            query.orderBy.push({
                type: "DESC",
                column: property
            });
        }

        return this.copy(query);
    }

    select(mapping) {
        if (Array.isArray(mapping)) {
            return this._selectArray(mapping)
        } else {
            return this._selectObject(mapping);
        }
    }

    skip(value) {
        if (typeof value !== "number") {
            throw new Error("Illegal Argument: skip needs to be a number.");
        }

        let query = this._copyQuery(this.getQuery());
        query.skip = value

        return this.copy(query);
    }

    take(value) {
        if (typeof value !== "number") {
            throw new Error("Illegal Argument: take needs to be a number.");
        }

        let query = this._copyQuery(this.getQuery());
        query.take = value

        return this.copy(query);
    }

    toArrayAsync() {
        this._assertHasProvider(this);
        return this.provider.toArrayAsync(this);
    }

    toArrayWithCountAsync() {
        this._assertHasProvider(this);
        return this.provider.toArrayWithCountAsync(this);
    }

    toJson() {
        return JSON.stringify(this.getQuery());
    }

    where(lambda) {
        return this._createQueryableFromLambda("and", lambda);
    }

    static fromJson(jsonQuery) {
        let query = queryConverter.convert(jsonQuery);
        return new Queryable(query.type, query);
    }

}
