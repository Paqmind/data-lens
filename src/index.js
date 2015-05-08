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
    if (isImmutable(data)) {
      return undefined;
    } else {
      return data[key];
    }
  };
}

function createImmutableGetter(key) {
  let getter = createNativeGetter(key);
  return function immutableGetter(data) {
    if (isImmutable(data)) {
      return undefined;
    }
    else if (data.get instanceof Function) {
      return data.get(key);
    } else {
      return getter(data);
    }
  };
}

function createNativeSetter(key) {
  return function setter(data, value) {
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
  };
}

function createImmutableSetter(key) {
  let setter = createNativeSetter(key);
  return function immutableSetter(data, value) {
    if (isImmutable(data)) {
      return data;
    }
    else if (data.set instanceof Function) {
      return data.set(key, value);
    } else {
      return setter(data, value);
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
  let lens = key.split(".").map((k) => {
    return Lens(createNativeGetter(k), createNativeSetter(k))
  });
  return lens.reduce((lens, nextLens) => lens.compose(nextLens));
}

export function immutableLens(key) {
  let lens = key.split(".").map((k) => {
    return Lens(createImmutableGetter(k), createImmutableSetter(k))
  });
  return lens.reduce((memo, val) => memo.compose(val));
}
