import React from 'react';
import classNames from 'classnames';

import Grid from '@material-ui/core/Grid/Grid';

import {IWashingMachine} from '../interfaces/IWashingMachine';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import CardActions from '@material-ui/core/CardActions/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button/Button';
import WorkingIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {useHomeStyles} from '../pages/Home';
import ModalBlock from './ModalBlock';
import EditForm from './EditForm';
import {useEditForm} from '../hooks/useEditForm';

interface DashboardCardProps {
  data: IWashingMachine,
  classes: ReturnType<typeof useHomeStyles>
}

const DashboardCard: React.FC<DashboardCardProps> = ({data, classes}: DashboardCardProps): React.ReactElement => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [editState, setEditState] = React.useState<boolean>(false);
  const [editFormValues, setEditFormValues] = useEditForm({
    model: data.model,
    dateOfManufacture: data.dateOfManufacture,
    serialNumber: data.serialNumber,
    washingCycles: data.washingCycles
  })

  const handleClickOpenModal = (): void => {
    setVisible(true);
  };

  const handleClickCloseModal = (): void => {
    setVisible(false);
  };

  const handleClickEditToggle = (state: boolean): void => {
    setEditState(() => !state);
  };

  return (
      <>
        <Grid item xs={4}>
          <Card variant={'outlined'} className={classes.card}>
            <CardMedia
                className={classes.media}
                image="https://images.unsplash.com/photo-1551761429-8232f9f5955c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1818&q=80"
            />
            <CardContent style={{position: 'relative'}}>
              <IconButton className={classes.editBtn}
                          onClick={() => handleClickEditToggle(editState)}
              >
                <EditIcon color={'primary'}/>
              </IconButton>
              {editState ?
                  <>
                    <EditForm dataState={editFormValues} changeDataState={setEditFormValues}/>
                  </>
                  :
                  <>
                    <IconButton className={classes.deleteBtn}>
                      <DeleteIcon color={'primary'}/>
                    </IconButton>
                    <Typography component={'div'} className={classes.model}>
                      <h2 className={classes.modelText}>Модель: {data.model}</h2>
                    </Typography>
                    <Typography component={'div'}>
                      <p className={classes.primaryField}>Серийный номер
                        : {data.serialNumber}</p>
                    </Typography>
                    <Typography component={'div'}>
                      <p className={classes.primaryField}>Циклов работы
                        : {data.washingCycles}</p>
                    </Typography>
                    <Typography component={'div'}>
                      <p className={classNames(classes.primaryField,
                          classes.statusField)}>
                        <span>Состояние:</span>{data.status ?
                          <span className={classes.statusState}>
                      <WorkingIcon className={classes.statusWorking}/>
                      Работает
                    </span> :
                          <span className={classes.statusState}>
                      <ErrorIcon className={classes.statusError}/>
                      Не работает
                    </span>
                      }
                      </p>
                    </Typography>
                    <Typography component={'div'} variant={'subtitle2'}>
                      <p>Дата производства
                        : {data.dateOfManufacture}</p>
                    </Typography>
                  </>
              }
            </CardContent>
            {editState ? null :
                <CardActions className={classes.bottomBtns}>
              <span className={data.status
                  ? classes.statusWorking
                  : classes.statusError}>
              <Button className={classes.changeStatusBtn} variant={'contained'}>
              <span>{data.status ? 'Выключить' : 'Включить'}</span>
              </Button>
              </span>
                  <Button color={'primary'} variant={'contained'}
                          onClick={handleClickOpenModal}>
                    История ошибок
                  </Button>
                </CardActions>
            }
          </Card>
        </Grid>
        <ModalBlock classes={classes}
                    errors={data.historyOfErrors}
                    onClose={handleClickCloseModal}
                    visible={visible}
                    serialNumber={data.serialNumber}
        />
      </>
  );
};

export default DashboardCard;
