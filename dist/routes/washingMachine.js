"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var WashingMachineController_1 = require("../controllers/WashingMachineController");
var router = express_1.default.Router();
router.get('/', WashingMachineController_1.WashingMachineCtrl.getAll);
router.get('/status/:status', WashingMachineController_1.WashingMachineCtrl.getMachinesByStatus);
router.post('/', WashingMachineController_1.WashingMachineCtrl.addNewMachine);
router.delete('/model', WashingMachineController_1.WashingMachineCtrl.removeMachineByModel);
router.delete('/:serialNumber', WashingMachineController_1.WashingMachineCtrl.removeMachineBySerialNumber);
router.patch('/status/:serialNumber', WashingMachineController_1.WashingMachineCtrl.updateMachineStatusBySerialNumber);
router.patch('/errorList/:serialNumber', WashingMachineController_1.WashingMachineCtrl.updateErrorList);
router.patch('/:serialNumber', WashingMachineController_1.WashingMachineCtrl.updateMachineBySerialNumber);
exports.default = router;
