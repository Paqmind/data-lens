function properties(obj) {
  let key, lst = [];
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      lst.push(key);
    }
  }
  return lst;
}

function isImmutable(data) {
  return data === null ||
         typeof data == "string" ||
         typeof data == "number";
}

function createNativeGetter(key) {
  return function getter(data) {
    if (key) {
      if (isImmutable(data) || data === undefined) {
        return undefined;
      } else {
        return data[key];
      }
    } else {
      return data;
    }
  };
}

function createNativeSetter(key) {
  return function setter(data, value) {
    if (key) {
      if (isImmutable(data)) {
        return data;
      } else if (data === undefined) {
        return {[key]: value};
      } else {
        let copy = properties(data).reduce((memo, val) => {
          memo[val] = data[val];
          return memo;
        }, {});
        copy[key] = value;
        return copy;
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

    modify(data, func) {
      let val = this.get(data);
      return this.set(data, func(val));
    },

    compose(nextLens) {
      return createLens(
        (data)        => nextLens.get(this.get(data)),
        (data, value) => this.set(data, nextLens.set(this.get(data), value))
      );
    }
  };
}

export default function Lens(key) {
  if (typeof key != "string") {
    throw new Error(`key must be of string type, got ${typeof key}`);
  }
  let lens = key.split(".").map((k) => {
    return createLens(createNativeGetter(k), createNativeSetter(k))
  });
  return lens.reduce((lens, nextLens) => lens.compose(nextLens));
}