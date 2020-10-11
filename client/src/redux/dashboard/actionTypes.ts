export const ERROR = 'ERROR';
export const FAILED = 'FAILED';
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

interface StartLoadingAction {
  type: typeof START_LOADING;
  isLoading: boolean;
}

interface FinishLoadingAction {
  type: typeof FINISH_LOADING;
  isLoading: boolean
}

export type DashboardActionTypes =
    ErrorAction
    | FailedAction
    | StartLoadingAction
    | FinishLoadingAction

