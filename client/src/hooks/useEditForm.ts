import React from 'react';
import {initialStateUseEditForm} from '../types/types';

export const useEditForm = (initialState: initialStateUseEditForm): [initialStateUseEditForm, (e: React.ChangeEvent) => void] => {
  const setDateOfManufacture = () => {
    if (initialState.dateOfManufacture.includes('.')) {
      const parsedDate = initialState.dateOfManufacture.split('.');
      if (String(+parsedDate[1] - 1).length === 1) {
        return `${parsedDate[2]}-0${+parsedDate[1] - 1}-${parsedDate[0]}`;
      } else if (String(+parsedDate[0]).length === 1) {
        return `${parsedDate[2]}-${+parsedDate[1] - 1}-0${parsedDate[0]}`;
      }
      return `${parsedDate[2]}-${+parsedDate[1] - 1}-${parsedDate[0]}`;
    }
    return ''
  };

  initialState = {...initialState, 'dateOfManufacture': setDateOfManufacture()};
  const [state, setState] = React.useState<initialStateUseEditForm>(initialState);

  const changeState = (e: React.ChangeEvent): void => {
    const element = e.target as HTMLInputElement;
    const value = element.value;
    const name = element.name;
    setState({...state, [name]: value});
  };
  return [state, changeState];
};
