import {
  DashboardActionTypes,
  ERROR,
  FAILED,
  FINISH_LOADING,
  START_LOADING,
} from './actionTypes';

export const showErrorAlert = (message: string): DashboardActionTypes => ({
  type: ERROR,
  payload: message
})

export const showFailedAlert = (message: string): DashboardActionTypes => ({
  type: FAILED,
  payload: message
})

export const startLoading = (): DashboardActionTypes => ({
  type: START_LOADING,
  isLoading: true
})

export const finishLoading = (): DashboardActionTypes => ({
  type: FINISH_LOADING,
  isLoading: false
})
