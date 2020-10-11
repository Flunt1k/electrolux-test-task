import {IWashingMachine} from '../../interfaces';
import {
  WashingMachineActionTypes,
  GET_ALL_MACHINES,
} from './actionTypes';

export interface WashingMachineState {
  washingMachines: IWashingMachine[]
}

const initialState: WashingMachineState = {
  washingMachines: [],
};

export const washingMachineReducer = (
    state: WashingMachineState = initialState,
    action: WashingMachineActionTypes): WashingMachineState => {
  switch (action.type) {
    case GET_ALL_MACHINES:
      return {
        ...state,
        washingMachines: [...action.payload],
      };
    case 'GET_MACHINES_BY_MODEL':
      return {
        ...state,
        washingMachines: [...action.payload],
      };
    case 'GET_MACHINES_BY_STATUS':
      return {
        ...state,
        washingMachines: [...action.payload],
      };
    case 'CREATE_MACHINE':
      return {
        ...state,
        washingMachines: [...state.washingMachines, action.payload],
      };
    case 'DELETE_MACHINE':
      return {
        ...state,
        washingMachines: state.washingMachines.filter(
            machine => machine.serialNumber !== action.serialNumber,
        ),
      };
    case 'DELETE_MACHINES_BY_MODEL':
      return {
        ...state,
        washingMachines: state.washingMachines.filter(
            machine => machine.model !== action.model,
        ),
      };
    case 'UPDATE_MACHINE':
      return {
        ...state,
        washingMachines: state.washingMachines.map(
            machine => machine._id === action.payload._id
                ? action.payload
                : machine,
        ),
      };
    case 'UPDATE_MACHINE_STATUS':
      return {
        ...state,
        washingMachines: state.washingMachines.map(
            machine => {
              machine.status = machine.serialNumber === action.data.serialNumber
                  ? action.data.status
                  : machine.status;
              return machine;
            },
        ),
      };
    default:
      return state;
  }
};

export default washingMachineReducer
