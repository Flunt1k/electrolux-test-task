import {initialStateUseMainForm, machineErrors} from '../types/types';
import React from 'react';

export interface IWashingMachine {
  _id: string,
  model: string,
  serialNumber: number,
  dateOfManufacture: string,
  status: boolean,
  washingCycles: number,
  historyOfErrors: Array<machineErrors>
}

export interface MainFormInterface {
  dataState: initialStateUseMainForm;
  changeDataState: (e: React.ChangeEvent) => void
}
