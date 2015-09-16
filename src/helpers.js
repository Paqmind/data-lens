function isArray(o) {
  return toString.call(o) === '[object Array]';
}

function isPlainObject(o) {
  return toString.call(o) === '[object Object]';
}

function isImmutable(data) {
  return !(isArray(data) || isPlainObject(data));
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  isArray, isPlainObject, isImmutable, isNumeric,
};
