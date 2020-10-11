import {IWashingMachine} from '../../interfaces';
import {createNewMachine, getAllMachines} from './actionCreators';
import {Dispatch} from 'redux';
import {showErrorAlert} from '../dashboard/actionCreators';

export const fetchCreateMachine = (body: IWashingMachine): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch('/api/washingMachine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const result = await response.json()
  if (result.message) {
    dispatch(showErrorAlert(result.message))
    return
  }
  dispatch(createNewMachine(result.data))
}

export const fetchAllMachines = (): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch('/api/washingMachine')
  const result = await response.json()
  if (result.message) {
    dispatch(showErrorAlert(result.message))
    return
  }
  dispatch(getAllMachines(result.data))
}
