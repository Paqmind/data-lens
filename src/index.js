import {inspect} from "util";
import {isImmutable, isNumeric} from "./helpers";

// LENS ============================================================================================
function createGetter(key) {
  return function getter(data) {
    if (key) {
      if (isImmutable(data)) {
        throw new Error(`can't get key ${inspect(key)} from immutable data ${inspect(data)}`);
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
        if (isNumeric(key)) {
          let array = [];
          array[key] = value;
          return array;
        } else {
          return {[key]: value};
        }
      }
      else if (isImmutable(data)) {
        throw new Error(`can't set value ${inspect(value)} by key ${inspect(key)} to immutable data ${inspect(data)}`);
      } else {
        if (data instanceof Array) {
          let copy = data.slice();
          copy[key] = value;
          return copy;
        } else {
          let copy = Object.assign({}, data);
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

    compose(nextLens) {
      return createLens(
        (data)        => nextLens.get(getter(data)),
        (data, value) => setter(data, nextLens.set(getter(data), value))
      );
    }
  };
}

export default function Lens(key) {
  if (typeof key != "string") {
    throw new Error(`key must be of string type, got ${typeof key}`);
  }
  let lens = key.split(".").map(k => createLens(createGetter(k), createSetter(k)));
  return lens.reduce((lens, nextLens) => lens.compose(nextLens));
}
