"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("./generated/client");
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve(__dirname, "../prisma/kost_management.db");
exports.db = new client_1.PrismaClient({
    datasources: {
        db: {
            url: `file:${dbPath}`
        }
    }
});
