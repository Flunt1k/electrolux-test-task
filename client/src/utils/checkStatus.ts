import {Dispatch} from 'redux';
import {
  showErrorAlert,
  showFailedAlert, showSuccessAlert,
} from '../redux/dashboard/actionCreators';

const checkStatus = (
    status: string, dispatch: Dispatch, message: string
): boolean => {
  switch (status) {
    case 'error':
      dispatch(showErrorAlert(message));
      return false;
    case 'failed':
      dispatch(showFailedAlert(message));
      return false;
    case 'success':
      dispatch(showSuccessAlert(message));
      return true;
    default:
      return true;
  }

};

export default checkStatus;
