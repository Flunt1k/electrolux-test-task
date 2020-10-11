import React from 'react';
import {MainFormStateInterface} from '../interfaces';
import {convertDate} from '../utils/dataConverter';

export const useMainForm = (
    initialState: MainFormStateInterface
): [MainFormStateInterface, (e: React.ChangeEvent) => void] => {
  initialState = {
    ...initialState,
    'dateOfManufacture': convertDate(initialState.dateOfManufacture
    ),
  };
  const [state, setState] = React.useState<MainFormStateInterface>(
      initialState
  );

  const changeState = (e: React.ChangeEvent): void => {
    const element = e.target as HTMLInputElement;
    const name: string = element.name;
    let value: string | boolean | number;
    switch (name) {
      case 'status':
        value = element.value === 'true';
        break;
      case 'serialNumber':
      case 'washingCycles':
        value = +element.value;
        break;
      default:
        value = element.value;
        break;
    }

    setState({...state, [name]: value});
  };
  return [state, changeState];
};
