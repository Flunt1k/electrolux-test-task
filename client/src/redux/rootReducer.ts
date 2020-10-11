import {combineReducers} from 'redux';
import washingMachineReducer from './washingMachines/reducer';
import dashboardReducer from './dashboard/reducer';

const rootReducer = combineReducers({
  washingMachine: washingMachineReducer,
  dashboard: dashboardReducer
})

export default rootReducer
