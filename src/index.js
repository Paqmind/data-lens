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
  return data === undefined ||
         data === null ||
         typeof data == "string" ||
         typeof data == "number";
}

function createNativeGetter(key) {
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

function createImmutableGetter(key) {
  return function immutableGetter(data) {
    if (key) {
      if (isImmutable(data)) {
        return undefined;
      }
      else if (data.get instanceof Function) {
        return data.get(key);
      } else {
        return createNativeGetter(key)(data);
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

function createImmutableSetter(key) {
  return function immutableSetter(data, value) {
    if (key) {
      if (isImmutable(data)) {
        return data;
      }
      else if (data.set instanceof Function) {
        return data.set(key, value);
      } else {
        return createNativeSetter(key)(data, value);
      }
    } else {
      return data;
    }
  };
}

function Lens(getter, setter) {
  return {
    get: getter,

    set: setter,

    modify(data, func) {
      let val = this.get(data);
      return this.set(data, func(val));
    },

    compose(nextLens) {
      return Lens(
        (data)        => nextLens.get(this.get(data)),
        (data, value) => this.set(data, nextLens.set(this.get(data), value))
      );
    }
  };
}

export function nativeLens(key) {
  if (typeof key != "string") {
    throw new Error(`key must be of string type, got ${typeof key}`);
  }
  let lens = key.split(".").map((k) => {
    return Lens(createNativeGetter(k), createNativeSetter(k))
  });
  return lens.reduce((lens, nextLens) => lens.compose(nextLens));
}

export function immutableLens(key) {
  if (typeof key != "string") {
    throw new Error(`key must be of string type, got ${typeof key}`);
  }
  let lens = key.split(".").map((k) => {
    return Lens(createImmutableGetter(k), createImmutableSetter(k))
  });
  return lens.reduce((memo, val) => memo.compose(val));
}
