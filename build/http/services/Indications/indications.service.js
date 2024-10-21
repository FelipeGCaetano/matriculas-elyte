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

// src/http/services/Indications/indications.service.ts
var indications_service_exports = {};
__export(indications_service_exports, {
  IndicationService: () => IndicationService
});
module.exports = __toCommonJS(indications_service_exports);

// src/database/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/errors/application.ts
var ApplicationError = class extends Error {
  constructor(message, statusCode, details) {
    super(message);
    this.message = message;
    this.statusCode = statusCode || 400;
    this.details = details;
  }
};

// src/http/services/Indications/indications.service.ts
var IndicationService = class {
  async create(student, indicator) {
    let student_id;
    const studentAlreadyExists = await prisma_default.student.findUnique({
      where: {
        email: student.email
      }
    });
    if (!studentAlreadyExists) {
      const createStudent = await prisma_default.student.create({
        data: student
      });
      student_id = createStudent.id;
    } else {
      student_id = studentAlreadyExists.id;
    }
    const alreadyWasIndicated = await prisma_default.indications.findUnique({
      where: {
        email: indicator.email
      },
      include: {
        student: true
      }
    });
    if (!alreadyWasIndicated) {
      const createIndication = await prisma_default.indications.create({
        data: {
          ...indicator,
          student_id
        }
      });
    } else {
      throw new ApplicationError(`Aluno ${indicator.name} j\xE1 indicado por`);
    }
    return {
      status: "success",
      message: "teste"
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IndicationService
});
