import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHomeStyles} from '../pages/Home';
import {initialStateUseErrorForm} from '../types/types';

interface ErrorFormInterface {
  classes: ReturnType<typeof useHomeStyles>;
  errorState: initialStateUseErrorForm;
  changeErrorState: (e?: React.ChangeEvent) => void
}

const ErrorForm: React.FC<ErrorFormInterface> = ({classes, errorState, changeErrorState}: ErrorFormInterface): React.ReactElement => {

  const handleClickAddError = (): void => {
    changeErrorState();
  };
  return (
      <>
        <TextField
            margin="dense"
            label="Код ошибки"
            type="text"
            name="code"
            value={errorState.code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              changeErrorState(e);
            }}
            className={classes.errorCodeInput}
        />
        <TextField
            margin="dense"
            label="Текст ошибки"
            type="text"
            name="errorText"
            value={errorState.errorText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              changeErrorState(e);
            }}
            className={classes.errorTextInput}
        />
        <span className={classes.formBtn}>
        <Button variant={'contained'}
                color={'primary'}
                style={{margin: '15px 10px'}}
                onClick={handleClickAddError}
        >
          Добавить
        </Button>
        </span>
      </>
  );
};

export default ErrorForm;
