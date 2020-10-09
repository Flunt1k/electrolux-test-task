import express from 'express'
import {WashingMachineCtrl} from '../controllers/WashingMachineController'

const router: express.Router = express.Router()

router.get('/', WashingMachineCtrl.getAll)
router.get('/model', WashingMachineCtrl.getMachinesByModel)
router.get('/status', WashingMachineCtrl.getMachinesByStatus)
router.get('/:serialNumber', WashingMachineCtrl.getMachineBySerialNumber)

router.post('/', WashingMachineCtrl.addNewMachine)

router.delete('/model', WashingMachineCtrl.removeMachineByModel)
router.delete('/:serialNumber', WashingMachineCtrl.removeMachineBySerialNumber)

router.patch('/model', WashingMachineCtrl.updateMachinesByModel)
router.patch('/status/:serialNumber', WashingMachineCtrl.updateMachineStatusBySerialNumber)
router.patch('/:serialNumber', WashingMachineCtrl.updateMachineBySerialNumber)

export default router
