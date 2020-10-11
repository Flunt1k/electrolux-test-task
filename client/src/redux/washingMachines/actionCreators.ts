import {IWashingMachine, UpdateStatusInterface} from '../interfaces';
import {
  CREATE_MACHINE,
  DashboardActionTypes,
  DELETE_MACHINE,
  DELETE_MACHINES_BY_MODEL,
  GET_ALL_MACHINES,
  GET_MACHINES_BY_MODEL,
  GET_MACHINES_BY_STATUS,
  UPDATE_MACHINE,
  UPDATE_MACHINE_BY_MODEL, UPDATE_MACHINE_STATUS,
} from './actionTypes';

export const getAllMachines = (machines: Array<IWashingMachine>): DashboardActionTypes => ({
  type: GET_ALL_MACHINES,
  payload: machines,
});

export const getMachinesByModel = (machines: IWashingMachine[]): DashboardActionTypes => ({
  type: GET_MACHINES_BY_MODEL,
  payload: machines
})

export const getMachinesByStatus = (machines: IWashingMachine[]): DashboardActionTypes => ({
  type: GET_MACHINES_BY_STATUS,
  payload: machines
})

export const createNewMachine = (machine: IWashingMachine): DashboardActionTypes => ({
  type: CREATE_MACHINE,
  payload: machine
})

export const deleteMachine = (serialNumber: string): DashboardActionTypes => ({
  type: DELETE_MACHINE,
  payload: serialNumber
})

export const deleteMachinesByModel = (model: string): DashboardActionTypes => ({
  type: DELETE_MACHINES_BY_MODEL,
  payload: model
})

export const updateMachine = (machine: IWashingMachine): DashboardActionTypes => ({
  type: UPDATE_MACHINE,
  payload: machine
})

export const updateMachinesByModel = (machines: IWashingMachine[]): DashboardActionTypes => ({
  type: UPDATE_MACHINE_BY_MODEL,
  payload: machines
})

export const updateMachineStatus = (status: UpdateStatusInterface): DashboardActionTypes => ({
  type: UPDATE_MACHINE_STATUS,
  payload: status
})

