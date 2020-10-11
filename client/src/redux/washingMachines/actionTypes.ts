import {IWashingMachine, UpdateStatusInterface} from '../interfaces';

export const GET_ALL_MACHINES = 'GET_ALL_MACHINES';
export const GET_MACHINES_BY_MODEL = 'GET_MACHINES_BY_MODEL';
export const GET_MACHINES_BY_STATUS = 'GET_MACHINES_BY_STATUS';
export const CREATE_MACHINE = 'CREATE_MACHINE';
export const DELETE_MACHINE = 'DELETE_MACHINE';
export const DELETE_MACHINES_BY_MODEL = 'DELETE_MACHINES_BY_MODEL';
export const UPDATE_MACHINE = 'UPDATE_MACHINE';
export const UPDATE_MACHINE_BY_MODEL = 'UPDATE_MACHINE_BY_MODEL'
export const UPDATE_MACHINE_STATUS = 'UPDATE_MACHINE_STATUS';
export const ERROR = 'ERROR';
export const FAILED = 'FAILED'
export const START_LOADING = 'START_LOADING'
export const FINISH_LOADING = 'FINISH_LOADING'

interface Action {
  type: string;
}

interface GetArrayOfMachinesAction extends Action {
  payload: IWashingMachine[]
}

interface GetOneMachineAction extends Action {
  payload: IWashingMachine
}

interface DeleteMachineAction extends Action {
  payload: string
}


interface ErrorOrFailedAction extends Action {
  payload: string
}

interface UpdateStatusAction extends Action {
  payload: UpdateStatusInterface
}

export type DashboardActionTypes =
    GetArrayOfMachinesAction
    | GetOneMachineAction
    | DeleteMachineAction
    | UpdateStatusAction
    | ErrorOrFailedAction

