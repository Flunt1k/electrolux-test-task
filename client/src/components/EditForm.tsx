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
            fullWidth
            value={dataState.model}
            onChange={changeDataState}
        />
        <TextField
            margin="dense"
            label="Серийный номер"
            type="text"
            name="serialNumber"
            fullWidth
            value={dataState.serialNumber}
            onChange={changeDataState}
        />
        <TextField
            margin="dense"
            label="Циклов работы"
            type="text"
            name="washingCycles"
            fullWidth
            value={dataState.washingCycles}
            onChange={changeDataState}
        />
        <TextField
            id="date"
            label="Дата производства"
            type="date"
            name="dateOfManufacture"
            InputLabelProps={{
              shrink: true,
            }}
            value={dataState.dateOfManufacture}
            onChange={changeDataState}
        />
      </>
  );
};

export default EditForm;
