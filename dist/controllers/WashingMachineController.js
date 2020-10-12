"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WashingMachineCtrl = void 0;
var errorHandler_1 = __importDefault(require("../utils/errorHandler"));
var WashingMachine_1 = require("../models/WashingMachine");
var WashingMachineController = /** @class */ (function () {
    function WashingMachineController() {
    }
    WashingMachineController.prototype.getAll = function (_, res) {
        return __awaiter(this, void 0, void 0, function () {
            var machines, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.find({}).exec()];
                    case 1:
                        machines = _a.sent();
                        res.status(200).json({
                            status: 'success',
                            data: machines,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        errorHandler_1.default(err_1, res);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    WashingMachineController.prototype.getMachinesByStatus = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var status, machines, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = JSON.parse(req.params.status);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.find({ status: status }).exec()];
                    case 2:
                        machines = _a.sent();
                        res.status(200).json({
                            status: 'success',
                            data: machines,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        errorHandler_1.default(err_2, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WashingMachineController.prototype.addNewMachine = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, machine, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            model: req.body.model,
                            serialNumber: req.body.serialNumber,
                            dateOfManufacture: req.body.dateOfManufacture,
                            washingCycles: req.body.washingCycles,
                            status: req.body.status,
                            historyOfErrors: req.body.historyOfErrors,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.create(data)];
                    case 2:
                        machine = _a.sent();
                        res.status(201).json({
                            status: 'success',
                            data: machine,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_3 = _a.sent();
                        errorHandler_1.default(err_3, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WashingMachineController.prototype.removeMachineBySerialNumber = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var serialNumber, removedData, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serialNumber = +req.params.serialNumber;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.deleteOne({ serialNumber: serialNumber }).
                                exec()];
                    case 2:
                        removedData = _a.sent();
                        if (!removedData.deletedCount) {
                            res.status(404).json({
                                status: 'failed',
                                message: "\u041C\u0430\u0448\u0438\u043D\u0430 \u0441 \u0441\u0435\u0440\u0438\u0439\u043D\u044B\u043C \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + serialNumber + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).json({
                            status: 'success',
                            data: serialNumber,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_4 = _a.sent();
                        errorHandler_1.default(err_4, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WashingMachineController.prototype.removeMachineByModel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var model, removedData, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        model = req.body.model;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.deleteMany({ model: model }).exec()];
                    case 2:
                        removedData = _a.sent();
                        if (!removedData.deletedCount) {
                            res.status(404).json({
                                status: 'failed',
                                message: "\u041C\u0430\u0448\u0438\u043D\u044B \u043F\u043E \u043C\u043E\u0434\u0435\u043B\u0438 " + model + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B",
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).json({
                            status: 'success',
                            data: model,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_5 = _a.sent();
                        errorHandler_1.default(err_5, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WashingMachineController.prototype.updateMachineBySerialNumber = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var serialNumber, updates, machine, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serialNumber = +req.params.serialNumber;
                        updates = req.body.updates;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.findOneAndUpdate({ serialNumber: serialNumber }, { $set: updates }, { new: true })];
                    case 2:
                        machine = _a.sent();
                        if (!machine) {
                            res.status(404).json({
                                status: 'failed',
                                message: "\u041C\u0430\u0448\u0438\u043D\u0430 \u0441 \u0441\u0435\u0440\u0438\u0439\u043D\u044B\u043C \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + serialNumber + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
                            });
                            return [2 /*return*/];
                        }
                        res.status(200).json({
                            status: 'success',
                            data: machine,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        err_6 = _a.sent();
                        errorHandler_1.default(err_6, res);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    WashingMachineController.prototype.updateMachineStatusBySerialNumber = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var serialNumber, machine, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        serialNumber = +req.params.serialNumber;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.findOne({ serialNumber: serialNumber }, { status: 1, serialNumber: 1 }).exec()];
                    case 2:
                        machine = _a.sent();
                        if (!machine) return [3 /*break*/, 4];
                        machine.status = !machine.status;
                        res.status(200).json({
                            status: 'success',
                            data: machine,
                        });
                        return [4 /*yield*/, machine.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                    case 4:
                        res.status(404).json({
                            status: 'failed',
                            message: "\u041C\u0430\u0448\u0438\u043D\u0430 \u0441 \u0441\u0435\u0440\u0438\u0439\u043D\u044B\u043C \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + serialNumber + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430",
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        err_7 = _a.sent();
                        errorHandler_1.default(err_7, res);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    WashingMachineController.prototype.updateErrorList = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var serialNumber, error, machine;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        serialNumber = +req.params.serialNumber;
                        error = req.body.error;
                        return [4 /*yield*/, WashingMachine_1.WashingMachineModel.findOne({ serialNumber: serialNumber }, { historyOfErrors: 1 })];
                    case 1:
                        machine = _b.sent();
                        if (!machine) return [3 /*break*/, 3];
                        (_a = machine.historyOfErrors) === null || _a === void 0 ? void 0 : _a.push(error);
                        res.status(200).json({
                            status: 'success',
                            data: {
                                errorList: machine.historyOfErrors,
                                serialNumber: serialNumber,
                            },
                        });
                        return [4 /*yield*/, machine.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                    case 3:
                        res.status(404).json({
                            status: 'failed',
                            message: "\u041C\u0430\u0448\u0438\u043D\u0430 \u0441 \u0441\u0435\u0440\u0438\u0439\u043D\u044B\u043C \u043D\u043E\u043C\u0435\u0440\u043E\u043C " + serialNumber + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430!"
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return WashingMachineController;
}());
exports.WashingMachineCtrl = new WashingMachineController();
