import React from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import FormControl from '@material-ui/core/FormControl/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {MainFormInterface} from '../interfaces';


const AddForm: React.FC<MainFormInterface> = ({dataState, changeDataState, validation}:MainFormInterface): React.ReactElement => {

  return (
      <>
        <TextField
            margin="dense"
            label="Модель"
            name="model"
            type="text"
            fullWidth
            error={!Boolean(dataState.model)}
            helperText={Boolean(dataState.model) ? '' : 'Поле должно быть' +
                ' заполнено'}
            value={dataState.model}
            onChange={changeDataState}
        />
        <TextField
            margin="dense"
            label="Серийный номер"
            name="serialNumber"
            type="text"
            fullWidth
            error={Boolean(validation) || !Boolean(dataState.serialNumber)}
            helperText={Boolean(validation) ? validation : 'Поле должно быть' +
                ' заполнено'}
            value={isNaN(dataState.serialNumber) ? '' : dataState.serialNumber}
            onChange={changeDataState}
        />
        <TextField
            margin="dense"
            label="Циклов работы"
            placeholder={'Необязательное поле'}
            name="washingCycles"
            type="text"
            fullWidth
            value={dataState?.washingCycles?.toString() && isNaN(dataState.washingCycles) ? '' : dataState.washingCycles}
            onChange={changeDataState}
        />
        <FormControl component="fieldset" style={{marginTop: 10}}>
          <FormLabel component="legend">Статус</FormLabel>
          <RadioGroup aria-label="gender" name="status" value={dataState.status} onChange={changeDataState}>
            <FormControlLabel value={true} control={<Radio />} label="Включена" />
            <FormControlLabel value={false} control={<Radio />} label="Выключена" />
          </RadioGroup>
        </FormControl>

        <TextField
            id="date"
            label="Дата производства"
            type="date"
            name="dateOfManufacture"
            error={!Boolean(dataState.dateOfManufacture)}
            helperText={Boolean(dataState.dateOfManufacture) ? '' : 'Поле должно быть' +
                ' заполнено'}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={dataState.dateOfManufacture}
            onChange={changeDataState}
        />
      </>
  );
};

export default AddForm;
