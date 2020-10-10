import React from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import DashboardCard from '../components/DashboardCard';
import Container from '@material-ui/core/Container/Container';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {IWashingMachine} from '../interfaces/IWashingMachine';

export const useHomeStyles = makeStyles(() => ({
  media: {
    height: 100,
    paddingTop: 10,
  },

  card: {
    position: 'relative',
  },

  model: {
    position: 'absolute',
    color: '#fff',
    top: 0,
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
    width: '40%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  statusWorking: {
    color: '#34b830',
    '& button': {
      backgroundColor: '#34b830',
      color: '#fff'
    },
    '& button:hover': {
      backgroundColor: '#1c7319',
    }
  },

  statusError: {
    color: '#ff0808',
    '& button': {
      backgroundColor: '#ff0808',
      color: '#fff'
    },

    '& button:hover': {
      backgroundColor: '#b51b1b'
    }
  },

  changeStatusBtn: {
    width: 120,
    textAlign: 'center',
  },

  bottomBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '10px 5px'
  }



}));

const Home: React.FC = (): React.ReactElement => {
  const classes = useHomeStyles();
  const mockData: Array<IWashingMachine> = [
    {
      _id: '1',
      model: 'first model',
      serialNumber: 392,
      dateOfManufacture: '24.09.2021',
      status: true,
      washingCycles: 12,
      historyOfErrors: [],
    },
    {
      _id: '2',
      model: 'second model',
      serialNumber: 122,
      dateOfManufacture: '21.11.2034',
      status: false,
      washingCycles: 12,
      historyOfErrors: [],
    },
  ];

  return (
      <div>
        <Container>
          <Grid container spacing={4} style={{marginTop: 10}}>
            {mockData.map(
                machine => <DashboardCard key={machine._id} data={machine}
                                          classes={classes}/>)}
          </Grid>
        </Container>
      </div>
  );
};

export default Home;
