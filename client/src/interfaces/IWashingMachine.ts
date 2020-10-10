import {machineErrors} from '../types/types';

export interface IWashingMachine {
  _id: string,
  model: string,
  serialNumber: number,
  dateOfManufacture: string,
  status: boolean,
  washingCycles: number,
  historyOfErrors: Array<machineErrors>
}
