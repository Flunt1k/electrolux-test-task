import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import DashboardCard from '../components/DashboardCard';
import Container from '@material-ui/core/Container/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';

import ModalAddBlock from '../components/ModalAddBlock';

import {IWashingMachine} from '../interfaces';
import {typedUseSelector} from '../redux/store';
import {useDispatch} from 'react-redux';
import {fetchAllMachines} from '../redux/washingMachines/thunksActionFunctions';

export const useHomeStyles = makeStyles(() => ({
  media: {
    height: 100,
    paddingTop: 10,
  },

  card: {
    position: 'relative',
    minHeight: 393,
  },

  model: {
    position: 'absolute',
    color: '#fff',
    top: -100,
    left: 0,
    textAlign: 'center',
    width: '100%',
  },

  modelText: {
    textShadow: '2px 2px 2px #000000',
    fontWeight: 900,
    fontSize: 30,
  },

  primaryField: {
    fontSize: 18,
    fontWeight: 700,
  },

  statusField: {
    display: 'flex',
    justifyContent: 'flex-start',
  },

  statusState: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 10,
    '& svg': {
      marginRight: 4,
    },
  },

  statusWorking: {
    color: '#34b830',
    '& button': {
      backgroundColor: '#34b830',
      color: '#fff',
    },
    '& button:hover': {
      backgroundColor: '#1c7319',
    },
  },

  statusError: {
    color: '#ff0808',
    '& button': {
      backgroundColor: '#ff0808',
      color: '#fff',
    },

    '& button:hover': {
      backgroundColor: '#b51b1b',
    },
  },

  changeStatusBtn: {
    width: 120,
    textAlign: 'center',
  },

  bottomBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 5px',
  },

  dialogTitle: {
    '& h2': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  listOfErrors: {
    maxHeight: 200,
    overflow: 'auto',
  },

  errorCodeInput: {
    marginRight: '5%',
    width: '40%',
  },

  errorTextInput: {
    width: '55%',
  },

  formBtn: {
    display: 'flex',
    justifyContent: 'center',
  },

  editBtn: {
    position: 'absolute',
    right: 0,
    top: 0,
  },

  deleteBtn: {
    position: 'absolute',
    right: 40,
    top: 0,
  },

  loader: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

}));

interface HomeInterface {
  visibleCreateMachine: boolean
  onClose: () => void
}

const Home: React.FC<HomeInterface> = ({visibleCreateMachine, onClose}: HomeInterface): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch()
  const isLoading = typedUseSelector(state => state.dashboard.loading)
  const machines = typedUseSelector(state => state.washingMachine);
  useEffect(() => {
    dispatch(fetchAllMachines())
  }, [dispatch])

  return (
      <>
        <Container>
          <Grid container spacing={4} style={{marginTop: 10}}>
            {!isLoading ?
                machines.washingMachines.map(
                (machine: IWashingMachine) => <DashboardCard key={machine._id}
                                                             data={machine}
                                                             classes={classes}/>)
                :
                <div className={classes.loader}>
                  <CircularProgress size={200}/>
                </div>
            }
          </Grid>
        </Container>
        <ModalAddBlock classes={classes}
                       visible={visibleCreateMachine}
                       onClose={onClose}/>
      </>
  );
};

export default Home;
