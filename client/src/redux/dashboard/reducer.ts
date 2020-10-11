import {DashboardActionTypes} from './actionTypes';

export interface DashboardState {
  error: string,
  failed: string,
  loading: boolean
}

const initialState: DashboardState = {
  error: '',
  failed: '',
  loading: false
}


const dashboardReducer = (state: DashboardState = initialState, action: DashboardActionTypes): DashboardState => {
  switch (action.type){
    case 'ERROR':
      return {
        ...state,
        error: action.payload
      }
    case 'FAILED':
      return {
        ...state,
        failed: action.payload
      }
    case 'START_LOADING':
      return {
        ...state,
        loading: action.isLoading
      }
    case 'FINISH_LOADING':
      return {
        ...state,
        loading: action.isLoading
      }
    default:
      return state
  }
}

export default dashboardReducer
