import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHomeStyles} from '../pages/Home';

interface ErrorFormInterface {
  classes: ReturnType<typeof useHomeStyles>
}

const ErrorForm: React.FC<ErrorFormInterface> = ({classes}: ErrorFormInterface): React.ReactElement => {
  return (
      <>
        <TextField
            margin="dense"
            label="Код ошибки"
            type="text"
            className={classes.errorCodeInput}
        />
        <TextField
            margin="dense"
            label="Текст ошибки"
            type="text"
            className={classes.errorTextInput}
        />
        <span className={classes.formBtn}>
        <Button variant={'contained'} color={'primary'} style={{margin: '15px' +
              ' 10px'}}>Добавить</Button>
        </span>
      </>
  );
};

export default ErrorForm;
