import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import DashboardCard from '../components/DashboardCard';
import Container from '@material-ui/core/Container/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress
  from '@material-ui/core/CircularProgress/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';
import TextField from '@material-ui/core/TextField/TextField';

import ModalAddBlock from '../components/ModalAddBlock';

import {IWashingMachine} from '../interfaces';
import {typedUseSelector} from '../redux/store';
import {useDispatch} from 'react-redux';
import {fetchAllMachines} from '../redux/washingMachines/thunksActionFunctions';
import {searching} from '../redux/washingMachines/actionCreators';
import {
  hideErrorAlert,
  hideFailedAlert,
  hideSuccessAlert,
} from '../redux/dashboard/actionCreators';

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
    alignItems: 'center',
  },

  searching: {
    width: 300,
  },

  filter: {
    width: 200,
  },
}));

interface HomeInterface {
  visibleCreateMachine: boolean
  onClose: () => void
}

const Home: React.FC<HomeInterface> = ({visibleCreateMachine, onClose}: HomeInterface): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const isLoading = typedUseSelector(state => state.dashboard.loading);
  const error = typedUseSelector(state => state.dashboard.error);
  const failed = typedUseSelector(state => state.dashboard.failed);
  const success = typedUseSelector(state => state.dashboard.success);
  const machines = typedUseSelector(
      state => state.washingMachine.washingMachines);
  const searchingMachines = typedUseSelector(
      state => state.washingMachine.searchingMachines);
  const [search, setSearch] = React.useState<string>('');
  const handleOnChangeSearch = (e: React.ChangeEvent) => {
    const element = e.target as HTMLInputElement;
    setSearch(() => {
      if (element.value) {
        dispatch(searching(element.value));
      } else {
        dispatch(searching(undefined));
      }
      return element.value;
    });
  };

  const checkSearching = () => {
    return searchingMachines.length
        ? searchingMachines.map(
            (machine: IWashingMachine) => <DashboardCard key={machine._id}
                                                         data={machine}
                                                         classes={classes}/>,
        )
        : machines.map(
            (machine: IWashingMachine) => <DashboardCard key={machine._id}
                                                         data={machine}
                                                         classes={classes}/>,
        );
  };
  useEffect(() => {
    dispatch(fetchAllMachines());
  }, [dispatch]);

  return (
      <>
        <Container>
          <Container>
            <TextField className={classes.searching}
                       margin="dense"
                       label="Поиск по серийному номеру"
                       type="text"
                       value={search}
                       onChange={(e: React.ChangeEvent) => handleOnChangeSearch(
                           e)}
            />
          </Container>
          <Grid container spacing={4} style={{marginTop: 10}}>
            {!isLoading ?
                checkSearching()
                :
                <div className={classes.loader}>
                  <CircularProgress size={200}/>
                </div>
            }
          </Grid>
        </Container>
        <ModalAddBlock classes={classes}
                       visible={visibleCreateMachine}
                       onClose={onClose}
        />
        <Snackbar open={Boolean(error)}
                  autoHideDuration={6000}
                  onClose={() => dispatch(hideErrorAlert())}
        >
          <Alert onClose={() => dispatch(hideErrorAlert())}
                 severity="error"
                 children={error}
          />

        </Snackbar>
        <Snackbar open={Boolean(failed)}
                  autoHideDuration={4000}
                  onClose={() => dispatch(hideFailedAlert())}
        >
          <Alert onClose={() => dispatch(hideFailedAlert())}
                 severity="warning"
                 children={failed}
          />
        </Snackbar>
        <Snackbar open={Boolean(success)}
                  autoHideDuration={3000}
                  onClose={() => dispatch(hideSuccessAlert())}
        >
          <Alert onClose={() => dispatch(hideSuccessAlert())}
                 severity="success"
                 children={success}
          />
        </Snackbar>
      </>
  );
};

export default Home;
