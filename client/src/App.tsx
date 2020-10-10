import React from 'react';
import Home from './pages/Home';
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

function App() {
  const classes = useStyles()
  return (
      <div>
        <>
          <AppBar position="static" color={'primary'}>
            <Toolbar className={classes.navbar}>
              <Typography variant="h6">
                Dashboard
              </Typography>
              <Button color="inherit">Добавить стиральную машину</Button>
            </Toolbar>
          </AppBar>
        </>
        <Home/>
      </div>
  );
}

export default App;
