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
  const [visible, setVisible] = React.useState<boolean>(false)

  const handleClickOpenModal = ():void => {
    setVisible(true)
  }

  const handleClickCloseModal = ():void => {
    setVisible(false)
  }
  return (
      <div>
        <>
          <AppBar position="static" color={'primary'}>
            <Toolbar className={classes.navbar}>
              <Typography variant="h6">
                Dashboard
              </Typography>
              <Button color="inherit"
                      onClick={handleClickOpenModal}
              >
                Добавить стиральную машину
              </Button>
            </Toolbar>
          </AppBar>
        </>
        <Home visibleCreateMachine={visible} onClose={handleClickCloseModal}/>
      </div>
  );
}

export default App;
