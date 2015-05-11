let chai = require("chai");
let expect = chai.expect;

let Lens = require("../src/index");

chai.use(function(chai, utils) {
  let Assertion = chai.Assertion;
  let toString = Object.prototype.toString;
  let flag = utils.flag;

  Assertion.addMethod("equals", function assertImmutableEql(obj, msg) {
    if (msg) flag(this, "message", msg);
    this.assert(
        obj.equals ? obj.equals(this._obj) : utils.eql(obj, this._obj)
      , "expected #{this} to be equal #{exp}"
      , "expected #{this} to not be equal #{exp}"
      , obj
      , this._obj
      , true
    );
  });
});

describe("Lens", function() {
  it("should throw when key is not string", function() {
    let data = {};

    expect(() => Lens(undefined)).to.throw("key must be of string type, got undefined");
    expect(() => Lens(null)).to.throw("key must be of string type, got object");
    expect(() => Lens(42)).to.throw("key must be of string type, got number");
  });

  describe(".get()", function() {
    it("should return original object for empty key", function() {
      let data = {
        foo: "bar"
      };

      expect(Lens("").get(data)).to.be.eql(data);
    });

    it("should return data for existing keys", function() {
      let data = {
        model: {
          username: "foo",
          tags: ["spam"]
        }
      };

      expect(Lens("model").get(data)).equals({
        username: "foo",
        tags: ["spam"]
      });
      expect(Lens("model.username").get(data)).equals("foo");
      expect(Lens("model.tags").get(data)).equals(["spam"]);
    });

    it("should return undefined for missing keys", function() {
      let data = {
        model: {
          username: "foo",
          tags: ["spam"]
        }
      };

      expect(Lens("wtf").get(data)).to.be.undefined;
      expect(Lens("model.wtf").get(data)).to.be.undefined;
      expect(Lens("model.wtf.username").get(data)).to.be.undefined;
      expect(Lens("model.wtf.tags").get(data)).to.be.undefined;
      expect(Lens("model.username.wtf").get(data)).to.be.undefined;
      expect(Lens("model.tags.wtf").get(data)).to.be.undefined;
    });
  });

  describe(".set()", function() {
    it("should return original object for empty key", function() {
      let data = {
        foo: "bar"
      };

      expect(Lens("").set(data, "whatever")).to.be.eql(data);
    });

    it("should return data for existing keys", function() {
      let data = {
        model: {
          username: "foo",
          tags: ["spam"]
        }
      };

      expect(Lens("model").set(data, "!!!")).equals({
        model: "!!!"
      });
      expect(Lens("model.username").set(data, "!!!")).equals({
        model: {
          username: "!!!",
          tags: ["spam"]
        }
      });
      expect(Lens("model.tags").set(data, ["!!!"])).equals({
        model: {
          username: "foo",
          tags: ["!!!"]
        }
      });
      expect(data).equals({
        model: {
          username: "foo",
          tags: ["spam"]
        }
      });
    });

    it("should return data for missing keys", function() {
      let data = {
        model: {
          username: "foo"
        },
      };

      expect(Lens("foo").set(data, "xxx")).equals({
        model: {
          username: "foo"
        },
        foo: "xxx"
      });
      expect(Lens("model.foo").set(data, "xxx")).equals({
        model: {
          username: "foo", foo: "xxx"},
      });
      expect(data).equals({
        model: {
          username: "foo"},
      });
    });

    it("should not throw for invalid keys", function() {
      let data = {
        username: "foo",
        tags: ["spam"]
      };

      expect(Lens("username.foo").set(data, "xxx")).equals({
        username: "foo",
        tags: ["spam"]
      });
      expect(Lens("username.foo.bar").set(data, "xxx")).equals({
        username: "foo",
        tags: ["spam"]
      });
      expect(data).equals({
        username: "foo",
        tags: ["spam"]
      });
    });

    it("should create nested data stuctures if possible", function() {
      let data = {};

      expect(Lens("foo").set(data, "xxx")).equals({foo: "xxx"});
      expect(Lens("foo.bar").set(data, "xxx")).equals({foo: {bar: "xxx"}});
    });
  });
});