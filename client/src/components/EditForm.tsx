import React from 'react';

import TextField from '@material-ui/core/TextField/TextField';

import {initialStateUseEditForm} from '../types/types';

interface EditFormInterface {
  dataState: initialStateUseEditForm;
  changeDataState: (e: React.ChangeEvent) => void
}

const EditForm: React.FC<EditFormInterface> = ({dataState, changeDataState}: EditFormInterface): React.ReactElement => {

  return (
      <>
        <TextField
            margin="dense"
            label="Модель"
            name="model"
            type="text"
            value={dataState.model}
            onChange={changeDataState}
            fullWidth
        />
        <TextField
            margin="dense"
            label="Серийный номер"
            type="text"
            onChange={changeDataState}
            name="serialNumber"
            value={dataState.serialNumber}
            fullWidth
        />
        <TextField
            margin="dense"
            label="Циклов работы"
            type="text"
            onChange={changeDataState}
            name="washingCycles"
            value={dataState.washingCycles}
            fullWidth
        />
        <TextField
            id="date"
            label="Birthday"
            type="date"
            name="dateOfManufacture"
            value={dataState.dateOfManufacture}
            onChange={changeDataState}
            InputLabelProps={{
              shrink: true,
            }}
        />
      </>
  );
};

export default EditForm;
