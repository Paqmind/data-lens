let chai = require("chai");
let expect = chai.expect;
let {List, Map} = require("immutable");

let nativeLens = require("../src/index").nativeLens;
let immutableLens = require("../src/index").immutableLens;

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

describe("Native Lens", function() {
  it("should throw when key is not string", function() {
    let data = {};

    expect(() => nativeLens(undefined)).to.throw("key must be of string type, got undefined");
    expect(() => nativeLens(null)).to.throw("key must be of string type, got object");
    expect(() => nativeLens(42)).to.throw("key must be of string type, got number");
  });

  describe(".get()", function() {
    it("should return data for existing keys", function() {
      let data = {
        model: {
          username: "foo",
          tags: ["spam"]
        }
      };

      expect(nativeLens("model").get(data)).equals({
        username: "foo",
        tags: ["spam"]
      });
      expect(nativeLens("model.username").get(data)).equals("foo");
      expect(nativeLens("model.tags").get(data)).equals(["spam"]);
    });

    it("should return undefined for missing keys", function() {
      let data = {
        model: {
          username: "foo",
          tags: ["spam"]
        }
      };

      expect(nativeLens("wtf").get(data)).to.be.undefined;
      expect(nativeLens("model.wtf").get(data)).to.be.undefined;
      expect(nativeLens("model.wtf.username").get(data)).to.be.undefined;
      expect(nativeLens("model.wtf.tags").get(data)).to.be.undefined;
      expect(nativeLens("model.username.wtf").get(data)).to.be.undefined;
      expect(nativeLens("model.tags.wtf").get(data)).to.be.undefined;
    });
  });

  describe(".set()", function() {
    it("should return new data for existing keys", function() {
      let data = {
        model: {
          username: "foo",
          tags: ["spam"]
        }
      };

      expect(nativeLens("model").set(data, "!!!")).equals({
        model: "!!!"
      });
      expect(nativeLens("model.username").set(data, "!!!")).equals({
        model: {
          username: "!!!",
          tags: ["spam"]
        }
      });
      expect(nativeLens("model.tags").set(data, ["!!!"])).equals({
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

    it("should return new data for missing keys", function() {
      let data = {
        model: {
          username: "foo"
        },
      };

      expect(nativeLens("foo").set(data, "xxx")).equals({
        model: {
          username: "foo"
        },
        foo: "xxx"
      });
      expect(nativeLens("model.foo").set(data, "xxx")).equals({
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

      expect(nativeLens("username.foo").set(data, "xxx")).equals({
        username: "foo",
        tags: ["spam"]
      });
      expect(nativeLens("username.foo.bar").set(data, "xxx")).equals({
        username: "foo",
        tags: ["spam"]
      });
      expect(data).equals({
        username: "foo",
        tags: ["spam"]
      });
    });
  });
});

describe("Immutable Lens", function() {
  it("should throw when key is not string", function() {
    let data = {};

    expect(() => immutableLens(undefined)).to.throw("key must be of string type, got undefined");
    expect(() => immutableLens(null)).to.throw("key must be of string type, got object");
    expect(() => immutableLens(42)).to.throw("key must be of string type, got number");
  });

  describe(".get()", function() {
    it("should return data for existing keys", function() {
      let data = Map({
        model: Map({
          username: "foo",
          tags: List(["spam"])
        })
      });

      expect(immutableLens("model").get(data)).equals(Map({
        username: "foo",
        tags: List(["spam"])
      }));
      expect(immutableLens("model.username").get(data)).equals("foo");
      expect(immutableLens("model.tags").get(data)).equals(List(["spam"]));
    });

    it("should return undefined for missing keys", function() {
      let data = Map({
        model: Map({
          username: "foo",
          tags: List(["spam"])
        })
      });

      expect(immutableLens("wtf").get(data)).to.be.undefined;
      expect(immutableLens("model.wtf").get(data)).to.be.undefined;
      expect(immutableLens("model.wtf.username").get(data)).to.be.undefined;
      expect(immutableLens("model.wtf.tags").get(data)).to.be.undefined;
      expect(immutableLens("model.username.wtf").get(data)).to.be.undefined;
      expect(immutableLens("model.tags.wtf").get(data)).to.be.undefined;
    });
  });

  describe(".set()", function() {
    it("should return new data for existing keys", function() {
      let data = Map({
        model: Map({
          username: "foo",
          tags: List(["spam"])
        })
      });

      expect(immutableLens("model").set(data, "!!!")).equals(Map({
        model: "!!!"
      }));
      expect(immutableLens("model.username").set(data, "!!!")).equals(Map({
        model: Map({
          username: "!!!",
          tags: List(["spam"])
        })
      }));
      expect(immutableLens("model.tags").set(data, List(["!!!"]))).equals(Map({
        model: Map({
          username: "foo",
          tags: List(["!!!"])
        })

      }));
      expect(data).equals(Map({
        model: Map({
          username: "foo",
          tags: List(["spam"])
        })
      }));
    });

    it("should return new data for missing keys", function() {
      let data = Map({
        model: Map({
          username: "foo",
        })
      });

      expect(immutableLens("foo").set(data, "xxx")).equals(Map({
        model: Map({
          username: "foo"
        }),
        foo: "xxx",
      }));
      expect(immutableLens("model.foo").set(data, "xxx")).equals(Map({
        model: Map({
          username: "foo",
          foo: "xxx"
        }),
      }));
      expect(data).equals(Map({
        model: Map({
          username: "foo"
        })
      }));
    });

    it("should not throw for invalid keys", function() {
      let data = Map({
        username: "foo",
        tags: List(["spam"])
      });

      expect(immutableLens("username.foo").set(data, "xxx")).equals(Map({
        username: "foo",
        tags: List(["spam"])
      }));
      expect(immutableLens("username.foo.bar").set(data, "xxx")).equals(Map({
        username: "foo",
        tags: List(["spam"])
      }));
      expect(data).equals(Map({
        username: "foo",
        tags: List(["spam"])
      }));
    });
  });
});
