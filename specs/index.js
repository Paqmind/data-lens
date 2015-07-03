let chai = require("chai");
let expect = chai.expect;

let Lens = require("../src/index");

describe("Lens", function () {
  it("should throw for non-string keys", function () {
    expect(() => Lens(undefined)).to.throw("key must be of string type, got undefined");
    expect(() => Lens(null)).to.throw("key must be of string type, got object");
    expect(() => Lens(42)).to.throw("key must be of string type, got number");
  });

  describe(".get()", function () {
    it("should return original data for empty keys", function () {
      expect(Lens("").get({foo: "bar"})).eql({foo: "bar"});
      expect(Lens("").get(["foo", "bar"])).eql(["foo", "bar"]);
    });

    describe("flat data", function () {
      it("should return values for existing Object keys", function () {
        expect(Lens("username").get({username: "foo"})).eql("foo");
      });

      it("should return values for existing Array offsets", function () {
        expect(Lens("0").get(["foo", "bar"])).eql("foo");
        expect(Lens("1").get(["foo", "bar"])).eql("bar");
      });

      it("should return undefined for missing Object keys", function () {
        expect(Lens("wtf").get({username: "foo"})).eql(undefined);
        expect(Lens("username.wtf").get({username: "foo"})).eql(undefined);
      });

      it("should return undefined for missing Array offsets", function () {
        expect(Lens("-1").get(["foo", "bar"])).eql(undefined);
        expect(Lens("2").get(["foo", "bar"])).eql(undefined);
      });
    });

    describe("nested data", function () {
      it("should return values for existing Object keys", function () {
        expect(Lens("model").get({model: {username: "foo"}})).eql({username: "foo"});
        expect(Lens("model.username").get({model: {username: "foo"}})).eql("foo");
      });

      it("should return values for existing Array offsets", function () {
        expect(Lens("tags.0").get({tags: ["foo", "bar"]})).eql("foo");
        expect(Lens("tags.1").get({tags: ["foo", "bar"]})).eql("bar");
      });

      it("should return undefined for missing Object keys", function () {
        expect(Lens("model.wtf").get({model: {username: "foo"}})).eql(undefined);
        expect(Lens("model.username.wtf").get({model: {username: "foo"}})).eql(undefined);
      });

      it("should return undefined for missing Array offsets", function () {
        expect(Lens("tags.-1").get({tags: ["foo", "bar"]})).eql(undefined);
        expect(Lens("tags.2").get({tags: ["foo", "bar"]})).eql(undefined);
      });
    });
  });

  describe(".set()", function () {
    it("should return original data for empty keys", function () {
      expect(Lens("").set({foo: "bar"}, "whatever")).eql({foo: "bar"});
      expect(Lens("").set(["foo", "bar"], "whatever")).eql(["foo", "bar"]);
    });

    it("should not mutate original data", function () {
      let data = {foo: "bar"};

      Lens("foo").set(data, "spam");

      expect(data).eql({foo: "bar"});
    });

    describe("flat data", function () {
      it("should return 'updated' values for Object keys", function () {
        expect(Lens("username").set({username: "john"}, "jack")).eql({username: "jack"});
        expect(Lens("password").set({username: "john"}, "root")).eql({username: "john", password: "root"});
        expect(Lens("access").set({}, "admin")).eql({access: "admin"});
      });

      it("should return 'updated' values for Array offsets", function () {
        expect(Lens("0").set(["foo", "bar"], "spam")).eql(["spam", "bar"]);
        expect(Lens("1").set(["foo", "bar"], "spam")).eql(["foo", "spam"]);
        expect(Lens("2").set(["foo", "bar"], "spam")).eql(["foo", "bar", "spam"]);
        expect(Lens("2").set([], "foo")).eql([, , "foo"]);
      });
    });

    describe("nested data", function () {
      it("should return 'updated' values for Object keys", function () {
        expect(Lens("model.username").set({model: {username: "john"}}, "jack")).eql({model: {username: "jack"}});
        expect(Lens("model.password").set({model: {username: "john"}}, "root")).eql({model: {username: "john", password: "root"}});
        expect(Lens("model.access").set({model: {}}, "admin")).eql({model: {access: "admin"}});
      });

      it("should return 'updated' values for Array offsets", function () {
        expect(Lens("tags.0").set({tags: ["foo", "bar"]}, "spam")).eql({tags: ["spam", "bar"]});
        expect(Lens("tags.1").set({tags: ["foo", "bar"]}, "spam")).eql({tags: ["foo", "spam"]});
        expect(Lens("tags.2").set({tags: ["foo", "bar"]}, "spam")).eql({tags: ["foo", "bar", "spam"]});
        expect(Lens("tags.2").set({tags: []}, "foo")).eql({tags: [, , "foo"]});
      });
    });
  });
});
