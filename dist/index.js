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
	
	var _helpers = __webpack_require__(1);
	
	// LENS ============================================================================================
	function createGetter(key) {
	  return function getter(data) {
	    if (key) {
	      if ((0, _helpers.isImmutable)(data)) {
	        return undefined;
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
	      if (data === undefined) {
	        return [value];
	      } else if ((0, _helpers.isImmutable)(data)) {
	        return data;
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

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function getProperties(obj) {
	  var lst = [];
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      lst.push(key);
	    }
	  }
	  return lst;
	}
	
	function isImmutable(data) {
	  return data === undefined || data === null || typeof data == "string" || typeof data == "number";
	}
	
	exports["default"] = {
	  getProperties: getProperties, isImmutable: isImmutable
	};
	module.exports = exports["default"];

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTZiMTZkZWYyMmEyMGMwZjgzZDciLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O3NCQ2lCd0IsSUFBSTs7b0NBdkRhLENBQVc7OztBQUdwRCxVQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDekIsVUFBTyxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDM0IsU0FBSSxHQUFHLEVBQUU7QUFDUCxXQUFJLGFBTmEsV0FBVyxFQU1aLElBQUksQ0FBQyxFQUFFO0FBQ3JCLGdCQUFPLFNBQVMsQ0FBQztRQUNsQixNQUFNO0FBQ0wsZ0JBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCO01BQ0YsTUFBTTtBQUNMLGNBQU8sSUFBSSxDQUFDO01BQ2I7SUFDRixDQUFDO0VBQ0g7O0FBRUQsVUFBUyxZQUFZLENBQUMsR0FBRyxFQUFFO0FBQ3pCLFVBQU8sU0FBUyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNsQyxTQUFJLEdBQUcsRUFBRTtBQUNQLFdBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN0QixnQkFBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sSUFBSSxhQXRCTSxXQUFXLEVBc0JMLElBQUksQ0FBQyxFQUFFO0FBQzVCLGdCQUFPLElBQUksQ0FBQztRQUNiLE1BQU07QUFDTCxhQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7QUFDekIsZUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLGVBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDbEIsa0JBQU8sSUFBSSxDQUFDO1VBQ2IsTUFBTTtBQUNMLGVBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ25DLGVBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDbEIsa0JBQU8sSUFBSSxDQUFDO1VBQ2I7UUFDRjtNQUNGLE1BQU07QUFDTCxjQUFPLElBQUksQ0FBQztNQUNiO0lBQ0YsQ0FBQztFQUNIOztBQUVELFVBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDbEMsVUFBTztBQUNMLFFBQUcsRUFBRSxNQUFNO0FBQ1gsUUFBRyxFQUFFLE1BQU07O0FBRVgsWUFBTyxtQkFBQyxRQUFRLEVBQUU7QUFDaEIsY0FBTyxVQUFVLENBQ2YsVUFBQyxJQUFJO2dCQUFZLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQUEsRUFDM0MsVUFBQyxJQUFJLEVBQUUsS0FBSztnQkFBSyxNQUFNLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQUEsQ0FDakUsQ0FBQztNQUNIO0lBQ0YsQ0FBQztFQUNIOztBQUVjLFVBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNoQyxPQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVEsRUFBRTtBQUMxQixXQUFNLElBQUksS0FBSyxzQ0FBb0MsT0FBTyxHQUFHLENBQUcsQ0FBQztJQUNsRTtBQUNELE9BQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFdBQUM7WUFBSSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUFBLENBQUMsQ0FBQztBQUNqRixVQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsUUFBUTtZQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQUEsQ0FBQyxDQUFDO0VBQ2hFOzs7Ozs7Ozs7Ozs7O0FDN0RELFVBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUMxQixPQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixRQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtBQUNuQixTQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDM0IsVUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUNmO0lBQ0Y7QUFDRCxVQUFPLEdBQUcsQ0FBQztFQUNaOztBQUVELFVBQVMsV0FBVyxDQUFDLElBQUksRUFBRTtBQUN6QixVQUFPLElBQUksS0FBSyxTQUFTLElBQ2xCLElBQUksS0FBSyxJQUFJLElBQ2IsT0FBTyxJQUFJLElBQUksUUFBUSxJQUN2QixPQUFPLElBQUksSUFBSSxRQUFRLENBQUM7RUFDaEM7O3NCQUVjO0FBQ2IsZ0JBQWEsRUFBYixhQUFhLEVBQUUsV0FBVyxFQUFYLFdBQVc7RUFDM0IiLCJmaWxlIjoiZGlzdC9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZTZiMTZkZWYyMmEyMGMwZjgzZDdcbiAqKi8iLCJpbXBvcnQge2dldFByb3BlcnRpZXMsIGlzSW1tdXRhYmxlfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbi8vIExFTlMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmZ1bmN0aW9uIGNyZWF0ZUdldHRlcihrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldHRlcihkYXRhKSB7XG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKGlzSW1tdXRhYmxlKGRhdGEpKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNldHRlcihrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHNldHRlcihkYXRhLCB2YWx1ZSkge1xuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIFt2YWx1ZV07XG4gICAgICB9IGVsc2UgaWYgKGlzSW1tdXRhYmxlKGRhdGEpKSB7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGxldCBjb3B5ID0gZGF0YS5zbGljZSgpO1xuICAgICAgICAgIGNvcHlba2V5XSA9IHZhbHVlO1xuICAgICAgICAgIHJldHVybiBjb3B5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBjb3B5ID0gT2JqZWN0LmFzc2lnbih7fSwgZGF0YSk7XG4gICAgICAgICAgY29weVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgcmV0dXJuIGNvcHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMZW5zKGdldHRlciwgc2V0dGVyKSB7XG4gIHJldHVybiB7XG4gICAgZ2V0OiBnZXR0ZXIsXG4gICAgc2V0OiBzZXR0ZXIsXG5cbiAgICBjb21wb3NlKG5leHRMZW5zKSB7XG4gICAgICByZXR1cm4gY3JlYXRlTGVucyhcbiAgICAgICAgKGRhdGEpICAgICAgICA9PiBuZXh0TGVucy5nZXQoZ2V0dGVyKGRhdGEpKSxcbiAgICAgICAgKGRhdGEsIHZhbHVlKSA9PiBzZXR0ZXIoZGF0YSwgbmV4dExlbnMuc2V0KGdldHRlcihkYXRhKSwgdmFsdWUpKVxuICAgICAgKTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExlbnMoa2V5KSB7XG4gIGlmICh0eXBlb2Yga2V5ICE9IFwic3RyaW5nXCIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGtleSBtdXN0IGJlIG9mIHN0cmluZyB0eXBlLCBnb3QgJHt0eXBlb2Yga2V5fWApO1xuICB9XG4gIGxldCBsZW5zID0ga2V5LnNwbGl0KFwiLlwiKS5tYXAoayA9PiBjcmVhdGVMZW5zKGNyZWF0ZUdldHRlcihrKSwgY3JlYXRlU2V0dGVyKGspKSk7XG4gIHJldHVybiBsZW5zLnJlZHVjZSgobGVucywgbmV4dExlbnMpID0+IGxlbnMuY29tcG9zZShuZXh0TGVucykpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKi8iLCJmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKG9iaikge1xuICBsZXQgbHN0ID0gW107XG4gIGZvciAobGV0IGtleSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGxzdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBsc3Q7XG59XG5cbmZ1bmN0aW9uIGlzSW1tdXRhYmxlKGRhdGEpIHtcbiAgcmV0dXJuIGRhdGEgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgZGF0YSA9PT0gbnVsbCB8fFxuICAgICAgICAgdHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIiB8fFxuICAgICAgICAgdHlwZW9mIGRhdGEgPT0gXCJudW1iZXJcIjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRQcm9wZXJ0aWVzLCBpc0ltbXV0YWJsZSxcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9oZWxwZXJzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==