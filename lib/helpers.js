'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
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

exports['default'] = {
  isArray: isArray, isPlainObject: isPlainObject, isImmutable: isImmutable, isNumeric: isNumeric
};
module.exports = exports['default'];