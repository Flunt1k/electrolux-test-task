"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoose = exports.db = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
var keys_1 = require("../keys/keys");
mongoose_1.default.connect(keys_1.keys.MONGO_KEY || keys_1.keys.MONGO_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, function (err) {
    if (err)
        console.log('MongoError', err);
});
var db = mongoose_1.default.connection;
exports.db = db;
