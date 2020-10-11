import {
  DashboardActionTypes,
  ERROR,
  FAILED,
  FINISH_LOADING, HIDE_ERROR, HIDE_SUCCESS,
  START_LOADING, SUCCESS,
} from './actionTypes';

export const showErrorAlert = (message: string): DashboardActionTypes => ({
  type: ERROR,
  payload: message,
});

export const hideErrorAlert = (message: string = ''): DashboardActionTypes => ({
  type: HIDE_ERROR,
  payload: message,
});

export const showFailedAlert = (message: string): DashboardActionTypes => ({
  type: FAILED,
  payload: message,
});

export const hideFailedAlert = (message: string = ''): DashboardActionTypes => ({
  type: ERROR,
  payload: message,
});

export const showSuccessAlert = (message: string): DashboardActionTypes => ({
  type: SUCCESS,
  payload: message,
});

export const hideSuccessAlert = (message: string = ''): DashboardActionTypes => ({
  type: HIDE_SUCCESS,
  payload: message,
});

export const startLoading = (): DashboardActionTypes => ({
  type: START_LOADING,
  isLoading: true,
});

export const finishLoading = (): DashboardActionTypes => ({
  type: FINISH_LOADING,
  isLoading: false,
});
