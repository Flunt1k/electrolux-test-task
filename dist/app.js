"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
require("./core/db");
var washingMachine_1 = __importDefault(require("./routes/washingMachine"));
exports.app = express_1.default();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(morgan_1.default('dev'));
exports.app.use('/api/washingMachine', washingMachine_1.default);
if (process.env.MODE === 'production') {
    exports.app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client/build')));
    exports.app.get('*', function (_, res) {
        res.sendFile(__dirname + '../client/build/index.html');
    });
}
