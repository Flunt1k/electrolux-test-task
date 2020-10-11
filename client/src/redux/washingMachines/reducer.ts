import {IWashingMachine} from '../interfaces';
import {DashboardActionTypes, GET_ALL_MACHINES} from './actionTypes';

interface DashboardState {
  washingMachine: IWashingMachine[]
}

const initialState: DashboardState = {
  washingMachine: [],
};

const dashboardReducer = (
    state: DashboardState = initialState,
    action: DashboardActionTypes
): DashboardState => {
  switch (action.type) {
    case GET_ALL_MACHINES:
      return {...state, washingMachine: [...state.washingMachine, ...action.payload]}
    default:
      return state;
  }
};

export default dashboardReducer;
