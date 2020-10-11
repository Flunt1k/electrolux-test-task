import {
  IMachineErrors,
  IWashingMachine,
  UpdateStatusInterface,
} from '../../interfaces';
import {
  CREATE_MACHINE,
  DELETE_MACHINE,
  DELETE_MACHINES_BY_MODEL,
  GET_ALL_MACHINES,
  GET_MACHINES_BY_STATUS, SEARCH,
  UPDATE_MACHINE,
  UPDATE_MACHINE_ERROR_LIST,
  UPDATE_MACHINE_STATUS,
  WashingMachineActionTypes,
} from './actionTypes';

export const getAllMachines = (machines: IWashingMachine[]): WashingMachineActionTypes => {
  return ({
    type: GET_ALL_MACHINES,
    payload: machines
  });
}

export const getMachinesByStatus = (machines: IWashingMachine[]): WashingMachineActionTypes => ({
  type: GET_MACHINES_BY_STATUS,
  payload: machines,
});

export const createNewMachine = (machine: IWashingMachine): WashingMachineActionTypes => ({
  type: CREATE_MACHINE,
  payload: machine,
});

export const deleteMachine = (serialNumber: number): WashingMachineActionTypes => ({
  type: DELETE_MACHINE,
  serialNumber,
});

export const deleteMachinesByModel = (model: string): WashingMachineActionTypes => ({
  type: DELETE_MACHINES_BY_MODEL,
  model,
});

export const updateMachine = (machine: IWashingMachine): WashingMachineActionTypes => ({
  type: UPDATE_MACHINE,
  payload: machine,
});

export const updateMachineStatus = (status: UpdateStatusInterface): WashingMachineActionTypes => ({
  type: UPDATE_MACHINE_STATUS,
  data: status,
});

export const updateMachineErrorList = (errorState: IMachineErrors[], serialNumber: number): WashingMachineActionTypes => ({
  type: UPDATE_MACHINE_ERROR_LIST,
  data: {
    errorState,
    serialNumber
  }
})

export const searching = (input: string | undefined): WashingMachineActionTypes => ({
  type: SEARCH,
  input
})
