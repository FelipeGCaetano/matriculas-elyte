"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/middlewares/error.middleware.ts
var error_middleware_exports = {};
__export(error_middleware_exports, {
  ErrorMiddleware: () => ErrorMiddleware
});
module.exports = __toCommonJS(error_middleware_exports);

// src/errors/application.ts
var ApplicationError = class extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.message = message;
    this.statusCode = statusCode || 400;
    this.details = details;
  }
};

// src/http/middlewares/error.middleware.ts
function ErrorMiddleware(err, req, res) {
  const isApplicationError = err instanceof ApplicationError;
  const resObj = {
    status: "error",
    message: err.message
  };
  if (isApplicationError && err.details) resObj.details = err.details;
  res.status(isApplicationError ? err.statusCode : 400).json(resObj);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorMiddleware
});
