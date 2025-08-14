/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/dedent@1.6.0/node_modules/dedent/dist/dedent.mjs":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/dedent@1.6.0/node_modules/dedent/dist/dedent.mjs ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const dedent = createDedent({});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dedent);
function createDedent(options) {
  dedent.withOptions = newOptions => createDedent(_objectSpread(_objectSpread({}, options), newOptions));
  return dedent;
  function dedent(strings, ...values) {
    const raw = typeof strings === "string" ? [strings] : strings.raw;
    const {
      escapeSpecialCharacters = Array.isArray(strings),
      trimWhitespace = true
    } = options;

    // first, perform interpolation
    let result = "";
    for (let i = 0; i < raw.length; i++) {
      let next = raw[i];
      if (escapeSpecialCharacters) {
        // handle escaped newlines, backticks, and interpolation characters
        next = next.replace(/\\\n[ \t]*/g, "").replace(/\\`/g, "`").replace(/\\\$/g, "$").replace(/\\\{/g, "{");
      }
      result += next;
      if (i < values.length) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        result += values[i];
      }
    }

    // now strip indentation
    const lines = result.split("\n");
    let mindent = null;
    for (const l of lines) {
      const m = l.match(/^(\s+)\S+/);
      if (m) {
        const indent = m[1].length;
        if (!mindent) {
          // this is the first indented line
          mindent = indent;
        } else {
          mindent = Math.min(mindent, indent);
        }
      }
    }
    if (mindent !== null) {
      const m = mindent; // appease TypeScript
      result = lines
      // https://github.com/typescript-eslint/typescript-eslint/issues/7140
      // eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
      .map(l => l[0] === " " || l[0] === "\t" ? l.slice(m) : l).join("\n");
    }

    // dedent eats leading and trailing whitespace too
    if (trimWhitespace) {
      result = result.trim();
    }

    // handle escaped newlines at the end to ensure they don't get stripped too
    if (escapeSpecialCharacters) {
      result = result.replace(/\\n/g, "\n");
    }
    return result;
  }
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/errors.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/errors.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodError: () => (/* binding */ ZodError),
/* harmony export */   ZodRealError: () => (/* binding */ ZodRealError)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/errors.js");
/* harmony import */ var _core_util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/util.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");



const initializer = (inst, issues) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodError.init(inst, issues);
    inst.name = "ZodError";
    Object.defineProperties(inst, {
        format: {
            value: (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_1__.formatError(inst, mapper),
            // enumerable: false,
        },
        flatten: {
            value: (mapper) => _core_index_js__WEBPACK_IMPORTED_MODULE_1__.flattenError(inst, mapper),
            // enumerable: false,
        },
        addIssue: {
            value: (issue) => {
                inst.issues.push(issue);
                inst.message = JSON.stringify(inst.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_2__.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        addIssues: {
            value: (issues) => {
                inst.issues.push(...issues);
                inst.message = JSON.stringify(inst.issues, _core_util_js__WEBPACK_IMPORTED_MODULE_2__.jsonStringifyReplacer, 2);
            },
            // enumerable: false,
        },
        isEmpty: {
            get() {
                return inst.issues.length === 0;
            },
            // enumerable: false,
        },
    });
    // Object.defineProperty(inst, "isEmpty", {
    //   get() {
    //     return inst.issues.length === 0;
    //   },
    // });
};
const ZodError = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodError", initializer);
const ZodRealError = _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodError", initializer, {
    Parent: Error,
});
// /** @deprecated Use `z.core.$ZodErrorMapCtx` instead. */
// export type ErrorMapCtx = core.$ZodErrorMapCtx;


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/iso.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/iso.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodISODate: () => (/* binding */ ZodISODate),
/* harmony export */   ZodISODateTime: () => (/* binding */ ZodISODateTime),
/* harmony export */   ZodISODuration: () => (/* binding */ ZodISODuration),
/* harmony export */   ZodISOTime: () => (/* binding */ ZodISOTime),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   datetime: () => (/* binding */ datetime),
/* harmony export */   duration: () => (/* binding */ duration),
/* harmony export */   time: () => (/* binding */ time)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/schemas.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/api.js");
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./schemas.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js");


const ZodISODateTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODateTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISODateTime.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
});
function datetime(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoDateTime(ZodISODateTime, params);
}
const ZodISODate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISODate.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
});
function date(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoDate(ZodISODate, params);
}
const ZodISOTime = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISOTime", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISOTime.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
});
function time(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoTime(ZodISOTime, params);
}
const ZodISODuration = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodISODuration", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodISODuration.init(inst, def);
    _schemas_js__WEBPACK_IMPORTED_MODULE_3__.ZodStringFormat.init(inst, def);
});
function duration(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_2__._isoDuration(ZodISODuration, params);
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/parse.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/parse.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseAsync: () => (/* binding */ parseAsync),
/* harmony export */   safeParse: () => (/* binding */ safeParse),
/* harmony export */   safeParseAsync: () => (/* binding */ safeParseAsync)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/parse.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/errors.js");


const parse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._parse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const parseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._parseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeParse = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeParse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);
const safeParseAsync = /* @__PURE__ */ _core_index_js__WEBPACK_IMPORTED_MODULE_0__._safeParseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.ZodRealError);


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZodAny: () => (/* binding */ ZodAny),
/* harmony export */   ZodArray: () => (/* binding */ ZodArray),
/* harmony export */   ZodBase64: () => (/* binding */ ZodBase64),
/* harmony export */   ZodBase64URL: () => (/* binding */ ZodBase64URL),
/* harmony export */   ZodBigInt: () => (/* binding */ ZodBigInt),
/* harmony export */   ZodBigIntFormat: () => (/* binding */ ZodBigIntFormat),
/* harmony export */   ZodBoolean: () => (/* binding */ ZodBoolean),
/* harmony export */   ZodCIDRv4: () => (/* binding */ ZodCIDRv4),
/* harmony export */   ZodCIDRv6: () => (/* binding */ ZodCIDRv6),
/* harmony export */   ZodCUID: () => (/* binding */ ZodCUID),
/* harmony export */   ZodCUID2: () => (/* binding */ ZodCUID2),
/* harmony export */   ZodCatch: () => (/* binding */ ZodCatch),
/* harmony export */   ZodCustom: () => (/* binding */ ZodCustom),
/* harmony export */   ZodCustomStringFormat: () => (/* binding */ ZodCustomStringFormat),
/* harmony export */   ZodDate: () => (/* binding */ ZodDate),
/* harmony export */   ZodDefault: () => (/* binding */ ZodDefault),
/* harmony export */   ZodDiscriminatedUnion: () => (/* binding */ ZodDiscriminatedUnion),
/* harmony export */   ZodE164: () => (/* binding */ ZodE164),
/* harmony export */   ZodEmail: () => (/* binding */ ZodEmail),
/* harmony export */   ZodEmoji: () => (/* binding */ ZodEmoji),
/* harmony export */   ZodEnum: () => (/* binding */ ZodEnum),
/* harmony export */   ZodFile: () => (/* binding */ ZodFile),
/* harmony export */   ZodGUID: () => (/* binding */ ZodGUID),
/* harmony export */   ZodIPv4: () => (/* binding */ ZodIPv4),
/* harmony export */   ZodIPv6: () => (/* binding */ ZodIPv6),
/* harmony export */   ZodIntersection: () => (/* binding */ ZodIntersection),
/* harmony export */   ZodJWT: () => (/* binding */ ZodJWT),
/* harmony export */   ZodKSUID: () => (/* binding */ ZodKSUID),
/* harmony export */   ZodLazy: () => (/* binding */ ZodLazy),
/* harmony export */   ZodLiteral: () => (/* binding */ ZodLiteral),
/* harmony export */   ZodMap: () => (/* binding */ ZodMap),
/* harmony export */   ZodNaN: () => (/* binding */ ZodNaN),
/* harmony export */   ZodNanoID: () => (/* binding */ ZodNanoID),
/* harmony export */   ZodNever: () => (/* binding */ ZodNever),
/* harmony export */   ZodNonOptional: () => (/* binding */ ZodNonOptional),
/* harmony export */   ZodNull: () => (/* binding */ ZodNull),
/* harmony export */   ZodNullable: () => (/* binding */ ZodNullable),
/* harmony export */   ZodNumber: () => (/* binding */ ZodNumber),
/* harmony export */   ZodNumberFormat: () => (/* binding */ ZodNumberFormat),
/* harmony export */   ZodObject: () => (/* binding */ ZodObject),
/* harmony export */   ZodOptional: () => (/* binding */ ZodOptional),
/* harmony export */   ZodPipe: () => (/* binding */ ZodPipe),
/* harmony export */   ZodPrefault: () => (/* binding */ ZodPrefault),
/* harmony export */   ZodPromise: () => (/* binding */ ZodPromise),
/* harmony export */   ZodReadonly: () => (/* binding */ ZodReadonly),
/* harmony export */   ZodRecord: () => (/* binding */ ZodRecord),
/* harmony export */   ZodSet: () => (/* binding */ ZodSet),
/* harmony export */   ZodString: () => (/* binding */ ZodString),
/* harmony export */   ZodStringFormat: () => (/* binding */ ZodStringFormat),
/* harmony export */   ZodSuccess: () => (/* binding */ ZodSuccess),
/* harmony export */   ZodSymbol: () => (/* binding */ ZodSymbol),
/* harmony export */   ZodTemplateLiteral: () => (/* binding */ ZodTemplateLiteral),
/* harmony export */   ZodTransform: () => (/* binding */ ZodTransform),
/* harmony export */   ZodTuple: () => (/* binding */ ZodTuple),
/* harmony export */   ZodType: () => (/* binding */ ZodType),
/* harmony export */   ZodULID: () => (/* binding */ ZodULID),
/* harmony export */   ZodURL: () => (/* binding */ ZodURL),
/* harmony export */   ZodUUID: () => (/* binding */ ZodUUID),
/* harmony export */   ZodUndefined: () => (/* binding */ ZodUndefined),
/* harmony export */   ZodUnion: () => (/* binding */ ZodUnion),
/* harmony export */   ZodUnknown: () => (/* binding */ ZodUnknown),
/* harmony export */   ZodVoid: () => (/* binding */ ZodVoid),
/* harmony export */   ZodXID: () => (/* binding */ ZodXID),
/* harmony export */   _ZodString: () => (/* binding */ _ZodString),
/* harmony export */   _default: () => (/* binding */ _default),
/* harmony export */   any: () => (/* binding */ any),
/* harmony export */   array: () => (/* binding */ array),
/* harmony export */   base64: () => (/* binding */ base64),
/* harmony export */   base64url: () => (/* binding */ base64url),
/* harmony export */   bigint: () => (/* binding */ bigint),
/* harmony export */   boolean: () => (/* binding */ boolean),
/* harmony export */   "catch": () => (/* binding */ _catch),
/* harmony export */   check: () => (/* binding */ check),
/* harmony export */   cidrv4: () => (/* binding */ cidrv4),
/* harmony export */   cidrv6: () => (/* binding */ cidrv6),
/* harmony export */   cuid: () => (/* binding */ cuid),
/* harmony export */   cuid2: () => (/* binding */ cuid2),
/* harmony export */   custom: () => (/* binding */ custom),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   discriminatedUnion: () => (/* binding */ discriminatedUnion),
/* harmony export */   e164: () => (/* binding */ e164),
/* harmony export */   email: () => (/* binding */ email),
/* harmony export */   emoji: () => (/* binding */ emoji),
/* harmony export */   "enum": () => (/* binding */ _enum),
/* harmony export */   file: () => (/* binding */ file),
/* harmony export */   float32: () => (/* binding */ float32),
/* harmony export */   float64: () => (/* binding */ float64),
/* harmony export */   guid: () => (/* binding */ guid),
/* harmony export */   hostname: () => (/* binding */ hostname),
/* harmony export */   "instanceof": () => (/* binding */ _instanceof),
/* harmony export */   int: () => (/* binding */ int),
/* harmony export */   int32: () => (/* binding */ int32),
/* harmony export */   int64: () => (/* binding */ int64),
/* harmony export */   intersection: () => (/* binding */ intersection),
/* harmony export */   ipv4: () => (/* binding */ ipv4),
/* harmony export */   ipv6: () => (/* binding */ ipv6),
/* harmony export */   json: () => (/* binding */ json),
/* harmony export */   jwt: () => (/* binding */ jwt),
/* harmony export */   keyof: () => (/* binding */ keyof),
/* harmony export */   ksuid: () => (/* binding */ ksuid),
/* harmony export */   lazy: () => (/* binding */ lazy),
/* harmony export */   literal: () => (/* binding */ literal),
/* harmony export */   looseObject: () => (/* binding */ looseObject),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   nan: () => (/* binding */ nan),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   nativeEnum: () => (/* binding */ nativeEnum),
/* harmony export */   never: () => (/* binding */ never),
/* harmony export */   nonoptional: () => (/* binding */ nonoptional),
/* harmony export */   "null": () => (/* binding */ _null),
/* harmony export */   nullable: () => (/* binding */ nullable),
/* harmony export */   nullish: () => (/* binding */ nullish),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   object: () => (/* binding */ object),
/* harmony export */   optional: () => (/* binding */ optional),
/* harmony export */   partialRecord: () => (/* binding */ partialRecord),
/* harmony export */   pipe: () => (/* binding */ pipe),
/* harmony export */   prefault: () => (/* binding */ prefault),
/* harmony export */   preprocess: () => (/* binding */ preprocess),
/* harmony export */   promise: () => (/* binding */ promise),
/* harmony export */   readonly: () => (/* binding */ readonly),
/* harmony export */   record: () => (/* binding */ record),
/* harmony export */   refine: () => (/* binding */ refine),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   strictObject: () => (/* binding */ strictObject),
/* harmony export */   string: () => (/* binding */ string),
/* harmony export */   stringFormat: () => (/* binding */ stringFormat),
/* harmony export */   stringbool: () => (/* binding */ stringbool),
/* harmony export */   success: () => (/* binding */ success),
/* harmony export */   superRefine: () => (/* binding */ superRefine),
/* harmony export */   symbol: () => (/* binding */ symbol),
/* harmony export */   templateLiteral: () => (/* binding */ templateLiteral),
/* harmony export */   transform: () => (/* binding */ transform),
/* harmony export */   tuple: () => (/* binding */ tuple),
/* harmony export */   uint32: () => (/* binding */ uint32),
/* harmony export */   uint64: () => (/* binding */ uint64),
/* harmony export */   ulid: () => (/* binding */ ulid),
/* harmony export */   undefined: () => (/* binding */ _undefined),
/* harmony export */   union: () => (/* binding */ union),
/* harmony export */   unknown: () => (/* binding */ unknown),
/* harmony export */   url: () => (/* binding */ url),
/* harmony export */   uuid: () => (/* binding */ uuid),
/* harmony export */   uuidv4: () => (/* binding */ uuidv4),
/* harmony export */   uuidv6: () => (/* binding */ uuidv6),
/* harmony export */   uuidv7: () => (/* binding */ uuidv7),
/* harmony export */   "void": () => (/* binding */ _void),
/* harmony export */   xid: () => (/* binding */ xid)
/* harmony export */ });
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/schemas.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/checks.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/regexes.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/index.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/registries.js");
/* harmony import */ var _core_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./checks.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/api.js");
/* harmony import */ var _iso_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./iso.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/iso.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parse.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/parse.js");





const ZodType = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodType", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodType.init(inst, def);
    inst.def = def;
    Object.defineProperty(inst, "_def", { value: def });
    // base methods
    inst.check = (...checks) => {
        return inst.clone({
            ...def,
            checks: [
                ...(def.checks ?? []),
                ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch),
            ],
        }
        // { parent: true }
        );
    };
    inst.clone = (def, params) => _core_index_js__WEBPACK_IMPORTED_MODULE_3__.clone(inst, def, params);
    inst.brand = () => inst;
    inst.register = ((reg, meta) => {
        reg.add(inst, meta);
        return inst;
    });
    // parsing
    inst.parse = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_8__.parse(inst, data, params, { callee: inst.parse });
    inst.safeParse = (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_8__.safeParse(inst, data, params);
    inst.parseAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_8__.parseAsync(inst, data, params, { callee: inst.parseAsync });
    inst.safeParseAsync = async (data, params) => _parse_js__WEBPACK_IMPORTED_MODULE_8__.safeParseAsync(inst, data, params);
    inst.spa = inst.safeParseAsync;
    // refinements
    inst.refine = (check, params) => inst.check(refine(check, params));
    inst.superRefine = (refinement) => inst.check(superRefine(refinement));
    inst.overwrite = (fn) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._overwrite(fn));
    // wrappers
    inst.optional = () => optional(inst);
    inst.nullable = () => nullable(inst);
    inst.nullish = () => optional(nullable(inst));
    inst.nonoptional = (params) => nonoptional(inst, params);
    inst.array = () => array(inst);
    inst.or = (arg) => union([inst, arg]);
    inst.and = (arg) => intersection(inst, arg);
    inst.transform = (tx) => pipe(inst, transform(tx));
    inst.default = (def) => _default(inst, def);
    inst.prefault = (def) => prefault(inst, def);
    // inst.coalesce = (def, params) => coalesce(inst, def, params);
    inst.catch = (params) => _catch(inst, params);
    inst.pipe = (target) => pipe(inst, target);
    inst.readonly = () => readonly(inst);
    // meta
    inst.describe = (description) => {
        const cl = inst.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.add(cl, { description });
        return cl;
    };
    Object.defineProperty(inst, "description", {
        get() {
            return _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.get(inst)?.description;
        },
        configurable: true,
    });
    inst.meta = (...args) => {
        if (args.length === 0) {
            return _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.get(inst);
        }
        const cl = inst.clone();
        _core_index_js__WEBPACK_IMPORTED_MODULE_5__.globalRegistry.add(cl, args[0]);
        return cl;
    };
    // helpers
    inst.isOptional = () => inst.safeParse(undefined).success;
    inst.isNullable = () => inst.safeParse(null).success;
    return inst;
});
/** @internal */
const _ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("_ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodString.init(inst, def);
    ZodType.init(inst, def);
    const bag = inst._zod.bag;
    inst.format = bag.format ?? null;
    inst.minLength = bag.minimum ?? null;
    inst.maxLength = bag.maximum ?? null;
    // validations
    inst.regex = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._regex(...args));
    inst.includes = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._includes(...args));
    inst.startsWith = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._startsWith(...args));
    inst.endsWith = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._endsWith(...args));
    inst.min = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(...args));
    inst.max = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxLength(...args));
    inst.length = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._length(...args));
    inst.nonempty = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(1, ...args));
    inst.lowercase = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lowercase(params));
    inst.uppercase = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uppercase(params));
    // transforms
    inst.trim = () => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._trim());
    inst.normalize = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._normalize(...args));
    inst.toLowerCase = () => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._toLowerCase());
    inst.toUpperCase = () => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._toUpperCase());
});
const ZodString = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodString", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodString.init(inst, def);
    _ZodString.init(inst, def);
    inst.email = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._email(ZodEmail, params));
    inst.url = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._url(ZodURL, params));
    inst.jwt = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._jwt(ZodJWT, params));
    inst.emoji = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._emoji(ZodEmoji, params));
    inst.guid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._guid(ZodGUID, params));
    inst.uuid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuid(ZodUUID, params));
    inst.uuidv4 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv4(ZodUUID, params));
    inst.uuidv6 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv6(ZodUUID, params));
    inst.uuidv7 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv7(ZodUUID, params));
    inst.nanoid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._nanoid(ZodNanoID, params));
    inst.guid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._guid(ZodGUID, params));
    inst.cuid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid(ZodCUID, params));
    inst.cuid2 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid2(ZodCUID2, params));
    inst.ulid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ulid(ZodULID, params));
    inst.base64 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64(ZodBase64, params));
    inst.base64url = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64url(ZodBase64URL, params));
    inst.xid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._xid(ZodXID, params));
    inst.ksuid = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ksuid(ZodKSUID, params));
    inst.ipv4 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv4(ZodIPv4, params));
    inst.ipv6 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv6(ZodIPv6, params));
    inst.cidrv4 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv4(ZodCIDRv4, params));
    inst.cidrv6 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv6(ZodCIDRv6, params));
    inst.e164 = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._e164(ZodE164, params));
    // iso
    inst.datetime = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_7__.datetime(params));
    inst.date = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_7__.date(params));
    inst.time = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_7__.time(params));
    inst.duration = (params) => inst.check(_iso_js__WEBPACK_IMPORTED_MODULE_7__.duration(params));
});
function string(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._string(ZodString, params);
}
const ZodStringFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodStringFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodStringFormat.init(inst, def);
    _ZodString.init(inst, def);
});
const ZodEmail = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEmail", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEmail.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function email(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._email(ZodEmail, params);
}
const ZodGUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodGUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodGUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function guid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._guid(ZodGUID, params);
}
const ZodUUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function uuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuid(ZodUUID, params);
}
function uuidv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv4(ZodUUID, params);
}
// ZodUUIDv6
function uuidv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv6(ZodUUID, params);
}
// ZodUUIDv7
function uuidv7(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uuidv7(ZodUUID, params);
}
const ZodURL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodURL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodURL.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function url(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._url(ZodURL, params);
}
const ZodEmoji = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEmoji", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEmoji.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function emoji(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._emoji(ZodEmoji, params);
}
const ZodNanoID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNanoID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNanoID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function nanoid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._nanoid(ZodNanoID, params);
}
const ZodCUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid(ZodCUID, params);
}
const ZodCUID2 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCUID2", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCUID2.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cuid2(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cuid2(ZodCUID2, params);
}
const ZodULID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodULID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodULID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ulid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ulid(ZodULID, params);
}
const ZodXID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodXID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodXID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function xid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._xid(ZodXID, params);
}
const ZodKSUID = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodKSUID", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodKSUID.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ksuid(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ksuid(ZodKSUID, params);
}
const ZodIPv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIPv4", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodIPv4.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv4(ZodIPv4, params);
}
const ZodIPv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIPv6", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodIPv6.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function ipv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._ipv6(ZodIPv6, params);
}
const ZodCIDRv4 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCIDRv4", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCIDRv4.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv4(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv4(ZodCIDRv4, params);
}
const ZodCIDRv6 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCIDRv6", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCIDRv6.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function cidrv6(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._cidrv6(ZodCIDRv6, params);
}
const ZodBase64 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBase64", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBase64.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64(ZodBase64, params);
}
const ZodBase64URL = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBase64URL", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBase64URL.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function base64url(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._base64url(ZodBase64URL, params);
}
const ZodE164 = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodE164", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodE164.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function e164(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._e164(ZodE164, params);
}
const ZodJWT = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodJWT", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodJWT.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function jwt(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._jwt(ZodJWT, params);
}
const ZodCustomStringFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCustomStringFormat", (inst, def) => {
    // ZodStringFormat.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCustomStringFormat.init(inst, def);
    ZodStringFormat.init(inst, def);
});
function stringFormat(format, fnOrRegex, _params = {}) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname(_params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringFormat(ZodCustomStringFormat, "hostname", _core_index_js__WEBPACK_IMPORTED_MODULE_4__.hostname, _params);
}
const ZodNumber = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNumber", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNumber.init(inst, def);
    ZodType.init(inst, def);
    inst.gt = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(value, params));
    inst.gte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
    inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
    inst.lt = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(value, params));
    inst.lte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
    inst.max = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
    inst.int = (params) => inst.check(int(params));
    inst.safe = (params) => inst.check(int(params));
    inst.positive = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(0, params));
    inst.nonnegative = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(0, params));
    inst.negative = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(0, params));
    inst.nonpositive = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(0, params));
    inst.multipleOf = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._multipleOf(value, params));
    inst.step = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._multipleOf(value, params));
    // inst.finite = (params) => inst.check(core.finite(params));
    inst.finite = () => inst;
    const bag = inst._zod.bag;
    inst.minValue =
        Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
    inst.maxValue =
        Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
    inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
    inst.isFinite = true;
    inst.format = bag.format ?? null;
});
function number(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._number(ZodNumber, params);
}
const ZodNumberFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNumberFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNumberFormat.init(inst, def);
    ZodNumber.init(inst, def);
});
function int(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._int(ZodNumberFormat, params);
}
function float32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._float32(ZodNumberFormat, params);
}
function float64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._float64(ZodNumberFormat, params);
}
function int32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._int32(ZodNumberFormat, params);
}
function uint32(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uint32(ZodNumberFormat, params);
}
const ZodBoolean = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBoolean", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBoolean.init(inst, def);
    ZodType.init(inst, def);
});
function boolean(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._boolean(ZodBoolean, params);
}
const ZodBigInt = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBigInt", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBigInt.init(inst, def);
    ZodType.init(inst, def);
    inst.gte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
    inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
    inst.gt = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(value, params));
    inst.gte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
    inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
    inst.lt = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(value, params));
    inst.lte = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
    inst.max = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
    inst.positive = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gt(BigInt(0), params));
    inst.negative = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lt(BigInt(0), params));
    inst.nonpositive = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(BigInt(0), params));
    inst.nonnegative = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(BigInt(0), params));
    inst.multipleOf = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._multipleOf(value, params));
    const bag = inst._zod.bag;
    inst.minValue = bag.minimum ?? null;
    inst.maxValue = bag.maximum ?? null;
    inst.format = bag.format ?? null;
});
function bigint(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._bigint(ZodBigInt, params);
}
const ZodBigIntFormat = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodBigIntFormat", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBigIntFormat.init(inst, def);
    ZodBigInt.init(inst, def);
});
// int64
function int64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._int64(ZodBigIntFormat, params);
}
// uint64
function uint64(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._uint64(ZodBigIntFormat, params);
}
const ZodSymbol = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSymbol", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodSymbol.init(inst, def);
    ZodType.init(inst, def);
});
function symbol(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._symbol(ZodSymbol, params);
}
const ZodUndefined = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUndefined", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUndefined.init(inst, def);
    ZodType.init(inst, def);
});
function _undefined(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._undefined(ZodUndefined, params);
}

const ZodNull = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNull", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNull.init(inst, def);
    ZodType.init(inst, def);
});
function _null(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._null(ZodNull, params);
}

const ZodAny = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodAny", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAny.init(inst, def);
    ZodType.init(inst, def);
});
function any() {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._any(ZodAny);
}
const ZodUnknown = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUnknown", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUnknown.init(inst, def);
    ZodType.init(inst, def);
});
function unknown() {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._unknown(ZodUnknown);
}
const ZodNever = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNever", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNever.init(inst, def);
    ZodType.init(inst, def);
});
function never(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._never(ZodNever, params);
}
const ZodVoid = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodVoid", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodVoid.init(inst, def);
    ZodType.init(inst, def);
});
function _void(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._void(ZodVoid, params);
}

const ZodDate = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDate", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodDate.init(inst, def);
    ZodType.init(inst, def);
    inst.min = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._gte(value, params));
    inst.max = (value, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._lte(value, params));
    const c = inst._zod.bag;
    inst.minDate = c.minimum ? new Date(c.minimum) : null;
    inst.maxDate = c.maximum ? new Date(c.maximum) : null;
});
function date(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._date(ZodDate, params);
}
const ZodArray = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodArray", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodArray.init(inst, def);
    ZodType.init(inst, def);
    inst.element = def.element;
    inst.min = (minLength, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(minLength, params));
    inst.nonempty = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minLength(1, params));
    inst.max = (maxLength, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxLength(maxLength, params));
    inst.length = (len, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._length(len, params));
    inst.unwrap = () => inst.element;
});
function array(element, params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._array(ZodArray, element, params);
}
// .keyof
function keyof(schema) {
    const shape = schema._zod.def.shape;
    return _enum(Object.keys(shape));
}
const ZodObject = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodObject", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodObject.init(inst, def);
    ZodType.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_3__.defineLazy(inst, "shape", () => def.shape);
    inst.keyof = () => _enum(Object.keys(inst._zod.def.shape));
    inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall: catchall });
    inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
    inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
    inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
    inst.strip = () => inst.clone({ ...inst._zod.def, catchall: undefined });
    inst.extend = (incoming) => {
        return _core_index_js__WEBPACK_IMPORTED_MODULE_3__.extend(inst, incoming);
    };
    inst.merge = (other) => _core_index_js__WEBPACK_IMPORTED_MODULE_3__.merge(inst, other);
    inst.pick = (mask) => _core_index_js__WEBPACK_IMPORTED_MODULE_3__.pick(inst, mask);
    inst.omit = (mask) => _core_index_js__WEBPACK_IMPORTED_MODULE_3__.omit(inst, mask);
    inst.partial = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_3__.partial(ZodOptional, inst, args[0]);
    inst.required = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_3__.required(ZodNonOptional, inst, args[0]);
});
function object(shape, params) {
    const def = {
        type: "object",
        get shape() {
            _core_index_js__WEBPACK_IMPORTED_MODULE_3__.assignProp(this, "shape", shape ? _core_index_js__WEBPACK_IMPORTED_MODULE_3__.objectClone(shape) : {});
            return this.shape;
        },
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    };
    return new ZodObject(def);
}
// strictObject
function strictObject(shape, params) {
    return new ZodObject({
        type: "object",
        get shape() {
            _core_index_js__WEBPACK_IMPORTED_MODULE_3__.assignProp(this, "shape", _core_index_js__WEBPACK_IMPORTED_MODULE_3__.objectClone(shape));
            return this.shape;
        },
        catchall: never(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
// looseObject
function looseObject(shape, params) {
    return new ZodObject({
        type: "object",
        get shape() {
            _core_index_js__WEBPACK_IMPORTED_MODULE_3__.assignProp(this, "shape", _core_index_js__WEBPACK_IMPORTED_MODULE_3__.objectClone(shape));
            return this.shape;
        },
        catchall: unknown(),
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodUnion", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodUnion.init(inst, def);
    ZodType.init(inst, def);
    inst.options = def.options;
});
function union(options, params) {
    return new ZodUnion({
        type: "union",
        options: options,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodDiscriminatedUnion = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDiscriminatedUnion", (inst, def) => {
    ZodUnion.init(inst, def);
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodDiscriminatedUnion.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
    // const [options, params] = args;
    return new ZodDiscriminatedUnion({
        type: "union",
        options,
        discriminator,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodIntersection = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodIntersection", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodIntersection.init(inst, def);
    ZodType.init(inst, def);
});
function intersection(left, right) {
    return new ZodIntersection({
        type: "intersection",
        left: left,
        right: right,
    });
}
const ZodTuple = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTuple", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodTuple.init(inst, def);
    ZodType.init(inst, def);
    inst.rest = (rest) => inst.clone({
        ...inst._zod.def,
        rest: rest,
    });
});
function tuple(items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new ZodTuple({
        type: "tuple",
        items: items,
        rest,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodRecord = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodRecord", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRecord.init(inst, def);
    ZodType.init(inst, def);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
});
function record(keyType, valueType, params) {
    return new ZodRecord({
        type: "record",
        keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
// type alksjf = core.output<core.$ZodRecordKey>;
function partialRecord(keyType, valueType, params) {
    const k = _core_index_js__WEBPACK_IMPORTED_MODULE_3__.clone(keyType);
    k._zod.values = undefined;
    return new ZodRecord({
        type: "record",
        keyType: k,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodMap = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodMap", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodMap.init(inst, def);
    ZodType.init(inst, def);
    inst.keyType = def.keyType;
    inst.valueType = def.valueType;
});
function map(keyType, valueType, params) {
    return new ZodMap({
        type: "map",
        keyType: keyType,
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodSet = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSet", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodSet.init(inst, def);
    ZodType.init(inst, def);
    inst.min = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(...args));
    inst.nonempty = (params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(1, params));
    inst.max = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxSize(...args));
    inst.size = (...args) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._size(...args));
});
function set(valueType, params) {
    return new ZodSet({
        type: "set",
        valueType: valueType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodEnum = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodEnum", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodEnum.init(inst, def);
    ZodType.init(inst, def);
    inst.enum = def.entries;
    inst.options = Object.values(def.entries);
    const keys = new Set(Object.keys(def.entries));
    inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
            if (keys.has(value)) {
                newEntries[value] = def.entries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
            entries: newEntries,
        });
    };
    inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) {
            if (keys.has(value)) {
                delete newEntries[value];
            }
            else
                throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
            ...def,
            checks: [],
            ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
            entries: newEntries,
        });
    };
});
function _enum(values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}

/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function nativeEnum(entries, params) {
    return new ZodEnum({
        type: "enum",
        entries,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodLiteral = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodLiteral", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodLiteral.init(inst, def);
    ZodType.init(inst, def);
    inst.values = new Set(def.values);
    Object.defineProperty(inst, "value", {
        get() {
            if (def.values.length > 1) {
                throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
            }
            return def.values[0];
        },
    });
});
function literal(value, params) {
    return new ZodLiteral({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodFile = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodFile", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodFile.init(inst, def);
    ZodType.init(inst, def);
    inst.min = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._minSize(size, params));
    inst.max = (size, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._maxSize(size, params));
    inst.mime = (types, params) => inst.check(_core_index_js__WEBPACK_IMPORTED_MODULE_6__._mime(Array.isArray(types) ? types : [types], params));
});
function file(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._file(ZodFile, params);
}
const ZodTransform = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTransform", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodTransform.init(inst, def);
    ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_3__.issue(issue, payload.value, def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = inst);
                // _issue.continue ??= true;
                payload.issues.push(_core_index_js__WEBPACK_IMPORTED_MODULE_3__.issue(_issue));
            }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        payload.value = output;
        return payload;
    };
});
function transform(fn) {
    return new ZodTransform({
        type: "transform",
        transform: fn,
    });
}
const ZodOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodOptional.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function optional(innerType) {
    return new ZodOptional({
        type: "optional",
        innerType: innerType,
    });
}
const ZodNullable = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNullable", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNullable.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nullable(innerType) {
    return new ZodNullable({
        type: "nullable",
        innerType: innerType,
    });
}
// nullish
function nullish(innerType) {
    return optional(nullable(innerType));
}
const ZodDefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodDefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodDefault.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeDefault = inst.unwrap;
});
function _default(innerType, defaultValue) {
    return new ZodDefault({
        type: "default",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_3__.shallowClone(defaultValue);
        },
    });
}
const ZodPrefault = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPrefault", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPrefault.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function prefault(innerType, defaultValue) {
    return new ZodPrefault({
        type: "prefault",
        innerType: innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _core_index_js__WEBPACK_IMPORTED_MODULE_3__.shallowClone(defaultValue);
        },
    });
}
const ZodNonOptional = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNonOptional", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNonOptional.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function nonoptional(innerType, params) {
    return new ZodNonOptional({
        type: "nonoptional",
        innerType: innerType,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodSuccess = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodSuccess", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodSuccess.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function success(innerType) {
    return new ZodSuccess({
        type: "success",
        innerType: innerType,
    });
}
const ZodCatch = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCatch", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCatch.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
    inst.removeCatch = inst.unwrap;
});
function _catch(innerType, catchValue) {
    return new ZodCatch({
        type: "catch",
        innerType: innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}

const ZodNaN = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodNaN", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodNaN.init(inst, def);
    ZodType.init(inst, def);
});
function nan(params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._nan(ZodNaN, params);
}
const ZodPipe = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPipe", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPipe.init(inst, def);
    ZodType.init(inst, def);
    inst.in = def.in;
    inst.out = def.out;
});
function pipe(in_, out) {
    return new ZodPipe({
        type: "pipe",
        in: in_,
        out: out,
        // ...util.normalizeParams(params),
    });
}
const ZodReadonly = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodReadonly", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodReadonly.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function readonly(innerType) {
    return new ZodReadonly({
        type: "readonly",
        innerType: innerType,
    });
}
const ZodTemplateLiteral = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodTemplateLiteral", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodTemplateLiteral.init(inst, def);
    ZodType.init(inst, def);
});
function templateLiteral(parts, params) {
    return new ZodTemplateLiteral({
        type: "template_literal",
        parts,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
}
const ZodLazy = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodLazy", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodLazy.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.getter();
});
function lazy(getter) {
    return new ZodLazy({
        type: "lazy",
        getter: getter,
    });
}
const ZodPromise = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodPromise", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPromise.init(inst, def);
    ZodType.init(inst, def);
    inst.unwrap = () => inst._zod.def.innerType;
});
function promise(innerType) {
    return new ZodPromise({
        type: "promise",
        innerType: innerType,
    });
}
const ZodCustom = /*@__PURE__*/ _core_index_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("ZodCustom", (inst, def) => {
    _core_index_js__WEBPACK_IMPORTED_MODULE_1__.$ZodCustom.init(inst, def);
    ZodType.init(inst, def);
});
// custom checks
function check(fn) {
    const ch = new _core_index_js__WEBPACK_IMPORTED_MODULE_2__.$ZodCheck({
        check: "custom",
        // ...util.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function custom(fn, _params) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._refine(ZodCustom, fn, _params);
}
// superRefine
function superRefine(fn) {
    return _core_index_js__WEBPACK_IMPORTED_MODULE_6__._superRefine(fn);
}
function _instanceof(cls, params = {
    error: `Input not instance of ${cls.name}`,
}) {
    const inst = new ZodCustom({
        type: "custom",
        check: "custom",
        fn: (data) => data instanceof cls,
        abort: true,
        ..._core_index_js__WEBPACK_IMPORTED_MODULE_3__.normalizeParams(params),
    });
    inst._zod.bag.Class = cls;
    return inst;
}

// stringbool
const stringbool = (...args) => _core_index_js__WEBPACK_IMPORTED_MODULE_6__._stringbool({
    Pipe: ZodPipe,
    Boolean: ZodBoolean,
    String: ZodString,
    Transform: ZodTransform,
}, ...args);
function json(params) {
    const jsonSchema = lazy(() => {
        return union([string(params), number(), boolean(), _null(), array(jsonSchema), record(string(), jsonSchema)]);
    });
    return jsonSchema;
}
// preprocess
// /** @deprecated Use `z.pipe()` and `z.transform()` instead. */
function preprocess(fn, schema) {
    return pipe(transform(fn), schema);
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/api.js":
/*!***********************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/api.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimePrecision: () => (/* binding */ TimePrecision),
/* harmony export */   _any: () => (/* binding */ _any),
/* harmony export */   _array: () => (/* binding */ _array),
/* harmony export */   _base64: () => (/* binding */ _base64),
/* harmony export */   _base64url: () => (/* binding */ _base64url),
/* harmony export */   _bigint: () => (/* binding */ _bigint),
/* harmony export */   _boolean: () => (/* binding */ _boolean),
/* harmony export */   _catch: () => (/* binding */ _catch),
/* harmony export */   _check: () => (/* binding */ _check),
/* harmony export */   _cidrv4: () => (/* binding */ _cidrv4),
/* harmony export */   _cidrv6: () => (/* binding */ _cidrv6),
/* harmony export */   _coercedBigint: () => (/* binding */ _coercedBigint),
/* harmony export */   _coercedBoolean: () => (/* binding */ _coercedBoolean),
/* harmony export */   _coercedDate: () => (/* binding */ _coercedDate),
/* harmony export */   _coercedNumber: () => (/* binding */ _coercedNumber),
/* harmony export */   _coercedString: () => (/* binding */ _coercedString),
/* harmony export */   _cuid: () => (/* binding */ _cuid),
/* harmony export */   _cuid2: () => (/* binding */ _cuid2),
/* harmony export */   _custom: () => (/* binding */ _custom),
/* harmony export */   _date: () => (/* binding */ _date),
/* harmony export */   _default: () => (/* binding */ _default),
/* harmony export */   _discriminatedUnion: () => (/* binding */ _discriminatedUnion),
/* harmony export */   _e164: () => (/* binding */ _e164),
/* harmony export */   _email: () => (/* binding */ _email),
/* harmony export */   _emoji: () => (/* binding */ _emoji),
/* harmony export */   _endsWith: () => (/* binding */ _endsWith),
/* harmony export */   _enum: () => (/* binding */ _enum),
/* harmony export */   _file: () => (/* binding */ _file),
/* harmony export */   _float32: () => (/* binding */ _float32),
/* harmony export */   _float64: () => (/* binding */ _float64),
/* harmony export */   _gt: () => (/* binding */ _gt),
/* harmony export */   _gte: () => (/* binding */ _gte),
/* harmony export */   _guid: () => (/* binding */ _guid),
/* harmony export */   _includes: () => (/* binding */ _includes),
/* harmony export */   _int: () => (/* binding */ _int),
/* harmony export */   _int32: () => (/* binding */ _int32),
/* harmony export */   _int64: () => (/* binding */ _int64),
/* harmony export */   _intersection: () => (/* binding */ _intersection),
/* harmony export */   _ipv4: () => (/* binding */ _ipv4),
/* harmony export */   _ipv6: () => (/* binding */ _ipv6),
/* harmony export */   _isoDate: () => (/* binding */ _isoDate),
/* harmony export */   _isoDateTime: () => (/* binding */ _isoDateTime),
/* harmony export */   _isoDuration: () => (/* binding */ _isoDuration),
/* harmony export */   _isoTime: () => (/* binding */ _isoTime),
/* harmony export */   _jwt: () => (/* binding */ _jwt),
/* harmony export */   _ksuid: () => (/* binding */ _ksuid),
/* harmony export */   _lazy: () => (/* binding */ _lazy),
/* harmony export */   _length: () => (/* binding */ _length),
/* harmony export */   _literal: () => (/* binding */ _literal),
/* harmony export */   _lowercase: () => (/* binding */ _lowercase),
/* harmony export */   _lt: () => (/* binding */ _lt),
/* harmony export */   _lte: () => (/* binding */ _lte),
/* harmony export */   _map: () => (/* binding */ _map),
/* harmony export */   _max: () => (/* binding */ _lte),
/* harmony export */   _maxLength: () => (/* binding */ _maxLength),
/* harmony export */   _maxSize: () => (/* binding */ _maxSize),
/* harmony export */   _mime: () => (/* binding */ _mime),
/* harmony export */   _min: () => (/* binding */ _gte),
/* harmony export */   _minLength: () => (/* binding */ _minLength),
/* harmony export */   _minSize: () => (/* binding */ _minSize),
/* harmony export */   _multipleOf: () => (/* binding */ _multipleOf),
/* harmony export */   _nan: () => (/* binding */ _nan),
/* harmony export */   _nanoid: () => (/* binding */ _nanoid),
/* harmony export */   _nativeEnum: () => (/* binding */ _nativeEnum),
/* harmony export */   _negative: () => (/* binding */ _negative),
/* harmony export */   _never: () => (/* binding */ _never),
/* harmony export */   _nonnegative: () => (/* binding */ _nonnegative),
/* harmony export */   _nonoptional: () => (/* binding */ _nonoptional),
/* harmony export */   _nonpositive: () => (/* binding */ _nonpositive),
/* harmony export */   _normalize: () => (/* binding */ _normalize),
/* harmony export */   _null: () => (/* binding */ _null),
/* harmony export */   _nullable: () => (/* binding */ _nullable),
/* harmony export */   _number: () => (/* binding */ _number),
/* harmony export */   _optional: () => (/* binding */ _optional),
/* harmony export */   _overwrite: () => (/* binding */ _overwrite),
/* harmony export */   _pipe: () => (/* binding */ _pipe),
/* harmony export */   _positive: () => (/* binding */ _positive),
/* harmony export */   _promise: () => (/* binding */ _promise),
/* harmony export */   _property: () => (/* binding */ _property),
/* harmony export */   _readonly: () => (/* binding */ _readonly),
/* harmony export */   _record: () => (/* binding */ _record),
/* harmony export */   _refine: () => (/* binding */ _refine),
/* harmony export */   _regex: () => (/* binding */ _regex),
/* harmony export */   _set: () => (/* binding */ _set),
/* harmony export */   _size: () => (/* binding */ _size),
/* harmony export */   _startsWith: () => (/* binding */ _startsWith),
/* harmony export */   _string: () => (/* binding */ _string),
/* harmony export */   _stringFormat: () => (/* binding */ _stringFormat),
/* harmony export */   _stringbool: () => (/* binding */ _stringbool),
/* harmony export */   _success: () => (/* binding */ _success),
/* harmony export */   _superRefine: () => (/* binding */ _superRefine),
/* harmony export */   _symbol: () => (/* binding */ _symbol),
/* harmony export */   _templateLiteral: () => (/* binding */ _templateLiteral),
/* harmony export */   _toLowerCase: () => (/* binding */ _toLowerCase),
/* harmony export */   _toUpperCase: () => (/* binding */ _toUpperCase),
/* harmony export */   _transform: () => (/* binding */ _transform),
/* harmony export */   _trim: () => (/* binding */ _trim),
/* harmony export */   _tuple: () => (/* binding */ _tuple),
/* harmony export */   _uint32: () => (/* binding */ _uint32),
/* harmony export */   _uint64: () => (/* binding */ _uint64),
/* harmony export */   _ulid: () => (/* binding */ _ulid),
/* harmony export */   _undefined: () => (/* binding */ _undefined),
/* harmony export */   _union: () => (/* binding */ _union),
/* harmony export */   _unknown: () => (/* binding */ _unknown),
/* harmony export */   _uppercase: () => (/* binding */ _uppercase),
/* harmony export */   _url: () => (/* binding */ _url),
/* harmony export */   _uuid: () => (/* binding */ _uuid),
/* harmony export */   _uuidv4: () => (/* binding */ _uuidv4),
/* harmony export */   _uuidv6: () => (/* binding */ _uuidv6),
/* harmony export */   _uuidv7: () => (/* binding */ _uuidv7),
/* harmony export */   _void: () => (/* binding */ _void),
/* harmony export */   _xid: () => (/* binding */ _xid)
/* harmony export */ });
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checks.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/checks.js");
/* harmony import */ var _schemas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schemas.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/schemas.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");



function _string(Class, params) {
    return new Class({
        type: "string",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedString(Class, params) {
    return new Class({
        type: "string",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _email(Class, params) {
    return new Class({
        type: "string",
        format: "email",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _guid(Class, params) {
    return new Class({
        type: "string",
        format: "guid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuid(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuidv4(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v4",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuidv6(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v6",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uuidv7(Class, params) {
    return new Class({
        type: "string",
        format: "uuid",
        check: "string_format",
        abort: false,
        version: "v7",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _url(Class, params) {
    return new Class({
        type: "string",
        format: "url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _emoji(Class, params) {
    return new Class({
        type: "string",
        format: "emoji",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _nanoid(Class, params) {
    return new Class({
        type: "string",
        format: "nanoid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cuid(Class, params) {
    return new Class({
        type: "string",
        format: "cuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cuid2(Class, params) {
    return new Class({
        type: "string",
        format: "cuid2",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ulid(Class, params) {
    return new Class({
        type: "string",
        format: "ulid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _xid(Class, params) {
    return new Class({
        type: "string",
        format: "xid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ksuid(Class, params) {
    return new Class({
        type: "string",
        format: "ksuid",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ipv4(Class, params) {
    return new Class({
        type: "string",
        format: "ipv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _ipv6(Class, params) {
    return new Class({
        type: "string",
        format: "ipv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cidrv4(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv4",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _cidrv6(Class, params) {
    return new Class({
        type: "string",
        format: "cidrv6",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _base64(Class, params) {
    return new Class({
        type: "string",
        format: "base64",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _base64url(Class, params) {
    return new Class({
        type: "string",
        format: "base64url",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _e164(Class, params) {
    return new Class({
        type: "string",
        format: "e164",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _jwt(Class, params) {
    return new Class({
        type: "string",
        format: "jwt",
        check: "string_format",
        abort: false,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
const TimePrecision = {
    Any: null,
    Minute: -1,
    Second: 0,
    Millisecond: 3,
    Microsecond: 6,
};
function _isoDateTime(Class, params) {
    return new Class({
        type: "string",
        format: "datetime",
        check: "string_format",
        offset: false,
        local: false,
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _isoDate(Class, params) {
    return new Class({
        type: "string",
        format: "date",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _isoTime(Class, params) {
    return new Class({
        type: "string",
        format: "time",
        check: "string_format",
        precision: null,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _isoDuration(Class, params) {
    return new Class({
        type: "string",
        format: "duration",
        check: "string_format",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _number(Class, params) {
    return new Class({
        type: "number",
        checks: [],
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedNumber(Class, params) {
    return new Class({
        type: "number",
        coerce: true,
        checks: [],
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _int(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "safeint",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _float32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _float64(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "float64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _int32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "int32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uint32(Class, params) {
    return new Class({
        type: "number",
        check: "number_format",
        abort: false,
        format: "uint32",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _boolean(Class, params) {
    return new Class({
        type: "boolean",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedBoolean(Class, params) {
    return new Class({
        type: "boolean",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _bigint(Class, params) {
    return new Class({
        type: "bigint",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedBigint(Class, params) {
    return new Class({
        type: "bigint",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _int64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "int64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uint64(Class, params) {
    return new Class({
        type: "bigint",
        check: "bigint_format",
        abort: false,
        format: "uint64",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _symbol(Class, params) {
    return new Class({
        type: "symbol",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _undefined(Class, params) {
    return new Class({
        type: "undefined",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _null(Class, params) {
    return new Class({
        type: "null",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _any(Class) {
    return new Class({
        type: "any",
    });
}
function _unknown(Class) {
    return new Class({
        type: "unknown",
    });
}
function _never(Class, params) {
    return new Class({
        type: "never",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _void(Class, params) {
    return new Class({
        type: "void",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _date(Class, params) {
    return new Class({
        type: "date",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _coercedDate(Class, params) {
    return new Class({
        type: "date",
        coerce: true,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _nan(Class, params) {
    return new Class({
        type: "nan",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _lt(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLessThan({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: false,
    });
}
function _lte(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLessThan({
        check: "less_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: true,
    });
}

function _gt(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckGreaterThan({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: false,
    });
}
function _gte(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckGreaterThan({
        check: "greater_than",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
        inclusive: true,
    });
}

function _positive(params) {
    return _gt(0, params);
}
// negative
function _negative(params) {
    return _lt(0, params);
}
// nonpositive
function _nonpositive(params) {
    return _lte(0, params);
}
// nonnegative
function _nonnegative(params) {
    return _gte(0, params);
}
function _multipleOf(value, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMultipleOf({
        check: "multiple_of",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        value,
    });
}
function _maxSize(maximum, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMaxSize({
        check: "max_size",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        maximum,
    });
}
function _minSize(minimum, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMinSize({
        check: "min_size",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        minimum,
    });
}
function _size(size, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckSizeEquals({
        check: "size_equals",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        size,
    });
}
function _maxLength(maximum, params) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMaxLength({
        check: "max_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        maximum,
    });
    return ch;
}
function _minLength(minimum, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMinLength({
        check: "min_length",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        minimum,
    });
}
function _length(length, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLengthEquals({
        check: "length_equals",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        length,
    });
}
function _regex(pattern, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckRegex({
        check: "string_format",
        format: "regex",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        pattern,
    });
}
function _lowercase(params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckLowerCase({
        check: "string_format",
        format: "lowercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _uppercase(params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckUpperCase({
        check: "string_format",
        format: "uppercase",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _includes(includes, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckIncludes({
        check: "string_format",
        format: "includes",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        includes,
    });
}
function _startsWith(prefix, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckStartsWith({
        check: "string_format",
        format: "starts_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        prefix,
    });
}
function _endsWith(suffix, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckEndsWith({
        check: "string_format",
        format: "ends_with",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
        suffix,
    });
}
function _property(property, schema, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckProperty({
        check: "property",
        property,
        schema,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _mime(types, params) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckMimeType({
        check: "mime_type",
        mime: types,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _overwrite(tx) {
    return new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckOverwrite({
        check: "overwrite",
        tx,
    });
}
// normalize
function _normalize(form) {
    return _overwrite((input) => input.normalize(form));
}
// trim
function _trim() {
    return _overwrite((input) => input.trim());
}
// toLowerCase
function _toLowerCase() {
    return _overwrite((input) => input.toLowerCase());
}
// toUpperCase
function _toUpperCase() {
    return _overwrite((input) => input.toUpperCase());
}
function _array(Class, element, params) {
    return new Class({
        type: "array",
        element,
        // get element() {
        //   return element;
        // },
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _union(Class, options, params) {
    return new Class({
        type: "union",
        options,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _discriminatedUnion(Class, discriminator, options, params) {
    return new Class({
        type: "union",
        options,
        discriminator,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _intersection(Class, left, right) {
    return new Class({
        type: "intersection",
        left,
        right,
    });
}
// export function _tuple(
//   Class: util.SchemaClass<schemas.$ZodTuple>,
//   items: [],
//   params?: string | $ZodTupleParams
// ): schemas.$ZodTuple<[], null>;
function _tuple(Class, items, _paramsOrRest, _params) {
    const hasRest = _paramsOrRest instanceof _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodType;
    const params = hasRest ? _params : _paramsOrRest;
    const rest = hasRest ? _paramsOrRest : null;
    return new Class({
        type: "tuple",
        items,
        rest,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _record(Class, keyType, valueType, params) {
    return new Class({
        type: "record",
        keyType,
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _map(Class, keyType, valueType, params) {
    return new Class({
        type: "map",
        keyType,
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _set(Class, valueType, params) {
    return new Class({
        type: "set",
        valueType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _enum(Class, values, params) {
    const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
    // if (Array.isArray(values)) {
    //   for (const value of values) {
    //     entries[value] = value;
    //   }
    // } else {
    //   Object.assign(entries, values);
    // }
    // const entries: util.EnumLike = {};
    // for (const val of values) {
    //   entries[val] = val;
    // }
    return new Class({
        type: "enum",
        entries,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
/** @deprecated This API has been merged into `z.enum()`. Use `z.enum()` instead.
 *
 * ```ts
 * enum Colors { red, green, blue }
 * z.enum(Colors);
 * ```
 */
function _nativeEnum(Class, entries, params) {
    return new Class({
        type: "enum",
        entries,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _literal(Class, value, params) {
    return new Class({
        type: "literal",
        values: Array.isArray(value) ? value : [value],
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _file(Class, params) {
    return new Class({
        type: "file",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _transform(Class, fn) {
    return new Class({
        type: "transform",
        transform: fn,
    });
}
function _optional(Class, innerType) {
    return new Class({
        type: "optional",
        innerType,
    });
}
function _nullable(Class, innerType) {
    return new Class({
        type: "nullable",
        innerType,
    });
}
function _default(Class, innerType, defaultValue) {
    return new Class({
        type: "default",
        innerType,
        get defaultValue() {
            return typeof defaultValue === "function" ? defaultValue() : _util_js__WEBPACK_IMPORTED_MODULE_2__.shallowClone(defaultValue);
        },
    });
}
function _nonoptional(Class, innerType, params) {
    return new Class({
        type: "nonoptional",
        innerType,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _success(Class, innerType) {
    return new Class({
        type: "success",
        innerType,
    });
}
function _catch(Class, innerType, catchValue) {
    return new Class({
        type: "catch",
        innerType,
        catchValue: (typeof catchValue === "function" ? catchValue : () => catchValue),
    });
}
function _pipe(Class, in_, out) {
    return new Class({
        type: "pipe",
        in: in_,
        out,
    });
}
function _readonly(Class, innerType) {
    return new Class({
        type: "readonly",
        innerType,
    });
}
function _templateLiteral(Class, parts, params) {
    return new Class({
        type: "template_literal",
        parts,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
}
function _lazy(Class, getter) {
    return new Class({
        type: "lazy",
        getter,
    });
}
function _promise(Class, innerType) {
    return new Class({
        type: "promise",
        innerType,
    });
}
function _custom(Class, fn, _params) {
    const norm = _util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params);
    norm.abort ?? (norm.abort = true); // default to abort:false
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ...norm,
    });
    return schema;
}
// same as _custom but defaults to abort:false
function _refine(Class, fn, _params) {
    const schema = new Class({
        type: "custom",
        check: "custom",
        fn: fn,
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params),
    });
    return schema;
}
function _superRefine(fn) {
    const ch = _check((payload) => {
        payload.addIssue = (issue) => {
            if (typeof issue === "string") {
                payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_2__.issue(issue, payload.value, ch._zod.def));
            }
            else {
                // for Zod 3 backwards compatibility
                const _issue = issue;
                if (_issue.fatal)
                    _issue.continue = false;
                _issue.code ?? (_issue.code = "custom");
                _issue.input ?? (_issue.input = payload.value);
                _issue.inst ?? (_issue.inst = ch);
                _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
                payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_2__.issue(_issue));
            }
        };
        return fn(payload.value, payload);
    });
    return ch;
}
function _check(fn, params) {
    const ch = new _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck({
        check: "custom",
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(params),
    });
    ch._zod.check = fn;
    return ch;
}
function _stringbool(Classes, _params) {
    const params = _util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params);
    let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
    let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
    if (params.case !== "sensitive") {
        truthyArray = truthyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
        falsyArray = falsyArray.map((v) => (typeof v === "string" ? v.toLowerCase() : v));
    }
    const truthySet = new Set(truthyArray);
    const falsySet = new Set(falsyArray);
    const _Pipe = Classes.Pipe ?? _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodPipe;
    const _Boolean = Classes.Boolean ?? _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodBoolean;
    const _String = Classes.String ?? _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodString;
    const _Transform = Classes.Transform ?? _schemas_js__WEBPACK_IMPORTED_MODULE_1__.$ZodTransform;
    const tx = new _Transform({
        type: "transform",
        transform: (input, payload) => {
            let data = input;
            if (params.case !== "sensitive")
                data = data.toLowerCase();
            if (truthySet.has(data)) {
                return true;
            }
            else if (falsySet.has(data)) {
                return false;
            }
            else {
                payload.issues.push({
                    code: "invalid_value",
                    expected: "stringbool",
                    values: [...truthySet, ...falsySet],
                    input: payload.value,
                    inst: tx,
                    continue: false,
                });
                return {};
            }
        },
        error: params.error,
    });
    // params.error;
    const innerPipe = new _Pipe({
        type: "pipe",
        in: new _String({ type: "string", error: params.error }),
        out: tx,
        error: params.error,
    });
    const outerPipe = new _Pipe({
        type: "pipe",
        in: innerPipe,
        out: new _Boolean({
            type: "boolean",
            error: params.error,
        }),
        error: params.error,
    });
    return outerPipe;
}
function _stringFormat(Class, format, fnOrRegex, _params = {}) {
    const params = _util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params);
    const def = {
        ..._util_js__WEBPACK_IMPORTED_MODULE_2__.normalizeParams(_params),
        check: "string_format",
        type: "string",
        format,
        fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
        ...params,
    };
    if (fnOrRegex instanceof RegExp) {
        def.pattern = fnOrRegex;
    }
    const inst = new Class(def);
    return inst;
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/checks.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/checks.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodCheck: () => (/* binding */ $ZodCheck),
/* harmony export */   $ZodCheckBigIntFormat: () => (/* binding */ $ZodCheckBigIntFormat),
/* harmony export */   $ZodCheckEndsWith: () => (/* binding */ $ZodCheckEndsWith),
/* harmony export */   $ZodCheckGreaterThan: () => (/* binding */ $ZodCheckGreaterThan),
/* harmony export */   $ZodCheckIncludes: () => (/* binding */ $ZodCheckIncludes),
/* harmony export */   $ZodCheckLengthEquals: () => (/* binding */ $ZodCheckLengthEquals),
/* harmony export */   $ZodCheckLessThan: () => (/* binding */ $ZodCheckLessThan),
/* harmony export */   $ZodCheckLowerCase: () => (/* binding */ $ZodCheckLowerCase),
/* harmony export */   $ZodCheckMaxLength: () => (/* binding */ $ZodCheckMaxLength),
/* harmony export */   $ZodCheckMaxSize: () => (/* binding */ $ZodCheckMaxSize),
/* harmony export */   $ZodCheckMimeType: () => (/* binding */ $ZodCheckMimeType),
/* harmony export */   $ZodCheckMinLength: () => (/* binding */ $ZodCheckMinLength),
/* harmony export */   $ZodCheckMinSize: () => (/* binding */ $ZodCheckMinSize),
/* harmony export */   $ZodCheckMultipleOf: () => (/* binding */ $ZodCheckMultipleOf),
/* harmony export */   $ZodCheckNumberFormat: () => (/* binding */ $ZodCheckNumberFormat),
/* harmony export */   $ZodCheckOverwrite: () => (/* binding */ $ZodCheckOverwrite),
/* harmony export */   $ZodCheckProperty: () => (/* binding */ $ZodCheckProperty),
/* harmony export */   $ZodCheckRegex: () => (/* binding */ $ZodCheckRegex),
/* harmony export */   $ZodCheckSizeEquals: () => (/* binding */ $ZodCheckSizeEquals),
/* harmony export */   $ZodCheckStartsWith: () => (/* binding */ $ZodCheckStartsWith),
/* harmony export */   $ZodCheckStringFormat: () => (/* binding */ $ZodCheckStringFormat),
/* harmony export */   $ZodCheckUpperCase: () => (/* binding */ $ZodCheckUpperCase)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js");
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regexes.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/regexes.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");
// import { $ZodType } from "./schemas.js";



const $ZodCheck = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheck", (inst, def) => {
    var _a;
    inst._zod ?? (inst._zod = {});
    inst._zod.def = def;
    (_a = inst._zod).onattach ?? (_a.onattach = []);
});
const numericOriginMap = {
    number: "number",
    bigint: "bigint",
    object: "date",
};
const $ZodCheckLessThan = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLessThan", (inst, def) => {
    $ZodCheck.init(inst, def);
    const origin = numericOriginMap[typeof def.value];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
        if (def.value < curr) {
            if (def.inclusive)
                bag.maximum = def.value;
            else
                bag.exclusiveMaximum = def.value;
        }
    });
    inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
            return;
        }
        payload.issues.push({
            origin,
            code: "too_big",
            maximum: def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckGreaterThan = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckGreaterThan", (inst, def) => {
    $ZodCheck.init(inst, def);
    const origin = numericOriginMap[typeof def.value];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
        if (def.value > curr) {
            if (def.inclusive)
                bag.minimum = def.value;
            else
                bag.exclusiveMinimum = def.value;
        }
    });
    inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
            return;
        }
        payload.issues.push({
            origin,
            code: "too_small",
            minimum: def.value,
            input: payload.value,
            inclusive: def.inclusive,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMultipleOf = 
/*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMultipleOf", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.onattach.push((inst) => {
        var _a;
        (_a = inst._zod.bag).multipleOf ?? (_a.multipleOf = def.value);
    });
    inst._zod.check = (payload) => {
        if (typeof payload.value !== typeof def.value)
            throw new Error("Cannot mix number and bigint in multiple_of check.");
        const isMultiple = typeof payload.value === "bigint"
            ? payload.value % def.value === BigInt(0)
            : _util_js__WEBPACK_IMPORTED_MODULE_2__.floatSafeRemainder(payload.value, def.value) === 0;
        if (isMultiple)
            return;
        payload.issues.push({
            origin: typeof payload.value,
            code: "not_multiple_of",
            divisor: def.value,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckNumberFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckNumberFormat", (inst, def) => {
    $ZodCheck.init(inst, def); // no format checks
    def.format = def.format || "float64";
    const isInt = def.format?.includes("int");
    const origin = isInt ? "int" : "number";
    const [minimum, maximum] = _util_js__WEBPACK_IMPORTED_MODULE_2__.NUMBER_FORMAT_RANGES[def.format];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
        if (isInt)
            bag.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.integer;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        if (isInt) {
            if (!Number.isInteger(input)) {
                // invalid_format issue
                // payload.issues.push({
                //   expected: def.format,
                //   format: def.format,
                //   code: "invalid_format",
                //   input,
                //   inst,
                // });
                // invalid_type issue
                payload.issues.push({
                    expected: origin,
                    format: def.format,
                    code: "invalid_type",
                    continue: false,
                    input,
                    inst,
                });
                return;
                // not_multiple_of issue
                // payload.issues.push({
                //   code: "not_multiple_of",
                //   origin: "number",
                //   input,
                //   inst,
                //   divisor: 1,
                // });
            }
            if (!Number.isSafeInteger(input)) {
                if (input > 0) {
                    // too_big
                    payload.issues.push({
                        input,
                        code: "too_big",
                        maximum: Number.MAX_SAFE_INTEGER,
                        note: "Integers must be within the safe integer range.",
                        inst,
                        origin,
                        continue: !def.abort,
                    });
                }
                else {
                    // too_small
                    payload.issues.push({
                        input,
                        code: "too_small",
                        minimum: Number.MIN_SAFE_INTEGER,
                        note: "Integers must be within the safe integer range.",
                        inst,
                        origin,
                        continue: !def.abort,
                    });
                }
                return;
            }
        }
        if (input < minimum) {
            payload.issues.push({
                origin: "number",
                input,
                code: "too_small",
                minimum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
        if (input > maximum) {
            payload.issues.push({
                origin: "number",
                input,
                code: "too_big",
                maximum,
                inst,
            });
        }
    };
});
const $ZodCheckBigIntFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckBigIntFormat", (inst, def) => {
    $ZodCheck.init(inst, def); // no format checks
    const [minimum, maximum] = _util_js__WEBPACK_IMPORTED_MODULE_2__.BIGINT_FORMAT_RANGES[def.format];
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        if (input < minimum) {
            payload.issues.push({
                origin: "bigint",
                input,
                code: "too_small",
                minimum: minimum,
                inclusive: true,
                inst,
                continue: !def.abort,
            });
        }
        if (input > maximum) {
            payload.issues.push({
                origin: "bigint",
                input,
                code: "too_big",
                maximum,
                inst,
            });
        }
    };
});
const $ZodCheckMaxSize = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMaxSize", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY);
        if (def.maximum < curr)
            inst._zod.bag.maximum = def.maximum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size <= def.maximum)
            return;
        payload.issues.push({
            origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
            code: "too_big",
            maximum: def.maximum,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMinSize = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMinSize", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY);
        if (def.minimum > curr)
            inst._zod.bag.minimum = def.minimum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size >= def.minimum)
            return;
        payload.issues.push({
            origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
            code: "too_small",
            minimum: def.minimum,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckSizeEquals = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckSizeEquals", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.size !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.minimum = def.size;
        bag.maximum = def.size;
        bag.size = def.size;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size === def.size)
            return;
        const tooBig = size > def.size;
        payload.issues.push({
            origin: _util_js__WEBPACK_IMPORTED_MODULE_2__.getSizableOrigin(input),
            ...(tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size }),
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMaxLength = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMaxLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.maximum ?? Number.POSITIVE_INFINITY);
        if (def.maximum < curr)
            inst._zod.bag.maximum = def.maximum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length <= def.maximum)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        payload.issues.push({
            origin,
            code: "too_big",
            maximum: def.maximum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckMinLength = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMinLength", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const curr = (inst._zod.bag.minimum ?? Number.NEGATIVE_INFINITY);
        if (def.minimum > curr)
            inst._zod.bag.minimum = def.minimum;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length >= def.minimum)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        payload.issues.push({
            origin,
            code: "too_small",
            minimum: def.minimum,
            inclusive: true,
            input,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckLengthEquals = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLengthEquals", (inst, def) => {
    var _a;
    $ZodCheck.init(inst, def);
    (_a = inst._zod.def).when ?? (_a.when = (payload) => {
        const val = payload.value;
        return !_util_js__WEBPACK_IMPORTED_MODULE_2__.nullish(val) && val.length !== undefined;
    });
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.minimum = def.length;
        bag.maximum = def.length;
        bag.length = def.length;
    });
    inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length === def.length)
            return;
        const origin = _util_js__WEBPACK_IMPORTED_MODULE_2__.getLengthableOrigin(input);
        const tooBig = length > def.length;
        payload.issues.push({
            origin,
            ...(tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length }),
            inclusive: true,
            exact: true,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckStringFormat", (inst, def) => {
    var _a, _b;
    $ZodCheck.init(inst, def);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = def.format;
        if (def.pattern) {
            bag.patterns ?? (bag.patterns = new Set());
            bag.patterns.add(def.pattern);
        }
    });
    if (def.pattern)
        (_a = inst._zod).check ?? (_a.check = (payload) => {
            def.pattern.lastIndex = 0;
            if (def.pattern.test(payload.value))
                return;
            payload.issues.push({
                origin: "string",
                code: "invalid_format",
                format: def.format,
                input: payload.value,
                ...(def.pattern ? { pattern: def.pattern.toString() } : {}),
                inst,
                continue: !def.abort,
            });
        });
    else
        (_b = inst._zod).check ?? (_b.check = () => { });
});
const $ZodCheckRegex = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckRegex", (inst, def) => {
    $ZodCheckStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "regex",
            input: payload.value,
            pattern: def.pattern.toString(),
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckLowerCase = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckLowerCase", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.lowercase);
    $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckUpperCase = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckUpperCase", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_1__.uppercase);
    $ZodCheckStringFormat.init(inst, def);
});
const $ZodCheckIncludes = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckIncludes", (inst, def) => {
    $ZodCheck.init(inst, def);
    const escapedRegex = _util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.includes);
    const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
    def.pattern = pattern;
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set());
        bag.patterns.add(pattern);
    });
    inst._zod.check = (payload) => {
        if (payload.value.includes(def.includes, def.position))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "includes",
            includes: def.includes,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckStartsWith = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckStartsWith", (inst, def) => {
    $ZodCheck.init(inst, def);
    const pattern = new RegExp(`^${_util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.prefix)}.*`);
    def.pattern ?? (def.pattern = pattern);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set());
        bag.patterns.add(pattern);
    });
    inst._zod.check = (payload) => {
        if (payload.value.startsWith(def.prefix))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "starts_with",
            prefix: def.prefix,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckEndsWith = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckEndsWith", (inst, def) => {
    $ZodCheck.init(inst, def);
    const pattern = new RegExp(`.*${_util_js__WEBPACK_IMPORTED_MODULE_2__.escapeRegex(def.suffix)}$`);
    def.pattern ?? (def.pattern = pattern);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.patterns ?? (bag.patterns = new Set());
        bag.patterns.add(pattern);
    });
    inst._zod.check = (payload) => {
        if (payload.value.endsWith(def.suffix))
            return;
        payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: "ends_with",
            suffix: def.suffix,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
///////////////////////////////////
/////    $ZodCheckProperty    /////
///////////////////////////////////
function handleCheckPropertyResult(result, payload, property) {
    if (result.issues.length) {
        payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_2__.prefixIssues(property, result.issues));
    }
}
const $ZodCheckProperty = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckProperty", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        const result = def.schema._zod.run({
            value: payload.value[def.property],
            issues: [],
        }, {});
        if (result instanceof Promise) {
            return result.then((result) => handleCheckPropertyResult(result, payload, def.property));
        }
        handleCheckPropertyResult(result, payload, def.property);
        return;
    };
});
const $ZodCheckMimeType = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckMimeType", (inst, def) => {
    $ZodCheck.init(inst, def);
    const mimeSet = new Set(def.mime);
    inst._zod.onattach.push((inst) => {
        inst._zod.bag.mime = def.mime;
    });
    inst._zod.check = (payload) => {
        if (mimeSet.has(payload.value.type))
            return;
        payload.issues.push({
            code: "invalid_value",
            values: def.mime,
            input: payload.value.type,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCheckOverwrite = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor("$ZodCheckOverwrite", (inst, def) => {
    $ZodCheck.init(inst, def);
    inst._zod.check = (payload) => {
        payload.value = def.tx(payload.value);
    };
});


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodAsyncError: () => (/* binding */ $ZodAsyncError),
/* harmony export */   $brand: () => (/* binding */ $brand),
/* harmony export */   $constructor: () => (/* binding */ $constructor),
/* harmony export */   NEVER: () => (/* binding */ NEVER),
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   globalConfig: () => (/* binding */ globalConfig)
/* harmony export */ });
/** A special constant with type `never` */
const NEVER = Object.freeze({
    status: "aborted",
});
function $constructor(name, initializer, params) {
    function init(inst, def) {
        var _a;
        Object.defineProperty(inst, "_zod", {
            value: inst._zod ?? {},
            enumerable: false,
        });
        (_a = inst._zod).traits ?? (_a.traits = new Set());
        inst._zod.traits.add(name);
        initializer(inst, def);
        // support prototype modifications
        for (const k in _.prototype) {
            if (!(k in inst))
                Object.defineProperty(inst, k, { value: _.prototype[k].bind(inst) });
        }
        inst._zod.constr = _;
        inst._zod.def = def;
    }
    // doesn't work if Parent has a constructor with arguments
    const Parent = params?.Parent ?? Object;
    class Definition extends Parent {
    }
    Object.defineProperty(Definition, "name", { value: name });
    function _(def) {
        var _a;
        const inst = params?.Parent ? new Definition() : this;
        init(inst, def);
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        for (const fn of inst._zod.deferred) {
            fn();
        }
        return inst;
    }
    Object.defineProperty(_, "init", { value: init });
    Object.defineProperty(_, Symbol.hasInstance, {
        value: (inst) => {
            if (params?.Parent && inst instanceof params.Parent)
                return true;
            return inst?._zod?.traits?.has(name);
        },
    });
    Object.defineProperty(_, "name", { value: name });
    return _;
}
//////////////////////////////   UTILITIES   ///////////////////////////////////////
const $brand = Symbol("zod_brand");
class $ZodAsyncError extends Error {
    constructor() {
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
    }
}
const globalConfig = {};
function config(newConfig) {
    if (newConfig)
        Object.assign(globalConfig, newConfig);
    return globalConfig;
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/doc.js":
/*!***********************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/doc.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Doc: () => (/* binding */ Doc)
/* harmony export */ });
class Doc {
    constructor(args = []) {
        this.content = [];
        this.indent = 0;
        if (this)
            this.args = args;
    }
    indented(fn) {
        this.indent += 1;
        fn(this);
        this.indent -= 1;
    }
    write(arg) {
        if (typeof arg === "function") {
            arg(this, { execution: "sync" });
            arg(this, { execution: "async" });
            return;
        }
        const content = arg;
        const lines = content.split("\n").filter((x) => x);
        const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
        const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
        for (const line of dedented) {
            this.content.push(line);
        }
    }
    compile() {
        const F = Function;
        const args = this?.args;
        const content = this?.content ?? [``];
        const lines = [...content.map((x) => `  ${x}`)];
        // console.log(lines.join("\n"));
        return new F(...args, lines.join("\n"));
    }
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/errors.js":
/*!**************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/errors.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodError: () => (/* binding */ $ZodError),
/* harmony export */   $ZodRealError: () => (/* binding */ $ZodRealError),
/* harmony export */   flattenError: () => (/* binding */ flattenError),
/* harmony export */   formatError: () => (/* binding */ formatError),
/* harmony export */   prettifyError: () => (/* binding */ prettifyError),
/* harmony export */   toDotPath: () => (/* binding */ toDotPath),
/* harmony export */   treeifyError: () => (/* binding */ treeifyError)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");


const initializer = (inst, def) => {
    inst.name = "$ZodError";
    Object.defineProperty(inst, "_zod", {
        value: inst._zod,
        enumerable: false,
    });
    Object.defineProperty(inst, "issues", {
        value: def,
        enumerable: false,
    });
    inst.message = JSON.stringify(def, _util_js__WEBPACK_IMPORTED_MODULE_1__.jsonStringifyReplacer, 2);
    Object.defineProperty(inst, "toString", {
        value: () => inst.message,
        enumerable: false,
    });
};
const $ZodError = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor)("$ZodError", initializer);
const $ZodRealError = (0,_core_js__WEBPACK_IMPORTED_MODULE_0__.$constructor)("$ZodError", initializer, { Parent: Error });
function flattenError(error, mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of error.issues) {
        if (sub.path.length > 0) {
            fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
            fieldErrors[sub.path[0]].push(mapper(sub));
        }
        else {
            formErrors.push(mapper(sub));
        }
    }
    return { formErrors, fieldErrors };
}
function formatError(error, _mapper) {
    const mapper = _mapper ||
        function (issue) {
            return issue.message;
        };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                issue.errors.map((issues) => processError({ issues }));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues });
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues });
            }
            else if (issue.path.length === 0) {
                fieldErrors._errors.push(mapper(issue));
            }
            else {
                let curr = fieldErrors;
                let i = 0;
                while (i < issue.path.length) {
                    const el = issue.path[i];
                    const terminal = i === issue.path.length - 1;
                    if (!terminal) {
                        curr[el] = curr[el] || { _errors: [] };
                    }
                    else {
                        curr[el] = curr[el] || { _errors: [] };
                        curr[el]._errors.push(mapper(issue));
                    }
                    curr = curr[el];
                    i++;
                }
            }
        }
    };
    processError(error);
    return fieldErrors;
}
function treeifyError(error, _mapper) {
    const mapper = _mapper ||
        function (issue) {
            return issue.message;
        };
    const result = { errors: [] };
    const processError = (error, path = []) => {
        var _a, _b;
        for (const issue of error.issues) {
            if (issue.code === "invalid_union" && issue.errors.length) {
                // regular union error
                issue.errors.map((issues) => processError({ issues }, issue.path));
            }
            else if (issue.code === "invalid_key") {
                processError({ issues: issue.issues }, issue.path);
            }
            else if (issue.code === "invalid_element") {
                processError({ issues: issue.issues }, issue.path);
            }
            else {
                const fullpath = [...path, ...issue.path];
                if (fullpath.length === 0) {
                    result.errors.push(mapper(issue));
                    continue;
                }
                let curr = result;
                let i = 0;
                while (i < fullpath.length) {
                    const el = fullpath[i];
                    const terminal = i === fullpath.length - 1;
                    if (typeof el === "string") {
                        curr.properties ?? (curr.properties = {});
                        (_a = curr.properties)[el] ?? (_a[el] = { errors: [] });
                        curr = curr.properties[el];
                    }
                    else {
                        curr.items ?? (curr.items = []);
                        (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
                        curr = curr.items[el];
                    }
                    if (terminal) {
                        curr.errors.push(mapper(issue));
                    }
                    i++;
                }
            }
        }
    };
    processError(error);
    return result;
}
/** Format a ZodError as a human-readable string in the following form.
 *
 * From
 *
 * ```ts
 * ZodError {
 *   issues: [
 *     {
 *       expected: 'string',
 *       code: 'invalid_type',
 *       path: [ 'username' ],
 *       message: 'Invalid input: expected string'
 *     },
 *     {
 *       expected: 'number',
 *       code: 'invalid_type',
 *       path: [ 'favoriteNumbers', 1 ],
 *       message: 'Invalid input: expected number'
 *     }
 *   ];
 * }
 * ```
 *
 * to
 *
 * ```
 * username
 *   ✖ Expected number, received string at "username
 * favoriteNumbers[0]
 *   ✖ Invalid input: expected number
 * ```
 */
function toDotPath(_path) {
    const segs = [];
    const path = _path.map((seg) => (typeof seg === "object" ? seg.key : seg));
    for (const seg of path) {
        if (typeof seg === "number")
            segs.push(`[${seg}]`);
        else if (typeof seg === "symbol")
            segs.push(`[${JSON.stringify(String(seg))}]`);
        else if (/[^\w$]/.test(seg))
            segs.push(`[${JSON.stringify(seg)}]`);
        else {
            if (segs.length)
                segs.push(".");
            segs.push(seg);
        }
    }
    return segs.join("");
}
function prettifyError(error) {
    const lines = [];
    // sort by path length
    const issues = [...error.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
    // Process each issue
    for (const issue of issues) {
        lines.push(`✖ ${issue.message}`);
        if (issue.path?.length)
            lines.push(`  → at ${toDotPath(issue.path)}`);
    }
    // Convert Map to formatted string
    return lines.join("\n");
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/parse.js":
/*!*************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/parse.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _parse: () => (/* binding */ _parse),
/* harmony export */   _parseAsync: () => (/* binding */ _parseAsync),
/* harmony export */   _safeParse: () => (/* binding */ _safeParse),
/* harmony export */   _safeParseAsync: () => (/* binding */ _safeParseAsync),
/* harmony export */   parse: () => (/* binding */ parse),
/* harmony export */   parseAsync: () => (/* binding */ parseAsync),
/* harmony export */   safeParse: () => (/* binding */ safeParse),
/* harmony export */   safeParseAsync: () => (/* binding */ safeParseAsync)
/* harmony export */ });
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js");
/* harmony import */ var _errors_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./errors.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/errors.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");



const _parse = (_Err) => (schema, value, _ctx, _params) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAsyncError();
    }
    if (result.issues.length) {
        const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())));
        _util_js__WEBPACK_IMPORTED_MODULE_2__.captureStackTrace(e, _params?.callee);
        throw e;
    }
    return result.value;
};
const parse = /* @__PURE__*/ _parse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    if (result.issues.length) {
        const e = new (params?.Err ?? _Err)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config())));
        _util_js__WEBPACK_IMPORTED_MODULE_2__.captureStackTrace(e, params?.callee);
        throw e;
    }
    return result.value;
};
const parseAsync = /* @__PURE__*/ _parseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeParse = (_Err) => (schema, value, _ctx) => {
    const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
    const result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise) {
        throw new _core_js__WEBPACK_IMPORTED_MODULE_0__.$ZodAsyncError();
    }
    return result.issues.length
        ? {
            success: false,
            error: new (_Err ?? _errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodError)(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config()))),
        }
        : { success: true, data: result.value };
};
const safeParse = /* @__PURE__*/ _safeParse(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);
const _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
    const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
    let result = schema._zod.run({ value, issues: [] }, ctx);
    if (result instanceof Promise)
        result = await result;
    return result.issues.length
        ? {
            success: false,
            error: new _Err(result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_2__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_0__.config()))),
        }
        : { success: true, data: result.value };
};
const safeParseAsync = /* @__PURE__*/ _safeParseAsync(_errors_js__WEBPACK_IMPORTED_MODULE_1__.$ZodRealError);


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/regexes.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/regexes.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   base64: () => (/* binding */ base64),
/* harmony export */   base64url: () => (/* binding */ base64url),
/* harmony export */   bigint: () => (/* binding */ bigint),
/* harmony export */   boolean: () => (/* binding */ boolean),
/* harmony export */   browserEmail: () => (/* binding */ browserEmail),
/* harmony export */   cidrv4: () => (/* binding */ cidrv4),
/* harmony export */   cidrv6: () => (/* binding */ cidrv6),
/* harmony export */   cuid: () => (/* binding */ cuid),
/* harmony export */   cuid2: () => (/* binding */ cuid2),
/* harmony export */   date: () => (/* binding */ date),
/* harmony export */   datetime: () => (/* binding */ datetime),
/* harmony export */   domain: () => (/* binding */ domain),
/* harmony export */   duration: () => (/* binding */ duration),
/* harmony export */   e164: () => (/* binding */ e164),
/* harmony export */   email: () => (/* binding */ email),
/* harmony export */   emoji: () => (/* binding */ emoji),
/* harmony export */   extendedDuration: () => (/* binding */ extendedDuration),
/* harmony export */   guid: () => (/* binding */ guid),
/* harmony export */   hostname: () => (/* binding */ hostname),
/* harmony export */   html5Email: () => (/* binding */ html5Email),
/* harmony export */   idnEmail: () => (/* binding */ idnEmail),
/* harmony export */   integer: () => (/* binding */ integer),
/* harmony export */   ipv4: () => (/* binding */ ipv4),
/* harmony export */   ipv6: () => (/* binding */ ipv6),
/* harmony export */   ksuid: () => (/* binding */ ksuid),
/* harmony export */   lowercase: () => (/* binding */ lowercase),
/* harmony export */   nanoid: () => (/* binding */ nanoid),
/* harmony export */   "null": () => (/* binding */ _null),
/* harmony export */   number: () => (/* binding */ number),
/* harmony export */   rfc5322Email: () => (/* binding */ rfc5322Email),
/* harmony export */   string: () => (/* binding */ string),
/* harmony export */   time: () => (/* binding */ time),
/* harmony export */   ulid: () => (/* binding */ ulid),
/* harmony export */   undefined: () => (/* binding */ _undefined),
/* harmony export */   unicodeEmail: () => (/* binding */ unicodeEmail),
/* harmony export */   uppercase: () => (/* binding */ uppercase),
/* harmony export */   uuid: () => (/* binding */ uuid),
/* harmony export */   uuid4: () => (/* binding */ uuid4),
/* harmony export */   uuid6: () => (/* binding */ uuid6),
/* harmony export */   uuid7: () => (/* binding */ uuid7),
/* harmony export */   xid: () => (/* binding */ xid)
/* harmony export */ });
const cuid = /^[cC][^\s-]{8,}$/;
const cuid2 = /^[0-9a-z]+$/;
const ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
const xid = /^[0-9a-vA-V]{20}$/;
const ksuid = /^[A-Za-z0-9]{27}$/;
const nanoid = /^[a-zA-Z0-9_-]{21}$/;
/** ISO 8601-1 duration regex. Does not support the 8601-2 extensions like negative durations or fractional/negative components. */
const duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
/** Implements ISO 8601-2 extensions like explicit +- prefixes, mixing weeks with other units, and fractional/negative components. */
const extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
/** A regex for any UUID-like identifier: 8-4-4-4-12 hex pattern */
const guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
/** Returns a regex for validating an RFC 9562/4122 UUID.
 *
 * @param version Optionally specify a version 1-8. If no version is specified, all versions are supported. */
const uuid = (version) => {
    if (!version)
        return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000)$/;
    return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
};
const uuid4 = /*@__PURE__*/ uuid(4);
const uuid6 = /*@__PURE__*/ uuid(6);
const uuid7 = /*@__PURE__*/ uuid(7);
/** Practical email validation */
const email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
/** Equivalent to the HTML5 input[type=email] validation implemented by browsers. Source: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email */
const html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/** The classic emailregex.com regex for RFC 5322-compliant emails */
const rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/** A loose regex that allows Unicode characters, enforces length limits, and that's about it. */
const unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
const idnEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
const browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
function emoji() {
    return new RegExp(_emoji, "u");
}
const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})$/;
const cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
const cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
const base64url = /^[A-Za-z0-9_-]*$/;
// based on https://stackoverflow.com/questions/106179/regular-expression-to-match-dns-hostname-or-ip-address
// export const hostname: RegExp = /^([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+$/;
const hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
const domain = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
// https://blog.stevenlevithan.com/archives/validate-phone-number#r4-3 (regex sans spaces)
const e164 = /^\+(?:[0-9]){6,14}[0-9]$/;
// const dateSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
const date = /*@__PURE__*/ new RegExp(`^${dateSource}$`);
function timeSource(args) {
    const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
    const regex = typeof args.precision === "number"
        ? args.precision === -1
            ? `${hhmm}`
            : args.precision === 0
                ? `${hhmm}:[0-5]\\d`
                : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}`
        : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
    return regex;
}
function time(args) {
    return new RegExp(`^${timeSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetime(args) {
    const time = timeSource({ precision: args.precision });
    const opts = ["Z"];
    if (args.local)
        opts.push("");
    // if (args.offset) opts.push(`([+-]\\d{2}:\\d{2})`);
    if (args.offset)
        opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
    const timeRegex = `${time}(?:${opts.join("|")})`;
    return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
const string = (params) => {
    const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
    return new RegExp(`^${regex}$`);
};
const bigint = /^\d+n?$/;
const integer = /^\d+$/;
const number = /^-?\d+(?:\.\d+)?/i;
const boolean = /true|false/i;
const _null = /null/i;

const _undefined = /undefined/i;

// regex for string with no uppercase letters
const lowercase = /^[^A-Z]*$/;
// regex for string with no lowercase letters
const uppercase = /^[^a-z]*$/;


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/registries.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/registries.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodRegistry: () => (/* binding */ $ZodRegistry),
/* harmony export */   $input: () => (/* binding */ $input),
/* harmony export */   $output: () => (/* binding */ $output),
/* harmony export */   globalRegistry: () => (/* binding */ globalRegistry),
/* harmony export */   registry: () => (/* binding */ registry)
/* harmony export */ });
const $output = Symbol("ZodOutput");
const $input = Symbol("ZodInput");
class $ZodRegistry {
    constructor() {
        this._map = new Map();
        this._idmap = new Map();
    }
    add(schema, ..._meta) {
        const meta = _meta[0];
        this._map.set(schema, meta);
        if (meta && typeof meta === "object" && "id" in meta) {
            if (this._idmap.has(meta.id)) {
                throw new Error(`ID ${meta.id} already exists in the registry`);
            }
            this._idmap.set(meta.id, schema);
        }
        return this;
    }
    clear() {
        this._map = new Map();
        this._idmap = new Map();
        return this;
    }
    remove(schema) {
        const meta = this._map.get(schema);
        if (meta && typeof meta === "object" && "id" in meta) {
            this._idmap.delete(meta.id);
        }
        this._map.delete(schema);
        return this;
    }
    get(schema) {
        // return this._map.get(schema) as any;
        // inherit metadata
        const p = schema._zod.parent;
        if (p) {
            const pm = { ...(this.get(p) ?? {}) };
            delete pm.id; // do not inherit id
            const f = { ...pm, ...this._map.get(schema) };
            return Object.keys(f).length ? f : undefined;
        }
        return this._map.get(schema);
    }
    has(schema) {
        return this._map.has(schema);
    }
}
// registries
function registry() {
    return new $ZodRegistry();
}
const globalRegistry = /*@__PURE__*/ registry();


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/schemas.js":
/*!***************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/schemas.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $ZodAny: () => (/* binding */ $ZodAny),
/* harmony export */   $ZodArray: () => (/* binding */ $ZodArray),
/* harmony export */   $ZodBase64: () => (/* binding */ $ZodBase64),
/* harmony export */   $ZodBase64URL: () => (/* binding */ $ZodBase64URL),
/* harmony export */   $ZodBigInt: () => (/* binding */ $ZodBigInt),
/* harmony export */   $ZodBigIntFormat: () => (/* binding */ $ZodBigIntFormat),
/* harmony export */   $ZodBoolean: () => (/* binding */ $ZodBoolean),
/* harmony export */   $ZodCIDRv4: () => (/* binding */ $ZodCIDRv4),
/* harmony export */   $ZodCIDRv6: () => (/* binding */ $ZodCIDRv6),
/* harmony export */   $ZodCUID: () => (/* binding */ $ZodCUID),
/* harmony export */   $ZodCUID2: () => (/* binding */ $ZodCUID2),
/* harmony export */   $ZodCatch: () => (/* binding */ $ZodCatch),
/* harmony export */   $ZodCustom: () => (/* binding */ $ZodCustom),
/* harmony export */   $ZodCustomStringFormat: () => (/* binding */ $ZodCustomStringFormat),
/* harmony export */   $ZodDate: () => (/* binding */ $ZodDate),
/* harmony export */   $ZodDefault: () => (/* binding */ $ZodDefault),
/* harmony export */   $ZodDiscriminatedUnion: () => (/* binding */ $ZodDiscriminatedUnion),
/* harmony export */   $ZodE164: () => (/* binding */ $ZodE164),
/* harmony export */   $ZodEmail: () => (/* binding */ $ZodEmail),
/* harmony export */   $ZodEmoji: () => (/* binding */ $ZodEmoji),
/* harmony export */   $ZodEnum: () => (/* binding */ $ZodEnum),
/* harmony export */   $ZodFile: () => (/* binding */ $ZodFile),
/* harmony export */   $ZodGUID: () => (/* binding */ $ZodGUID),
/* harmony export */   $ZodIPv4: () => (/* binding */ $ZodIPv4),
/* harmony export */   $ZodIPv6: () => (/* binding */ $ZodIPv6),
/* harmony export */   $ZodISODate: () => (/* binding */ $ZodISODate),
/* harmony export */   $ZodISODateTime: () => (/* binding */ $ZodISODateTime),
/* harmony export */   $ZodISODuration: () => (/* binding */ $ZodISODuration),
/* harmony export */   $ZodISOTime: () => (/* binding */ $ZodISOTime),
/* harmony export */   $ZodIntersection: () => (/* binding */ $ZodIntersection),
/* harmony export */   $ZodJWT: () => (/* binding */ $ZodJWT),
/* harmony export */   $ZodKSUID: () => (/* binding */ $ZodKSUID),
/* harmony export */   $ZodLazy: () => (/* binding */ $ZodLazy),
/* harmony export */   $ZodLiteral: () => (/* binding */ $ZodLiteral),
/* harmony export */   $ZodMap: () => (/* binding */ $ZodMap),
/* harmony export */   $ZodNaN: () => (/* binding */ $ZodNaN),
/* harmony export */   $ZodNanoID: () => (/* binding */ $ZodNanoID),
/* harmony export */   $ZodNever: () => (/* binding */ $ZodNever),
/* harmony export */   $ZodNonOptional: () => (/* binding */ $ZodNonOptional),
/* harmony export */   $ZodNull: () => (/* binding */ $ZodNull),
/* harmony export */   $ZodNullable: () => (/* binding */ $ZodNullable),
/* harmony export */   $ZodNumber: () => (/* binding */ $ZodNumber),
/* harmony export */   $ZodNumberFormat: () => (/* binding */ $ZodNumberFormat),
/* harmony export */   $ZodObject: () => (/* binding */ $ZodObject),
/* harmony export */   $ZodOptional: () => (/* binding */ $ZodOptional),
/* harmony export */   $ZodPipe: () => (/* binding */ $ZodPipe),
/* harmony export */   $ZodPrefault: () => (/* binding */ $ZodPrefault),
/* harmony export */   $ZodPromise: () => (/* binding */ $ZodPromise),
/* harmony export */   $ZodReadonly: () => (/* binding */ $ZodReadonly),
/* harmony export */   $ZodRecord: () => (/* binding */ $ZodRecord),
/* harmony export */   $ZodSet: () => (/* binding */ $ZodSet),
/* harmony export */   $ZodString: () => (/* binding */ $ZodString),
/* harmony export */   $ZodStringFormat: () => (/* binding */ $ZodStringFormat),
/* harmony export */   $ZodSuccess: () => (/* binding */ $ZodSuccess),
/* harmony export */   $ZodSymbol: () => (/* binding */ $ZodSymbol),
/* harmony export */   $ZodTemplateLiteral: () => (/* binding */ $ZodTemplateLiteral),
/* harmony export */   $ZodTransform: () => (/* binding */ $ZodTransform),
/* harmony export */   $ZodTuple: () => (/* binding */ $ZodTuple),
/* harmony export */   $ZodType: () => (/* binding */ $ZodType),
/* harmony export */   $ZodULID: () => (/* binding */ $ZodULID),
/* harmony export */   $ZodURL: () => (/* binding */ $ZodURL),
/* harmony export */   $ZodUUID: () => (/* binding */ $ZodUUID),
/* harmony export */   $ZodUndefined: () => (/* binding */ $ZodUndefined),
/* harmony export */   $ZodUnion: () => (/* binding */ $ZodUnion),
/* harmony export */   $ZodUnknown: () => (/* binding */ $ZodUnknown),
/* harmony export */   $ZodVoid: () => (/* binding */ $ZodVoid),
/* harmony export */   $ZodXID: () => (/* binding */ $ZodXID),
/* harmony export */   clone: () => (/* reexport safe */ _util_js__WEBPACK_IMPORTED_MODULE_5__.clone),
/* harmony export */   isValidBase64: () => (/* binding */ isValidBase64),
/* harmony export */   isValidBase64URL: () => (/* binding */ isValidBase64URL),
/* harmony export */   isValidJWT: () => (/* binding */ isValidJWT)
/* harmony export */ });
/* harmony import */ var _checks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./checks.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/checks.js");
/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/core.js");
/* harmony import */ var _doc_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./doc.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/doc.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./parse.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/parse.js");
/* harmony import */ var _regexes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./regexes.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/regexes.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");
/* harmony import */ var _versions_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./versions.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/versions.js");







const $ZodType = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodType", (inst, def) => {
    var _a;
    inst ?? (inst = {});
    inst._zod.def = def; // set _def property
    inst._zod.bag = inst._zod.bag || {}; // initialize _bag object
    inst._zod.version = _versions_js__WEBPACK_IMPORTED_MODULE_6__.version;
    const checks = [...(inst._zod.def.checks ?? [])];
    // if inst is itself a checks.$ZodCheck, run it as a check
    if (inst._zod.traits.has("$ZodCheck")) {
        checks.unshift(inst);
    }
    //
    for (const ch of checks) {
        for (const fn of ch._zod.onattach) {
            fn(inst);
        }
    }
    if (checks.length === 0) {
        // deferred initializer
        // inst._zod.parse is not yet defined
        (_a = inst._zod).deferred ?? (_a.deferred = []);
        inst._zod.deferred?.push(() => {
            inst._zod.run = inst._zod.parse;
        });
    }
    else {
        const runChecks = (payload, checks, ctx) => {
            let isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload);
            let asyncResult;
            for (const ch of checks) {
                if (ch._zod.def.when) {
                    const shouldRun = ch._zod.def.when(payload);
                    if (!shouldRun)
                        continue;
                }
                else if (isAborted) {
                    continue;
                }
                const currLen = payload.issues.length;
                const _ = ch._zod.check(payload);
                if (_ instanceof Promise && ctx?.async === false) {
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError();
                }
                if (asyncResult || _ instanceof Promise) {
                    asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                        await _;
                        const nextLen = payload.issues.length;
                        if (nextLen === currLen)
                            return;
                        if (!isAborted)
                            isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload, currLen);
                    });
                }
                else {
                    const nextLen = payload.issues.length;
                    if (nextLen === currLen)
                        continue;
                    if (!isAborted)
                        isAborted = _util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(payload, currLen);
                }
            }
            if (asyncResult) {
                return asyncResult.then(() => {
                    return payload;
                });
            }
            return payload;
        };
        inst._zod.run = (payload, ctx) => {
            const result = inst._zod.parse(payload, ctx);
            if (result instanceof Promise) {
                if (ctx.async === false)
                    throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError();
                return result.then((result) => runChecks(result, checks, ctx));
            }
            return runChecks(result, checks, ctx);
        };
    }
    inst["~standard"] = {
        validate: (value) => {
            try {
                const r = (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParse)(inst, value);
                return r.success ? { value: r.data } : { issues: r.error?.issues };
            }
            catch (_) {
                return (0,_parse_js__WEBPACK_IMPORTED_MODULE_3__.safeParseAsync)(inst, value).then((r) => (r.success ? { value: r.data } : { issues: r.error?.issues }));
            }
        },
        vendor: "zod",
        version: 1,
    };
});

const $ZodString = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodString", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = [...(inst?._zod.bag?.patterns ?? [])].pop() ?? _regexes_js__WEBPACK_IMPORTED_MODULE_4__.string(inst._zod.bag);
    inst._zod.parse = (payload, _) => {
        if (def.coerce)
            try {
                payload.value = String(payload.value);
            }
            catch (_) { }
        if (typeof payload.value === "string")
            return payload;
        payload.issues.push({
            expected: "string",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodStringFormat", (inst, def) => {
    // check initialization must come first
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckStringFormat.init(inst, def);
    $ZodString.init(inst, def);
});
const $ZodGUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodGUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.guid);
    $ZodStringFormat.init(inst, def);
});
const $ZodUUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUUID", (inst, def) => {
    if (def.version) {
        const versionMap = {
            v1: 1,
            v2: 2,
            v3: 3,
            v4: 4,
            v5: 5,
            v6: 6,
            v7: 7,
            v8: 8,
        };
        const v = versionMap[def.version];
        if (v === undefined)
            throw new Error(`Invalid UUID version: "${def.version}"`);
        def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.uuid(v));
    }
    else
        def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.uuid());
    $ZodStringFormat.init(inst, def);
});
const $ZodEmail = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEmail", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.email);
    $ZodStringFormat.init(inst, def);
});
const $ZodURL = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodURL", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        try {
            // Trim whitespace from input
            const trimmed = payload.value.trim();
            // @ts-ignore
            const url = new URL(trimmed);
            if (def.hostname) {
                def.hostname.lastIndex = 0;
                if (!def.hostname.test(url.hostname)) {
                    payload.issues.push({
                        code: "invalid_format",
                        format: "url",
                        note: "Invalid hostname",
                        pattern: _regexes_js__WEBPACK_IMPORTED_MODULE_4__.hostname.source,
                        input: payload.value,
                        inst,
                        continue: !def.abort,
                    });
                }
            }
            if (def.protocol) {
                def.protocol.lastIndex = 0;
                if (!def.protocol.test(url.protocol.endsWith(":") ? url.protocol.slice(0, -1) : url.protocol)) {
                    payload.issues.push({
                        code: "invalid_format",
                        format: "url",
                        note: "Invalid protocol",
                        pattern: def.protocol.source,
                        input: payload.value,
                        inst,
                        continue: !def.abort,
                    });
                }
            }
            // Set the output value based on normalize flag
            if (def.normalize) {
                // Use normalized URL
                payload.value = url.href;
            }
            else {
                // Preserve the original input (trimmed)
                payload.value = trimmed;
            }
            return;
        }
        catch (_) {
            payload.issues.push({
                code: "invalid_format",
                format: "url",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
const $ZodEmoji = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEmoji", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.emoji());
    $ZodStringFormat.init(inst, def);
});
const $ZodNanoID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNanoID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.nanoid);
    $ZodStringFormat.init(inst, def);
});
const $ZodCUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cuid);
    $ZodStringFormat.init(inst, def);
});
const $ZodCUID2 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCUID2", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cuid2);
    $ZodStringFormat.init(inst, def);
});
const $ZodULID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodULID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ulid);
    $ZodStringFormat.init(inst, def);
});
const $ZodXID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodXID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.xid);
    $ZodStringFormat.init(inst, def);
});
const $ZodKSUID = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodKSUID", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ksuid);
    $ZodStringFormat.init(inst, def);
});
const $ZodISODateTime = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODateTime", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.datetime(def));
    $ZodStringFormat.init(inst, def);
});
const $ZodISODate = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODate", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.date);
    $ZodStringFormat.init(inst, def);
});
const $ZodISOTime = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISOTime", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.time(def));
    $ZodStringFormat.init(inst, def);
});
const $ZodISODuration = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodISODuration", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.duration);
    $ZodStringFormat.init(inst, def);
});
const $ZodIPv4 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIPv4", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ipv4);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = `ipv4`;
    });
});
const $ZodIPv6 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIPv6", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.ipv6);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        const bag = inst._zod.bag;
        bag.format = `ipv6`;
    });
    inst._zod.check = (payload) => {
        try {
            // @ts-ignore
            new URL(`http://[${payload.value}]`);
            // return;
        }
        catch {
            payload.issues.push({
                code: "invalid_format",
                format: "ipv6",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
const $ZodCIDRv4 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCIDRv4", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cidrv4);
    $ZodStringFormat.init(inst, def);
});
const $ZodCIDRv6 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCIDRv6", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.cidrv6); // not used for validation
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        const [address, prefix] = payload.value.split("/");
        try {
            if (!prefix)
                throw new Error();
            const prefixNum = Number(prefix);
            if (`${prefixNum}` !== prefix)
                throw new Error();
            if (prefixNum < 0 || prefixNum > 128)
                throw new Error();
            // @ts-ignore
            new URL(`http://[${address}]`);
        }
        catch {
            payload.issues.push({
                code: "invalid_format",
                format: "cidrv6",
                input: payload.value,
                inst,
                continue: !def.abort,
            });
        }
    };
});
//////////////////////////////   ZodBase64   //////////////////////////////
function isValidBase64(data) {
    if (data === "")
        return true;
    if (data.length % 4 !== 0)
        return false;
    try {
        // @ts-ignore
        atob(data);
        return true;
    }
    catch {
        return false;
    }
}
const $ZodBase64 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBase64", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        inst._zod.bag.contentEncoding = "base64";
    });
    inst._zod.check = (payload) => {
        if (isValidBase64(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "base64",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
//////////////////////////////   ZodBase64   //////////////////////////////
function isValidBase64URL(data) {
    if (!_regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64url.test(data))
        return false;
    const base64 = data.replace(/[-_]/g, (c) => (c === "-" ? "+" : "/"));
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    return isValidBase64(padded);
}
const $ZodBase64URL = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBase64URL", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.base64url);
    $ZodStringFormat.init(inst, def);
    inst._zod.onattach.push((inst) => {
        inst._zod.bag.contentEncoding = "base64url";
    });
    inst._zod.check = (payload) => {
        if (isValidBase64URL(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "base64url",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodE164 = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodE164", (inst, def) => {
    def.pattern ?? (def.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.e164);
    $ZodStringFormat.init(inst, def);
});
//////////////////////////////   ZodJWT   //////////////////////////////
function isValidJWT(token, algorithm = null) {
    try {
        const tokensParts = token.split(".");
        if (tokensParts.length !== 3)
            return false;
        const [header] = tokensParts;
        if (!header)
            return false;
        // @ts-ignore
        const parsedHeader = JSON.parse(atob(header));
        if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
            return false;
        if (!parsedHeader.alg)
            return false;
        if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
            return false;
        return true;
    }
    catch {
        return false;
    }
}
const $ZodJWT = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodJWT", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (isValidJWT(payload.value, def.alg))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: "jwt",
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodCustomStringFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCustomStringFormat", (inst, def) => {
    $ZodStringFormat.init(inst, def);
    inst._zod.check = (payload) => {
        if (def.fn(payload.value))
            return;
        payload.issues.push({
            code: "invalid_format",
            format: def.format,
            input: payload.value,
            inst,
            continue: !def.abort,
        });
    };
});
const $ZodNumber = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNumber", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = inst._zod.bag.pattern ?? _regexes_js__WEBPACK_IMPORTED_MODULE_4__.number;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = Number(payload.value);
            }
            catch (_) { }
        const input = payload.value;
        if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
            return payload;
        }
        const received = typeof input === "number"
            ? Number.isNaN(input)
                ? "NaN"
                : !Number.isFinite(input)
                    ? "Infinity"
                    : undefined
            : undefined;
        payload.issues.push({
            expected: "number",
            code: "invalid_type",
            input,
            inst,
            ...(received ? { received } : {}),
        });
        return payload;
    };
});
const $ZodNumberFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNumber", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckNumberFormat.init(inst, def);
    $ZodNumber.init(inst, def); // no format checksp
});
const $ZodBoolean = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBoolean", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.boolean;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = Boolean(payload.value);
            }
            catch (_) { }
        const input = payload.value;
        if (typeof input === "boolean")
            return payload;
        payload.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodBigInt = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBigInt", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.bigint;
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
            try {
                payload.value = BigInt(payload.value);
            }
            catch (_) { }
        if (typeof payload.value === "bigint")
            return payload;
        payload.issues.push({
            expected: "bigint",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodBigIntFormat = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodBigInt", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheckBigIntFormat.init(inst, def);
    $ZodBigInt.init(inst, def); // no format checks
});
const $ZodSymbol = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSymbol", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "symbol")
            return payload;
        payload.issues.push({
            expected: "symbol",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodUndefined = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUndefined", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__.undefined;
    inst._zod.values = new Set([undefined]);
    inst._zod.optin = "optional";
    inst._zod.optout = "optional";
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
            return payload;
        payload.issues.push({
            expected: "undefined",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodNull = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNull", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.pattern = _regexes_js__WEBPACK_IMPORTED_MODULE_4__["null"];
    inst._zod.values = new Set([null]);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (input === null)
            return payload;
        payload.issues.push({
            expected: "null",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodAny = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodAny", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload) => payload;
});
const $ZodUnknown = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUnknown", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload) => payload;
});
const $ZodNever = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNever", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        payload.issues.push({
            expected: "never",
            code: "invalid_type",
            input: payload.value,
            inst,
        });
        return payload;
    };
});
const $ZodVoid = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodVoid", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
            return payload;
        payload.issues.push({
            expected: "void",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodDate = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDate", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) {
            try {
                payload.value = new Date(payload.value);
            }
            catch (_err) { }
        }
        const input = payload.value;
        const isDate = input instanceof Date;
        const isValidDate = isDate && !Number.isNaN(input.getTime());
        if (isValidDate)
            return payload;
        payload.issues.push({
            expected: "date",
            code: "invalid_type",
            input,
            ...(isDate ? { received: "Invalid Date" } : {}),
            inst,
        });
        return payload;
    };
});
function handleArrayResult(result, final, index) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(index, result.issues));
    }
    final.value[index] = result.value;
}
const $ZodArray = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodArray", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
            payload.issues.push({
                expected: "array",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        payload.value = Array(input.length);
        const proms = [];
        for (let i = 0; i < input.length; i++) {
            const item = input[i];
            const result = def.element._zod.run({
                value: item,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleArrayResult(result, payload, i)));
            }
            else {
                handleArrayResult(result, payload, i);
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => payload);
        }
        return payload; //handleArrayResultsAsync(parseResults, final);
    };
});
function handlePropertyResult(result, final, key, input) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
    }
    if (result.value === undefined) {
        if (key in input) {
            final.value[key] = undefined;
        }
    }
    else {
        final.value[key] = result.value;
    }
}
const $ZodObject = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodObject", (inst, def) => {
    // requires cast because technically $ZodObject doesn't extend
    $ZodType.init(inst, def);
    const _normalized = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => {
        const keys = Object.keys(def.shape);
        for (const k of keys) {
            if (!def.shape[k]._zod.traits.has("$ZodType")) {
                throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
            }
        }
        const okeys = _util_js__WEBPACK_IMPORTED_MODULE_5__.optionalKeys(def.shape);
        return {
            shape: def.shape,
            keys,
            keySet: new Set(keys),
            numKeys: keys.length,
            optionalKeys: new Set(okeys),
        };
    });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => {
        const shape = def.shape;
        const propValues = {};
        for (const key in shape) {
            const field = shape[key]._zod;
            if (field.values) {
                propValues[key] ?? (propValues[key] = new Set());
                for (const v of field.values)
                    propValues[key].add(v);
            }
        }
        return propValues;
    });
    const generateFastpass = (shape) => {
        const doc = new _doc_js__WEBPACK_IMPORTED_MODULE_2__.Doc(["shape", "payload", "ctx"]);
        const normalized = _normalized.value;
        const parseStr = (key) => {
            const k = _util_js__WEBPACK_IMPORTED_MODULE_5__.esc(key);
            return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
        };
        doc.write(`const input = payload.value;`);
        const ids = Object.create(null);
        let counter = 0;
        for (const key of normalized.keys) {
            ids[key] = `key_${counter++}`;
        }
        // A: preserve key order {
        doc.write(`const newResult = {}`);
        for (const key of normalized.keys) {
            const id = ids[key];
            const k = _util_js__WEBPACK_IMPORTED_MODULE_5__.esc(key);
            doc.write(`const ${id} = ${parseStr(key)};`);
            doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
      `);
        }
        doc.write(`payload.value = newResult;`);
        doc.write(`return payload;`);
        const fn = doc.compile();
        return (payload, ctx) => fn(shape, payload, ctx);
    };
    let fastpass;
    const isObject = _util_js__WEBPACK_IMPORTED_MODULE_5__.isObject;
    const jit = !_core_js__WEBPACK_IMPORTED_MODULE_1__.globalConfig.jitless;
    const allowsEval = _util_js__WEBPACK_IMPORTED_MODULE_5__.allowsEval;
    const fastEnabled = jit && allowsEval.value; // && !def.catchall;
    const catchall = def.catchall;
    let value;
    inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject(input)) {
            payload.issues.push({
                expected: "object",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        const proms = [];
        if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
            // always synchronous
            if (!fastpass)
                fastpass = generateFastpass(def.shape);
            payload = fastpass(payload, ctx);
        }
        else {
            payload.value = {};
            const shape = value.shape;
            for (const key of value.keys) {
                const el = shape[key];
                const r = el._zod.run({ value: input[key], issues: [] }, ctx);
                if (r instanceof Promise) {
                    proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)));
                }
                else {
                    handlePropertyResult(r, payload, key, input);
                }
            }
        }
        if (!catchall) {
            return proms.length ? Promise.all(proms).then(() => payload) : payload;
        }
        const unrecognized = [];
        // iterate over input keys
        const keySet = value.keySet;
        const _catchall = catchall._zod;
        const t = _catchall.def.type;
        for (const key of Object.keys(input)) {
            if (keySet.has(key))
                continue;
            if (t === "never") {
                unrecognized.push(key);
                continue;
            }
            const r = _catchall.run({ value: input[key], issues: [] }, ctx);
            if (r instanceof Promise) {
                proms.push(r.then((r) => handlePropertyResult(r, payload, key, input)));
            }
            else {
                handlePropertyResult(r, payload, key, input);
            }
        }
        if (unrecognized.length) {
            payload.issues.push({
                code: "unrecognized_keys",
                keys: unrecognized,
                input,
                inst,
            });
        }
        if (!proms.length)
            return payload;
        return Promise.all(proms).then(() => {
            return payload;
        });
    };
});
function handleUnionResults(results, final, inst, ctx) {
    for (const result of results) {
        if (result.issues.length === 0) {
            final.value = result.value;
            return final;
        }
    }
    const nonaborted = results.filter((r) => !_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(r));
    if (nonaborted.length === 1) {
        final.value = nonaborted[0].value;
        return nonaborted[0];
    }
    final.issues.push({
        code: "invalid_union",
        input: final.value,
        inst,
        errors: results.map((result) => result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config()))),
    });
    return final;
}
const $ZodUnion = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodUnion", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        if (def.options.every((o) => o._zod.values)) {
            return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
        }
        return undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        if (def.options.every((o) => o._zod.pattern)) {
            const patterns = def.options.map((o) => o._zod.pattern);
            return new RegExp(`^(${patterns.map((p) => _util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(p.source)).join("|")})$`);
        }
        return undefined;
    });
    const single = def.options.length === 1;
    const first = def.options[0]._zod.run;
    inst._zod.parse = (payload, ctx) => {
        if (single) {
            return first(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
            const result = option._zod.run({
                value: payload.value,
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                results.push(result);
                async = true;
            }
            else {
                if (result.issues.length === 0)
                    return result;
                results.push(result);
            }
        }
        if (!async)
            return handleUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results) => {
            return handleUnionResults(results, payload, inst, ctx);
        });
    };
});
const $ZodDiscriminatedUnion = 
/*@__PURE__*/
_core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDiscriminatedUnion", (inst, def) => {
    $ZodUnion.init(inst, def);
    const _super = inst._zod.parse;
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => {
        const propValues = {};
        for (const option of def.options) {
            const pv = option._zod.propValues;
            if (!pv || Object.keys(pv).length === 0)
                throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
            for (const [k, v] of Object.entries(pv)) {
                if (!propValues[k])
                    propValues[k] = new Set();
                for (const val of v) {
                    propValues[k].add(val);
                }
            }
        }
        return propValues;
    });
    const disc = _util_js__WEBPACK_IMPORTED_MODULE_5__.cached(() => {
        const opts = def.options;
        const map = new Map();
        for (const o of opts) {
            const values = o._zod.propValues?.[def.discriminator];
            if (!values || values.size === 0)
                throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
            for (const v of values) {
                if (map.has(v)) {
                    throw new Error(`Duplicate discriminator value "${String(v)}"`);
                }
                map.set(v, o);
            }
        }
        return map;
    });
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!_util_js__WEBPACK_IMPORTED_MODULE_5__.isObject(input)) {
            payload.issues.push({
                code: "invalid_type",
                expected: "object",
                input,
                inst,
            });
            return payload;
        }
        const opt = disc.value.get(input?.[def.discriminator]);
        if (opt) {
            return opt._zod.run(payload, ctx);
        }
        if (def.unionFallback) {
            return _super(payload, ctx);
        }
        // no matching discriminator
        payload.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: def.discriminator,
            input,
            path: [def.discriminator],
            inst,
        });
        return payload;
    };
});
const $ZodIntersection = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodIntersection", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        const left = def.left._zod.run({ value: input, issues: [] }, ctx);
        const right = def.right._zod.run({ value: input, issues: [] }, ctx);
        const async = left instanceof Promise || right instanceof Promise;
        if (async) {
            return Promise.all([left, right]).then(([left, right]) => {
                return handleIntersectionResults(payload, left, right);
            });
        }
        return handleIntersectionResults(payload, left, right);
    };
});
function mergeValues(a, b) {
    // const aType = parse.t(a);
    // const bType = parse.t(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    if (a instanceof Date && b instanceof Date && +a === +b) {
        return { valid: true, data: a };
    }
    if (_util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(a) && _util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(b)) {
        const bKeys = Object.keys(b);
        const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [key, ...sharedValue.mergeErrorPath],
                };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) {
            return { valid: false, mergeErrorPath: [] };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return {
                    valid: false,
                    mergeErrorPath: [index, ...sharedValue.mergeErrorPath],
                };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
    if (left.issues.length) {
        result.issues.push(...left.issues);
    }
    if (right.issues.length) {
        result.issues.push(...right.issues);
    }
    if (_util_js__WEBPACK_IMPORTED_MODULE_5__.aborted(result))
        return result;
    const merged = mergeValues(left.value, right.value);
    if (!merged.valid) {
        throw new Error(`Unmergable intersection. Error path: ` + `${JSON.stringify(merged.mergeErrorPath)}`);
    }
    result.value = merged.data;
    return result;
}
const $ZodTuple = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTuple", (inst, def) => {
    $ZodType.init(inst, def);
    const items = def.items;
    const optStart = items.length - [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
            payload.issues.push({
                input,
                inst,
                expected: "tuple",
                code: "invalid_type",
            });
            return payload;
        }
        payload.value = [];
        const proms = [];
        if (!def.rest) {
            const tooBig = input.length > items.length;
            const tooSmall = input.length < optStart - 1;
            if (tooBig || tooSmall) {
                payload.issues.push({
                    ...(tooBig ? { code: "too_big", maximum: items.length } : { code: "too_small", minimum: items.length }),
                    input,
                    inst,
                    origin: "array",
                });
                return payload;
            }
        }
        let i = -1;
        for (const item of items) {
            i++;
            if (i >= input.length)
                if (i >= optStart)
                    continue;
            const result = item._zod.run({
                value: input[i],
                issues: [],
            }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleTupleResult(result, payload, i)));
            }
            else {
                handleTupleResult(result, payload, i);
            }
        }
        if (def.rest) {
            const rest = input.slice(items.length);
            for (const el of rest) {
                i++;
                const result = def.rest._zod.run({
                    value: el,
                    issues: [],
                }, ctx);
                if (result instanceof Promise) {
                    proms.push(result.then((result) => handleTupleResult(result, payload, i)));
                }
                else {
                    handleTupleResult(result, payload, i);
                }
            }
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
});
function handleTupleResult(result, final, index) {
    if (result.issues.length) {
        final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(index, result.issues));
    }
    final.value[index] = result.value;
}
const $ZodRecord = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodRecord", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!_util_js__WEBPACK_IMPORTED_MODULE_5__.isPlainObject(input)) {
            payload.issues.push({
                expected: "record",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        const proms = [];
        if (def.keyType._zod.values) {
            const values = def.keyType._zod.values;
            payload.value = {};
            for (const key of values) {
                if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
                    const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                    if (result instanceof Promise) {
                        proms.push(result.then((result) => {
                            if (result.issues.length) {
                                payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                            }
                            payload.value[key] = result.value;
                        }));
                    }
                    else {
                        if (result.issues.length) {
                            payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                        }
                        payload.value[key] = result.value;
                    }
                }
            }
            let unrecognized;
            for (const key in input) {
                if (!values.has(key)) {
                    unrecognized = unrecognized ?? [];
                    unrecognized.push(key);
                }
            }
            if (unrecognized && unrecognized.length > 0) {
                payload.issues.push({
                    code: "unrecognized_keys",
                    input,
                    inst,
                    keys: unrecognized,
                });
            }
        }
        else {
            payload.value = {};
            for (const key of Reflect.ownKeys(input)) {
                if (key === "__proto__")
                    continue;
                const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
                if (keyResult instanceof Promise) {
                    throw new Error("Async schemas not supported in object keys currently");
                }
                if (keyResult.issues.length) {
                    payload.issues.push({
                        code: "invalid_key",
                        origin: "record",
                        issues: keyResult.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                        input: key,
                        path: [key],
                        inst,
                    });
                    payload.value[keyResult.value] = keyResult.value;
                    continue;
                }
                const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
                if (result instanceof Promise) {
                    proms.push(result.then((result) => {
                        if (result.issues.length) {
                            payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                        }
                        payload.value[keyResult.value] = result.value;
                    }));
                }
                else {
                    if (result.issues.length) {
                        payload.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, result.issues));
                    }
                    payload.value[keyResult.value] = result.value;
                }
            }
        }
        if (proms.length) {
            return Promise.all(proms).then(() => payload);
        }
        return payload;
    };
});
const $ZodMap = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodMap", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Map)) {
            payload.issues.push({
                expected: "map",
                code: "invalid_type",
                input,
                inst,
            });
            return payload;
        }
        const proms = [];
        payload.value = new Map();
        for (const [key, value] of input) {
            const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
            const valueResult = def.valueType._zod.run({ value: value, issues: [] }, ctx);
            if (keyResult instanceof Promise || valueResult instanceof Promise) {
                proms.push(Promise.all([keyResult, valueResult]).then(([keyResult, valueResult]) => {
                    handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
                }));
            }
            else {
                handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
            }
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
});
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
    if (keyResult.issues.length) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof key)) {
            final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, keyResult.issues));
        }
        else {
            final.issues.push({
                code: "invalid_key",
                origin: "map",
                input,
                inst,
                issues: keyResult.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
            });
        }
    }
    if (valueResult.issues.length) {
        if (_util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof key)) {
            final.issues.push(..._util_js__WEBPACK_IMPORTED_MODULE_5__.prefixIssues(key, valueResult.issues));
        }
        else {
            final.issues.push({
                origin: "map",
                code: "invalid_element",
                input,
                inst,
                key: key,
                issues: valueResult.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
            });
        }
    }
    final.value.set(keyResult.value, valueResult.value);
}
const $ZodSet = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSet", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Set)) {
            payload.issues.push({
                input,
                inst,
                expected: "set",
                code: "invalid_type",
            });
            return payload;
        }
        const proms = [];
        payload.value = new Set();
        for (const item of input) {
            const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
            if (result instanceof Promise) {
                proms.push(result.then((result) => handleSetResult(result, payload)));
            }
            else
                handleSetResult(result, payload);
        }
        if (proms.length)
            return Promise.all(proms).then(() => payload);
        return payload;
    };
});
function handleSetResult(result, final) {
    if (result.issues.length) {
        final.issues.push(...result.issues);
    }
    final.value.add(result.value);
}
const $ZodEnum = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodEnum", (inst, def) => {
    $ZodType.init(inst, def);
    const values = _util_js__WEBPACK_IMPORTED_MODULE_5__.getEnumValues(def.entries);
    const valuesSet = new Set(values);
    inst._zod.values = valuesSet;
    inst._zod.pattern = new RegExp(`^(${values
        .filter((k) => _util_js__WEBPACK_IMPORTED_MODULE_5__.propertyKeyTypes.has(typeof k))
        .map((o) => (typeof o === "string" ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o) : o.toString()))
        .join("|")})$`);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (valuesSet.has(input)) {
            return payload;
        }
        payload.issues.push({
            code: "invalid_value",
            values,
            input,
            inst,
        });
        return payload;
    };
});
const $ZodLiteral = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodLiteral", (inst, def) => {
    $ZodType.init(inst, def);
    if (def.values.length === 0) {
        throw new Error("Cannot create literal schema with no valid values");
    }
    inst._zod.values = new Set(def.values);
    inst._zod.pattern = new RegExp(`^(${def.values
        .map((o) => (typeof o === "string" ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o) : o ? _util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(o.toString()) : String(o)))
        .join("|")})$`);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (inst._zod.values.has(input)) {
            return payload;
        }
        payload.issues.push({
            code: "invalid_value",
            values: def.values,
            input,
            inst,
        });
        return payload;
    };
});
const $ZodFile = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodFile", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        // @ts-ignore
        if (input instanceof File)
            return payload;
        payload.issues.push({
            expected: "file",
            code: "invalid_type",
            input,
            inst,
        });
        return payload;
    };
});
const $ZodTransform = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTransform", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        const _out = def.transform(payload.value, payload);
        if (_ctx.async) {
            const output = _out instanceof Promise ? _out : Promise.resolve(_out);
            return output.then((output) => {
                payload.value = output;
                return payload;
            });
        }
        if (_out instanceof Promise) {
            throw new _core_js__WEBPACK_IMPORTED_MODULE_1__.$ZodAsyncError();
        }
        payload.value = _out;
        return payload;
    };
});
function handleOptionalResult(result, input) {
    if (result.issues.length && input === undefined) {
        return { issues: [], value: undefined };
    }
    return result;
}
const $ZodOptional = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodOptional", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    inst._zod.optout = "optional";
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(pattern.source)})?$`) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        if (def.innerType._zod.optin === "optional") {
            const result = def.innerType._zod.run(payload, ctx);
            if (result instanceof Promise)
                return result.then((r) => handleOptionalResult(r, payload.value));
            return handleOptionalResult(result, payload.value);
        }
        if (payload.value === undefined) {
            return payload;
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNullable = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNullable", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${_util_js__WEBPACK_IMPORTED_MODULE_5__.cleanRegex(pattern.source)}|null)$`) : undefined;
    });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? new Set([...def.innerType._zod.values, null]) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        if (payload.value === null)
            return payload;
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodDefault = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodDefault", (inst, def) => {
    $ZodType.init(inst, def);
    // inst._zod.qin = "true";
    inst._zod.optin = "optional";
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
            /**
             * $ZodDefault always returns the default value immediately.
             * It doesn't pass the default value into the validator ("prefault"). There's no reason to pass the default value through validation. The validity of the default is enforced by TypeScript statically. Otherwise, it's the responsibility of the user to ensure the default is valid. In the case of pipes with divergent in/out types, you can specify the default on the `in` schema of your ZodPipe to set a "prefault" for the pipe.   */
            return payload;
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleDefaultResult(result, def));
        }
        return handleDefaultResult(result, def);
    };
});
function handleDefaultResult(payload, def) {
    if (payload.value === undefined) {
        payload.value = def.defaultValue;
    }
    return payload;
}
const $ZodPrefault = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPrefault", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.optin = "optional";
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        if (payload.value === undefined) {
            payload.value = def.defaultValue;
        }
        return def.innerType._zod.run(payload, ctx);
    };
});
const $ZodNonOptional = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNonOptional", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => {
        const v = def.innerType._zod.values;
        return v ? new Set([...v].filter((x) => x !== undefined)) : undefined;
    });
    inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => handleNonOptionalResult(result, inst));
        }
        return handleNonOptionalResult(result, inst);
    };
});
function handleNonOptionalResult(payload, inst) {
    if (!payload.issues.length && payload.value === undefined) {
        payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: payload.value,
            inst,
        });
    }
    return payload;
}
const $ZodSuccess = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodSuccess", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => {
                payload.value = result.issues.length === 0;
                return payload;
            });
        }
        payload.value = result.issues.length === 0;
        return payload;
    };
});
const $ZodCatch = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCatch", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then((result) => {
                payload.value = result.value;
                if (result.issues.length) {
                    payload.value = def.catchValue({
                        ...payload,
                        error: {
                            issues: result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                        },
                        input: payload.value,
                    });
                    payload.issues = [];
                }
                return payload;
            });
        }
        payload.value = result.value;
        if (result.issues.length) {
            payload.value = def.catchValue({
                ...payload,
                error: {
                    issues: result.issues.map((iss) => _util_js__WEBPACK_IMPORTED_MODULE_5__.finalizeIssue(iss, ctx, _core_js__WEBPACK_IMPORTED_MODULE_1__.config())),
                },
                input: payload.value,
            });
            payload.issues = [];
        }
        return payload;
    };
});
const $ZodNaN = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodNaN", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
            payload.issues.push({
                input: payload.value,
                inst,
                expected: "nan",
                code: "invalid_type",
            });
            return payload;
        }
        return payload;
    };
});
const $ZodPipe = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPipe", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.in._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.in._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.out._zod.optout);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
    inst._zod.parse = (payload, ctx) => {
        const left = def.in._zod.run(payload, ctx);
        if (left instanceof Promise) {
            return left.then((left) => handlePipeResult(left, def, ctx));
        }
        return handlePipeResult(left, def, ctx);
    };
});
function handlePipeResult(left, def, ctx) {
    if (left.issues.length) {
        return left;
    }
    return def.out._zod.run({ value: left.value, issues: left.issues }, ctx);
}
const $ZodReadonly = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodReadonly", (inst, def) => {
    $ZodType.init(inst, def);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "values", () => def.innerType._zod.values);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
    inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
            return result.then(handleReadonlyResult);
        }
        return handleReadonlyResult(result);
    };
});
function handleReadonlyResult(payload) {
    payload.value = Object.freeze(payload.value);
    return payload;
}
const $ZodTemplateLiteral = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodTemplateLiteral", (inst, def) => {
    $ZodType.init(inst, def);
    const regexParts = [];
    for (const part of def.parts) {
        if (typeof part === "object" && part !== null) {
            // is Zod schema
            if (!part._zod.pattern) {
                // if (!source)
                throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
            }
            const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
            if (!source)
                throw new Error(`Invalid template literal part: ${part._zod.traits}`);
            const start = source.startsWith("^") ? 1 : 0;
            const end = source.endsWith("$") ? source.length - 1 : source.length;
            regexParts.push(source.slice(start, end));
        }
        else if (part === null || _util_js__WEBPACK_IMPORTED_MODULE_5__.primitiveTypes.has(typeof part)) {
            regexParts.push(_util_js__WEBPACK_IMPORTED_MODULE_5__.escapeRegex(`${part}`));
        }
        else {
            throw new Error(`Invalid template literal part: ${part}`);
        }
    }
    inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
    inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "string") {
            payload.issues.push({
                input: payload.value,
                inst,
                expected: "template_literal",
                code: "invalid_type",
            });
            return payload;
        }
        inst._zod.pattern.lastIndex = 0;
        if (!inst._zod.pattern.test(payload.value)) {
            payload.issues.push({
                input: payload.value,
                inst,
                code: "invalid_format",
                format: def.format ?? "template_literal",
                pattern: inst._zod.pattern.source,
            });
            return payload;
        }
        return payload;
    };
});
const $ZodPromise = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodPromise", (inst, def) => {
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, ctx) => {
        return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
    };
});
const $ZodLazy = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodLazy", (inst, def) => {
    $ZodType.init(inst, def);
    // let _innerType!: any;
    // util.defineLazy(def, "getter", () => {
    //   if (!_innerType) {
    //     _innerType = def.getter();
    //   }
    //   return () => _innerType;
    // });
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "innerType", () => def.getter());
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "pattern", () => inst._zod.innerType._zod.pattern);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "propValues", () => inst._zod.innerType._zod.propValues);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optin", () => inst._zod.innerType._zod.optin ?? undefined);
    _util_js__WEBPACK_IMPORTED_MODULE_5__.defineLazy(inst._zod, "optout", () => inst._zod.innerType._zod.optout ?? undefined);
    inst._zod.parse = (payload, ctx) => {
        const inner = inst._zod.innerType;
        return inner._zod.run(payload, ctx);
    };
});
const $ZodCustom = /*@__PURE__*/ _core_js__WEBPACK_IMPORTED_MODULE_1__.$constructor("$ZodCustom", (inst, def) => {
    _checks_js__WEBPACK_IMPORTED_MODULE_0__.$ZodCheck.init(inst, def);
    $ZodType.init(inst, def);
    inst._zod.parse = (payload, _) => {
        return payload;
    };
    inst._zod.check = (payload) => {
        const input = payload.value;
        const r = def.fn(input);
        if (r instanceof Promise) {
            return r.then((r) => handleRefineResult(r, payload, input, inst));
        }
        handleRefineResult(r, payload, input, inst);
        return;
    };
});
function handleRefineResult(result, payload, input, inst) {
    if (!result) {
        const _iss = {
            code: "custom",
            input,
            inst, // incorporates params.error into issue reporting
            path: [...(inst._zod.def.path ?? [])], // incorporates params.error into issue reporting
            continue: !inst._zod.def.abort,
            // params: inst._zod.def.params,
        };
        if (inst._zod.def.params)
            _iss.params = inst._zod.def.params;
        payload.issues.push(_util_js__WEBPACK_IMPORTED_MODULE_5__.issue(_iss));
    }
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/to-json-schema.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/to-json-schema.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JSONSchemaGenerator: () => (/* binding */ JSONSchemaGenerator),
/* harmony export */   toJSONSchema: () => (/* binding */ toJSONSchema)
/* harmony export */ });
/* harmony import */ var _registries_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./registries.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/registries.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js");


class JSONSchemaGenerator {
    constructor(params) {
        this.counter = 0;
        this.metadataRegistry = params?.metadata ?? _registries_js__WEBPACK_IMPORTED_MODULE_0__.globalRegistry;
        this.target = params?.target ?? "draft-2020-12";
        this.unrepresentable = params?.unrepresentable ?? "throw";
        this.override = params?.override ?? (() => { });
        this.io = params?.io ?? "output";
        this.seen = new Map();
    }
    process(schema, _params = { path: [], schemaPath: [] }) {
        var _a;
        const def = schema._zod.def;
        const formatMap = {
            guid: "uuid",
            url: "uri",
            datetime: "date-time",
            json_string: "json-string",
            regex: "", // do not set
        };
        // check for schema in seens
        const seen = this.seen.get(schema);
        if (seen) {
            seen.count++;
            // check if cycle
            const isCycle = _params.schemaPath.includes(schema);
            if (isCycle) {
                seen.cycle = _params.path;
            }
            return seen.schema;
        }
        // initialize
        const result = { schema: {}, count: 1, cycle: undefined, path: _params.path };
        this.seen.set(schema, result);
        // custom method overrides default behavior
        const overrideSchema = schema._zod.toJSONSchema?.();
        if (overrideSchema) {
            result.schema = overrideSchema;
        }
        else {
            const params = {
                ..._params,
                schemaPath: [..._params.schemaPath, schema],
                path: _params.path,
            };
            const parent = schema._zod.parent;
            if (parent) {
                // schema was cloned from another schema
                result.ref = parent;
                this.process(parent, params);
                this.seen.get(parent).isParent = true;
            }
            else {
                const _json = result.schema;
                switch (def.type) {
                    case "string": {
                        const json = _json;
                        json.type = "string";
                        const { minimum, maximum, format, patterns, contentEncoding } = schema._zod
                            .bag;
                        if (typeof minimum === "number")
                            json.minLength = minimum;
                        if (typeof maximum === "number")
                            json.maxLength = maximum;
                        // custom pattern overrides format
                        if (format) {
                            json.format = formatMap[format] ?? format;
                            if (json.format === "")
                                delete json.format; // empty format is not valid
                        }
                        if (contentEncoding)
                            json.contentEncoding = contentEncoding;
                        if (patterns && patterns.size > 0) {
                            const regexes = [...patterns];
                            if (regexes.length === 1)
                                json.pattern = regexes[0].source;
                            else if (regexes.length > 1) {
                                result.schema.allOf = [
                                    ...regexes.map((regex) => ({
                                        ...(this.target === "draft-7" || this.target === "draft-4" ? { type: "string" } : {}),
                                        pattern: regex.source,
                                    })),
                                ];
                            }
                        }
                        break;
                    }
                    case "number": {
                        const json = _json;
                        const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
                        if (typeof format === "string" && format.includes("int"))
                            json.type = "integer";
                        else
                            json.type = "number";
                        if (typeof exclusiveMinimum === "number") {
                            if (this.target === "draft-4") {
                                json.minimum = exclusiveMinimum;
                                json.exclusiveMinimum = true;
                            }
                            else {
                                json.exclusiveMinimum = exclusiveMinimum;
                            }
                        }
                        if (typeof minimum === "number") {
                            json.minimum = minimum;
                            if (typeof exclusiveMinimum === "number" && this.target !== "draft-4") {
                                if (exclusiveMinimum >= minimum)
                                    delete json.minimum;
                                else
                                    delete json.exclusiveMinimum;
                            }
                        }
                        if (typeof exclusiveMaximum === "number") {
                            if (this.target === "draft-4") {
                                json.maximum = exclusiveMaximum;
                                json.exclusiveMaximum = true;
                            }
                            else {
                                json.exclusiveMaximum = exclusiveMaximum;
                            }
                        }
                        if (typeof maximum === "number") {
                            json.maximum = maximum;
                            if (typeof exclusiveMaximum === "number" && this.target !== "draft-4") {
                                if (exclusiveMaximum <= maximum)
                                    delete json.maximum;
                                else
                                    delete json.exclusiveMaximum;
                            }
                        }
                        if (typeof multipleOf === "number")
                            json.multipleOf = multipleOf;
                        break;
                    }
                    case "boolean": {
                        const json = _json;
                        json.type = "boolean";
                        break;
                    }
                    case "bigint": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("BigInt cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "symbol": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Symbols cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "null": {
                        _json.type = "null";
                        break;
                    }
                    case "any": {
                        break;
                    }
                    case "unknown": {
                        break;
                    }
                    case "undefined": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Undefined cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "void": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Void cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "never": {
                        _json.not = {};
                        break;
                    }
                    case "date": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Date cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "array": {
                        const json = _json;
                        const { minimum, maximum } = schema._zod.bag;
                        if (typeof minimum === "number")
                            json.minItems = minimum;
                        if (typeof maximum === "number")
                            json.maxItems = maximum;
                        json.type = "array";
                        json.items = this.process(def.element, { ...params, path: [...params.path, "items"] });
                        break;
                    }
                    case "object": {
                        const json = _json;
                        json.type = "object";
                        json.properties = {};
                        const shape = def.shape; // params.shapeCache.get(schema)!;
                        for (const key in shape) {
                            json.properties[key] = this.process(shape[key], {
                                ...params,
                                path: [...params.path, "properties", key],
                            });
                        }
                        // required keys
                        const allKeys = new Set(Object.keys(shape));
                        // const optionalKeys = new Set(def.optional);
                        const requiredKeys = new Set([...allKeys].filter((key) => {
                            const v = def.shape[key]._zod;
                            if (this.io === "input") {
                                return v.optin === undefined;
                            }
                            else {
                                return v.optout === undefined;
                            }
                        }));
                        if (requiredKeys.size > 0) {
                            json.required = Array.from(requiredKeys);
                        }
                        // catchall
                        if (def.catchall?._zod.def.type === "never") {
                            // strict
                            json.additionalProperties = false;
                        }
                        else if (!def.catchall) {
                            // regular
                            if (this.io === "output")
                                json.additionalProperties = false;
                        }
                        else if (def.catchall) {
                            json.additionalProperties = this.process(def.catchall, {
                                ...params,
                                path: [...params.path, "additionalProperties"],
                            });
                        }
                        break;
                    }
                    case "union": {
                        const json = _json;
                        json.anyOf = def.options.map((x, i) => this.process(x, {
                            ...params,
                            path: [...params.path, "anyOf", i],
                        }));
                        break;
                    }
                    case "intersection": {
                        const json = _json;
                        const a = this.process(def.left, {
                            ...params,
                            path: [...params.path, "allOf", 0],
                        });
                        const b = this.process(def.right, {
                            ...params,
                            path: [...params.path, "allOf", 1],
                        });
                        const isSimpleIntersection = (val) => "allOf" in val && Object.keys(val).length === 1;
                        const allOf = [
                            ...(isSimpleIntersection(a) ? a.allOf : [a]),
                            ...(isSimpleIntersection(b) ? b.allOf : [b]),
                        ];
                        json.allOf = allOf;
                        break;
                    }
                    case "tuple": {
                        const json = _json;
                        json.type = "array";
                        const prefixItems = def.items.map((x, i) => this.process(x, { ...params, path: [...params.path, "prefixItems", i] }));
                        if (this.target === "draft-2020-12") {
                            json.prefixItems = prefixItems;
                        }
                        else {
                            json.items = prefixItems;
                        }
                        if (def.rest) {
                            const rest = this.process(def.rest, {
                                ...params,
                                path: [...params.path, "items"],
                            });
                            if (this.target === "draft-2020-12") {
                                json.items = rest;
                            }
                            else {
                                json.additionalItems = rest;
                            }
                        }
                        // additionalItems
                        if (def.rest) {
                            json.items = this.process(def.rest, {
                                ...params,
                                path: [...params.path, "items"],
                            });
                        }
                        // length
                        const { minimum, maximum } = schema._zod.bag;
                        if (typeof minimum === "number")
                            json.minItems = minimum;
                        if (typeof maximum === "number")
                            json.maxItems = maximum;
                        break;
                    }
                    case "record": {
                        const json = _json;
                        json.type = "object";
                        if (this.target !== "draft-4") {
                            json.propertyNames = this.process(def.keyType, {
                                ...params,
                                path: [...params.path, "propertyNames"],
                            });
                        }
                        json.additionalProperties = this.process(def.valueType, {
                            ...params,
                            path: [...params.path, "additionalProperties"],
                        });
                        break;
                    }
                    case "map": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Map cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "set": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Set cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "enum": {
                        const json = _json;
                        const values = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.getEnumValues)(def.entries);
                        // Number enums can have both string and number values
                        if (values.every((v) => typeof v === "number"))
                            json.type = "number";
                        if (values.every((v) => typeof v === "string"))
                            json.type = "string";
                        json.enum = values;
                        break;
                    }
                    case "literal": {
                        const json = _json;
                        const vals = [];
                        for (const val of def.values) {
                            if (val === undefined) {
                                if (this.unrepresentable === "throw") {
                                    throw new Error("Literal `undefined` cannot be represented in JSON Schema");
                                }
                                else {
                                    // do not add to vals
                                }
                            }
                            else if (typeof val === "bigint") {
                                if (this.unrepresentable === "throw") {
                                    throw new Error("BigInt literals cannot be represented in JSON Schema");
                                }
                                else {
                                    vals.push(Number(val));
                                }
                            }
                            else {
                                vals.push(val);
                            }
                        }
                        if (vals.length === 0) {
                            // do nothing (an undefined literal was stripped)
                        }
                        else if (vals.length === 1) {
                            const val = vals[0];
                            json.type = val === null ? "null" : typeof val;
                            if (this.target === "draft-4") {
                                json.enum = [val];
                            }
                            else {
                                json.const = val;
                            }
                        }
                        else {
                            if (vals.every((v) => typeof v === "number"))
                                json.type = "number";
                            if (vals.every((v) => typeof v === "string"))
                                json.type = "string";
                            if (vals.every((v) => typeof v === "boolean"))
                                json.type = "string";
                            if (vals.every((v) => v === null))
                                json.type = "null";
                            json.enum = vals;
                        }
                        break;
                    }
                    case "file": {
                        const json = _json;
                        const file = {
                            type: "string",
                            format: "binary",
                            contentEncoding: "binary",
                        };
                        const { minimum, maximum, mime } = schema._zod.bag;
                        if (minimum !== undefined)
                            file.minLength = minimum;
                        if (maximum !== undefined)
                            file.maxLength = maximum;
                        if (mime) {
                            if (mime.length === 1) {
                                file.contentMediaType = mime[0];
                                Object.assign(json, file);
                            }
                            else {
                                json.anyOf = mime.map((m) => {
                                    const mFile = { ...file, contentMediaType: m };
                                    return mFile;
                                });
                            }
                        }
                        else {
                            Object.assign(json, file);
                        }
                        // if (this.unrepresentable === "throw") {
                        //   throw new Error("File cannot be represented in JSON Schema");
                        // }
                        break;
                    }
                    case "transform": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Transforms cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "nullable": {
                        const inner = this.process(def.innerType, params);
                        _json.anyOf = [inner, { type: "null" }];
                        break;
                    }
                    case "nonoptional": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "success": {
                        const json = _json;
                        json.type = "boolean";
                        break;
                    }
                    case "default": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        _json.default = JSON.parse(JSON.stringify(def.defaultValue));
                        break;
                    }
                    case "prefault": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        if (this.io === "input")
                            _json._prefault = JSON.parse(JSON.stringify(def.defaultValue));
                        break;
                    }
                    case "catch": {
                        // use conditionals
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        let catchValue;
                        try {
                            catchValue = def.catchValue(undefined);
                        }
                        catch {
                            throw new Error("Dynamic catch values are not supported in JSON Schema");
                        }
                        _json.default = catchValue;
                        break;
                    }
                    case "nan": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("NaN cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    case "template_literal": {
                        const json = _json;
                        const pattern = schema._zod.pattern;
                        if (!pattern)
                            throw new Error("Pattern not found in template literal");
                        json.type = "string";
                        json.pattern = pattern.source;
                        break;
                    }
                    case "pipe": {
                        const innerType = this.io === "input" ? (def.in._zod.def.type === "transform" ? def.out : def.in) : def.out;
                        this.process(innerType, params);
                        result.ref = innerType;
                        break;
                    }
                    case "readonly": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        _json.readOnly = true;
                        break;
                    }
                    // passthrough types
                    case "promise": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "optional": {
                        this.process(def.innerType, params);
                        result.ref = def.innerType;
                        break;
                    }
                    case "lazy": {
                        const innerType = schema._zod.innerType;
                        this.process(innerType, params);
                        result.ref = innerType;
                        break;
                    }
                    case "custom": {
                        if (this.unrepresentable === "throw") {
                            throw new Error("Custom types cannot be represented in JSON Schema");
                        }
                        break;
                    }
                    default: {
                        def;
                    }
                }
            }
        }
        // metadata
        const meta = this.metadataRegistry.get(schema);
        if (meta)
            Object.assign(result.schema, meta);
        if (this.io === "input" && isTransforming(schema)) {
            // examples/defaults only apply to output type of pipe
            delete result.schema.examples;
            delete result.schema.default;
        }
        // set prefault as default
        if (this.io === "input" && result.schema._prefault)
            (_a = result.schema).default ?? (_a.default = result.schema._prefault);
        delete result.schema._prefault;
        // pulling fresh from this.seen in case it was overwritten
        const _result = this.seen.get(schema);
        return _result.schema;
    }
    emit(schema, _params) {
        const params = {
            cycles: _params?.cycles ?? "ref",
            reused: _params?.reused ?? "inline",
            // unrepresentable: _params?.unrepresentable ?? "throw",
            // uri: _params?.uri ?? ((id) => `${id}`),
            external: _params?.external ?? undefined,
        };
        // iterate over seen map;
        const root = this.seen.get(schema);
        if (!root)
            throw new Error("Unprocessed schema. This is a bug in Zod.");
        // initialize result with root schema fields
        // Object.assign(result, seen.cached);
        // returns a ref to the schema
        // defId will be empty if the ref points to an external schema (or #)
        const makeURI = (entry) => {
            // comparing the seen objects because sometimes
            // multiple schemas map to the same seen object.
            // e.g. lazy
            // external is configured
            const defsSegment = this.target === "draft-2020-12" ? "$defs" : "definitions";
            if (params.external) {
                const externalId = params.external.registry.get(entry[0])?.id; // ?? "__shared";// `__schema${this.counter++}`;
                // check if schema is in the external registry
                const uriGenerator = params.external.uri ?? ((id) => id);
                if (externalId) {
                    return { ref: uriGenerator(externalId) };
                }
                // otherwise, add to __shared
                const id = entry[1].defId ?? entry[1].schema.id ?? `schema${this.counter++}`;
                entry[1].defId = id; // set defId so it will be reused if needed
                return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
            }
            if (entry[1] === root) {
                return { ref: "#" };
            }
            // self-contained schema
            const uriPrefix = `#`;
            const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
            const defId = entry[1].schema.id ?? `__schema${this.counter++}`;
            return { defId, ref: defUriPrefix + defId };
        };
        // stored cached version in `def` property
        // remove all properties, set $ref
        const extractToDef = (entry) => {
            // if the schema is already a reference, do not extract it
            if (entry[1].schema.$ref) {
                return;
            }
            const seen = entry[1];
            const { ref, defId } = makeURI(entry);
            seen.def = { ...seen.schema };
            // defId won't be set if the schema is a reference to an external schema
            if (defId)
                seen.defId = defId;
            // wipe away all properties except $ref
            const schema = seen.schema;
            for (const key in schema) {
                delete schema[key];
            }
            schema.$ref = ref;
        };
        // throw on cycles
        // break cycles
        if (params.cycles === "throw") {
            for (const entry of this.seen.entries()) {
                const seen = entry[1];
                if (seen.cycle) {
                    throw new Error("Cycle detected: " +
                        `#/${seen.cycle?.join("/")}/<root>` +
                        '\n\nSet the `cycles` parameter to `"ref"` to resolve cyclical schemas with defs.');
                }
            }
        }
        // extract schemas into $defs
        for (const entry of this.seen.entries()) {
            const seen = entry[1];
            // convert root schema to # $ref
            if (schema === entry[0]) {
                extractToDef(entry); // this has special handling for the root schema
                continue;
            }
            // extract schemas that are in the external registry
            if (params.external) {
                const ext = params.external.registry.get(entry[0])?.id;
                if (schema !== entry[0] && ext) {
                    extractToDef(entry);
                    continue;
                }
            }
            // extract schemas with `id` meta
            const id = this.metadataRegistry.get(entry[0])?.id;
            if (id) {
                extractToDef(entry);
                continue;
            }
            // break cycles
            if (seen.cycle) {
                // any
                extractToDef(entry);
                continue;
            }
            // extract reused schemas
            if (seen.count > 1) {
                if (params.reused === "ref") {
                    extractToDef(entry);
                    // biome-ignore lint:
                    continue;
                }
            }
        }
        // flatten _refs
        const flattenRef = (zodSchema, params) => {
            const seen = this.seen.get(zodSchema);
            const schema = seen.def ?? seen.schema;
            const _cached = { ...schema };
            // already seen
            if (seen.ref === null) {
                return;
            }
            // flatten ref if defined
            const ref = seen.ref;
            seen.ref = null; // prevent recursion
            if (ref) {
                flattenRef(ref, params);
                // merge referenced schema into current
                const refSchema = this.seen.get(ref).schema;
                if (refSchema.$ref && (params.target === "draft-7" || params.target === "draft-4")) {
                    schema.allOf = schema.allOf ?? [];
                    schema.allOf.push(refSchema);
                }
                else {
                    Object.assign(schema, refSchema);
                    Object.assign(schema, _cached); // prevent overwriting any fields in the original schema
                }
            }
            // execute overrides
            if (!seen.isParent)
                this.override({
                    zodSchema: zodSchema,
                    jsonSchema: schema,
                    path: seen.path ?? [],
                });
        };
        for (const entry of [...this.seen.entries()].reverse()) {
            flattenRef(entry[0], { target: this.target });
        }
        const result = {};
        if (this.target === "draft-2020-12") {
            result.$schema = "https://json-schema.org/draft/2020-12/schema";
        }
        else if (this.target === "draft-7") {
            result.$schema = "http://json-schema.org/draft-07/schema#";
        }
        else if (this.target === "draft-4") {
            result.$schema = "http://json-schema.org/draft-04/schema#";
        }
        else {
            // @ts-ignore
            console.warn(`Invalid target: ${this.target}`);
        }
        if (params.external?.uri) {
            const id = params.external.registry.get(schema)?.id;
            if (!id)
                throw new Error("Schema is missing an `id` property");
            result.$id = params.external.uri(id);
        }
        Object.assign(result, root.def);
        // build defs object
        const defs = params.external?.defs ?? {};
        for (const entry of this.seen.entries()) {
            const seen = entry[1];
            if (seen.def && seen.defId) {
                defs[seen.defId] = seen.def;
            }
        }
        // set definitions in result
        if (params.external) {
        }
        else {
            if (Object.keys(defs).length > 0) {
                if (this.target === "draft-2020-12") {
                    result.$defs = defs;
                }
                else {
                    result.definitions = defs;
                }
            }
        }
        try {
            // this "finalizes" this schema and ensures all cycles are removed
            // each call to .emit() is functionally independent
            // though the seen map is shared
            return JSON.parse(JSON.stringify(result));
        }
        catch (_err) {
            throw new Error("Error converting schema to JSON.");
        }
    }
}
function toJSONSchema(input, _params) {
    if (input instanceof _registries_js__WEBPACK_IMPORTED_MODULE_0__.$ZodRegistry) {
        const gen = new JSONSchemaGenerator(_params);
        const defs = {};
        for (const entry of input._idmap.entries()) {
            const [_, schema] = entry;
            gen.process(schema);
        }
        const schemas = {};
        const external = {
            registry: input,
            uri: _params?.uri,
            defs,
        };
        for (const entry of input._idmap.entries()) {
            const [key, schema] = entry;
            schemas[key] = gen.emit(schema, {
                ..._params,
                external,
            });
        }
        if (Object.keys(defs).length > 0) {
            const defsSegment = gen.target === "draft-2020-12" ? "$defs" : "definitions";
            schemas.__shared = {
                [defsSegment]: defs,
            };
        }
        return { schemas };
    }
    const gen = new JSONSchemaGenerator(_params);
    gen.process(input);
    return gen.emit(input, _params);
}
function isTransforming(_schema, _ctx) {
    const ctx = _ctx ?? { seen: new Set() };
    if (ctx.seen.has(_schema))
        return false;
    ctx.seen.add(_schema);
    const schema = _schema;
    const def = schema._zod.def;
    switch (def.type) {
        case "string":
        case "number":
        case "bigint":
        case "boolean":
        case "date":
        case "symbol":
        case "undefined":
        case "null":
        case "any":
        case "unknown":
        case "never":
        case "void":
        case "literal":
        case "enum":
        case "nan":
        case "file":
        case "template_literal":
            return false;
        case "array": {
            return isTransforming(def.element, ctx);
        }
        case "object": {
            for (const key in def.shape) {
                if (isTransforming(def.shape[key], ctx))
                    return true;
            }
            return false;
        }
        case "union": {
            for (const option of def.options) {
                if (isTransforming(option, ctx))
                    return true;
            }
            return false;
        }
        case "intersection": {
            return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
        }
        case "tuple": {
            for (const item of def.items) {
                if (isTransforming(item, ctx))
                    return true;
            }
            if (def.rest && isTransforming(def.rest, ctx))
                return true;
            return false;
        }
        case "record": {
            return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
        }
        case "map": {
            return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
        }
        case "set": {
            return isTransforming(def.valueType, ctx);
        }
        // inner types
        case "promise":
        case "optional":
        case "nonoptional":
        case "nullable":
        case "readonly":
            return isTransforming(def.innerType, ctx);
        case "lazy":
            return isTransforming(def.getter(), ctx);
        case "default": {
            return isTransforming(def.innerType, ctx);
        }
        case "prefault": {
            return isTransforming(def.innerType, ctx);
        }
        case "custom": {
            return false;
        }
        case "transform": {
            return true;
        }
        case "pipe": {
            return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
        }
        case "success": {
            return false;
        }
        case "catch": {
            return false;
        }
        default:
            def;
    }
    throw new Error(`Unknown schema type: ${def.type}`);
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js":
/*!************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/util.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BIGINT_FORMAT_RANGES: () => (/* binding */ BIGINT_FORMAT_RANGES),
/* harmony export */   Class: () => (/* binding */ Class),
/* harmony export */   NUMBER_FORMAT_RANGES: () => (/* binding */ NUMBER_FORMAT_RANGES),
/* harmony export */   aborted: () => (/* binding */ aborted),
/* harmony export */   allowsEval: () => (/* binding */ allowsEval),
/* harmony export */   assert: () => (/* binding */ assert),
/* harmony export */   assertEqual: () => (/* binding */ assertEqual),
/* harmony export */   assertIs: () => (/* binding */ assertIs),
/* harmony export */   assertNever: () => (/* binding */ assertNever),
/* harmony export */   assertNotEqual: () => (/* binding */ assertNotEqual),
/* harmony export */   assignProp: () => (/* binding */ assignProp),
/* harmony export */   cached: () => (/* binding */ cached),
/* harmony export */   captureStackTrace: () => (/* binding */ captureStackTrace),
/* harmony export */   cleanEnum: () => (/* binding */ cleanEnum),
/* harmony export */   cleanRegex: () => (/* binding */ cleanRegex),
/* harmony export */   clone: () => (/* binding */ clone),
/* harmony export */   cloneDef: () => (/* binding */ cloneDef),
/* harmony export */   createTransparentProxy: () => (/* binding */ createTransparentProxy),
/* harmony export */   defineLazy: () => (/* binding */ defineLazy),
/* harmony export */   esc: () => (/* binding */ esc),
/* harmony export */   escapeRegex: () => (/* binding */ escapeRegex),
/* harmony export */   extend: () => (/* binding */ extend),
/* harmony export */   finalizeIssue: () => (/* binding */ finalizeIssue),
/* harmony export */   floatSafeRemainder: () => (/* binding */ floatSafeRemainder),
/* harmony export */   getElementAtPath: () => (/* binding */ getElementAtPath),
/* harmony export */   getEnumValues: () => (/* binding */ getEnumValues),
/* harmony export */   getLengthableOrigin: () => (/* binding */ getLengthableOrigin),
/* harmony export */   getParsedType: () => (/* binding */ getParsedType),
/* harmony export */   getSizableOrigin: () => (/* binding */ getSizableOrigin),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   issue: () => (/* binding */ issue),
/* harmony export */   joinValues: () => (/* binding */ joinValues),
/* harmony export */   jsonStringifyReplacer: () => (/* binding */ jsonStringifyReplacer),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   mergeDefs: () => (/* binding */ mergeDefs),
/* harmony export */   normalizeParams: () => (/* binding */ normalizeParams),
/* harmony export */   nullish: () => (/* binding */ nullish),
/* harmony export */   numKeys: () => (/* binding */ numKeys),
/* harmony export */   objectClone: () => (/* binding */ objectClone),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   optionalKeys: () => (/* binding */ optionalKeys),
/* harmony export */   partial: () => (/* binding */ partial),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   prefixIssues: () => (/* binding */ prefixIssues),
/* harmony export */   primitiveTypes: () => (/* binding */ primitiveTypes),
/* harmony export */   promiseAllObject: () => (/* binding */ promiseAllObject),
/* harmony export */   propertyKeyTypes: () => (/* binding */ propertyKeyTypes),
/* harmony export */   randomString: () => (/* binding */ randomString),
/* harmony export */   required: () => (/* binding */ required),
/* harmony export */   shallowClone: () => (/* binding */ shallowClone),
/* harmony export */   stringifyPrimitive: () => (/* binding */ stringifyPrimitive),
/* harmony export */   unwrapMessage: () => (/* binding */ unwrapMessage)
/* harmony export */ });
// functions
function assertEqual(val) {
    return val;
}
function assertNotEqual(val) {
    return val;
}
function assertIs(_arg) { }
function assertNever(_x) {
    throw new Error();
}
function assert(_) { }
function getEnumValues(entries) {
    const numericValues = Object.values(entries).filter((v) => typeof v === "number");
    const values = Object.entries(entries)
        .filter(([k, _]) => numericValues.indexOf(+k) === -1)
        .map(([_, v]) => v);
    return values;
}
function joinValues(array, separator = "|") {
    return array.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
    if (typeof value === "bigint")
        return value.toString();
    return value;
}
function cached(getter) {
    const set = false;
    return {
        get value() {
            if (!set) {
                const value = getter();
                Object.defineProperty(this, "value", { value });
                return value;
            }
            throw new Error("cached value already set");
        },
    };
}
function nullish(input) {
    return input === null || input === undefined;
}
function cleanRegex(source) {
    const start = source.startsWith("^") ? 1 : 0;
    const end = source.endsWith("$") ? source.length - 1 : source.length;
    return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepString = step.toString();
    let stepDecCount = (stepString.split(".")[1] || "").length;
    if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
        const match = stepString.match(/\d?e-(\d?)/);
        if (match?.[1]) {
            stepDecCount = Number.parseInt(match[1]);
        }
    }
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / 10 ** decCount;
}
const EVALUATING = Symbol("evaluating");
function defineLazy(object, key, getter) {
    let value = undefined;
    Object.defineProperty(object, key, {
        get() {
            if (value === EVALUATING) {
                // Circular reference detected, return undefined to break the cycle
                return undefined;
            }
            if (value === undefined) {
                value = EVALUATING;
                value = getter();
            }
            return value;
        },
        set(v) {
            Object.defineProperty(object, key, {
                value: v,
                // configurable: true,
            });
            // object[key] = v;
        },
        configurable: true,
    });
}
function objectClone(obj) {
    return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
    Object.defineProperty(target, prop, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
    });
}
function mergeDefs(...defs) {
    const mergedDescriptors = {};
    for (const def of defs) {
        const descriptors = Object.getOwnPropertyDescriptors(def);
        Object.assign(mergedDescriptors, descriptors);
    }
    return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
    return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
    if (!path)
        return obj;
    return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
    const keys = Object.keys(promisesObj);
    const promises = keys.map((key) => promisesObj[key]);
    return Promise.all(promises).then((results) => {
        const resolvedObj = {};
        for (let i = 0; i < keys.length; i++) {
            resolvedObj[keys[i]] = results[i];
        }
        return resolvedObj;
    });
}
function randomString(length = 10) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    let str = "";
    for (let i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
function esc(str) {
    return JSON.stringify(str);
}
const captureStackTrace = ("captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => { });
function isObject(data) {
    return typeof data === "object" && data !== null && !Array.isArray(data);
}
const allowsEval = cached(() => {
    // @ts-ignore
    if (typeof navigator !== "undefined" && navigator?.userAgent?.includes("Cloudflare")) {
        return false;
    }
    try {
        const F = Function;
        new F("");
        return true;
    }
    catch (_) {
        return false;
    }
});
function isPlainObject(o) {
    if (isObject(o) === false)
        return false;
    // modified constructor
    const ctor = o.constructor;
    if (ctor === undefined)
        return true;
    // modified prototype
    const prot = ctor.prototype;
    if (isObject(prot) === false)
        return false;
    // ctor doesn't have static `isPrototypeOf`
    if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
        return false;
    }
    return true;
}
function shallowClone(o) {
    if (isPlainObject(o))
        return { ...o };
    return o;
}
function numKeys(data) {
    let keyCount = 0;
    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            keyCount++;
        }
    }
    return keyCount;
}
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return "undefined";
        case "string":
            return "string";
        case "number":
            return Number.isNaN(data) ? "nan" : "number";
        case "boolean":
            return "boolean";
        case "function":
            return "function";
        case "bigint":
            return "bigint";
        case "symbol":
            return "symbol";
        case "object":
            if (Array.isArray(data)) {
                return "array";
            }
            if (data === null) {
                return "null";
            }
            if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
                return "promise";
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return "map";
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return "set";
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return "date";
            }
            // @ts-ignore
            if (typeof File !== "undefined" && data instanceof File) {
                return "file";
            }
            return "object";
        default:
            throw new Error(`Unknown data type: ${t}`);
    }
};
const propertyKeyTypes = new Set(["string", "number", "symbol"]);
const primitiveTypes = new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
// zod-specific utils
function clone(inst, def, params) {
    const cl = new inst._zod.constr(def ?? inst._zod.def);
    if (!def || params?.parent)
        cl._zod.parent = inst;
    return cl;
}
function normalizeParams(_params) {
    const params = _params;
    if (!params)
        return {};
    if (typeof params === "string")
        return { error: () => params };
    if (params?.message !== undefined) {
        if (params?.error !== undefined)
            throw new Error("Cannot specify both `message` and `error` params");
        params.error = params.message;
    }
    delete params.message;
    if (typeof params.error === "string")
        return { ...params, error: () => params.error };
    return params;
}
function createTransparentProxy(getter) {
    let target;
    return new Proxy({}, {
        get(_, prop, receiver) {
            target ?? (target = getter());
            return Reflect.get(target, prop, receiver);
        },
        set(_, prop, value, receiver) {
            target ?? (target = getter());
            return Reflect.set(target, prop, value, receiver);
        },
        has(_, prop) {
            target ?? (target = getter());
            return Reflect.has(target, prop);
        },
        deleteProperty(_, prop) {
            target ?? (target = getter());
            return Reflect.deleteProperty(target, prop);
        },
        ownKeys(_) {
            target ?? (target = getter());
            return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor(_, prop) {
            target ?? (target = getter());
            return Reflect.getOwnPropertyDescriptor(target, prop);
        },
        defineProperty(_, prop, descriptor) {
            target ?? (target = getter());
            return Reflect.defineProperty(target, prop, descriptor);
        },
    });
}
function stringifyPrimitive(value) {
    if (typeof value === "bigint")
        return value.toString() + "n";
    if (typeof value === "string")
        return `"${value}"`;
    return `${value}`;
}
function optionalKeys(shape) {
    return Object.keys(shape).filter((k) => {
        return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
    });
}
const NUMBER_FORMAT_RANGES = {
    safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
    int32: [-2147483648, 2147483647],
    uint32: [0, 4294967295],
    float32: [-3.4028234663852886e38, 3.4028234663852886e38],
    float64: [-Number.MAX_VALUE, Number.MAX_VALUE],
};
const BIGINT_FORMAT_RANGES = {
    int64: [/* @__PURE__*/ BigInt("-9223372036854775808"), /* @__PURE__*/ BigInt("9223372036854775807")],
    uint64: [/* @__PURE__*/ BigInt(0), /* @__PURE__*/ BigInt("18446744073709551615")],
};
function pick(schema, mask) {
    const currDef = schema._zod.def;
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const newShape = {};
            for (const key in mask) {
                if (!(key in currDef.shape)) {
                    throw new Error(`Unrecognized key: "${key}"`);
                }
                if (!mask[key])
                    continue;
                newShape[key] = currDef.shape[key];
            }
            assignProp(this, "shape", newShape); // self-caching
            return newShape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function omit(schema, mask) {
    const currDef = schema._zod.def;
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const newShape = { ...schema._zod.def.shape };
            for (const key in mask) {
                if (!(key in currDef.shape)) {
                    throw new Error(`Unrecognized key: "${key}"`);
                }
                if (!mask[key])
                    continue;
                delete newShape[key];
            }
            assignProp(this, "shape", newShape); // self-caching
            return newShape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function extend(schema, shape) {
    if (!isPlainObject(shape)) {
        throw new Error("Invalid input to extend: expected a plain object");
    }
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const _shape = { ...schema._zod.def.shape, ...shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function merge(a, b) {
    const def = mergeDefs(a._zod.def, {
        get shape() {
            const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
            assignProp(this, "shape", _shape); // self-caching
            return _shape;
        },
        get catchall() {
            return b._zod.def.catchall;
        },
        checks: [], // delete existing checks
    });
    return clone(a, def);
}
function partial(Class, schema, mask) {
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const oldShape = schema._zod.def.shape;
            const shape = { ...oldShape };
            if (mask) {
                for (const key in mask) {
                    if (!(key in oldShape)) {
                        throw new Error(`Unrecognized key: "${key}"`);
                    }
                    if (!mask[key])
                        continue;
                    // if (oldShape[key]!._zod.optin === "optional") continue;
                    shape[key] = Class
                        ? new Class({
                            type: "optional",
                            innerType: oldShape[key],
                        })
                        : oldShape[key];
                }
            }
            else {
                for (const key in oldShape) {
                    // if (oldShape[key]!._zod.optin === "optional") continue;
                    shape[key] = Class
                        ? new Class({
                            type: "optional",
                            innerType: oldShape[key],
                        })
                        : oldShape[key];
                }
            }
            assignProp(this, "shape", shape); // self-caching
            return shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
function required(Class, schema, mask) {
    const def = mergeDefs(schema._zod.def, {
        get shape() {
            const oldShape = schema._zod.def.shape;
            const shape = { ...oldShape };
            if (mask) {
                for (const key in mask) {
                    if (!(key in shape)) {
                        throw new Error(`Unrecognized key: "${key}"`);
                    }
                    if (!mask[key])
                        continue;
                    // overwrite with non-optional
                    shape[key] = new Class({
                        type: "nonoptional",
                        innerType: oldShape[key],
                    });
                }
            }
            else {
                for (const key in oldShape) {
                    // overwrite with non-optional
                    shape[key] = new Class({
                        type: "nonoptional",
                        innerType: oldShape[key],
                    });
                }
            }
            assignProp(this, "shape", shape); // self-caching
            return shape;
        },
        checks: [],
    });
    return clone(schema, def);
}
// invalid_type | too_big | too_small | invalid_format | not_multiple_of | unrecognized_keys | invalid_union | invalid_key | invalid_element | invalid_value | custom
function aborted(x, startIndex = 0) {
    for (let i = startIndex; i < x.issues.length; i++) {
        if (x.issues[i]?.continue !== true) {
            return true;
        }
    }
    return false;
}
function prefixIssues(path, issues) {
    return issues.map((iss) => {
        var _a;
        (_a = iss).path ?? (_a.path = []);
        iss.path.unshift(path);
        return iss;
    });
}
function unwrapMessage(message) {
    return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config) {
    const full = { ...iss, path: iss.path ?? [] };
    // for backwards compatibility
    if (!iss.message) {
        const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ??
            unwrapMessage(ctx?.error?.(iss)) ??
            unwrapMessage(config.customError?.(iss)) ??
            unwrapMessage(config.localeError?.(iss)) ??
            "Invalid input";
        full.message = message;
    }
    // delete (full as any).def;
    delete full.inst;
    delete full.continue;
    if (!ctx?.reportInput) {
        delete full.input;
    }
    return full;
}
function getSizableOrigin(input) {
    if (input instanceof Set)
        return "set";
    if (input instanceof Map)
        return "map";
    // @ts-ignore
    if (input instanceof File)
        return "file";
    return "unknown";
}
function getLengthableOrigin(input) {
    if (Array.isArray(input))
        return "array";
    if (typeof input === "string")
        return "string";
    return "unknown";
}
function issue(...args) {
    const [iss, input, inst] = args;
    if (typeof iss === "string") {
        return {
            message: iss,
            code: "custom",
            input,
            inst,
        };
    }
    return { ...iss };
}
function cleanEnum(obj) {
    return Object.entries(obj)
        .filter(([k, _]) => {
        // return true if NaN, meaning it's not a number, thus a string key
        return Number.isNaN(Number.parseInt(k, 10));
    })
        .map((el) => el[1]);
}
// instanceof
class Class {
    constructor(..._args) { }
}


/***/ }),

/***/ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/versions.js":
/*!****************************************************************************!*\
  !*** ./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/versions.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
const version = {
    major: 4,
    minor: 0,
    patch: 17,
};


/***/ }),

/***/ "./src/server/util/parse_regex_from_string.ts":
/*!****************************************************!*\
  !*** ./src/server/util/parse_regex_from_string.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parse_regex_from_string: () => (/* binding */ parse_regex_from_string)
/* harmony export */ });
function parse_regex_from_string(input) {
    let match = input.match(/^\/([\w\W]+?)\/([gimsuy]*)$/);
    if (!match) {
        return null;
    }
    let [, pattern, flags] = match;
    if (pattern.match(/(^|[^\\])\//)) {
        return null;
    }
    pattern = pattern.replace('\\/', '/');
    try {
        return new RegExp(pattern, flags);
    }
    catch (e) {
        return null;
    }
}


/***/ }),

/***/ "./src/type/preset.en.ts":
/*!*******************************!*\
  !*** ./src/type/preset.en.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Preset: () => (/* binding */ Preset),
/* harmony export */   prompt_placeholder_ids: () => (/* binding */ prompt_placeholder_ids)
/* harmony export */ });
/* harmony import */ var dedent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dedent */ "./node_modules/.pnpm/dedent@1.6.0/node_modules/dedent/dist/dedent.mjs");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js");


const Prompt_normal = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    name: zod__WEBPACK_IMPORTED_MODULE_1__.string(),
    id: zod__WEBPACK_IMPORTED_MODULE_1__.never().optional(),
    enabled: zod__WEBPACK_IMPORTED_MODULE_1__.boolean(),
    position: zod__WEBPACK_IMPORTED_MODULE_1__.union([zod__WEBPACK_IMPORTED_MODULE_1__.literal('relative'), zod__WEBPACK_IMPORTED_MODULE_1__.number()])
        .default('relative')
        .optional()
        .describe('插入位置: `relative` 则按提示词相对位置插入, 填写数字则插入到聊天记录中的对应深度'),
    role: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['system', 'user', 'assistant']).default('system').optional(),
    content: zod__WEBPACK_IMPORTED_MODULE_1__.string().describe('内嵌的提示词内容'),
    file: zod__WEBPACK_IMPORTED_MODULE_1__.string().describe('外链的提示词文件路径'),
    extra: zod__WEBPACK_IMPORTED_MODULE_1__.record(zod__WEBPACK_IMPORTED_MODULE_1__.string(), zod__WEBPACK_IMPORTED_MODULE_1__.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
})
    .superRefine((data, context) => {
    if (data.content === undefined && data.file === undefined) {
        ['content', 'file'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '必须填写 `content` 或 `file`',
        }));
    }
    if (data.content !== undefined && data.file !== undefined) {
        ['content', 'file'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '不能同时填写 `content` 和 `file`',
        }));
    }
})
    .transform(data => ({
    ...data,
    id: _.uniqueId(),
}))
    .describe('手动在预设中添加的提示词');
const prompt_rolable_placeholder_ids = [
    'world_info_before',
    'persona_description',
    'char_description',
    'char_personality',
    'scenario',
    'world_info_after',
];
const prompt_unrolable_placeholder_ids = ['dialogue_examples', 'chat_history'];
const prompt_placeholder_ids = [...prompt_rolable_placeholder_ids, ...prompt_unrolable_placeholder_ids];
const Prompt_placeholder = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    name: zod__WEBPACK_IMPORTED_MODULE_1__.never().optional(),
    id: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](prompt_placeholder_ids).describe((0,dedent__WEBPACK_IMPORTED_MODULE_0__["default"])(`
        预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词
        - world_info_before: 角色定义之前
        - persona_description: 玩家描述. 创建 user 时填写的提示词
        - char_description: 角色描述. 角色卡侧边栏中填写的提示词
        - char_personality: 角色性格. 角色卡高级定义中的提示词, 一般没人用了
        - scenario: 情景. 角色卡高级定义中的提示词, 一般没人用了
        - world_info_after: 角色定义之后
        - dialogue_examples: 对话示例. 角色卡高级定义中的提示词, 一般没人用了
        - chat_history: 聊天记录
      `)),
    enabled: zod__WEBPACK_IMPORTED_MODULE_1__.boolean(),
    position: zod__WEBPACK_IMPORTED_MODULE_1__.union([zod__WEBPACK_IMPORTED_MODULE_1__.literal('relative'), zod__WEBPACK_IMPORTED_MODULE_1__.number()])
        .default('relative')
        .optional()
        .describe('插入位置: `relative` 则按提示词相对位置插入, 填写数字则插入到聊天记录中的对应深度'),
    role: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['system', 'user', 'assistant']).optional(),
    content: zod__WEBPACK_IMPORTED_MODULE_1__.never().optional(),
    extra: zod__WEBPACK_IMPORTED_MODULE_1__.record(zod__WEBPACK_IMPORTED_MODULE_1__.string(), zod__WEBPACK_IMPORTED_MODULE_1__.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
})
    .superRefine((data, context) => {
    if (_.includes(prompt_unrolable_placeholder_ids, data.id) && data.role !== undefined) {
        context.addIssue({
            code: 'custom',
            message: `占位符提示词 '${data.id}' 不能设置自定义角色 (\`role\`)`,
            path: ['role'],
        });
    }
})
    .transform(data => ({
    ...data,
    role: data.role ?? 'system',
    name: {
        world_info_before: 'World Info (before) - 角色定义之前',
        persona_description: 'Persona Description - 玩家描述',
        char_description: 'Char Description - 角色描述',
        char_personality: 'Char Personality - 角色性格',
        scenario: 'Scenario - 情景',
        world_info_after: 'World Info (after) - 角色定义之后',
        dialogue_examples: 'Chat Examples - 对话示例',
        chat_history: 'Chat History - 聊天记录',
    }[data.id],
}))
    .describe('预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词');
const Prompt = zod__WEBPACK_IMPORTED_MODULE_1__.union([Prompt_normal, Prompt_placeholder]);
const Preset = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    settings: zod__WEBPACK_IMPORTED_MODULE_1__.object({
        max_context: zod__WEBPACK_IMPORTED_MODULE_1__.number()
            .min(0)
            .max(2000000)
            .describe('最大上下文 token 数. 酒馆计算出的上下文 token 数虚高, 容易在上下文 token 数没有达到限制时就报错, 因此建议调到最大 2000000'),
        max_completion_tokens: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).describe('最大回复 token 数'),
        reply_count: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(1).default(1).optional().describe('每次生成几个回复'),
        should_stream: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().describe('是否流式传输'),
        temperature: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(2).describe('温度'),
        frequency_penalty: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(-2).max(2).describe('频率惩罚'),
        presence_penalty: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(-2).max(2).describe('存在惩罚'),
        top_p: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(1),
        repetition_penalty: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(1).max(2).default(1).optional().describe('重复惩罚'),
        min_p: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(1).default(0).optional(),
        top_k: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(500).default(0).optional(),
        top_a: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(1).default(0).optional(),
        seed: zod__WEBPACK_IMPORTED_MODULE_1__.number().default(-1).optional().describe('种子, -1 表示随机'),
        squash_system_messages: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().describe('压缩系统消息: 将连续的系统消息合并为一条消息'),
        reasoning_effort: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['auto', 'min', 'low', 'medium', 'high', 'max'])
            .describe('推理强度, 即内置思维链的投入程度. 例如, 如果酒馆直连 gemini-2.5-flash, 则 `min` 将会不使用内置思维链'),
        request_thoughts: zod__WEBPACK_IMPORTED_MODULE_1__.boolean()
            .default(true)
            .optional()
            .describe('请求思维链: 允许模型返回内置思维链的思考过程; 注意这只影响内置思维链显不显示, 不决定模型是否使用内置思维链'),
        request_images: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().default(true).optional().describe('请求图片: 允许模型在回复中返回图片'),
        enable_function_calling: zod__WEBPACK_IMPORTED_MODULE_1__.boolean()
            .default(true)
            .optional()
            .describe('启用函数调用: 允许模型使用函数调用功能; 比如 cursor 借此在回复中读写文件、运行命令'),
        enable_web_search: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().default(true).optional().describe('启用网络搜索: 允许模型使用网络搜索功能'),
        allow_sending_images: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['disabled', 'auto', 'low', 'high'])
            .default('auto')
            .optional()
            .describe('是否允许发送图片作为提示词'),
        allow_sending_videos: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().default(true).optional().describe('是否允许发送视频作为提示词'),
        character_name_prefix: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['none', 'default', 'content', 'completion'])
            .default('none')
            .optional()
            .describe((0,dedent__WEBPACK_IMPORTED_MODULE_0__["default"])(`
        角色名称前缀: 是否要为消息添加角色名称前缀, 以及怎么添加
        - none: 不添加
        - default: 为与角色卡不同名的消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - content: 为所有消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - completion: 在发送给模型时, 将角色名称写入到 \`name\` 字段; 仅支持字母数字和下划线, 不适用于 Claude、Google 等模型
      `)),
        wrap_user_messages_in_quotes: zod__WEBPACK_IMPORTED_MODULE_1__.boolean()
            .default(false)
            .optional()
            .describe('用引号包裹用户消息: 在发送给模型之前, 将所有用户消息用引号包裹'),
    }),
    prompts: zod__WEBPACK_IMPORTED_MODULE_1__.array(Prompt)
        .superRefine((data, context) => {
        const duplicate_ids = _(data)
            .filter(prompt => _.includes(prompt_placeholder_ids, prompt.id))
            .groupBy('id')
            .filter(group => group.length > 1)
            .keys()
            .value();
        if (duplicate_ids.length > 0) {
            context.addIssue({
                code: 'custom',
                message: `提示词列表中出现了重复的占位符提示词 id: ${duplicate_ids.join(', ')}`,
            });
        }
        const unused_ids = _.reject(prompt_placeholder_ids, id => data.some(prompt => _.get(prompt, 'id') === id));
        if (unused_ids.length > 0) {
            context.addIssue({
                code: 'custom',
                message: `提示词列表中缺少了这些必须添加的占位符提示词 id: ${unused_ids.join(', ')}`,
            });
        }
        const disabled_ids = _(data)
            .filter(prompt => _.includes(prompt_placeholder_ids, prompt.id) && prompt.enabled === false)
            .map(prompt => _.get(prompt, 'id'))
            .value();
        if (disabled_ids.length > 0) {
            context.addIssue({
                code: 'custom',
                message: `占位符提示词不应该不使用: ${disabled_ids.join(', ')}`,
            });
        }
    })
        .describe('提示词列表里已经添加的提示词'),
    prompts_unused: zod__WEBPACK_IMPORTED_MODULE_1__.array(Prompt).describe('下拉框里的, 没有添加进提示词列表的提示词'),
    extensions: zod__WEBPACK_IMPORTED_MODULE_1__.record(zod__WEBPACK_IMPORTED_MODULE_1__.string(), zod__WEBPACK_IMPORTED_MODULE_1__.any()).optional().describe('额外字段: 用于为预设绑定额外数据'),
});


/***/ }),

/***/ "./src/type/preset.zh.ts":
/*!*******************************!*\
  !*** ./src/type/preset.zh.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Preset: () => (/* binding */ Preset),
/* harmony export */   is_zh: () => (/* binding */ is_zh),
/* harmony export */   prompt_placeholder_ids: () => (/* binding */ prompt_placeholder_ids),
/* harmony export */   zh_to_en_map: () => (/* binding */ zh_to_en_map)
/* harmony export */ });
/* harmony import */ var dedent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dedent */ "./node_modules/.pnpm/dedent@1.6.0/node_modules/dedent/dist/dedent.mjs");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js");


const zh_to_en_map = {
    名称: 'name',
    启用: 'enabled',
    插入位置: 'position',
    相对: 'relative',
    角色: 'role',
    系统: 'system',
    用户: 'user',
    AI: 'assistant',
    内容: 'content',
    文件: 'file',
    额外字段: 'extra',
    角色定义之前: 'world_info_before',
    玩家描述: 'persona_description',
    角色描述: 'char_description',
    角色性格: 'char_personality',
    情景: 'scenario',
    角色定义之后: 'world_info_after',
    对话示例: 'dialogue_examples',
    聊天记录: 'chat_history',
    设置: 'settings',
    上下文长度: 'max_context',
    最大回复token数: 'max_completion_tokens',
    每次回复数: 'reply_count',
    流式传输: 'should_stream',
    温度: 'temperature',
    频率惩罚: 'frequency_penalty',
    存在惩罚: 'presence_penalty',
    重复惩罚: 'repetition_penalty',
    种子: 'seed',
    压缩系统消息: 'squash_system_messages',
    推理强度: 'reasoning_effort',
    自动: 'auto',
    最小: 'min',
    低: 'low',
    中: 'medium',
    高: 'high',
    最大: 'max',
    请求思维链: 'request_thoughts',
    请求图片: 'request_images',
    启用函数调用: 'enable_function_calling',
    启用网络搜索: 'enable_web_search',
    允许发送图片: 'allow_sending_images',
    禁用: 'disabled',
    允许发送视频: 'allow_sending_videos',
    角色名称前缀: 'character_name_prefix',
    无: 'none',
    默认: 'default',
    补全对象: 'completion',
    用引号包裹用户消息: 'wrap_user_messages_in_quotes',
    提示词: 'prompts',
    未添加的提示词: 'prompts_unused',
    扩展字段: 'extensions',
};
function is_zh(data) {
    return _.has(data, '提示词');
}
const Prompt_normal = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    名称: zod__WEBPACK_IMPORTED_MODULE_1__.string(),
    id: zod__WEBPACK_IMPORTED_MODULE_1__.never().optional(),
    启用: zod__WEBPACK_IMPORTED_MODULE_1__.boolean(),
    插入位置: zod__WEBPACK_IMPORTED_MODULE_1__.union([zod__WEBPACK_IMPORTED_MODULE_1__.literal('相对'), zod__WEBPACK_IMPORTED_MODULE_1__.number()])
        .default('相对')
        .optional()
        .describe('插入位置: `相对`则按提示词相对位置插入, 填写数字则插入到聊天记录中的对应深度'),
    角色: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['系统', '用户', 'AI']).default('系统').optional(),
    内容: zod__WEBPACK_IMPORTED_MODULE_1__.string().describe('内嵌的提示词内容'),
    文件: zod__WEBPACK_IMPORTED_MODULE_1__.string().describe('外链的提示词文件路径'),
    额外字段: zod__WEBPACK_IMPORTED_MODULE_1__.record(zod__WEBPACK_IMPORTED_MODULE_1__.string(), zod__WEBPACK_IMPORTED_MODULE_1__.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
})
    .superRefine((data, context) => {
    if (data.内容 === undefined && data.文件 === undefined) {
        ['内容', '文件'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '必须填写`内容`或`文件`',
        }));
    }
    if (data.内容 !== undefined && data.文件 !== undefined) {
        ['内容', '文件'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '不能同时填写`内容`和`文件`',
        }));
    }
})
    .transform(data => ({
    ...data,
    id: _.uniqueId(),
}))
    .describe('手动在预设中添加的提示词');
const prompt_rolable_placeholder_ids = [
    '角色定义之前',
    '玩家描述',
    '角色描述',
    '角色性格',
    '情景',
    '角色定义之后',
];
const prompt_unrolable_placeholder_ids = ['对话示例', '聊天记录'];
const prompt_placeholder_ids = [...prompt_rolable_placeholder_ids, ...prompt_unrolable_placeholder_ids];
const Prompt_placeholder = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    名称: zod__WEBPACK_IMPORTED_MODULE_1__.never().optional(),
    id: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](prompt_placeholder_ids).describe((0,dedent__WEBPACK_IMPORTED_MODULE_0__["default"])(`
        预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词
        - 角色定义之前: world_info_before
        - 玩家描述: persona_description. 创建 user 时填写的提示词
        - 角色描述: char_description. 角色卡侧边栏中填写的提示词
        - 角色性格: char_personality. 角色卡高级定义中的提示词, 一般没人用了
        - 情景: scenario. 角色卡高级定义中的提示词, 一般没人用了
        - 角色定义之后: world_info_after
        - 对话示例: dialogue_examples. 角色卡高级定义中的提示词, 一般没人用了
        - 聊天记录: chat_history
      `)),
    启用: zod__WEBPACK_IMPORTED_MODULE_1__.boolean(),
    插入位置: zod__WEBPACK_IMPORTED_MODULE_1__.union([zod__WEBPACK_IMPORTED_MODULE_1__.literal('相对'), zod__WEBPACK_IMPORTED_MODULE_1__.number()])
        .default('相对')
        .optional()
        .describe('插入位置: `相对`则按提示词相对位置插入, 填写数字则插入到聊天记录中的对应深度'),
    角色: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['系统', '用户', 'AI']).optional(),
    内容: zod__WEBPACK_IMPORTED_MODULE_1__.never().optional(),
    文件: zod__WEBPACK_IMPORTED_MODULE_1__.never().optional(),
    额外字段: zod__WEBPACK_IMPORTED_MODULE_1__.record(zod__WEBPACK_IMPORTED_MODULE_1__.string(), zod__WEBPACK_IMPORTED_MODULE_1__.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
})
    .superRefine((data, context) => {
    if (_.includes(prompt_unrolable_placeholder_ids, data.id) && data.角色 !== undefined) {
        context.addIssue({
            code: 'custom',
            message: `占位符提示词 '${data.id}' 不能设置自定义\`角色\``,
            path: ['角色'],
        });
    }
})
    .transform(data => ({
    ...data,
    角色: data.角色 ?? '系统',
    名称: {
        角色定义之前: 'World Info (before) - 角色定义之前',
        玩家描述: 'Persona Description - 玩家描述',
        角色描述: 'Char Description - 角色描述',
        角色性格: 'Char Personality - 角色性格',
        情景: 'Scenario - 情景',
        角色定义之后: 'World Info (after) - 角色定义之后',
        对话示例: 'Chat Examples - 对话示例',
        聊天记录: 'Chat History - 聊天记录',
    }[data.id],
}))
    .describe('预设提示词中的占位符提示词, 对应于世界书条目、角色卡、玩家角色、聊天记录等提示词');
const Prompt = zod__WEBPACK_IMPORTED_MODULE_1__.union([Prompt_normal, Prompt_placeholder]);
const Preset = zod__WEBPACK_IMPORTED_MODULE_1__.object({
    设置: zod__WEBPACK_IMPORTED_MODULE_1__.object({
        上下文长度: zod__WEBPACK_IMPORTED_MODULE_1__.number()
            .min(0)
            .max(2000000)
            .describe('最大上下文 token 数. 酒馆计算出的上下文 token 数虚高, 容易在上下文 token 数没有达到限制时就报错, 因此建议调到最大 2000000'),
        最大回复token数: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).describe('最大回复 token 数'),
        每次回复数: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(1).default(1).optional().describe('每次生成几个回复'),
        流式传输: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().describe('是否流式传输'),
        温度: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(2).describe('温度'),
        频率惩罚: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(-2).max(2).describe('频率惩罚'),
        存在惩罚: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(-2).max(2).describe('存在惩罚'),
        top_p: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(1),
        重复惩罚: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(1).max(2).default(1).optional().describe('重复惩罚'),
        min_p: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(1).default(0).optional(),
        top_k: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(500).default(0).optional(),
        top_a: zod__WEBPACK_IMPORTED_MODULE_1__.number().min(0).max(1).default(0).optional(),
        种子: zod__WEBPACK_IMPORTED_MODULE_1__.number().default(-1).optional().describe('种子, -1 表示随机'),
        压缩系统消息: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().describe('压缩系统消息: 将连续的系统消息合并为一条消息'),
        推理强度: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['自动', '最小', '低', '中', '高', '最大'])
            .describe('推理强度, 即内置思维链的投入程度. 例如, 如果酒馆直连 gemini-2.5-flash, 则`最小`将会不使用内置思维链'),
        请求思维链: zod__WEBPACK_IMPORTED_MODULE_1__.boolean()
            .default(true)
            .optional()
            .describe('请求思维链: 允许模型返回内置思维链的思考过程; 注意这只影响内置思维链显不显示, 不决定模型是否使用内置思维链'),
        请求图片: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().default(true).optional().describe('请求图片: 允许模型在回复中返回图片'),
        启用函数调用: zod__WEBPACK_IMPORTED_MODULE_1__.boolean()
            .default(true)
            .optional()
            .describe('启用函数调用: 允许模型使用函数调用功能; 比如 cursor 借此在回复中读写文件、运行命令'),
        启用网络搜索: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().default(true).optional().describe('启用网络搜索: 允许模型使用网络搜索功能'),
        允许发送图片: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['禁用', '自动', '低', '高'])
            .default('自动')
            .optional()
            .describe('是否允许发送图片作为提示词'),
        允许发送视频: zod__WEBPACK_IMPORTED_MODULE_1__.boolean().default(true).optional().describe('是否允许发送视频作为提示词'),
        角色名称前缀: zod__WEBPACK_IMPORTED_MODULE_1__["enum"](['无', '默认', '内容', '补全'])
            .default('无')
            .optional()
            .describe((0,dedent__WEBPACK_IMPORTED_MODULE_0__["default"])(`
        角色名称前缀: 是否要为消息添加角色名称前缀, 以及怎么添加
        - 无: 不添加
        - 默认: 为与角色卡不同名的消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - 内容: 为所有消息添加角色名称前缀, 添加到 \`content\` 字段开头 (即发送的消息内容是 \`角色名: 消息内容\`)
        - 补全: 在发送给模型时, 将角色名称写入到 \`name\` 字段; 仅支持字母数字和下划线, 不适用于 Claude、Google 等模型
      `)),
        用引号包裹用户消息: zod__WEBPACK_IMPORTED_MODULE_1__.boolean()
            .default(false)
            .optional()
            .describe('用引号包裹用户消息: 在发送给模型之前, 将所有用户消息用引号包裹'),
    }),
    提示词: zod__WEBPACK_IMPORTED_MODULE_1__.array(Prompt)
        .superRefine((data, context) => {
        const duplicate_ids = _(data)
            .filter(prompt => _.includes(prompt_placeholder_ids, prompt.id))
            .groupBy('id')
            .filter(group => group.length > 1)
            .keys()
            .value();
        if (duplicate_ids.length > 0) {
            context.addIssue({
                code: 'custom',
                message: `提示词列表中出现了重复的占位符提示词 id: ${duplicate_ids.join(', ')}`,
            });
        }
        const unused_ids = _.reject(prompt_placeholder_ids, id => data.some(prompt => _.get(prompt, 'id') === id));
        if (unused_ids.length > 0) {
            context.addIssue({
                code: 'custom',
                message: `提示词列表中缺少了这些必须添加的占位符提示词 id: ${unused_ids.join(', ')}`,
            });
        }
        const disabled_ids = _(data)
            .filter(prompt => _.includes(prompt_placeholder_ids, prompt.id) && prompt.启用 === false)
            .map(prompt => _.get(prompt, 'id'))
            .value();
        if (disabled_ids.length > 0) {
            context.addIssue({
                code: 'custom',
                message: `占位符提示词不应该不使用: ${disabled_ids.join(', ')}`,
            });
        }
    })
        .describe('提示词列表里已经添加的提示词'),
    未添加的提示词: zod__WEBPACK_IMPORTED_MODULE_1__.array(Prompt).describe('下拉框里的, 没有添加进提示词列表的提示词'),
    扩展字段: zod__WEBPACK_IMPORTED_MODULE_1__.record(zod__WEBPACK_IMPORTED_MODULE_1__.string(), zod__WEBPACK_IMPORTED_MODULE_1__.any()).optional().describe('扩展字段: 用于为预设绑定额外数据'),
});


/***/ }),

/***/ "./src/type/settings.en.ts":
/*!*********************************!*\
  !*** ./src/type/settings.en.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Config: () => (/* binding */ Config),
/* harmony export */   Settings: () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js");

const Config_type = zod__WEBPACK_IMPORTED_MODULE_0__["enum"](['worldbook', 'preset']);
const Config = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    type: Config_type,
    name: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    file: zod__WEBPACK_IMPORTED_MODULE_0__.string().regex(/^(?:(?:[a-zA-Z]:|\.|\.\.)?([\\/][^\\/]+)*|[^\\/]+)\.yaml$/),
});
const Settings = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    user_name: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    configs: zod__WEBPACK_IMPORTED_MODULE_0__.record(zod__WEBPACK_IMPORTED_MODULE_0__.string(), Config),
});


/***/ }),

/***/ "./src/type/settings.zh.ts":
/*!*********************************!*\
  !*** ./src/type/settings.zh.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Config: () => (/* binding */ Config),
/* harmony export */   Config_type: () => (/* binding */ Config_type),
/* harmony export */   Settings: () => (/* binding */ Settings),
/* harmony export */   is_zh: () => (/* binding */ is_zh),
/* harmony export */   zh_to_en_map: () => (/* binding */ zh_to_en_map)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js");

const zh_to_en_map = {
    user名称: 'user_name',
    配置: 'configs',
    类型: 'type',
    世界书: 'worldbook',
    预设: 'preset',
    酒馆中的名称: 'name',
    本地文件路径: 'file',
};
function is_zh(data) {
    return _.has(data, '配置');
}
const Config_type = zod__WEBPACK_IMPORTED_MODULE_0__["enum"](['世界书', '预设']);
const Config = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    类型: Config_type,
    酒馆中的名称: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    本地文件路径: zod__WEBPACK_IMPORTED_MODULE_0__.string().regex(/^(?:(?:[a-zA-Z]:|\.|\.\.)?([\\/][^\\/]+)*|[^\\/]+)\.yaml$/),
});
const Settings = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    user名称: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    配置: zod__WEBPACK_IMPORTED_MODULE_0__.record(zod__WEBPACK_IMPORTED_MODULE_0__.string(), Config),
});


/***/ }),

/***/ "./src/type/worldbook.en.ts":
/*!**********************************!*\
  !*** ./src/type/worldbook.en.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Worldbook: () => (/* binding */ Worldbook)
/* harmony export */ });
/* harmony import */ var _server_util_parse_regex_from_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @server/util/parse_regex_from_string */ "./src/server/util/parse_regex_from_string.ts");
/* harmony import */ var dedent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dedent */ "./node_modules/.pnpm/dedent@1.6.0/node_modules/dedent/dist/dedent.mjs");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js");



const Worldbook_entry = zod__WEBPACK_IMPORTED_MODULE_2__.object({
    name: zod__WEBPACK_IMPORTED_MODULE_2__.string(),
    uid: zod__WEBPACK_IMPORTED_MODULE_2__.number().optional().describe('该条目的唯一标识符, 如果不设置或有重复则会自动分配一个新的'),
    enabled: zod__WEBPACK_IMPORTED_MODULE_2__.boolean(),
    strategy: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        type: zod__WEBPACK_IMPORTED_MODULE_2__["enum"](['constant', 'selective', 'vectorized']).describe((0,dedent__WEBPACK_IMPORTED_MODULE_1__["default"])(`
          激活策略类型:
          - constant: 常量🔵, 俗称蓝灯. 只需要满足 "启用"、"激活概率%" 等别的要求即可.
          - selective: 可选项🟢, 俗称绿灯. 除了蓝灯条件, 还需要满足 \`keys\` 扫描条件
          - vectorized: 向量化🔗. 一般不使用
        `)),
        keys: zod__WEBPACK_IMPORTED_MODULE_2__.array(zod__WEBPACK_IMPORTED_MODULE_2__.string().transform(string => (0,_server_util_parse_regex_from_string__WEBPACK_IMPORTED_MODULE_0__.parse_regex_from_string)(string) ?? string))
            .min(1)
            .optional()
            .describe('关键字: 绿灯条目必须在欲扫描文本中扫描到其中任意一个关键字才能激活'),
        keys_secondary: zod__WEBPACK_IMPORTED_MODULE_2__.object({
            logic: zod__WEBPACK_IMPORTED_MODULE_2__["enum"](['and_any', 'and_all', 'not_all', 'not_any']).describe((0,dedent__WEBPACK_IMPORTED_MODULE_1__["default"])(`
              次要关键字逻辑:
              - and_any: 次要关键字中任意一个关键字能在欲扫描文本中匹配到
              - and_all: 次要关键字中所有关键字都能在欲扫描文本中匹配到
              - not_all: 次要关键字中至少有一个关键字没能在欲扫描文本中匹配到
              - not_any: 次要关键字中所有关键字都没能欲扫描文本中匹配到
            `)),
            keys: zod__WEBPACK_IMPORTED_MODULE_2__.array(zod__WEBPACK_IMPORTED_MODULE_2__.string().transform(string => (0,_server_util_parse_regex_from_string__WEBPACK_IMPORTED_MODULE_0__.parse_regex_from_string)(string) ?? string)).min(1),
        })
            .optional()
            .describe('次要关键字: 如果设置了次要关键字, 则条目除了在 `keys` 中匹配到任意一个关键字外, 还需要按次要关键字的 `logic` 满足次要关键字的 `keys`'),
        scan_depth: zod__WEBPACK_IMPORTED_MODULE_2__.union([zod__WEBPACK_IMPORTED_MODULE_2__.literal('same_as_global'), zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1)])
            .optional()
            .describe('扫描深度: 1 为仅扫描最后一个楼层, 2 为扫描最后两个楼层, 以此类推'),
    })
        .superRefine((data, context) => {
        if (data.type === 'selective' && data.keys === undefined) {
            context.addIssue({
                code: 'custom',
                path: ['keys'],
                message: "当激活策略为绿灯 (`'selective'`) 时, `keys` 中有必须至少一个主要关键字",
            });
        }
    })
        .describe('激活策略: 条目应该何时激活'),
    position: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        type: zod__WEBPACK_IMPORTED_MODULE_2__["enum"]([
            'before_character_definition',
            'after_character_definition',
            'before_example_messages',
            'after_example_messages',
            'before_author_note',
            'after_author_note',
            'at_depth',
        ])
            .describe((0,dedent__WEBPACK_IMPORTED_MODULE_1__["default"])(`
            插入位置类型:
            - before_character_definition: 角色定义之前
            - after_character_definition: 角色定义之后
            - before_example_messages: 示例消息之前
            - after_example_messages: 示例消息之后
            - before_author_note: 作者注释之前
            - after_author_note: 作者注释之后
            - at_depth: 插入到指定深度
          `)),
        role: zod__WEBPACK_IMPORTED_MODULE_2__["enum"](['system', 'assistant', 'user'])
            .optional()
            .describe("该条目的消息身份, 仅位置类型为 `'at_depth'` 时有效"),
        depth: zod__WEBPACK_IMPORTED_MODULE_2__.number().optional().describe("该条目要插入的深度, 仅位置类型为 `'at_depth'` 时有效"),
        order: zod__WEBPACK_IMPORTED_MODULE_2__.number(),
    })
        .describe('插入位置: 如果条目激活应该插入到什么地方')
        .superRefine((data, context) => {
        if (data.type === 'at_depth') {
            if (data.role === undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['role'],
                    message: "当插入位置 (`position`) 为 `'at_depth'` 时, 必须填写 `role`",
                });
            }
            if (data.depth === undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['depth'],
                    message: "当插入位置 (`position`)为 `'at_depth'` 时, 必须填写 `depth`",
                });
            }
        }
        else {
            if (data.role !== undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['role'],
                    message: "当插入位置 (`position`) 不为 `'at_depth'` 时, `role` 不起作用, 不要填写",
                });
            }
            if (data.depth !== undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['depth'],
                    message: "当插入位置 (`position`) 不为 `'at_depth'` 时, `depth` 不起作用, 不要填写",
                });
            }
        }
    }),
    probability: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(0).max(100).optional(),
    recursion: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        prevent_incoming: zod__WEBPACK_IMPORTED_MODULE_2__.boolean().describe('禁止其他条目递归激活本条目'),
        prevent_outgoing: zod__WEBPACK_IMPORTED_MODULE_2__.boolean().describe('禁止本条目递归激活其他条目'),
        delay_until: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1).nullable().describe('延迟到第 n 级递归检查时才能激活本条目'),
    })
        .partial()
        .optional()
        .describe('递归表示某世界书条目被激活后, 该条目的提示词又激活了其他条目'),
    effect: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        sticky: zod__WEBPACK_IMPORTED_MODULE_2__.number()
            .min(1)
            .nullable()
            .describe('黏性: 条目激活后, 在之后 n 条消息内始终激活, 无视激活策略、激活概率%'),
        cooldown: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1).nullable().describe('冷却: 条目激活后, 在之后 n 条消息内不能再激活'),
        delay: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1).nullable().describe('延迟: 聊天中至少有 n 楼消息时, 才能激活条目'),
    })
        .partial()
        .optional(),
    extra: zod__WEBPACK_IMPORTED_MODULE_2__.record(zod__WEBPACK_IMPORTED_MODULE_2__.string(), zod__WEBPACK_IMPORTED_MODULE_2__.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
    content: zod__WEBPACK_IMPORTED_MODULE_2__.string().describe('内嵌的提示词内容'),
    file: zod__WEBPACK_IMPORTED_MODULE_2__.string().describe('外链的提示词文件路径'),
})
    .superRefine((data, context) => {
    if (data.content === undefined && data.file === undefined) {
        ['content', 'file'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '必须填写 `content` 或 `file`',
        }));
    }
    if (data.content !== undefined && data.file !== undefined) {
        ['content', 'file'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '不能同时填写 `content` 和 `file`',
        }));
    }
});
const Worldbook = zod__WEBPACK_IMPORTED_MODULE_2__.object({ entries: zod__WEBPACK_IMPORTED_MODULE_2__.array(Worldbook_entry).min(1) });


/***/ }),

/***/ "./src/type/worldbook.zh.ts":
/*!**********************************!*\
  !*** ./src/type/worldbook.zh.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Worldbook: () => (/* binding */ Worldbook),
/* harmony export */   is_zh: () => (/* binding */ is_zh),
/* harmony export */   zh_to_en_map: () => (/* binding */ zh_to_en_map)
/* harmony export */ });
/* harmony import */ var _server_util_parse_regex_from_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @server/util/parse_regex_from_string */ "./src/server/util/parse_regex_from_string.ts");
/* harmony import */ var dedent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dedent */ "./node_modules/.pnpm/dedent@1.6.0/node_modules/dedent/dist/dedent.mjs");
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/classic/schemas.js");



const zh_to_en_map = {
    条目: 'entries',
    名称: 'name',
    启用: 'enabled',
    激活策略: 'strategy',
    类型: 'type',
    蓝灯: 'constant',
    绿灯: 'selective',
    向量化: 'vectorized',
    关键字: 'keys',
    次要关键字: 'keys_secondary',
    逻辑: 'logic',
    与任意: 'and_any',
    与所有: 'and_all',
    非所有: 'not_all',
    非任意: 'not_any',
    扫描深度: 'scan_depth',
    与全局设置相同: 'same_as_global',
    插入位置: 'position',
    角色定义之前: 'before_character_definition',
    角色定义之后: 'after_character_definition',
    示例消息之前: 'before_example_messages',
    示例消息之后: 'after_example_messages',
    作者注释之前: 'before_author_note',
    作者注释之后: 'after_author_note',
    指定深度: 'at_depth',
    角色: 'role',
    系统: 'system',
    AI: 'assistant',
    用户: 'user',
    深度: 'depth',
    顺序: 'order',
    激活概率: 'probability',
    递归: 'recursion',
    不可被其他条目激活: 'prevent_incoming',
    不可激活其他条目: 'prevent_outgoing',
    延迟递归: 'delay_until',
    特殊效果: 'effect',
    黏性: 'sticky',
    冷却: 'cooldown',
    延迟: 'delay',
    额外字段: 'extra',
    内容: 'content',
    文件: 'file',
};
function is_zh(data) {
    return _.has(data, '条目');
}
const Worldbook_entry = zod__WEBPACK_IMPORTED_MODULE_2__.object({
    名称: zod__WEBPACK_IMPORTED_MODULE_2__.string(),
    uid: zod__WEBPACK_IMPORTED_MODULE_2__.number().optional().describe('该条目的唯一标识符, 如果不设置或有重复则会自动分配一个新的'),
    启用: zod__WEBPACK_IMPORTED_MODULE_2__.boolean(),
    激活策略: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        类型: zod__WEBPACK_IMPORTED_MODULE_2__["enum"](['蓝灯', '绿灯', '向量化']).describe((0,dedent__WEBPACK_IMPORTED_MODULE_1__["default"])(`
          激活策略类型:
          - 蓝灯: 常量🔵 (constant). 只需要满足 "启用"、"激活概率%" 等别的要求即可.
          - 绿灯: 可选项🟢 (selective). 除了蓝灯条件, 还需要满足 \`关键字\` 扫描条件
          - 向量化: 向量化🔗 (vectorized). 一般不使用
        `)),
        关键字: zod__WEBPACK_IMPORTED_MODULE_2__.array(zod__WEBPACK_IMPORTED_MODULE_2__.string().transform(string => (0,_server_util_parse_regex_from_string__WEBPACK_IMPORTED_MODULE_0__.parse_regex_from_string)(string) ?? string))
            .min(1)
            .optional()
            .describe('关键字: 绿灯条目必须在欲扫描文本中扫描到其中任意一个关键字才能激活'),
        次要关键字: zod__WEBPACK_IMPORTED_MODULE_2__.object({
            逻辑: zod__WEBPACK_IMPORTED_MODULE_2__["enum"](['与任意', '与所有', '非所有', '非任意']).describe((0,dedent__WEBPACK_IMPORTED_MODULE_1__["default"])(`
              次要关键字逻辑:
              - 与任意 (and_any): 次要关键字中任意一个关键字能在欲扫描文本中匹配到
              - 与所有 (and_all): 次要关键字中所有关键字都能在欲扫描文本中匹配到
              - 非所有 (not_all): 次要关键字中至少有一个关键字没能在欲扫描文本中匹配到
              - 非任意 (not_any): 次要关键字中所有关键字都没能欲扫描文本中匹配到
            `)),
            关键字: zod__WEBPACK_IMPORTED_MODULE_2__.array(zod__WEBPACK_IMPORTED_MODULE_2__.string().transform(string => (0,_server_util_parse_regex_from_string__WEBPACK_IMPORTED_MODULE_0__.parse_regex_from_string)(string) ?? string)).min(1),
        })
            .optional()
            .describe('次要关键字: 如果设置了次要关键字, 则条目除了在`关键字`中匹配到任意一个关键字外, 还需要按次要关键字的`逻辑`满足次要关键字的`关键字`'),
        扫描深度: zod__WEBPACK_IMPORTED_MODULE_2__.union([zod__WEBPACK_IMPORTED_MODULE_2__.literal('与全局设置相同'), zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1)])
            .optional()
            .describe('扫描深度: 1 为仅扫描最后一个楼层, 2 为扫描最后两个楼层, 以此类推'),
    })
        .superRefine((data, context) => {
        if (data.类型 === '绿灯' && data.关键字 === undefined) {
            context.addIssue({
                code: 'custom',
                path: ['关键字'],
                message: '当激活策略为`绿灯`时, `关键字`中有必须至少一个主要关键字',
            });
        }
    })
        .describe('激活策略: 条目应该何时激活'),
    插入位置: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        类型: zod__WEBPACK_IMPORTED_MODULE_2__["enum"]([
            '角色定义之前',
            '角色定义之后',
            '示例消息之前',
            '示例消息之后',
            '作者注释之前',
            '作者注释之后',
            '指定深度',
        ]),
        角色: zod__WEBPACK_IMPORTED_MODULE_2__["enum"](['系统', 'AI', '用户']).optional().describe("该条目的消息身份, 仅位置类型为`'指定深度'`时有效"),
        深度: zod__WEBPACK_IMPORTED_MODULE_2__.number().optional().describe("该条目要插入的深度, 仅位置类型为`'指定深度'`时有效"),
        顺序: zod__WEBPACK_IMPORTED_MODULE_2__.number(),
    })
        .describe('插入位置: 如果条目激活应该插入到什么地方')
        .superRefine((data, context) => {
        if (data.类型 === '指定深度') {
            if (data.角色 === undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['角色'],
                    message: "当`插入位置`为`'指定深度'`时, 必须填写`角色`",
                });
            }
            if (data.深度 === undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['深度'],
                    message: "当`插入位置`为`'指定深度'`时, 必须填写`深度`",
                });
            }
        }
        else {
            if (data.角色 !== undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['角色'],
                    message: "当`插入位置`不为`'指定深度'`时, `角色`不起作用, 不要填写",
                });
            }
            if (data.深度 !== undefined) {
                context.addIssue({
                    code: 'custom',
                    path: ['深度'],
                    message: "当`插入位置`不为`'指定深度'`时, `深度`不起作用, 不要填写",
                });
            }
        }
    }),
    激活概率: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(0).max(100).optional(),
    递归: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        不可被其他条目激活: zod__WEBPACK_IMPORTED_MODULE_2__.boolean().describe('禁止其他条目递归激活本条目'),
        不可激活其他条目: zod__WEBPACK_IMPORTED_MODULE_2__.boolean().describe('禁止本条目递归激活其他条目'),
        延迟递归: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1).nullable().describe('延迟到第 n 级递归检查时才能激活本条目'),
    })
        .partial()
        .optional()
        .describe('递归表示某世界书条目被激活后, 该条目的提示词又激活了其他条目'),
    特殊效果: zod__WEBPACK_IMPORTED_MODULE_2__.object({
        黏性: zod__WEBPACK_IMPORTED_MODULE_2__.number()
            .min(1)
            .nullable()
            .describe('黏性: 条目激活后, 在之后 n 条消息内始终激活, 无视激活策略、激活概率%'),
        冷却: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1).nullable().describe('冷却: 条目激活后, 在之后 n 条消息内不能再激活'),
        延迟: zod__WEBPACK_IMPORTED_MODULE_2__.number().min(1).nullable().describe('延迟: 聊天中至少有 n 楼消息时, 才能激活条目'),
    })
        .partial()
        .optional(),
    额外字段: zod__WEBPACK_IMPORTED_MODULE_2__.record(zod__WEBPACK_IMPORTED_MODULE_2__.string(), zod__WEBPACK_IMPORTED_MODULE_2__.any()).optional().describe('额外字段: 用于为预设提示词绑定额外数据'),
    内容: zod__WEBPACK_IMPORTED_MODULE_2__.string().describe('内嵌的提示词内容'),
    文件: zod__WEBPACK_IMPORTED_MODULE_2__.string().describe('外链的提示词文件路径'),
})
    .superRefine((data, context) => {
    if (data.内容 === undefined && data.文件 === undefined) {
        ['内容', '文件'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '必须填写`内容`或`文件`',
        }));
    }
    if (data.内容 !== undefined && data.文件 !== undefined) {
        ['内容', '文件'].forEach(key => context.addIssue({
            code: 'custom',
            path: [key],
            message: '不能同时填写`内容`和`文件`',
        }));
    }
});
const Worldbook = zod__WEBPACK_IMPORTED_MODULE_2__.object({ 条目: zod__WEBPACK_IMPORTED_MODULE_2__.array(Worldbook_entry).min(1) });


/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("node:path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/type/index.ts ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _type_preset_en__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @type/preset.en */ "./src/type/preset.en.ts");
/* harmony import */ var _type_preset_zh__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @type/preset.zh */ "./src/type/preset.zh.ts");
/* harmony import */ var _type_settings_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @type/settings.en */ "./src/type/settings.en.ts");
/* harmony import */ var _type_settings_zh__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @type/settings.zh */ "./src/type/settings.zh.ts");
/* harmony import */ var _type_worldbook_en__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @type/worldbook.en */ "./src/type/worldbook.en.ts");
/* harmony import */ var _type_worldbook_zh__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @type/worldbook.zh */ "./src/type/worldbook.zh.ts");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! node:fs */ "node:fs");
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(node_fs__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! node:path */ "node:path");
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(node_path__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! zod */ "./node_modules/.pnpm/zod@4.0.17/node_modules/zod/v4/core/to-json-schema.js");









function write_json_schema(name, schema) {
    (0,node_fs__WEBPACK_IMPORTED_MODULE_6__.writeFileSync)((0,node_path__WEBPACK_IMPORTED_MODULE_7__.join)(__dirname, 'schema', `${name}.json`), JSON.stringify(zod__WEBPACK_IMPORTED_MODULE_8__.toJSONSchema(schema, { unrepresentable: 'any' }), null, 2));
}
(0,node_fs__WEBPACK_IMPORTED_MODULE_6__.mkdirSync)((0,node_path__WEBPACK_IMPORTED_MODULE_7__.join)(__dirname, 'schema'), { recursive: true });
write_json_schema('preset.en', _type_preset_en__WEBPACK_IMPORTED_MODULE_0__.Preset);
write_json_schema('preset.zh', _type_preset_zh__WEBPACK_IMPORTED_MODULE_1__.Preset);
write_json_schema('settings.en', _type_settings_en__WEBPACK_IMPORTED_MODULE_2__.Settings);
write_json_schema('settings.zh', _type_settings_zh__WEBPACK_IMPORTED_MODULE_3__.Settings);
write_json_schema('worldbook.en', _type_worldbook_en__WEBPACK_IMPORTED_MODULE_4__.Worldbook);
write_json_schema('worldbook.zh', _type_worldbook_zh__WEBPACK_IMPORTED_MODULE_5__.Worldbook);

})();

/******/ })()
;
//# sourceMappingURL=schema.js.map