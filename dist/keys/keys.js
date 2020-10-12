"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keys = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.keys = {
    MONGO_KEY: process.env.MONGO_KEY,
    PORT: process.env.PORT,
    MONGO_LOCAL: 'mongodb://127.0.0.1:27017/electrolux',
};
