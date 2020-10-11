export const ERROR = 'ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';
export const FAILED = 'FAILED';
export const HIDE_FAILED = 'HIDE_FAILED';
export const SUCCESS = 'SUCCESS';
export const HIDE_SUCCESS = 'HIDE_SUCCESS';
export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';

interface ErrorAction {
  type: typeof ERROR;
  payload: string;
}

interface FailedAction {
  type: typeof FAILED;
  payload: string;
}

interface ErrorHideAction {
  type: typeof HIDE_ERROR,
  payload: string
}

interface FailedHideAction {
  type: typeof HIDE_FAILED,
  payload: string
}

interface StartLoadingAction {
  type: typeof START_LOADING;
  isLoading: boolean;
}

interface FinishLoadingAction {
  type: typeof FINISH_LOADING;
  isLoading: boolean
}

interface SuccessAction {
  type: typeof SUCCESS,
  payload: string,
}

interface HideSuccessAction {
  type: typeof HIDE_SUCCESS,
  payload: string
}

export type DashboardActionTypes =
    ErrorAction
    | FailedAction
    | StartLoadingAction
    | FinishLoadingAction
    | ErrorHideAction
    | FailedHideAction
    | SuccessAction
    | HideSuccessAction

