(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["justGraphql"] = factory();
	else
		root["justGraphql"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.default = justGraphql;
	function justGraphql(path, query) {
	  var queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  var token = arguments[3];
	  var onSuccess = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
	  var onFailure = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
	  var tokenReplacer = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;

	  return transport(path, query, queryParams, token, onSuccess, onFailure, tokenReplacer).then(function (res) {
	    return res;
	  });
	}

	function transport(path, query, queryParams, token, onSuccess, onFailure, tokenReplacer) {
	  function handleStatus(response) {

	    if (onSuccess) {
	      onSuccess(response);
	    }

	    return response.json();
	  }

	  function returnResponseBody(responseBody) {
	    if (responseBody && responseBody.errors) {
	      throw new Error(responseBody.errors);
	    }
	    return responseBody.data;
	  }

	  return fetch(path, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'content-type': 'application/json',
	      'authorization': token
	    },
	    body: JSON.stringify(_extends({
	      query: query
	    }, queryParams))
	  }).then(function (response) {
	    return handleStatus(response);
	  }).then(function (responseBody) {
	    return returnResponseBody(responseBody);
	  }).catch(function (err) {
	    if (tokenReplacer) {
	      return tokenReplacer().then(function (token) {

	        return transport(path, query, queryParams, 'Bearer ' + token, onSuccess, onFailure).then(function (res) {
	          return res;
	        });;
	      }).catch(function (err) {
	        if (onFailure) {
	          onFailure(err);
	        }

	        throw new Error(err);
	      });
	    } else {
	      if (onFailure) {
	        onFailure(err);
	      }

	      throw new Error(err);
	    }
	  });
	}

/***/ }
/******/ ])
});
;