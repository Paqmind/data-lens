let chai = require("chai");
let expect = chai.expect;
let _ = require("object.assign").shim();
let {Map} = require("immutable");

let createNativeLens = require("../index").createNativeLens;
let createImmutableLens = require("../index").createImmutableLens;

chai.use(function(chai, utils) {
  let Assertion = chai.Assertion;
  let toString = Object.prototype.toString;
  let flag = utils.flag;

  Assertion.addMethod("equals", function assertImmutableEql(obj, msg) {
    if (msg) flag(this, "message", msg);
    this.assert(
        obj.equals ? obj.equals(flag(this, "object")) : utils.eql(obj, flag(this, "object"))
      , "expected #{this} to be equal #{exp}"
      , "expected #{this} to not be equal #{exp}"
      , obj
      , this._obj
      , true
    );
  });
});

describe("Immutable Lens", function() {
  describe(".get()", function() {
    it("should return immutable data | depth 0", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });

      let lens = createImmutableLens("model");
      expect(lens.get(data)).equals(data.get("model"));
    });

    it("should return immutable data | depth 1", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });

      let lens = createImmutableLens("model.username");
      expect(lens.get(data)).equals(data.get("model").get("username"));
    });

    it("should return undefined for missing keys | depth 0", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });

      let lens = createImmutableLens("model.username.foo");
      expect(lens.get(data)).to.be.undefined;
    });

    it("should return undefined for missing keys | depth 1", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });

      let lens = createImmutableLens("model.username.foo.bar");
      expect(lens.get(data)).to.be.undefined;
    });
  });

  describe(".set()", function() {
    it("should return new immutable data | depth 0", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });
      let lens = createImmutableLens("model");
      expect(lens.set(data, "bar")).equals(Map({model: "bar"}));
    });

    it("should return new immutable data | depth 1", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });

      let lens = createImmutableLens("model.username");
      expect(lens.set(data, "bar")).equals(Map({model: Map({username: "bar"})}));
    });

    it("should do nothing for missing keys | depth 0", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });

      let lens = createImmutableLens("model.username.foo");
      expect(lens.set(data, "xxx")).equals(Map({model: Map({username: "foo"})}));
    });

    it("should do nothing for missing keys | depth 1", function() {
      let data = Map({
        model: Map({
          username: "foo"
        })
      });

      let lens = createImmutableLens("model.username.foo.bar");
      expect(lens.set(data, "xxx")).equals(Map({model: Map({username: "foo"})}));
    });
  });
});
