import React from 'react';

export interface IWashingMachine {
  _id: string,
  model: string,
  serialNumber: number,
  dateOfManufacture: string,
  status: boolean,
  washingCycles: number,
  historyOfErrors: Array<IMachineErrors>
}

export interface MainFormInterface {
  dataState: MainFormStateInterface;
  changeDataState: (e: React.ChangeEvent) => void
}

export interface IMachineErrors {
  code: string,
  errorText: string
}

export interface MainFormStateInterface  {
  model: string,
  serialNumber: number,
  dateOfManufacture: string,
  washingCycles: number,
  status?: boolean
}
export interface ErrorFormStateInterface {
  code: string,
  errorText: string
}

