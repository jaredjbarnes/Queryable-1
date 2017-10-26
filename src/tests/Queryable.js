import * as assert from "assert";
import Queryable from "./../Queryable";
import ExpressionBuilder from "../ExpressionBuilder";

exports["Queryable: Constructor."] = function () {
    const queryable = new Queryable();
    assert.ok(true);
};

exports["Queryable: Constructor with query (where: single)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.where(expBuilder => {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });

    const query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (where: chain)"] = function () {
    let queryable = new Queryable();
    queryable = queryable
        .where(expBuilder => {
            return expBuilder.property("firstName").isEqualTo("Jared");
        })
        .where(expBuilder => {
            return expBuilder.property("lastName").isEqualTo("Barnes");
        });

    const query = queryable.getQuery();

    assert.equal("and", query.where.children[0].nodeName);
    assert.equal("isEqualTo", query.where.children[0].children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[0].children[1].value);
    assert.equal("isEqualTo", query.where.children[0].children[1].nodeName);
    assert.equal("lastName", query.where.children[0].children[1].children[0].children[1].value);
    assert.equal("Barnes", query.where.children[0].children[1].children[1].value);
};

exports["Queryable: Constructor with query (where: with ExpressionBuilder instance.)"] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isEqualTo("Jared");
    let queryable = new Queryable();
    queryable = queryable.where(expression);

    const query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (where: w/o lambda or ExpressionBuilder instance)"] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable = queryable.where();
    });
};

exports["Queryable: Constructor with query (orderBy: single)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.orderBy("firstName");

    const query = queryable.getQuery();

    assert.equal("ASC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderBy: chain)"] = function () {
    let queryable = new Queryable();
    queryable = queryable
        .orderBy("firstName")
        .orderBy("lastName");

    const query = queryable.getQuery();

    assert.equal("ASC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
    assert.equal("ASC", query.orderBy[1].type);
    assert.equal("lastName", query.orderBy[1].column);
};

exports["Queryable: Constructor with query (orderBy: with ExpressionBuilder instance.)"] = function () {
    const expressionBuilder = new ExpressionBuilder();
    let queryable = new Queryable();
    queryable = queryable.orderBy("firstName");

    const query = queryable.getQuery();

    assert.equal("ASC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderBy: with the same expression called twice.)"] = function () {
    let queryable = new Queryable();
    queryable = queryable
        .orderBy("firstName")
        .orderBy("firstName");

    const query = queryable.getQuery();

    assert.equal(1, query.orderBy.length);
};

exports["Queryable: Constructor with query (orderBy: w/o lambda or ExpressionBuilder instance)"] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable = queryable.orderBy();
    });
};

exports["Queryable: Constructor with query (take: value === number)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.take(10);

    const query = queryable.getQuery();

    assert.equal(10, query.take);
};

exports["Queryable: Constructor with query (take: value !== number)"] = function () {
    let queryable = new Queryable();
    assert.throws(() => {
        queryable = queryable.take();
    });
};

exports["Queryable: Constructor with query (skip: value === number)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.skip(10);

    const query = queryable.getQuery();

    assert.equal(10, query.skip);
};

exports["Queryable: Constructor with query (skip: value !== number)"] = function () {
    let queryable = new Queryable();
    assert.throws(() => {
        queryable = queryable.skip();
    });
};

exports["Queryable: Constructor with query (or: single)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.or(expBuilder => {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });

    const query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (or: chain)"] = function () {
    let queryable = new Queryable();
    queryable = queryable
        .or(expBuilder => {
            return expBuilder.property("firstName").isEqualTo("Jared");
        })
        .or(expBuilder => {
            return expBuilder.property("lastName").isEqualTo("Barnes");
        });

    const query = queryable.getQuery();

    assert.equal("or", query.where.children[0].nodeName);
    assert.equal("isEqualTo", query.where.children[0].children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[0].children[1].value);
    assert.equal("isEqualTo", query.where.children[0].children[1].nodeName);
    assert.equal("lastName", query.where.children[0].children[1].children[0].children[1].value);
    assert.equal("Barnes", query.where.children[0].children[1].children[1].value);
};

exports["Queryable: Constructor with query (or: with ExpressionBuilder instance.)"] = function () {
    const expressionBuilder = new ExpressionBuilder();
    const expression = expressionBuilder.property("firstName").isEqualTo("Jared");
    let queryable = new Queryable();
    queryable = queryable.or(expression);

    const query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (or: w/o lambda or ExpressionBuilder instance)"] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable = queryable.or();
    });
};

exports["Queryable: Constructor with query (and: single)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.and(expBuilder => {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });

    const query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (orderByDesc: single)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.orderByDesc("firstName");

    const query = queryable.getQuery();

    assert.equal("DESC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderByDesc: chain)"] = function () {
    let queryable = new Queryable();
    queryable = queryable
        .orderByDesc("firstName")
        .orderByDesc("lastName");

    const query = queryable.getQuery();

    assert.equal("DESC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
    assert.equal("DESC", query.orderBy[1].type);
    assert.equal("lastName", query.orderBy[1].column);
};

exports["Queryable: Constructor with query (orderByDesc: with ExpressionBuilder instance.)"] = function () {
    let queryable = new Queryable();
    queryable = queryable.orderByDesc("firstName");

    const query = queryable.getQuery();

    assert.equal("DESC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderByDesc: with the same expression called twice.)"] = function () {
    let queryable = new Queryable();
    queryable = queryable
        .orderByDesc("firstName")
        .orderByDesc("firstName");

    const query = queryable.getQuery();

    assert.equal(1, query.orderBy.length);
};

exports["Queryable: Constructor with query (orderByDesc: w/o lambda or ExpressionBuilder instance)"] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable = queryable.orderByDesc();
    });
};

exports["Queryable: Constructor with query (setParameters: obj passed in)"] = function () {
    let queryable = new Queryable();
    const testParameters = { test1: 1, test2: 2 };
    queryable = queryable.setParameters(testParameters);

    const query = queryable.getQuery();

    assert.deepEqual(testParameters, query.parameters);
};

exports["Queryable: Constructor with query (setParameters: w/o parameters passed in)"] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable = queryable.setParameters();
    });
};

exports["Queryable: Constructor with query (withParameters: obj passed in)"] = function () {
    let queryable = new Queryable();
    const testParameters = { test1: 1, test2: 2 };
    queryable = queryable.withParameters(testParameters);

    const query = queryable.getQuery();

    assert.deepEqual(testParameters, query.parameters);
};

exports["Queryable: Constructor with query (withParameters: w/o parameters passed in)"] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable = queryable.withParameters();
    });
};

exports["Queryable: Constructor with query (merge: merging queryable is empty)"] = function () {
    let queryable1 = new Queryable();
    let queryable2 = new Queryable();
    queryable2 = queryable2.merge(queryable1);

    const query = queryable2.getQuery();

    assert.equal(0, query.where.children.length);
};

exports["Queryable: Constructor with query (merge: queryable merging doesn't have anything to copy)"] = function () {
    let queryable1 = new Queryable();
    let queryable2 = new Queryable();

    queryable1 = queryable1.where(expBuilder => {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });
    queryable2 = queryable2.merge(queryable1);

    const query = queryable2.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (merge: queryable merging has a single where expression)"] = function () {
    let queryable1 = new Queryable();
    let queryable2 = new Queryable();

    queryable1 = queryable1.where(expBuilder => {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });
    queryable2 = queryable2
        .where(expBuilder => {
            return expBuilder.property("lastName").isEqualTo("Barnes");
        })
        .merge(queryable1);

    const query = queryable2.getQuery();

    assert.equal("and", query.where.children[0].nodeName);
    assert.equal("Barnes", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].children[1].value);
};

exports["Queryable: Constructor with query (merge: queryable merging has a chained where expression)"] = function () {
    let queryable1 = new Queryable();
    let queryable2 = new Queryable();

    queryable1 = queryable1.where(expBuilder => {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });
    queryable2 = queryable2
        .where(expBuilder => {
            return expBuilder.property("lastName").isEqualTo("Barnes");
        })
        .where(expBuilder => {
            return expBuilder.property("age").isEqualTo(35);
        })
        .merge(queryable1);

    const query = queryable2.getQuery();

    assert.equal("and", query.where.children[0].nodeName);
    assert.equal("Barnes", query.where.children[0].children[0].children[1].value);
    assert.equal(35, query.where.children[0].children[1].children[1].value);
    assert.equal("Jared", query.where.children[0].children[2].children[1].value);
};

exports["Queryable: Constructor with query (merge: merging queryable has an orderBy expression)"] = function () {
    let queryable1 = new Queryable();
    let queryable2 = new Queryable();

    queryable1 = queryable1.orderBy("firstName");
    queryable2 = queryable2.merge(queryable1);

    const query = queryable2.getQuery();

    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (merge: merging queryable has the same orderBy expression as queryable merging)"] = function () {
    let queryable1 = new Queryable();
    let queryable2 = new Queryable();

    queryable1 = queryable1.orderBy("firstName");
    queryable2 = queryable2
        .orderBy("firstName")
        .merge(queryable1);

    const query = queryable2.getQuery();

    assert.equal(1, query.orderBy.length);
};

exports["Queryable: Constructor with query (merge: w/o a queryable passed in)"] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable = queryable.merge();
    });
};

exports["Queryable: Constructor with toArrayAsync called."] = function () {
    let queryable = new Queryable();
    queryable.provider = { toArrayAsync: () => Promise.resolve([]) };

    queryable.toArrayAsync().then(() => {
        assert.ok(true);
    });
};

exports["Queryable: Constructor with toArrayAsync method called w/o provider."] = function () {
    let queryable = new Queryable();

    assert.throws(() => {
        queryable.toArrayAsync();
    });
};

exports["Queryable: Constructor with countAsync called."] = function () {
    let queryable = new Queryable();
    queryable.provider = { countAsync: queryable => Promise.resolve() };

    queryable.countAsync().then(() => {
        assert.ok(true);
    });
};

exports["Queryable: Constructor with toArrayWithCountAsync called."] = function () {
    let queryable = new Queryable();
    queryable.provider = { toArrayWithCountAsync: queryable => Promise.resolve() };

    queryable.toArrayWithCountAsync().then(() => {
        assert.ok(true);
    });
};

exports["Queryable: Constructor with copy called."] = function () {
    let queryable = new Queryable();
    let copiedQueryable = queryable.copy();

    assert.deepEqual(queryable, copiedQueryable);
};

exports["Queryable: IsIn with queryable."] = function () {
    let posts = new Queryable("Post");
    let members = new Queryable("Member").select(["groupId"]).where((expBuilder) => {
        return expBuilder.property("userId").isEqualTo("Bob");
    });

    posts = posts.where((expBuilder) => {
        return expBuilder.property("groupId").isIn(members);
    });

    assert.equal(posts.query.where.children[0].children[1].value, members.getQuery());
};

exports["Queryable: Select, invalid arguments."] = function () {
    let queryable = new Queryable();
    assert.throws(() => {
        queryable.select("bad");
    });
};

exports["Queryable: Select."] = function () {
    let queryable = new Queryable().select({
        "one": "otherOne",
        "two": "otherTwo"
    });

    assert.equal(queryable.query.select.one, "otherOne");
    assert.equal(queryable.query.select.two, "otherTwo");
};

exports["Queryable.toJson: Simple."] = function () {
    let queryable = new Queryable("Source").where((expBuilder) => {
        return expBuilder.property("property").isEqualTo("Value");
    });

    let json = queryable.toJson();
    let queryable2 = Queryable.fromJson(json);
    let json2 = queryable2.toJson();

    assert.equal(json, json2);
}

exports["Queryable.toJson: isIn with query."] = function () {
    let innerQueryable = new Queryable("Target").select(["sourceId"]).where((expBuilder) => {
        return expBuilder.property("property").isEqualTo("John");
    });

    let queryable = new Queryable("Source").select({
        "property1": "prop1"
    }).where((expBuilder) => {
        return expBuilder.property("property").isIn(innerQueryable);
    }).orderBy("property1").take(10).skip(15);

    let json = queryable.toJson();
    let queryable2 = Queryable.fromJson(json);
    let json2 = queryable2.toJson();

    assert.equal(json, json2);
}