import {getProperties, isImmutable} from "./helpers";

// LENS ============================================================================================
function createGetter(key) {
  return function getter(data) {
    if (key) {
      if (isImmutable(data)) {
        return undefined;
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
      if (data === undefined) {
        return [value];
      } else if (isImmutable(data)) {
        return data;
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
