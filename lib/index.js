"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Lens;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _util = require("util");

var _helpers = require("./helpers");

// LENS ============================================================================================
function createGetter(key) {
  return function getter(data) {
    if (key) {
      if ((0, _helpers.isImmutable)(data)) {
        throw new Error("can't get key " + (0, _util.inspect)(key) + " from immutable data " + (0, _util.inspect)(data));
      } else {
        return data[key];
      }
    } else {
      return data;
    }
  };
}

function createSetter(key) {
  return function setter(data, value) {
    if (key) {
      if (data === undefined || data === null) {
        if ((0, _helpers.isNumeric)(key)) {
          var array = [];
          array[key] = value;
          return array;
        } else {
          return _defineProperty({}, key, value);
        }
      } else if ((0, _helpers.isImmutable)(data)) {
        throw new Error("can't set value " + (0, _util.inspect)(value) + " by key " + (0, _util.inspect)(key) + " to immutable data " + (0, _util.inspect)(data));
      } else {
        if (data instanceof Array) {
          var copy = data.slice();
          copy[key] = value;
          return copy;
        } else {
          var copy = Object.assign({}, data);
          copy[key] = value;
          return copy;
        }
      }
    } else {
      return data;
    }
  };
}

function createLens(getter, setter) {
  return {
    get: getter,
    set: setter,

    compose: function compose(nextLens) {
      return createLens(function (data) {
        return nextLens.get(getter(data));
      }, function (data, value) {
        return setter(data, nextLens.set(getter(data), value));
      });
    }
  };
}

function Lens(key) {
  if (typeof key != "string") {
    throw new Error("key must be of string type, got " + typeof key);
  }
  var lens = key.split(".").map(function (k) {
    return createLens(createGetter(k), createSetter(k));
  });
  return lens.reduce(function (lens, nextLens) {
    return lens.compose(nextLens);
  });
}

module.exports = exports["default"];