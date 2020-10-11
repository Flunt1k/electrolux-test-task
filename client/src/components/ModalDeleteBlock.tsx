import React from 'react';
import {useHomeStyles} from '../pages/Home';
import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {Button} from '@material-ui/core';

interface ModalDeleteBlockProps {
  classes: ReturnType<typeof useHomeStyles>
  visible: boolean,
  serialNumber: number,
  model: string
  onClose: () => void
}

const ModalDeleteBlock: React.FC<ModalDeleteBlockProps> = ({classes, onClose, visible, serialNumber, model}: ModalDeleteBlockProps):React.ReactElement => {
  const handleClickDeleteBySerialNumber = (): void => {
    onClose()
  }

  const handleClickDeleteByModel = (): void => {
    onClose()
  }
  return(
      <>
        <Dialog open={visible} onClose={onClose}
                aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Серийный номер машины: {serialNumber}
            <IconButton onClick={onClose}
                        color="secondary"
                        aria-label="close"
            >
              <CloseIcon style={{fontSize: 26}} color="primary"/>
            </IconButton>
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClickDeleteBySerialNumber}
                    variant={'contained'}
                    color={'primary'}
            >
              Удалить машину с серийным номером: {serialNumber}
            </Button>
            <Button onClick={handleClickDeleteByModel}
                    variant={'contained'}
                    color={'primary'}
            >
              Удалить все машины с моделью: {model}
            </Button>
          </DialogActions>
        </Dialog>
      </>
  )
}

export default ModalDeleteBlock
