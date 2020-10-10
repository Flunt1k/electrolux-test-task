import React from 'react';

import Dialog from '@material-ui/core/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import Button from '@material-ui/core/Button';

import {useHomeStyles} from '../pages/Home';
import IconButton from '@material-ui/core/IconButton/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddForm from './AddForm';
import {useMainForm} from '../hooks/useMainForm';

interface ModalAddBlockProps {
  classes: ReturnType<typeof useHomeStyles>;
  visible: boolean;
  onClose: () => void;
}

const ModalAddBlock: React.FC<ModalAddBlockProps> = ({
  classes,
  visible,
  onClose,
}: ModalAddBlockProps): React.ReactElement => {
  const [dataState, setDataState] = useMainForm({
    model: '',
    serialNumber: NaN,
    dateOfManufacture: '',
    status: true,
    washingCycles: NaN
  })

  const handleClickAddMachine = (): void => {
    onClose()
  }
  return (
      <>
        <Dialog open={visible}
                onClose={onClose}
                aria-labelledby="form-dialog-title"
                fullWidth
        >
          <DialogTitle className={classes.dialogTitle}>
            Добавить машину
            <IconButton onClick={onClose}
                        color="secondary"
                        aria-label="close"
            >
              <CloseIcon style={{fontSize: 26}} color="primary"/>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <AddForm dataState={dataState} changeDataState={setDataState}/>
          </DialogContent>
          <DialogActions>
            <Button variant={'contained'} color={'primary'} onClick={handleClickAddMachine}>
              Добавить
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default ModalAddBlock;
