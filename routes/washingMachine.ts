import express from 'express'
import {WashingMachineCtrl} from '../controllers/WashingMachineController'

const router: express.Router = express.Router()

router.get('/', WashingMachineCtrl.getAll)
router.get('/status/:status', WashingMachineCtrl.getMachinesByStatus)

router.post('/', WashingMachineCtrl.addNewMachine)

router.delete('/model', WashingMachineCtrl.removeMachineByModel)
router.delete('/:serialNumber', WashingMachineCtrl.removeMachineBySerialNumber)

router.patch('/status/:serialNumber', WashingMachineCtrl.updateMachineStatusBySerialNumber)
router.patch('/errorList/:serialNumber', WashingMachineCtrl.updateErrorList)
router.patch('/:serialNumber', WashingMachineCtrl.updateMachineBySerialNumber)

export default router
