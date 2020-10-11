import {IMachineErrors, IWashingMachine} from '../../interfaces';
import {
  createNewMachine,
  deleteMachine,
  deleteMachinesByModel,
  getAllMachines,
  getMachinesByStatus,
  updateMachine,
  updateMachineErrorList,
  updateMachineStatus,
} from './actionCreators';
import {Dispatch} from 'redux';
import {
  finishLoading,
  startLoading,
} from '../dashboard/actionCreators';
import checkStatus from '../../utils/checkStatus';

const headers = {
  'Content-Type': 'application/json',
};

export const fetchCreateMachine = (body: IWashingMachine): Function => async (dispatch: Dispatch): Promise<void> => {
  dispatch(startLoading());
  const response = await fetch('/api/washingMachine', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const result = await response.json();
  dispatch(finishLoading());
  const status: boolean = checkStatus(
      result.status,
      dispatch,
      result.message || 'Новая машина успешна добавлена!',
  );
  if (status) dispatch(createNewMachine(result.data));
};

export const fetchAllMachines = (): Function => async (dispatch: Dispatch): Promise<void> => {
  dispatch(startLoading());
  const response = await fetch('/api/washingMachine');
  const result = await response.json();
  dispatch(finishLoading());
  const status: boolean = checkStatus(
      result.status,
      dispatch,
      result.message || 'Все машины получены!',
  );
  if (status) dispatch(getAllMachines(result.data));
};

export const fetchDeleteMachine = (serialNumber: number): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch(`/api/washingMachine/${serialNumber}`, {
    method: 'DELETE',
    headers,
  });
  const result = await response.json();
  const status = checkStatus(
      result.status,
      dispatch,
      result.message ||
      `Машина с серийным номером ${result.data} успешно удалена!`,
  );
  if (status) dispatch(deleteMachine(result.data));
};

export const fetchDeleteMachinesByModel = (model: string): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch('/api/washingMachine/model', {
    method: 'DELETE',
    headers,
    body: JSON.stringify({model}),
  });
  const result = await response.json();
  const status = checkStatus(
      result.status,
      dispatch,
      result.message || `Все машины по модели ${result.data} успешно удалены!`,
  );

  if (status) dispatch(deleteMachinesByModel(result.data));
};

export const fetchUpdateMachine = (
    updates: IWashingMachine,
    currentSerialNumber: number
): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch(`/api/washingMachine/${currentSerialNumber}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({updates}),
  });
  const result = await response.json();
  const status = checkStatus(
      result.status,
      dispatch,
      result.message ||
      `Машина с ${result.data.serialNumber} успешно обновлена!`,
  );
  if (status) dispatch(updateMachine(result.data));
};

export const fetchUpdateMachineStatus = (serialNumber: number): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch(`/api/washingMachine/status/${serialNumber}`, {
    method: 'PATCH',
    headers
  })
  const result = await response.json()
  const status = checkStatus(
      result.status,
      dispatch,
      result.message || `Машина ${result.data.status ? 'включена' : 'выключена'}`
  )
  if (status) dispatch(updateMachineStatus(result.data))
}

export const fetchUpdateErrorList = (error: IMachineErrors, serialNumber: number): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch(`/api/washingMachine/errorList/${serialNumber}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({error})
  })
  const result = await response.json()
  const status = checkStatus(
      result.status,
      dispatch,
      result.message || 'Ошибка успешно добавлена!'
  )

  if (status) dispatch(updateMachineErrorList(result.data.errorList, result.data.serialNumber))
}

export const fetchMachinesByStatus = (machineState: boolean): Function => async (dispatch: Dispatch): Promise<void> => {
  const response = await fetch(`/api/washingMachine/status/${machineState}`)
  const result = await response.json()
  const status = checkStatus(
      result.status,
      dispatch,
      result.message || `Показаны только ${machineState? 'включенные' : 'выключенные'} машины`
  )

  if (status) dispatch(getMachinesByStatus(result.data))
}
