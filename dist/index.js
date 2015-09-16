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
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTk2ZTU0YmJjNjk2ZWM1MDRiMDEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztzQkN5QndCLElBQUk7Ozs7aUNBL0ROLENBQU07O29DQUNTLENBQVc7OztBQUdoRCxVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTyxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDM0IsU0FBSSxHQUFHLEVBQUU7QUFDUCxXQUFJLGFBTkYsV0FBVyxFQU1HLElBQUksQ0FBQyxFQUFFO0FBQ3JCLGVBQU0sSUFBSSxLQUFLLG9CQUFrQixVQVJqQyxPQUFPLEVBUWtDLEdBQUcsQ0FBQyw2QkFBd0IsVUFSckUsT0FBTyxFQVFzRSxJQUFJLENBQUMsQ0FBRyxDQUFDO1FBQ3ZGLE1BQU07QUFDTCxnQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEI7TUFDRixNQUFNO0FBQ0wsY0FBTyxJQUFJLENBQUM7TUFDYjtJQUNGLENBQUM7RUFDSDs7QUFFRCxVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTyxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ2xDLFNBQUksR0FBRyxFQUFFO0FBQ1AsV0FBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7QUFDdkMsYUFBSSxhQXJCUyxTQUFT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QUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0M7O3NCQUVjO0FBQ2IsVUFBTyxFQUFQLE9BQU8sRUFBRSxhQUFhLEVBQWIsYUFBYSxFQUFFLFdBQVcsRUFBWCxXQUFXLEVBQUUsU0FBUyxFQUFULFNBQVM7RUFDL0MiLCJmaWxlIjoiZGlzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTk2ZTU0YmJjNjk2ZWM1MDRiMDFcbiAqKi8iLCJpbXBvcnQge2luc3BlY3R9IGZyb20gXCJ1dGlsXCI7XG5pbXBvcnQge2lzSW1tdXRhYmxlLCBpc051bWVyaWN9IGZyb20gXCIuL2hlbHBlcnNcIjtcblxuLy8gTEVOUyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZnVuY3Rpb24gY3JlYXRlR2V0dGVyKGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0dGVyKGRhdGEpIHtcbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAoaXNJbW11dGFibGUoZGF0YSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW4ndCBnZXQga2V5ICR7aW5zcGVjdChrZXkpfSBmcm9tIGltbXV0YWJsZSBkYXRhICR7aW5zcGVjdChkYXRhKX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBkYXRhW2tleV07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2V0dGVyKGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24gc2V0dGVyKGRhdGEsIHZhbHVlKSB7XG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKGRhdGEgPT09IHVuZGVmaW5lZCB8fCBkYXRhID09PSBudWxsKSB7XG4gICAgICAgIGlmIChpc051bWVyaWMoa2V5KSkge1xuICAgICAgICAgIGxldCBhcnJheSA9IFtdO1xuICAgICAgICAgIGFycmF5W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtba2V5XTogdmFsdWV9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0ltbXV0YWJsZShkYXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbid0IHNldCB2YWx1ZSAke2luc3BlY3QodmFsdWUpfSBieSBrZXkgJHtpbnNwZWN0KGtleSl9IHRvIGltbXV0YWJsZSBkYXRhICR7aW5zcGVjdChkYXRhKX1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBsZXQgY29weSA9IGRhdGEuc2xpY2UoKTtcbiAgICAgICAgICBjb3B5W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gY29weTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgY29weSA9IE9iamVjdC5hc3NpZ24oe30sIGRhdGEpO1xuICAgICAgICAgIGNvcHlba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGVucyhnZXR0ZXIsIHNldHRlcikge1xuICByZXR1cm4ge1xuICAgIGdldDogZ2V0dGVyLFxuICAgIHNldDogc2V0dGVyLFxuXG4gICAgY29tcG9zZShuZXh0TGVucykge1xuICAgICAgcmV0dXJuIGNyZWF0ZUxlbnMoXG4gICAgICAgIChkYXRhKSAgICAgICAgPT4gbmV4dExlbnMuZ2V0KGdldHRlcihkYXRhKSksXG4gICAgICAgIChkYXRhLCB2YWx1ZSkgPT4gc2V0dGVyKGRhdGEsIG5leHRMZW5zLnNldChnZXR0ZXIoZGF0YSksIHZhbHVlKSlcbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMZW5zKGtleSkge1xuICBpZiAodHlwZW9mIGtleSAhPSBcInN0cmluZ1wiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBrZXkgbXVzdCBiZSBvZiBzdHJpbmcgdHlwZSwgZ290ICR7dHlwZW9mIGtleX1gKTtcbiAgfVxuICBsZXQgbGVucyA9IGtleS5zcGxpdChcIi5cIikubWFwKGsgPT4gY3JlYXRlTGVucyhjcmVhdGVHZXR0ZXIoayksIGNyZWF0ZVNldHRlcihrKSkpO1xuICByZXR1cm4gbGVucy5yZWR1Y2UoKGxlbnMsIG5leHRMZW5zKSA9PiBsZW5zLmNvbXBvc2UobmV4dExlbnMpKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwidXRpbFwiXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZnVuY3Rpb24gaXNBcnJheShvKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KG8pIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG5mdW5jdGlvbiBpc0ltbXV0YWJsZShkYXRhKSB7XG4gIHJldHVybiAhKGlzQXJyYXkoZGF0YSkgfHwgaXNQbGFpbk9iamVjdChkYXRhKSk7XG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNBcnJheSwgaXNQbGFpbk9iamVjdCwgaXNJbW11dGFibGUsIGlzTnVtZXJpYyxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9oZWxwZXJzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==