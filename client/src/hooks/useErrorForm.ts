import React from 'react';
import {ErrorFormStateInterface} from '../interfaces';

export const useErrorForm = (initialState: ErrorFormStateInterface): [ErrorFormStateInterface, (e?: React.ChangeEvent) => void] => {
  const [state, setState] = React.useState<ErrorFormStateInterface>(initialState)
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
