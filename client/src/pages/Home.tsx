import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';




const Home: React.FC = (): React.ReactElement => {
  const mockData = [
    {
      id: 1,
      model: 'first model',
      serialNumber: 392,
      dateOfManufacture: '24.09.2021',
      status: true,
      washingCycles: 12,
      historyOfErrors: []
    },
    {
      id: 2,
      model: 'second model',
      serialNumber: 392,
      dateOfManufacture: '21.11.2034',
      status: true,
      washingCycles: 12,
      historyOfErrors: []
    }
  ]

  return (
  <div>
  <Grid container spacing={4}>

  </Grid>
  </div>
      );
};

export default Home;
