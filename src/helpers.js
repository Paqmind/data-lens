function isArray(o) {
  return toString.call(o) === '[object Array]';
}

function isPlainObject(o) {
  return toString.call(o) === '[object Object]';
}

function isImmutable(data) {
  return !(data instanceof Array || isPlainObject(data));
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  isArray, isPlainObject, isImmutable, isNumeric,
};
