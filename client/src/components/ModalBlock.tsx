import React from 'react';

import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper/Paper';
import CloseIcon from '@material-ui/icons/Close';
import {useHomeStyles} from '../pages/Home';
import IconButton from '@material-ui/core/IconButton/IconButton';
import {machineErrors} from '../types/types';
import ErrorForm from './ErrorForm';

interface ModalBlockProps {
  classes: ReturnType<typeof useHomeStyles>;
  errors: machineErrors[];
  serialNumber: number;
  visible: boolean;
  onClose: () => void;
}

const ModalBlock: React.FC<ModalBlockProps> = ({
  classes,
  errors,
  serialNumber,
  visible,
  onClose,
}: ModalBlockProps): React.ReactElement => {
  return (
      <Dialog open={visible} onClose={onClose}
              aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
          Серийный номер машины: {serialNumber}
          <IconButton onClick={onClose} color="secondary" aria-label="close">
            <CloseIcon style={{fontSize: 26}} color="primary"/>
          </IconButton>
        </DialogTitle>
        <DialogContent style={{margin: '0 auto', minWidth: "100%"}} dividers>
          {errors.length ?
              <Paper className={classes.listOfErrors}>
                <List>
                  {errors.map((error, index) => {
                    return (
                        <ListItem>
                          <ListItemText><b>Код ошибки: {error.code}</b> || Текст
                            ошибки: {error.errorText}</ListItemText>
                        </ListItem>
                    );
                  })}
                </List>
              </Paper> :
              <h2>Ошибки отсутствуют</h2>
          }
          <h4 style={{marginBottom: 0}}>Добавить ошибку</h4>
          <ErrorForm classes={classes}/>
        </DialogContent>
      </Dialog>
  );
};

export default ModalBlock;