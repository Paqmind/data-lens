module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = Lens;
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _util = __webpack_require__(1);
	
	var _helpers = __webpack_require__(2);
	
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("util");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _isPlainObject = __webpack_require__(3);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	function isImmutable(data) {
	  return !(data instanceof Array || (0, _isPlainObject2["default"])(data));
	}
	
	function isNumeric(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
	exports["default"] = {
	  isImmutable: isImmutable, isNumeric: isNumeric
	};
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(4);
	
	function isObjectObject(o) {
	  return isObject(o) === true
	    && Object.prototype.toString.call(o) === '[object Object]';
	}
	
	module.exports = function isPlainObject(o) {
	  var ctor,prot;
	  
	  if (isObjectObject(o) === false) return false;
	  
	  // If has modified constructor
	  ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;
	  
	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;
	  
	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }
	  
	  // Most likely a plain Object
	  return true;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object'
	    && !Array.isArray(val);
	};


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTg4MTg2NmNkY2JjYzMxYmU1YmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLXBsYWluLW9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLXBsYWluLW9iamVjdC9+L2lzb2JqZWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O3NCQ3lCd0IsSUFBSTs7OztpQ0EvRE4sQ0FBTTs7b0NBQ1MsQ0FBVzs7O0FBR2hELFVBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRTtBQUN6QixVQUFPLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRTtBQUMzQixTQUFJLEdBQUcsRUFBRTtBQUNQLFdBQUksYUFORixXQUFXLEVBTUcsSUFBSSxDQUFDLEVBQUU7QUFDckIsZUFBTSxJQUFJLEtBQUssb0JBQWtCLFVBUmpDLE9BQU8sRUFRa0MsR0FBRyxDQUFDLDZCQUF3QixVQVJyRSxPQUFPLEVBUXNFLElBQUksQ0FBQyxDQUFHLENBQUM7UUFDdkYsTUFBTTtBQUNMLGdCQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQjtNQUNGLE1BQU07QUFDTCxjQUFPLElBQUksQ0FBQztNQUNiO0lBQ0YsQ0FBQztFQUNIOztBQUVELFVBQVMsWUFBWSxDQUFDLEdBQUcsRUFBRTtBQUN6QixVQUFPLFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVB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VyxFQUFYLFdBQVcsRUFBRSxTQUFTLEVBQVQsU0FBUztFQUN2Qjs7Ozs7OztBQ1pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJkaXN0L2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5ODgxODY2Y2RjYmNjMzFiZTViZlxuICoqLyIsImltcG9ydCB7aW5zcGVjdH0gZnJvbSBcInV0aWxcIjtcbmltcG9ydCB7aXNJbW11dGFibGUsIGlzTnVtZXJpY30gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG4vLyBMRU5TID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5mdW5jdGlvbiBjcmVhdGVHZXR0ZXIoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiBnZXR0ZXIoZGF0YSkge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChpc0ltbXV0YWJsZShkYXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbid0IGdldCBrZXkgJHtpbnNwZWN0KGtleSl9IGZyb20gaW1tdXRhYmxlIGRhdGEgJHtpbnNwZWN0KGRhdGEpfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRhdGFba2V5XTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTZXR0ZXIoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiBzZXR0ZXIoZGF0YSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8IGRhdGEgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGlzTnVtZXJpYyhrZXkpKSB7XG4gICAgICAgICAgbGV0IGFycmF5ID0gW107XG4gICAgICAgICAgYXJyYXlba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiBhcnJheTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4ge1trZXldOiB2YWx1ZX07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzSW1tdXRhYmxlKGRhdGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2FuJ3Qgc2V0IHZhbHVlICR7aW5zcGVjdCh2YWx1ZSl9IGJ5IGtleSAke2luc3BlY3Qoa2V5KX0gdG8gaW1tdXRhYmxlIGRhdGEgJHtpbnNwZWN0KGRhdGEpfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGxldCBjb3B5ID0gZGF0YS5zbGljZSgpO1xuICAgICAgICAgIGNvcHlba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBjb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgICAgY29weVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMZW5zKGdldHRlciwgc2V0dGVyKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBnZXR0ZXIsXG4gICAgc2V0OiBzZXR0ZXIsXG5cbiAgICBjb21wb3NlKG5leHRMZW5zKSB7XG4gICAgICByZXR1cm4gY3JlYXRlTGVucyhcbiAgICAgICAgKGRhdGEpICAgICAgICA9PiBuZXh0TGVucy5nZXQoZ2V0dGVyKGRhdGEpKSxcbiAgICAgICAgKGRhdGEsIHZhbHVlKSA9PiBzZXR0ZXIoZGF0YSwgbmV4dExlbnMuc2V0KGdldHRlcihkYXRhKSwgdmFsdWUpKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExlbnMoa2V5KSB7XG4gIGlmICh0eXBlb2Yga2V5ICE9IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGtleSBtdXN0IGJlIG9mIHN0cmluZyB0eXBlLCBnb3QgJHt0eXBlb2Yga2V5fWApO1xuICB9XG4gIGxldCBsZW5zID0ga2V5LnNwbGl0KFwiLlwiKS5tYXAoayA9PiBjcmVhdGVMZW5zKGNyZWF0ZUdldHRlcihrKSwgY3JlYXRlU2V0dGVyKGspKSk7XG4gIHJldHVybiBsZW5zLnJlZHVjZSgobGVucywgbmV4dExlbnMpID0+IGxlbnMuY29tcG9zZShuZXh0TGVucykpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJ1dGlsXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tIFwiaXMtcGxhaW4tb2JqZWN0XCI7XG5cbmZ1bmN0aW9uIGlzSW1tdXRhYmxlKGRhdGEpIHtcbiAgcmV0dXJuICEoZGF0YSBpbnN0YW5jZW9mIEFycmF5IHx8IGlzUGxhaW5PYmplY3QoZGF0YSkpO1xufVxuXG5mdW5jdGlvbiBpc051bWVyaWMobikge1xuICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzSW1tdXRhYmxlLCBpc051bWVyaWMsXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaGVscGVycy5qc1xuICoqLyIsIi8qIVxuICogaXMtcGxhaW4tb2JqZWN0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1wbGFpbi1vYmplY3Q+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXNvYmplY3QnKTtcblxuZnVuY3Rpb24gaXNPYmplY3RPYmplY3Qobykge1xuICByZXR1cm4gaXNPYmplY3QobykgPT09IHRydWVcbiAgICAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzUGxhaW5PYmplY3Qobykge1xuICB2YXIgY3Rvcixwcm90O1xuICBcbiAgaWYgKGlzT2JqZWN0T2JqZWN0KG8pID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICBcbiAgLy8gSWYgaGFzIG1vZGlmaWVkIGNvbnN0cnVjdG9yXG4gIGN0b3IgPSBvLmNvbnN0cnVjdG9yO1xuICBpZiAodHlwZW9mIGN0b3IgIT09ICdmdW5jdGlvbicpIHJldHVybiBmYWxzZTtcbiAgXG4gIC8vIElmIGhhcyBtb2RpZmllZCBwcm90b3R5cGVcbiAgcHJvdCA9IGN0b3IucHJvdG90eXBlO1xuICBpZiAoaXNPYmplY3RPYmplY3QocHJvdCkgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG4gIFxuICAvLyBJZiBjb25zdHJ1Y3RvciBkb2VzIG5vdCBoYXZlIGFuIE9iamVjdC1zcGVjaWZpYyBtZXRob2RcbiAgaWYgKHByb3QuaGFzT3duUHJvcGVydHkoJ2lzUHJvdG90eXBlT2YnKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgXG4gIC8vIE1vc3QgbGlrZWx5IGEgcGxhaW4gT2JqZWN0XG4gIHJldHVybiB0cnVlO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lzLXBsYWluLW9iamVjdC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qIVxuICogaXNvYmplY3QgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L2lzb2JqZWN0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0J1xuICAgICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaXMtcGxhaW4tb2JqZWN0L34vaXNvYmplY3QvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9