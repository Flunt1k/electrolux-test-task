import {
  IMachineErrors,
  IWashingMachine,
  UpdateStatusInterface,
} from '../../interfaces';

export const GET_ALL_MACHINES = 'GET_ALL_MACHINES';
export const GET_MACHINES_BY_STATUS = 'GET_MACHINES_BY_STATUS';
export const CREATE_MACHINE = 'CREATE_MACHINE';
export const DELETE_MACHINE = 'DELETE_MACHINE';
export const DELETE_MACHINES_BY_MODEL = 'DELETE_MACHINES_BY_MODEL';
export const UPDATE_MACHINE = 'UPDATE_MACHINE';
export const UPDATE_MACHINE_STATUS = 'UPDATE_MACHINE_STATUS';
export const UPDATE_MACHINE_ERROR_LIST = 'UPDATE_MACHINE_ERROR_LIST';
export const SEARCH = 'SEARCH';

interface GetMachinesAction {
  type: typeof GET_ALL_MACHINES
  payload: IWashingMachine[]
}

interface GetMachinesByStatusAction {
  type: typeof GET_MACHINES_BY_STATUS;
  payload: IWashingMachine[];
}

interface CreateMachineAction {
  type: typeof CREATE_MACHINE;
  payload: IWashingMachine;
}

interface DeleteMachineAction {
  type: typeof DELETE_MACHINE;
  serialNumber: number;
}

interface DeleteMachinesByModelAction {
  type: typeof DELETE_MACHINES_BY_MODEL;
  model: string;
}

interface UpdateMachineAction {
  type: typeof UPDATE_MACHINE;
  payload: IWashingMachine;
}

interface UpdateMachineStatusAction {
  type: typeof UPDATE_MACHINE_STATUS;
  data: UpdateStatusInterface;
}

interface UpdateMachineErrorListAction {
  type: typeof UPDATE_MACHINE_ERROR_LIST;
  data: {
    errorState: IMachineErrors[];
    serialNumber: number;
  }
}

interface SearchingAction {
  type: typeof SEARCH;
  input: string | undefined
}

export type WashingMachineActionTypes =
    GetMachinesAction
    | GetMachinesByStatusAction
    | CreateMachineAction
    | DeleteMachinesByModelAction
    | DeleteMachineAction
    | UpdateMachineAction
    | UpdateMachineStatusAction
    | UpdateMachineErrorListAction
    | SearchingAction
