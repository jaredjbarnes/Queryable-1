import Expression from "./Expression";
import ExpressionBuilder from "./ExpressionBuilder";
import OperationExpression from "./OperationExpression";
import OperationExpressionBuilder from "./OperationExpressionBuilder";
import ValueExpression from "./ValueExpression";

export default class Queryable {
    constructor(type, query = {}) {
        this.type = type || "Object";
        this.provider = null;
        this.query = query;
        this.query.parameters = (query && query.parameters) || {};
        this._applyQuery(query);
    }

    _applyQuery(query) {
        if (query.where != null && query.where.nodeName === "where") {
            this.query.where = query.where;
        } else {
            this.query.where = new OperationExpression("where");
        }

        if (query.skip != null && query.skip.nodeName === "skip") {
            this.query.skip = query.skip;
        } else {
            this.query.skip = new ValueExpression("skip", 0);
        }

        if (query.take != null && query.take.nodeName === "take") {
            this.query.take = query.take;
        } else {
            this.query.take = new ValueExpression("take", Infinity);
        }

        if (query.include != null && query.include.nodeName === "include") {
            this.query.include = query.include;
        } else {
            this.query.include = new OperationExpression("include");
        }

        if (query.orderBy != null && query.orderBy.nodeName === "orderBy") {
            this.query.orderBy = query.orderBy;
        } else {
            this.query.orderBy = new OperationExpression("orderBy");
        }

        if (query.select != null && query.select.nodeName === "select") {
            this.query.select = query.select;
        } else {
            this.query.select = new ValueExpression("select", {});
        }

    }

    _assertHasProvider() {
        if (!this.provider) {
            throw new Error("No provider found.");
        }
    }

    _copyQuery(query) {
        let copy = {};

        copy.where = query.where.copy();
        copy.orderBy = query.orderBy.copy();
        copy.include = query.include.copy();
        copy.select = query.select.copy();
        copy.parameters = JSON.parse(JSON.stringify(query.parameters));
        copy.take = query.take.copy();
        copy.skip = query.skip.copy();

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

    _createQueryableFromNumber(type, value) {
        if (typeof value !== "number") {
            throw new Error("Invalid Argument: Expected a number.");
        }

        let query = this._copyQuery(this.getQuery());
        query[type] = new ValueExpression(type, value);

        return this.copy(query);
    }

    _createQueryableFromOrderBy(type, lambda = () => { }) {
        let whereExpression;
        let propertyExpression;
        let query = this._copyQuery(this.getQuery());

        if (typeof lambda === "function") {
            whereExpression = lambda(new ExpressionBuilder(this.type)).getExpression();
        } else if (lambda instanceof OperationExpressionBuilder) {
            whereExpression = lambda.getExpression();
        } else {
            throw new Error("Invalid Argument: Expected a OperationExpressionBuilder, or a function.");
        }

        if (!(whereExpression instanceof Expression)) {
            throw new Error("Invalid expression: You may be missing a return.");
        }

        let expression = new OperationExpression(type);
        propertyExpression = whereExpression.children[0];
        expression.children.push(propertyExpression);

        if (!query.orderBy.contains(propertyExpression)) {
            query.orderBy.children.push(expression);
            return this.copy(query);
        } else {
            return this;
        }
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
        let existingMapping = query.select.value;

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
        let existingMapping = query.select.value;

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

        let clone = this.copy();
        let cloneQuery = clone.getQuery();
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

        query.include.children.forEach(function (expression) {
            cloneQuery.include.children.push(expression.copy());
        });

        query.orderBy.children.forEach(function (expression) {
            if (!cloneQuery.orderBy.contains(expression)) {
                cloneQuery.orderBy.children.push(expression.copy());
            }
        });

        return this.copy(cloneQuery);
    }

    ofType(type) {
        let queryable = new Queryable(type);
        queryable.provider = this.provider;
        return queryable;
    }

    or(lambda) {
        return this._createQueryableFromLambda("or", lambda);
    }

    orderBy(lambda) {
        return this._createQueryableFromOrderBy("ascending", lambda);
    }

    orderBy(lambda) {
        return this._createQueryableFromOrderBy("ascending", lambda);
    }

    orderByDesc(lambda) {
        return this._createQueryableFromOrderBy("descending", lambda);
    }

    take(value) {
        return this._createQueryableFromNumber("take", value);
    }

    toArrayAsync() {
        this._assertHasProvider(this);
        return this.provider.toArrayAsync(this);
    }

    toArrayWithCountAsync() {
        this._assertHasProvider(this);
        return this.provider.toArrayWithCountAsync(this);
    }

    setParameters(params) {
        if (params == null) {
            throw new Error("Null Argument Exception.");
        }
        let parameters = this.query.parameters;

        Object.keys(params).forEach(function (key) {
            parameters[key] = params[key];
        });
        return this;
    }

    select(mapping) {
        if (Array.isArray(mapping)) {
            return this._selectArray(mapping)
        } else {
            return this._selectObject(mapping);
        }
    }

    skip(value) {
        return this._createQueryableFromNumber("skip", value);
    }

    where(lambda) {
        return this._createQueryableFromLambda("and", lambda);
    }

    withParameters(params) {
        if (params == null) {
            throw new Error("Null ArgumentException");
        }

        let parameters = (this.query.parameters = {});
        Object.keys(params).forEach(function (key) {
            parameters[key] = params[key];
        });
        return this;
    }

}
