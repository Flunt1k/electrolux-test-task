import {combineReducers} from 'redux';
import washingMachineReducer from './washingMachines/reducer';

const rootReducer = combineReducers({
  washingMachine: washingMachineReducer,

})

export default rootReducer
