import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import {WashingMachineState} from './washingMachines/reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {DashboardState} from './dashboard/reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export interface RootState {
  washingMachine: WashingMachineState,
  dashboard: DashboardState,
}

export const typedUseSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
