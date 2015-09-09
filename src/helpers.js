import isPlainObject from "is-plain-object";

function isImmutable(data) {
  return !(data instanceof Array || isPlainObject(data));
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default {
  isImmutable, isNumeric,
};
