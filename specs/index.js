import Chai from "chai";
import Lens from "../src/index";

let expect = Chai.expect;

describe("Lens", function () {
  it("should throw for non-string keys", function () {
    expect(() => Lens(undefined)).to.throw("key must be of string type, got undefined");
    expect(() => Lens(null)).to.throw("key must be of string type, got object");
    expect(() => Lens(42)).to.throw("key must be of string type, got number");
  });

  describe(".get()", function () {
    it("should return original data for empty keys", function () {
      expect(Lens("").get(null)).eql(null);
      expect(Lens("").get({foo: "bar"})).eql({foo: "bar"});
      expect(Lens("").get(["foo", "bar"])).eql(["foo", "bar"]);
    });

    it("should return values for existing Object keys", function () {
      expect(Lens("username").get({username: "foo"})).eql("foo");
      expect(Lens("model.username").get({model: {username: "foo"}})).eql("foo");
      expect(Lens("model").get({model: {username: "foo"}})).eql({username: "foo"});
    });

    it("should return values for existing Array offsets", function () {
      expect(Lens("0").get(["foo", "bar"])).eql("foo");
      expect(Lens("1").get(["foo", "bar"])).eql("bar");
      expect(Lens("tags.0").get({tags: ["foo", "bar"]})).eql("foo");
      expect(Lens("tags.1").get({tags: ["foo", "bar"]})).eql("bar");
    });

    it("should return undefined for missing Object keys", function () {
      expect(Lens("username").get({})).eql(undefined);
      expect(Lens("model.username").get({model: {}})).eql(undefined);
    });

    it("should return undefined for missing Array offsets", function () {
      expect(Lens("-1").get(["foo", "bar"])).eql(undefined);
      expect(Lens("2").get(["foo", "bar"])).eql(undefined);
      expect(Lens("tags.-1").get({tags: ["foo", "bar"]})).eql(undefined);
      expect(Lens("tags.2").get({tags: ["foo", "bar"]})).eql(undefined);
    });

    it("should throw for 2+ missing Object keys", function () {
      expect(() => Lens("model.username").get({})).to.throw("can't get key 'username' from immutable data undefined");
      expect(() => Lens("model.username").get({model: null})).to.throw("can't get key 'username' from immutable data null");
      expect(() => Lens("model.username.wtf").get({model: {}})).to.throw("can't get key 'wtf' from immutable data undefined");
      expect(() => Lens("model.username.wtf").get({model: {username: null}})).to.throw("can't get key 'wtf' from immutable data null");
    });

    it("should throw for 2+ missing Array offsets", function () {
      expect(() => Lens("tags.0").get({})).to.throw("can't get key '0' from immutable data undefined");
      expect(() => Lens("tags.0").get({tags: null})).to.throw("can't get key '0' from immutable data null");
      expect(() => Lens("model.tags.0").get({model: {}})).to.throw("can't get key '0' from immutable data undefined");
      expect(() => Lens("model.tags.0").get({model: {tags: null}})).to.throw("can't get key '0' from immutable data null");
    });
  });

  describe(".set()", function () {
    it("should return original data for empty keys", function () {
      expect(Lens("").set(null, "whatever")).eql(null);
      expect(Lens("").set({foo: "bar"}, "whatever")).eql({foo: "bar"});
      expect(Lens("").set(["foo", "bar"], "whatever")).eql(["foo", "bar"]);
    });

    it("should not mutate original Objects", function () {
      let data = {foo: "bar"};

      Lens("foo").set(data, "spam");

      expect(data).eql({foo: "bar"});
    });

    it("should not mutate original Arrays", function () {
      let data = ["foo", "bar"];

      Lens("0").set(data, "spam");

      expect(data).eql(["foo", "bar"]);
    });

    it("should update values by Object keys", function () {
      expect(Lens("username").set({username: "john"}, "jack")).eql({username: "jack"});
      expect(Lens("model.username").set({model: {username: "john"}}, "jack")).eql({model: {username: "jack"}});
      expect(Lens("model").set({model: {username: "john"}}, {})).eql({model: {}});
    });

    it("should update values by Array offsets", function () {
      expect(Lens("0").set(["foo", "bar"], "spam")).eql(["spam", "bar"]);
      expect(Lens("1").set(["foo", "bar"], "spam")).eql(["foo", "spam"]);
      expect(Lens("tags.0").set({tags: ["foo", "bar"]}, "spam")).eql({tags: ["spam", "bar"]});
      expect(Lens("tags.1").set({tags: ["foo", "bar"]}, "spam")).eql({tags: ["foo", "spam"]});
    });

    it("should create values for missing Object key", function () {
      expect(Lens("username").set({}, "john")).eql({username: "john"});
      expect(Lens("model.username").set({model: {}}, "john")).eql({model: {username: "john"}});
    });

    it("should create values for missing Array offset", function () {
      expect(Lens("2").set(["foo", "bar"], "spam")).eql(["foo", "bar", "spam"]);
      expect(Lens("2").set([], "foo")).eql([, , "foo"]);
      expect(Lens("tags.2").set({tags: ["foo", "bar"]}, "spam")).eql({tags: ["foo", "bar", "spam"]});
      expect(Lens("tags.2").set({tags: []}, "foo")).eql({tags: [, , "foo"]});
    });

    it("should choose Object over Array for non-numeric keys", function () {
      expect(Lens("username").set(undefined, "jack")).eql({username: "jack"});
    });

    it("should choose Array over Object for numeric keys", function () {
      expect(Lens("0").set(undefined, "foo")).eql(["foo"]);
    });

    it("should throw for invalid structure", function () {
      expect(() => Lens("model.username").set({model: 42}, "john")).to.throw("can't set value 'john' by key 'username' to immutable data 42");
      expect(() => Lens("tags.0").set({tags: "bar"}, "foo")).to.throw("can't set value 'foo' by key '0' to immutable data 'bar'");
    });
  });
});
