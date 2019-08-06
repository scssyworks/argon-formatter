(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.money = {}));
}(this, function (exports) { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var O = 'object';
  var check = function (it) {
    return it && it.Math == Math && it;
  };
  var global_1 =
    check(typeof globalThis == O && globalThis) ||
    check(typeof window == O && window) ||
    check(typeof self == O && self) ||
    check(typeof commonjsGlobal == O && commonjsGlobal) ||
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;
  var objectPropertyIsEnumerable = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;
  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;
  var indexedObject = fails(function () {
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document = global_1.document;
  var EXISTS = isObject(document) && isObject(document.createElement);
  var documentCreateElement = function (it) {
    return EXISTS ? document.createElement(it) : {};
  };

  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) {  }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };
  var objectGetOwnPropertyDescriptor = {
  	f: f$1
  };

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  var nativeDefineProperty = Object.defineProperty;
  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) {  }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var objectDefineProperty = {
  	f: f$2
  };

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      hide(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});
  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.1.3',
    mode:  'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
  });

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap = global_1.WeakMap;
  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

  var id = 0;
  var postfix = Math.random();
  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');
  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;
  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };
  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };
  if (nativeWeakMap) {
    var store = new WeakMap$1();
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }
  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');
  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });
  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else hide(O, key, value);
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };
  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
  };

  var max = Math.max;
  var min$1 = Math.min;
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        if (value != value) return true;
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };
  var arrayIncludes = {
    includes: createMethod(true),
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;
  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };
  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;
  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;
  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };
  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };
  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';
  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      if (options.sham || (targetProperty && targetProperty.sham)) {
        hide(sourceProperty, 'sham', true);
      }
      redefine(target, key, sourceProperty, options);
    }
  };

  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var nativeAssign = Object.assign;
  var objectAssign = !nativeAssign || fails(function () {
    var A = {};
    var B = {};
    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) { B[chr] = chr; });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;
    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    } return T;
  } : nativeAssign;

  _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
    assign: objectAssign
  });

  var assign = path.Object.assign;

  var accounting = createCommonjsModule(function (module, exports) {
  /*!
   * accounting.js v0.4.1
   * Copyright 2014 Open Exchange Rates
   *
   * Freely distributable under the MIT license.
   * Portions of accounting.js are inspired or borrowed from underscore.js
   *
   * Full details and documentation:
   * http://openexchangerates.github.io/accounting.js/
   */
  (function(root, undefined$1) {
  	var lib = {};
  	lib.version = '0.4.1';
  	lib.settings = {
  		currency: {
  			symbol : "$",
  			format : "%s%v",
  			decimal : ".",
  			thousand : ",",
  			precision : 2,
  			grouping : 3
  		},
  		number: {
  			precision : 0,
  			grouping : 3,
  			thousand : ",",
  			decimal : "."
  		}
  	};
  	var nativeMap = Array.prototype.map,
  		nativeIsArray = Array.isArray,
  		toString = Object.prototype.toString;
  	function isString(obj) {
  		return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
  	}
  	function isArray(obj) {
  		return nativeIsArray ? nativeIsArray(obj) : toString.call(obj) === '[object Array]';
  	}
  	function isObject(obj) {
  		return obj && toString.call(obj) === '[object Object]';
  	}
  	function defaults(object, defs) {
  		var key;
  		object = object || {};
  		defs = defs || {};
  		for (key in defs) {
  			if (defs.hasOwnProperty(key)) {
  				if (object[key] == null) object[key] = defs[key];
  			}
  		}
  		return object;
  	}
  	function map(obj, iterator, context) {
  		var results = [], i, j;
  		if (!obj) return results;
  		if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
  		for (i = 0, j = obj.length; i < j; i++ ) {
  			results[i] = iterator.call(context, obj[i], i, obj);
  		}
  		return results;
  	}
  	function checkPrecision(val, base) {
  		val = Math.round(Math.abs(val));
  		return isNaN(val)? base : val;
  	}
  	function checkCurrencyFormat(format) {
  		var defaults = lib.settings.currency.format;
  		if ( typeof format === "function" ) format = format();
  		if ( isString( format ) && format.match("%v") ) {
  			return {
  				pos : format,
  				neg : format.replace("-", "").replace("%v", "-%v"),
  				zero : format
  			};
  		} else if ( !format || !format.pos || !format.pos.match("%v") ) {
  			return ( !isString( defaults ) ) ? defaults : lib.settings.currency.format = {
  				pos : defaults,
  				neg : defaults.replace("%v", "-%v"),
  				zero : defaults
  			};
  		}
  		return format;
  	}
  	var unformat = lib.unformat = lib.parse = function(value, decimal) {
  		if (isArray(value)) {
  			return map(value, function(val) {
  				return unformat(val, decimal);
  			});
  		}
  		value = value || 0;
  		if (typeof value === "number") return value;
  		decimal = decimal || lib.settings.number.decimal;
  		var regex = new RegExp("[^0-9-" + decimal + "]", ["g"]),
  			unformatted = parseFloat(
  				("" + value)
  				.replace(/\((.*)\)/, "-$1")
  				.replace(regex, '')
  				.replace(decimal, '.')
  			);
  		return !isNaN(unformatted) ? unformatted : 0;
  	};
  	var toFixed = lib.toFixed = function(value, precision) {
  		precision = checkPrecision(precision, lib.settings.number.precision);
  		var power = Math.pow(10, precision);
  		return (Math.round(lib.unformat(value) * power) / power).toFixed(precision);
  	};
  	var formatNumber = lib.formatNumber = lib.format = function(number, precision, thousand, decimal) {
  		if (isArray(number)) {
  			return map(number, function(val) {
  				return formatNumber(val, precision, thousand, decimal);
  			});
  		}
  		number = unformat(number);
  		var opts = defaults(
  				(isObject(precision) ? precision : {
  					precision : precision,
  					thousand : thousand,
  					decimal : decimal
  				}),
  				lib.settings.number
  			),
  			usePrecision = checkPrecision(opts.precision),
  			negative = number < 0 ? "-" : "",
  			base = parseInt(toFixed(Math.abs(number || 0), usePrecision), 10) + "",
  			mod = base.length > 3 ? base.length % 3 : 0;
  		return negative + (mod ? base.substr(0, mod) + opts.thousand : "") + base.substr(mod).replace(/(\d{3})(?=\d)/g, "$1" + opts.thousand) + (usePrecision ? opts.decimal + toFixed(Math.abs(number), usePrecision).split('.')[1] : "");
  	};
  	var formatMoney = lib.formatMoney = function(number, symbol, precision, thousand, decimal, format) {
  		if (isArray(number)) {
  			return map(number, function(val){
  				return formatMoney(val, symbol, precision, thousand, decimal, format);
  			});
  		}
  		number = unformat(number);
  		var opts = defaults(
  				(isObject(symbol) ? symbol : {
  					symbol : symbol,
  					precision : precision,
  					thousand : thousand,
  					decimal : decimal,
  					format : format
  				}),
  				lib.settings.currency
  			),
  			formats = checkCurrencyFormat(opts.format),
  			useFormat = number > 0 ? formats.pos : number < 0 ? formats.neg : formats.zero;
  		return useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(number), checkPrecision(opts.precision), opts.thousand, opts.decimal));
  	};
  	lib.formatColumn = function(list, symbol, precision, thousand, decimal, format) {
  		if (!list) return [];
  		var opts = defaults(
  				(isObject(symbol) ? symbol : {
  					symbol : symbol,
  					precision : precision,
  					thousand : thousand,
  					decimal : decimal,
  					format : format
  				}),
  				lib.settings.currency
  			),
  			formats = checkCurrencyFormat(opts.format),
  			padAfterSymbol = formats.pos.indexOf("%s") < formats.pos.indexOf("%v") ? true : false,
  			maxLength = 0,
  			formatted = map(list, function(val, i) {
  				if (isArray(val)) {
  					return lib.formatColumn(val, opts);
  				} else {
  					val = unformat(val);
  					var useFormat = val > 0 ? formats.pos : val < 0 ? formats.neg : formats.zero,
  						fVal = useFormat.replace('%s', opts.symbol).replace('%v', formatNumber(Math.abs(val), checkPrecision(opts.precision), opts.thousand, opts.decimal));
  					if (fVal.length > maxLength) maxLength = fVal.length;
  					return fVal;
  				}
  			});
  		return map(formatted, function(val, i) {
  			if (isString(val) && val.length < maxLength) {
  				return padAfterSymbol ? val.replace(opts.symbol, opts.symbol+(new Array(maxLength - val.length + 1).join(" "))) : (new Array(maxLength - val.length + 1).join(" ")) + val;
  			}
  			return val;
  		});
  	};
  	{
  		if ( module.exports) {
  			exports = module.exports = lib;
  		}
  		exports.accounting = lib;
  	}
  }());
  });
  var accounting_1 = accounting.accounting;

  var map = {
  AD: 'EUR',
  AE: 'AED',
  AF: 'AFN',
  AG: 'XCD',
  AI: 'XCD',
  AL: 'ALL',
  AM: 'AMD',
  AN: 'ANG',
  AO: 'AOA',
  AR: 'ARS',
  AS: 'USD',
  AT: 'EUR',
  AU: 'AUD',
  AW: 'AWG',
  AX: 'EUR',
  AZ: 'AZN',
  BA: 'BAM',
  BB: 'BBD',
  BD: 'BDT',
  BE: 'EUR',
  BF: 'XOF',
  BG: 'BGN',
  BH: 'BHD',
  BI: 'BIF',
  BJ: 'XOF',
  BL: 'EUR',
  BM: 'BMD',
  BN: 'BND',
  BO: 'BOB',
  BQ: 'USD',
  BR: 'BRL',
  BS: 'BSD',
  BT: 'BTN',
  BV: 'NOK',
  BW: 'BWP',
  BY: 'BYR',
  BZ: 'BZD',
  CA: 'CAD',
  CC: 'AUD',
  CD: 'CDF',
  CF: 'XAF',
  CG: 'XAF',
  CH: 'CHF',
  CI: 'XOF',
  CK: 'NZD',
  CL: 'CLP',
  CM: 'XAF',
  CN: 'CNY',
  CO: 'COP',
  CR: 'CRC',
  CU: 'CUP',
  CV: 'CVE',
  CW: 'ANG',
  CX: 'AUD',
  CY: 'EUR',
  CZ: 'CZK',
  DE: 'EUR',
  DJ: 'DJF',
  DK: 'DKK',
  DM: 'XCD',
  DO: 'DOP',
  DZ: 'DZD',
  EC: 'USD',
  EE: 'EUR',
  EG: 'EGP',
  EH: 'MAD',
  ER: 'ERN',
  ES: 'EUR',
  ET: 'ETB',
  FI: 'EUR',
  FJ: 'FJD',
  FK: 'FKP',
  FM: 'USD',
  FO: 'DKK',
  FR: 'EUR',
  GA: 'XAF',
  GB: 'GBP',
  GD: 'XCD',
  GE: 'GEL',
  GF: 'EUR',
  GG: 'GBP',
  GH: 'GHS',
  GI: 'GIP',
  GL: 'DKK',
  GM: 'GMD',
  GN: 'GNF',
  GP: 'EUR',
  GQ: 'XAF',
  GR: 'EUR',
  GS: 'GBP',
  GT: 'GTQ',
  GU: 'USD',
  GW: 'XOF',
  GY: 'GYD',
  HK: 'HKD',
  HM: 'AUD',
  HN: 'HNL',
  HR: 'HRK',
  HT: 'HTG',
  HU: 'HUF',
  ID: 'IDR',
  IE: 'EUR',
  IL: 'ILS',
  IM: 'GBP',
  IN: 'INR',
  IO: 'USD',
  IQ: 'IQD',
  IR: 'IRR',
  IS: 'ISK',
  IT: 'EUR',
  JE: 'GBP',
  JM: 'JMD',
  JO: 'JOD',
  JP: 'JPY',
  KE: 'KES',
  KG: 'KGS',
  KH: 'KHR',
  KI: 'AUD',
  KM: 'KMF',
  KN: 'XCD',
  KP: 'KPW',
  KR: 'KRW',
  KW: 'KWD',
  KY: 'KYD',
  KZ: 'KZT',
  LA: 'LAK',
  LB: 'LBP',
  LC: 'XCD',
  LI: 'CHF',
  LK: 'LKR',
  LR: 'LRD',
  LS: 'LSL',
  LT: 'LTL',
  LU: 'EUR',
  LV: 'LVL',
  LY: 'LYD',
  MA: 'MAD',
  MC: 'EUR',
  MD: 'MDL',
  ME: 'EUR',
  MF: 'EUR',
  MG: 'MGA',
  MH: 'USD',
  MK: 'MKD',
  ML: 'XOF',
  MM: 'MMK',
  MN: 'MNT',
  MO: 'MOP',
  MP: 'USD',
  MQ: 'EUR',
  MR: 'MRO',
  MS: 'XCD',
  MT: 'EUR',
  MU: 'MUR',
  MV: 'MVR',
  MW: 'MWK',
  MX: 'MXN',
  MY: 'MYR',
  MZ: 'MZN',
  NA: 'NAD',
  NC: 'XPF',
  NE: 'XOF',
  NF: 'AUD',
  NG: 'NGN',
  NI: 'NIO',
  NL: 'EUR',
  NO: 'NOK',
  NP: 'NPR',
  NR: 'AUD',
  NU: 'NZD',
  NZ: 'NZD',
  OM: 'OMR',
  PA: 'PAB',
  PE: 'PEN',
  PF: 'XPF',
  PG: 'PGK',
  PH: 'PHP',
  PK: 'PKR',
  PL: 'PLN',
  PM: 'EUR',
  PN: 'NZD',
  PR: 'USD',
  PS: 'ILS',
  PT: 'EUR',
  PW: 'USD',
  PY: 'PYG',
  QA: 'QAR',
  RE: 'EUR',
  RO: 'RON',
  RS: 'RSD',
  RU: 'RUB',
  RW: 'RWF',
  SA: 'SAR',
  SB: 'SBD',
  SC: 'SCR',
  SD: 'SDG',
  SE: 'SEK',
  SG: 'SGD',
  SH: 'SHP',
  SI: 'EUR',
  SJ: 'NOK',
  SK: 'EUR',
  SL: 'SLL',
  SM: 'EUR',
  SN: 'XOF',
  SO: 'SOS',
  SR: 'SRD',
  ST: 'STD',
  SV: 'SVC',
  SX: 'ANG',
  SY: 'SYP',
  SZ: 'SZL',
  TC: 'USD',
  TD: 'XAF',
  TF: 'EUR',
  TG: 'XOF',
  TH: 'THB',
  TJ: 'TJS',
  TK: 'NZD',
  TL: 'USD',
  TM: 'TMT',
  TN: 'TND',
  TO: 'TOP',
  TR: 'TRY',
  TT: 'TTD',
  TV: 'AUD',
  TW: 'TWD',
  TZ: 'TZS',
  UA: 'UAH',
  UG: 'UGX',
  UM: 'USD',
  US: 'USD',
  UY: 'UYU',
  UZ: 'UZS',
  VA: 'EUR',
  VC: 'XCD',
  VE: 'VEF',
  VG: 'USD',
  VI: 'USD',
  VN: 'VND',
  VU: 'VUV',
  WF: 'XPF',
  WS: 'WST',
  YE: 'YER',
  YT: 'EUR',
  ZA: 'ZAR',
  ZM: 'ZMK',
  ZW: 'ZWL'
  };
  var map_1 = map;

  var getCountryCode = function(localeString) {
      var components = localeString.split("_");
      if (components.length == 2) {
          return components.pop();
      }
      components = localeString.split("-");
      if (components.length == 2) {
          return components.pop();
      }
      return localeString;
  };
  var getCurrency = function(locale) {
      var countryCode = getCountryCode(locale).toUpperCase();
      if (countryCode in map_1) {
          return map_1[countryCode];
      }
      return null;
  };
  var getLocales = function(currencyCode) {
      currencyCode = currencyCode.toUpperCase();
      var locales = [];
      for (countryCode in map_1) {
          if (map_1[countryCode] === currencyCode) {
              locales.push(countryCode);
          }
      }
      return locales;
  };
  var localeCurrency = {
  	getCurrency: getCurrency,
  	getLocales: getLocales
  };

  var currencies = {
    AED: {
      code: "AED",
      symbol: "د.إ.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    AFN: {
      code: "AFN",
      symbol: "؋",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    ALL: {
      code: "ALL",
      symbol: "Lek",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    AMD: {
      code: "AMD",
      symbol: "֏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    ANG: {
      code: "ANG",
      symbol: "ƒ",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    AOA: {
      code: "AOA",
      symbol: "Kz",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    ARS: {
      code: "ARS",
      symbol: "$",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    AUD: {
      code: "AUD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    AWG: {
      code: "AWG",
      symbol: "ƒ",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    AZN: {
      code: "AZN",
      symbol: "₼",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    BAM: {
      code: "BAM",
      symbol: "КМ",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    BBD: {
      code: "BBD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    BDT: {
      code: "BDT",
      symbol: "৳",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 0
    },
    BGN: {
      code: "BGN",
      symbol: "лв.",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    BHD: {
      code: "BHD",
      symbol: "د.ب.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 3
    },
    BIF: {
      code: "BIF",
      symbol: "FBu",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    BMD: {
      code: "BMD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    BND: {
      code: "BND",
      symbol: "$",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    BOB: {
      code: "BOB",
      symbol: "Bs",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    BRL: {
      code: "BRL",
      symbol: "R$",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    BSD: {
      code: "BSD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    BTC: {
      code: "BTC",
      symbol: "Ƀ",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 8
    },
    BTN: {
      code: "BTN",
      symbol: "Nu.",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 1
    },
    BWP: {
      code: "BWP",
      symbol: "P",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    BYR: {
      code: "BYR",
      symbol: "р.",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    BZD: {
      code: "BZD",
      symbol: "BZ$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    CAD: {
      code: "CAD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    CDF: {
      code: "CDF",
      symbol: "FC",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    CHF: {
      code: "CHF",
      symbol: "CHF",
      thousandsSeparator: "'",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    CLP: {
      code: "CLP",
      symbol: "$",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    CNY: {
      code: "CNY",
      symbol: "¥",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    COP: {
      code: "COP",
      symbol: "$",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    CRC: {
      code: "CRC",
      symbol: "₡",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    CUC: {
      code: "CUC",
      symbol: "CUC",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    CUP: {
      code: "CUP",
      symbol: "$MN",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    CVE: {
      code: "CVE",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    CZK: {
      code: "CZK",
      symbol: "Kč",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    DJF: {
      code: "DJF",
      symbol: "Fdj",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    DKK: {
      code: "DKK",
      symbol: "kr.",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    DOP: {
      code: "DOP",
      symbol: "RD$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    DZD: {
      code: "DZD",
      symbol: "د.ج.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    EGP: {
      code: "EGP",
      symbol: "ج.م.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    ERN: {
      code: "ERN",
      symbol: "Nfk",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    ETB: {
      code: "ETB",
      symbol: "ETB",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    EUR: {
      code: "EUR",
      symbol: "€",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    FJD: {
      code: "FJD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    FKP: {
      code: "FKP",
      symbol: "£",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    GBP: {
      code: "GBP",
      symbol: "£",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    GEL: {
      code: "GEL",
      symbol: "Lari",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    GHS: {
      code: "GHS",
      symbol: "₵",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    GIP: {
      code: "GIP",
      symbol: "£",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    GMD: {
      code: "GMD",
      symbol: "D",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    GNF: {
      code: "GNF",
      symbol: "FG",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    GTQ: {
      code: "GTQ",
      symbol: "Q",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    GYD: {
      code: "GYD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    HKD: {
      code: "HKD",
      symbol: "HK$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    HNL: {
      code: "HNL",
      symbol: "L.",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    HRK: {
      code: "HRK",
      symbol: "kn",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    HTG: {
      code: "HTG",
      symbol: "G",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    HUF: {
      code: "HUF",
      symbol: "Ft",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    IDR: {
      code: "IDR",
      symbol: "Rp",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    ILS: {
      code: "ILS",
      symbol: "₪",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    INR: {
      code: "INR",
      symbol: "₹",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    IQD: {
      code: "IQD",
      symbol: "د.ع.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    IRR: {
      code: "IRR",
      symbol: "﷼",
      thousandsSeparator: ",",
      decimalSeparator: "/",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    ISK: {
      code: "ISK",
      symbol: "kr.",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 0
    },
    JMD: {
      code: "JMD",
      symbol: "J$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    JOD: {
      code: "JOD",
      symbol: "د.ا.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 3
    },
    JPY: {
      code: "JPY",
      symbol: "¥",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    KES: {
      code: "KES",
      symbol: "KSh",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    KGS: {
      code: "KGS",
      symbol: "сом",
      thousandsSeparator: " ",
      decimalSeparator: "-",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    KHR: {
      code: "KHR",
      symbol: "៛",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    KMF: {
      code: "KMF",
      symbol: "CF",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    KPW: {
      code: "KPW",
      symbol: "₩",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    KRW: {
      code: "KRW",
      symbol: "₩",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    KWD: {
      code: "KWD",
      symbol: "د.ك.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 3
    },
    KYD: {
      code: "KYD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    KZT: {
      code: "KZT",
      symbol: "₸",
      thousandsSeparator: " ",
      decimalSeparator: "-",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    LAK: {
      code: "LAK",
      symbol: "₭",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    LBP: {
      code: "LBP",
      symbol: "ل.ل.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    LKR: {
      code: "LKR",
      symbol: "₨",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 0
    },
    LRD: {
      code: "LRD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    LSL: {
      code: "LSL",
      symbol: "M",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    LYD: {
      code: "LYD",
      symbol: "د.ل.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 3
    },
    MAD: {
      code: "MAD",
      symbol: "د.م.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    MDL: {
      code: "MDL",
      symbol: "lei",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    MGA: {
      code: "MGA",
      symbol: "Ar",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    MKD: {
      code: "MKD",
      symbol: "ден.",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    MMK: {
      code: "MMK",
      symbol: "K",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MNT: {
      code: "MNT",
      symbol: "₮",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MOP: {
      code: "MOP",
      symbol: "MOP$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MRO: {
      code: "MRO",
      symbol: "UM",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MTL: {
      code: "MTL",
      symbol: "₤",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MUR: {
      code: "MUR",
      symbol: "₨",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MVR: {
      code: "MVR",
      symbol: "MVR",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 1
    },
    MWK: {
      code: "MWK",
      symbol: "MK",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MXN: {
      code: "MXN",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MYR: {
      code: "MYR",
      symbol: "RM",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    MZN: {
      code: "MZN",
      symbol: "MT",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    NAD: {
      code: "NAD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    NGN: {
      code: "NGN",
      symbol: "₦",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    NIO: {
      code: "NIO",
      symbol: "C$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    NOK: {
      code: "NOK",
      symbol: "kr",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    NPR: {
      code: "NPR",
      symbol: "₨",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    NZD: {
      code: "NZD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    OMR: {
      code: "OMR",
      symbol: "﷼",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 3
    },
    PAB: {
      code: "PAB",
      symbol: "B/.",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    PEN: {
      code: "PEN",
      symbol: "S/.",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    PGK: {
      code: "PGK",
      symbol: "K",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    PHP: {
      code: "PHP",
      symbol: "₱",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    PKR: {
      code: "PKR",
      symbol: "₨",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    PLN: {
      code: "PLN",
      symbol: "zł",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    PYG: {
      code: "PYG",
      symbol: "₲",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    QAR: {
      code: "QAR",
      symbol: "﷼",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    RON: {
      code: "RON",
      symbol: "lei",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    RSD: {
      code: "RSD",
      symbol: "Дин.",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    RUB: {
      code: "RUB",
      symbol: "₽",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    RWF: {
      code: "RWF",
      symbol: "RWF",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    SAR: {
      code: "SAR",
      symbol: "﷼",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    SBD: {
      code: "SBD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SCR: {
      code: "SCR",
      symbol: "₨",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SDD: {
      code: "SDD",
      symbol: "LSd",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SDG: {
      code: "SDG",
      symbol: "£‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SEK: {
      code: "SEK",
      symbol: "kr",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    SGD: {
      code: "SGD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SHP: {
      code: "SHP",
      symbol: "£",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SLL: {
      code: "SLL",
      symbol: "Le",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SOS: {
      code: "SOS",
      symbol: "S",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SRD: {
      code: "SRD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    STD: {
      code: "STD",
      symbol: "Db",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SVC: {
      code: "SVC",
      symbol: "₡",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    SYP: {
      code: "SYP",
      symbol: "£",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    SZL: {
      code: "SZL",
      symbol: "E",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    THB: {
      code: "THB",
      symbol: "฿",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    TJS: {
      code: "TJS",
      symbol: "TJS",
      thousandsSeparator: " ",
      decimalSeparator: ";",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    TMT: {
      code: "TMT",
      symbol: "m",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    TND: {
      code: "TND",
      symbol: "د.ت.‏",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 3
    },
    TOP: {
      code: "TOP",
      symbol: "T$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    TRY: {
      code: "TRY",
      symbol: "₺",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    TTD: {
      code: "TTD",
      symbol: "TT$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    TVD: {
      code: "TVD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    TWD: {
      code: "TWD",
      symbol: "NT$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    TZS: {
      code: "TZS",
      symbol: "TSh",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    UAH: {
      code: "UAH",
      symbol: "₴",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    UGX: {
      code: "UGX",
      symbol: "USh",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    USD: {
      code: "USD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    UYU: {
      code: "UYU",
      symbol: "$U",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    UZS: {
      code: "UZS",
      symbol: "сўм",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    VEB: {
      code: "VEB",
      symbol: "Bs.",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    VEF: {
      code: "VEF",
      symbol: "Bs. F.",
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    VND: {
      code: "VND",
      symbol: "₫",
      thousandsSeparator: ".",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 0
    },
    VUV: {
      code: "VUV",
      symbol: "VT",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 0
    },
    WST: {
      code: "WST",
      symbol: "WS$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    XAF: {
      code: "XAF",
      symbol: "F",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    XCD: {
      code: "XCD",
      symbol: "$",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    XBT: {
      code: "XBT",
      symbol: "Ƀ",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    XOF: {
      code: "XOF",
      symbol: "F",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    XPF: {
      code: "XPF",
      symbol: "F",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    YER: {
      code: "YER",
      symbol: "﷼",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    ZAR: {
      code: "ZAR",
      symbol: "R",
      thousandsSeparator: " ",
      decimalSeparator: ",",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    ZMW: {
      code: "ZMW",
      symbol: "ZK",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    WON: {
      code: "WON",
      symbol: "₩",
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    }
  };
  var currencies_1 = currencies;

  var localeFormats = {
    de: {
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    el: {
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      thousandsSeparator: ".",
      decimalSeparator: ",",
      decimalDigits: 2
    },
    "en-US": {
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    "en-IE": {
      symbolOnLeft: true,
      thousandsSeparator: ",",
      decimalSeparator: ".",
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    "zh-CN": {
      thousandsSeparator: ",",
      decimalSeparator: ".",
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      decimalDigits: 2
    },
    es: {
      thousandsSeparator: ".",
      decimalSeparator: ",",
      symbolOnLeft: false,
      spaceBetweenAmountAndSymbol: true,
      decimalDigits: 2
    },
    it: {
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      thousandsSeparator: ".",
      decimalSeparator: ",",
      decimalDigits: 2
    },
    nl: {
      symbolOnLeft: true,
      spaceBetweenAmountAndSymbol: false,
      thousandsSeparator: ".",
      decimalSeparator: ",",
      decimalDigits: 2
    }
  };
  var localeFormats_1 = localeFormats;

  var defaultCurrency = {
    symbol: '',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    decimalDigits: 2
  };
  var defaultLocaleFormat = {};
  var formatMapping = [{
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%s%v',
      neg: '-%s%v',
      zero: '%s%v'
    }
  }, {
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%s %v',
      neg: '-%s %v',
      zero: '%s %v'
    }
  }, {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: false,
    format: {
      pos: '%v%s',
      neg: '-%v%s',
      zero: '%v%s'
    }
  }, {
    symbolOnLeft: false,
    spaceBetweenAmountAndSymbol: true,
    format: {
      pos: '%v %s',
      neg: '-%v %s',
      zero: '%v %s'
    }
  }];
  function format(value, options) {
    var code = options.code || options.locale && localeCurrency.getCurrency(options.locale);
    var localeMatch = /^([a-z]+)([_-]([a-z]+))?$/i.exec(options.locale) || [];
    var language = localeMatch[1];
    var region = localeMatch[3];
    var localeFormat = Object.assign({}, defaultLocaleFormat, localeFormats_1[language] || {}, localeFormats_1[language + '-' + region] || {});
    var currency = Object.assign({}, defaultCurrency, findCurrency(code), localeFormat);
    if (!currency.symbol) {
      currency.symbol = "".concat(code, " ");
    }
    var symbolOnLeft = currency.symbolOnLeft;
    var spaceBetweenAmountAndSymbol = currency.spaceBetweenAmountAndSymbol;
    var format = formatMapping.filter(function (f) {
      return f.symbolOnLeft === symbolOnLeft && f.spaceBetweenAmountAndSymbol === spaceBetweenAmountAndSymbol;
    })[0].format;
    return accounting.formatMoney(value, {
      symbol: typeof options.symbol === 'undefined' ? currency.symbol : options.symbol,
      decimal: typeof options.decimal === 'undefined' ? currency.decimalSeparator : options.decimal,
      thousand: typeof options.thousand === 'undefined' ? currency.thousandsSeparator : options.thousand,
      precision: typeof options.precision === 'number' ? options.precision : currency.decimalDigits,
      format: ['string', 'object'].indexOf(_typeof(options.format)) > -1 ? options.format : format
    });
  }
  function findCurrency(currencyCode) {
    return currencies_1[currencyCode];
  }
  function unformat(value, options) {
    var code = options.code || options.locale && localeCurrency.getCurrency(options.locale);
    var localeFormat = localeFormats_1[options.locale] || defaultLocaleFormat;
    var currency = Object.assign({}, defaultCurrency, findCurrency(code), localeFormat);
    var decimal = typeof options.decimal === 'undefined' ? currency.decimalSeparator : options.decimal;
    return accounting.unformat(value, decimal);
  }
  var currencies$1 = function currencies() {
    return Object.keys(currencies_1).map(function (key) {
      return currencies_1[key];
    });
  };

  exports.currencies = currencies$1;
  exports.defaultCurrency = defaultCurrency;
  exports.findCurrency = findCurrency;
  exports.format = format;
  exports.localeCurrency = localeCurrency;
  exports.unformat = unformat;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
