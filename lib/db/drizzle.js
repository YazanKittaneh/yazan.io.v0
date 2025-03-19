"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var schema = require("./schema");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
if (!process.env.POSTGRES_URL) {
    throw new Error('POSTGRES_URL environment variable is not set');
}
exports.client = (0, postgres_1.default)(process.env.POSTGRES_URL);
exports.db = (0, postgres_js_1.drizzle)(exports.client, { schema: schema });
