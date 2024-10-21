"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));
var import_express2 = __toESM(require("express"));

// src/routes/index.ts
var import_express = require("express");
var Routes = (0, import_express.Router)();
var routes_default = Routes;

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

// src/server.ts
import_dotenv.default.config();
var app = (0, import_express2.default)();
var PORT = process.env.PORT;
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use("/api", routes_default);
app.use(ErrorMiddleware);
app.listen(PORT, () => `Servidor rodando na porta ${PORT}`);
