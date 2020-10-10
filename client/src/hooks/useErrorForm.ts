import React from 'react';
import {initialStateUseErrorForm} from '../types/types';

export const useErrorForm = (initialState: initialStateUseErrorForm): [initialStateUseErrorForm, (e?: React.ChangeEvent) => void] => {
  const [state, setState] = React.useState<initialStateUseErrorForm>(initialState)
  const changeState = (e?: React.ChangeEvent):void => {
    if (!e) {
      setState({code: '', errorText: ''})
      return
    }
   const element: HTMLInputElement = e.target as HTMLInputElement
   const value: string = element.value
   const name: string = element.name
   setState({...state, [name]: value})
  }

  return [state, changeState]
};
