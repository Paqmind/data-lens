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
	  return !(data instanceof Array || isPlainObject(data));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTlkYjgxZGIzYTQ4ZTk4MTI3MjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInV0aWxcIiIsIndlYnBhY2s6Ly8vLi9zcmMvaGVscGVycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztzQkN5QndCLElBQUk7Ozs7aUNBL0ROLENBQU07O29DQUNTLENBQVc7OztBQUdoRCxVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTyxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDM0IsU0FBSSxHQUFHLEVBQUU7QUFDUCxXQUFJLGFBTkYsV0FBVyxFQU1HLElBQUksQ0FBQyxFQUFFO0FBQ3JCLGVBQU0sSUFBSSxLQUFLLG9CQUFrQixVQVJqQyxPQUFPLEVBUWtDLEdBQUcsQ0FBQyw2QkFBd0IsVUFSckUsT0FBTyxFQVFzRSxJQUFJLENBQUMsQ0FBRyxDQUFDO1FBQ3ZGLE1BQU07QUFDTCxnQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEI7TUFDRixNQUFNO0FBQ0wsY0FBTyxJQUFJLENBQUM7TUFDYjtJQUNGLENBQUM7RUFDSDs7QUFFRCxVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTyxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ2xDLFNBQUksR0FBRyxFQUFFO0FBQ1AsV0FBSSxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7QUFDdkMsYUFBSSxhQXJCUyxTQUFT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QUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdDOztzQkFFYztBQUNiLFVBQU8sRUFBUCxPQUFPLEVBQUUsYUFBYSxFQUFiLGFBQWEsRUFBRSxXQUFXLEVBQVgsV0FBVyxFQUFFLFNBQVMsRUFBVCxTQUFTO0VBQy9DIiwiZmlsZSI6ImRpc3QvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE5ZGI4MWRiM2E0OGU5ODEyNzI2XG4gKiovIiwiaW1wb3J0IHtpbnNwZWN0fSBmcm9tIFwidXRpbFwiO1xuaW1wb3J0IHtpc0ltbXV0YWJsZSwgaXNOdW1lcmljfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbi8vIExFTlMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZUdldHRlcihrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldHRlcihkYXRhKSB7XG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKGlzSW1tdXRhYmxlKGRhdGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgY2FuJ3QgZ2V0IGtleSAke2luc3BlY3Qoa2V5KX0gZnJvbSBpbW11dGFibGUgZGF0YSAke2luc3BlY3QoZGF0YSl9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNldHRlcihrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNldHRlcihkYXRhLCB2YWx1ZSkge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgZGF0YSA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNOdW1lcmljKGtleSkpIHtcbiAgICAgICAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICAgICAgICBhcnJheVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7W2tleV06IHZhbHVlfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNJbW11dGFibGUoZGF0YSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBjYW4ndCBzZXQgdmFsdWUgJHtpbnNwZWN0KHZhbHVlKX0gYnkga2V5ICR7aW5zcGVjdChrZXkpfSB0byBpbW11dGFibGUgZGF0YSAke2luc3BlY3QoZGF0YSl9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgbGV0IGNvcHkgPSBkYXRhLnNsaWNlKCk7XG4gICAgICAgICAgY29weVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGNvcHkgPSBPYmplY3QuYXNzaWduKHt9LCBkYXRhKTtcbiAgICAgICAgICBjb3B5W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gY29weTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxlbnMoZ2V0dGVyLCBzZXR0ZXIpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGdldHRlcixcbiAgICBzZXQ6IHNldHRlcixcblxuICAgIGNvbXBvc2UobmV4dExlbnMpIHtcbiAgICAgIHJldHVybiBjcmVhdGVMZW5zKFxuICAgICAgICAoZGF0YSkgICAgICAgID0+IG5leHRMZW5zLmdldChnZXR0ZXIoZGF0YSkpLFxuICAgICAgICAoZGF0YSwgdmFsdWUpID0+IHNldHRlcihkYXRhLCBuZXh0TGVucy5zZXQoZ2V0dGVyKGRhdGEpLCB2YWx1ZSkpXG4gICAgICApO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGVucyhrZXkpIHtcbiAgaWYgKHR5cGVvZiBrZXkgIT0gXCJzdHJpbmdcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihga2V5IG11c3QgYmUgb2Ygc3RyaW5nIHR5cGUsIGdvdCAke3R5cGVvZiBrZXl9YCk7XG4gIH1cbiAgbGV0IGxlbnMgPSBrZXkuc3BsaXQoXCIuXCIpLm1hcChrID0+IGNyZWF0ZUxlbnMoY3JlYXRlR2V0dGVyKGspLCBjcmVhdGVTZXR0ZXIoaykpKTtcbiAgcmV0dXJuIGxlbnMucmVkdWNlKChsZW5zLCBuZXh0TGVucykgPT4gbGVucy5jb21wb3NlKG5leHRMZW5zKSk7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV0aWxcIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcInV0aWxcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImZ1bmN0aW9uIGlzQXJyYXkobykge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdChvKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuZnVuY3Rpb24gaXNJbW11dGFibGUoZGF0YSkge1xuICByZXR1cm4gIShkYXRhIGluc3RhbmNlb2YgQXJyYXkgfHwgaXNQbGFpbk9iamVjdChkYXRhKSk7XG59XG5cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNBcnJheSwgaXNQbGFpbk9iamVjdCwgaXNJbW11dGFibGUsIGlzTnVtZXJpYyxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9oZWxwZXJzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==