"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WashingMachineModel = exports.WashingMachineSchema = void 0;
var mongoose_1 = require("mongoose");
exports.WashingMachineSchema = new mongoose_1.Schema({
    model: {
        type: String,
        required: true,
    },
    serialNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    dateOfManufacture: {
        type: String,
        required: true,
    },
    washingCycles: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
    historyOfErrors: {
        type: Array,
        default: [],
    },
});
exports.WashingMachineModel = mongoose_1.model('WashingMachine', exports.WashingMachineSchema);
