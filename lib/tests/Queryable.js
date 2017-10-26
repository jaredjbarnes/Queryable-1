"use strict";

var _assert = require("assert");

var assert = _interopRequireWildcard(_assert);

var _Queryable = require("./../Queryable");

var _Queryable2 = _interopRequireDefault(_Queryable);

var _ExpressionBuilder = require("../ExpressionBuilder");

var _ExpressionBuilder2 = _interopRequireDefault(_ExpressionBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports["Queryable: Constructor."] = function () {
    var queryable = new _Queryable2.default();
    assert.ok(true);
};

exports["Queryable: Constructor with query (where: single)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.where(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });

    var query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (where: chain)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.where(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    }).where(function (expBuilder) {
        return expBuilder.property("lastName").isEqualTo("Barnes");
    });

    var query = queryable.getQuery();

    assert.equal("and", query.where.children[0].nodeName);
    assert.equal("isEqualTo", query.where.children[0].children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[0].children[1].value);
    assert.equal("isEqualTo", query.where.children[0].children[1].nodeName);
    assert.equal("lastName", query.where.children[0].children[1].children[0].children[1].value);
    assert.equal("Barnes", query.where.children[0].children[1].children[1].value);
};

exports["Queryable: Constructor with query (where: with ExpressionBuilder instance.)"] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isEqualTo("Jared");
    var queryable = new _Queryable2.default();
    queryable = queryable.where(expression);

    var query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (where: w/o lambda or ExpressionBuilder instance)"] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable = queryable.where();
    });
};

exports["Queryable: Constructor with query (orderBy: single)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.orderBy("firstName");

    var query = queryable.getQuery();

    assert.equal("ASC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderBy: chain)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.orderBy("firstName").orderBy("lastName");

    var query = queryable.getQuery();

    assert.equal("ASC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
    assert.equal("ASC", query.orderBy[1].type);
    assert.equal("lastName", query.orderBy[1].column);
};

exports["Queryable: Constructor with query (orderBy: with ExpressionBuilder instance.)"] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var queryable = new _Queryable2.default();
    queryable = queryable.orderBy("firstName");

    var query = queryable.getQuery();

    assert.equal("ASC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderBy: with the same expression called twice.)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.orderBy("firstName").orderBy("firstName");

    var query = queryable.getQuery();

    assert.equal(1, query.orderBy.length);
};

exports["Queryable: Constructor with query (orderBy: w/o lambda or ExpressionBuilder instance)"] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable = queryable.orderBy();
    });
};

exports["Queryable: Constructor with query (take: value === number)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.take(10);

    var query = queryable.getQuery();

    assert.equal(10, query.take);
};

exports["Queryable: Constructor with query (take: value !== number)"] = function () {
    var queryable = new _Queryable2.default();
    assert.throws(function () {
        queryable = queryable.take();
    });
};

exports["Queryable: Constructor with query (skip: value === number)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.skip(10);

    var query = queryable.getQuery();

    assert.equal(10, query.skip);
};

exports["Queryable: Constructor with query (skip: value !== number)"] = function () {
    var queryable = new _Queryable2.default();
    assert.throws(function () {
        queryable = queryable.skip();
    });
};

exports["Queryable: Constructor with query (or: single)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.or(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });

    var query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (or: chain)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.or(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    }).or(function (expBuilder) {
        return expBuilder.property("lastName").isEqualTo("Barnes");
    });

    var query = queryable.getQuery();

    assert.equal("or", query.where.children[0].nodeName);
    assert.equal("isEqualTo", query.where.children[0].children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[0].children[1].value);
    assert.equal("isEqualTo", query.where.children[0].children[1].nodeName);
    assert.equal("lastName", query.where.children[0].children[1].children[0].children[1].value);
    assert.equal("Barnes", query.where.children[0].children[1].children[1].value);
};

exports["Queryable: Constructor with query (or: with ExpressionBuilder instance.)"] = function () {
    var expressionBuilder = new _ExpressionBuilder2.default();
    var expression = expressionBuilder.property("firstName").isEqualTo("Jared");
    var queryable = new _Queryable2.default();
    queryable = queryable.or(expression);

    var query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (or: w/o lambda or ExpressionBuilder instance)"] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable = queryable.or();
    });
};

exports["Queryable: Constructor with query (and: single)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.and(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });

    var query = queryable.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (orderByDesc: single)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.orderByDesc("firstName");

    var query = queryable.getQuery();

    assert.equal("DESC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderByDesc: chain)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.orderByDesc("firstName").orderByDesc("lastName");

    var query = queryable.getQuery();

    assert.equal("DESC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
    assert.equal("DESC", query.orderBy[1].type);
    assert.equal("lastName", query.orderBy[1].column);
};

exports["Queryable: Constructor with query (orderByDesc: with ExpressionBuilder instance.)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.orderByDesc("firstName");

    var query = queryable.getQuery();

    assert.equal("DESC", query.orderBy[0].type);
    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (orderByDesc: with the same expression called twice.)"] = function () {
    var queryable = new _Queryable2.default();
    queryable = queryable.orderByDesc("firstName").orderByDesc("firstName");

    var query = queryable.getQuery();

    assert.equal(1, query.orderBy.length);
};

exports["Queryable: Constructor with query (orderByDesc: w/o lambda or ExpressionBuilder instance)"] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable = queryable.orderByDesc();
    });
};

exports["Queryable: Constructor with query (setParameters: obj passed in)"] = function () {
    var queryable = new _Queryable2.default();
    var testParameters = { test1: 1, test2: 2 };
    queryable = queryable.setParameters(testParameters);

    var query = queryable.getQuery();

    assert.deepEqual(testParameters, query.parameters);
};

exports["Queryable: Constructor with query (setParameters: w/o parameters passed in)"] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable = queryable.setParameters();
    });
};

exports["Queryable: Constructor with query (withParameters: obj passed in)"] = function () {
    var queryable = new _Queryable2.default();
    var testParameters = { test1: 1, test2: 2 };
    queryable = queryable.withParameters(testParameters);

    var query = queryable.getQuery();

    assert.deepEqual(testParameters, query.parameters);
};

exports["Queryable: Constructor with query (withParameters: w/o parameters passed in)"] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable = queryable.withParameters();
    });
};

exports["Queryable: Constructor with query (merge: merging queryable is empty)"] = function () {
    var queryable1 = new _Queryable2.default();
    var queryable2 = new _Queryable2.default();
    queryable2 = queryable2.merge(queryable1);

    var query = queryable2.getQuery();

    assert.equal(0, query.where.children.length);
};

exports["Queryable: Constructor with query (merge: queryable merging doesn't have anything to copy)"] = function () {
    var queryable1 = new _Queryable2.default();
    var queryable2 = new _Queryable2.default();

    queryable1 = queryable1.where(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });
    queryable2 = queryable2.merge(queryable1);

    var query = queryable2.getQuery();

    assert.equal("isEqualTo", query.where.children[0].nodeName);
    assert.equal("firstName", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].value);
};

exports["Queryable: Constructor with query (merge: queryable merging has a single where expression)"] = function () {
    var queryable1 = new _Queryable2.default();
    var queryable2 = new _Queryable2.default();

    queryable1 = queryable1.where(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });
    queryable2 = queryable2.where(function (expBuilder) {
        return expBuilder.property("lastName").isEqualTo("Barnes");
    }).merge(queryable1);

    var query = queryable2.getQuery();

    assert.equal("and", query.where.children[0].nodeName);
    assert.equal("Barnes", query.where.children[0].children[0].children[1].value);
    assert.equal("Jared", query.where.children[0].children[1].children[1].value);
};

exports["Queryable: Constructor with query (merge: queryable merging has a chained where expression)"] = function () {
    var queryable1 = new _Queryable2.default();
    var queryable2 = new _Queryable2.default();

    queryable1 = queryable1.where(function (expBuilder) {
        return expBuilder.property("firstName").isEqualTo("Jared");
    });
    queryable2 = queryable2.where(function (expBuilder) {
        return expBuilder.property("lastName").isEqualTo("Barnes");
    }).where(function (expBuilder) {
        return expBuilder.property("age").isEqualTo(35);
    }).merge(queryable1);

    var query = queryable2.getQuery();

    assert.equal("and", query.where.children[0].nodeName);
    assert.equal("Barnes", query.where.children[0].children[0].children[1].value);
    assert.equal(35, query.where.children[0].children[1].children[1].value);
    assert.equal("Jared", query.where.children[0].children[2].children[1].value);
};

exports["Queryable: Constructor with query (merge: merging queryable has an orderBy expression)"] = function () {
    var queryable1 = new _Queryable2.default();
    var queryable2 = new _Queryable2.default();

    queryable1 = queryable1.orderBy("firstName");
    queryable2 = queryable2.merge(queryable1);

    var query = queryable2.getQuery();

    assert.equal("firstName", query.orderBy[0].column);
};

exports["Queryable: Constructor with query (merge: merging queryable has the same orderBy expression as queryable merging)"] = function () {
    var queryable1 = new _Queryable2.default();
    var queryable2 = new _Queryable2.default();

    queryable1 = queryable1.orderBy("firstName");
    queryable2 = queryable2.orderBy("firstName").merge(queryable1);

    var query = queryable2.getQuery();

    assert.equal(1, query.orderBy.length);
};

exports["Queryable: Constructor with query (merge: w/o a queryable passed in)"] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable = queryable.merge();
    });
};

exports["Queryable: Constructor with toArrayAsync called."] = function () {
    var queryable = new _Queryable2.default();
    queryable.provider = { toArrayAsync: function toArrayAsync() {
            return Promise.resolve([]);
        } };

    queryable.toArrayAsync().then(function () {
        assert.ok(true);
    });
};

exports["Queryable: Constructor with toArrayAsync method called w/o provider."] = function () {
    var queryable = new _Queryable2.default();

    assert.throws(function () {
        queryable.toArrayAsync();
    });
};

exports["Queryable: Constructor with countAsync called."] = function () {
    var queryable = new _Queryable2.default();
    queryable.provider = { countAsync: function countAsync(queryable) {
            return Promise.resolve();
        } };

    queryable.countAsync().then(function () {
        assert.ok(true);
    });
};

exports["Queryable: Constructor with toArrayWithCountAsync called."] = function () {
    var queryable = new _Queryable2.default();
    queryable.provider = { toArrayWithCountAsync: function toArrayWithCountAsync(queryable) {
            return Promise.resolve();
        } };

    queryable.toArrayWithCountAsync().then(function () {
        assert.ok(true);
    });
};

exports["Queryable: Constructor with copy called."] = function () {
    var queryable = new _Queryable2.default();
    var copiedQueryable = queryable.copy();

    assert.deepEqual(queryable, copiedQueryable);
};

exports["Queryable: IsIn with queryable."] = function () {
    var posts = new _Queryable2.default("Post");
    var members = new _Queryable2.default("Member").select(["groupId"]).where(function (expBuilder) {
        return expBuilder.property("userId").isEqualTo("Bob");
    });

    posts = posts.where(function (expBuilder) {
        return expBuilder.property("groupId").isIn(members);
    });

    assert.equal(posts.query.where.children[0].children[1].value, members.getQuery());
};

exports["Queryable: Select, invalid arguments."] = function () {
    var queryable = new _Queryable2.default();
    assert.throws(function () {
        queryable.select("bad");
    });
};

exports["Queryable: Select."] = function () {
    var queryable = new _Queryable2.default().select({
        "one": "otherOne",
        "two": "otherTwo"
    });

    assert.equal(queryable.query.select.one, "otherOne");
    assert.equal(queryable.query.select.two, "otherTwo");
};

exports["Queryable.toJson: Simple."] = function () {
    var queryable = new _Queryable2.default("Source").where(function (expBuilder) {
        return expBuilder.property("property").isEqualTo("Value");
    });

    var json = queryable.toJson();
    var queryable2 = _Queryable2.default.fromJson(json);
    var json2 = queryable2.toJson();

    assert.equal(json, json2);
};

exports["Queryable.toJson: isIn with query."] = function () {
    var innerQueryable = new _Queryable2.default("Target").select(["sourceId"]).where(function (expBuilder) {
        return expBuilder.property("property").isEqualTo("John");
    });

    var queryable = new _Queryable2.default("Source").select({
        "property1": "prop1"
    }).where(function (expBuilder) {
        return expBuilder.property("property").isIn(innerQueryable);
    }).orderBy("property1").take(10).skip(15);

    var json = queryable.toJson();
    var queryable2 = _Queryable2.default.fromJson(json);
    var json2 = queryable2.toJson();

    assert.equal(json, json2);
};
//# sourceMappingURL=Queryable.js.map