import {WashingMachineState} from '../redux/washingMachines/reducer';
import {store} from '../redux/store';
import {IWashingMachine, MainFormStateInterface} from '../interfaces';

const validation = (machineCandidate: MainFormStateInterface): { status: boolean; message?: string } => {
  const state: WashingMachineState = store.getState().washingMachine;
  const checkSerialNumber = state.washingMachines.find(
      (machine: IWashingMachine) => machine.serialNumber === machineCandidate.serialNumber
  );
  if (checkSerialNumber) {
    return {
      message: 'Данный серийный номер уже существует',
      status: false
    }
  }

  return {
    status: true
  }
};

export default validation;
