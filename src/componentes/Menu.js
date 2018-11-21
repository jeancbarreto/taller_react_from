import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { MenuItem } from '@material-ui/core';


const styles = {
  palette: {
    primary: '#aa2e25'
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 30,
    marginRight: 0,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.palette.primary}>
        <Toolbar>
          <Typography variant="h6" color="inherit" href="./App">
            <h3>Taller Reactjs</h3>
          </Typography>
          <Button color="inherit" className={classes.menuButton} href="./Cliente">Clientes</Button>
          <Button color="inherit" className={classes.menuButton} href="./Producto">Productos</Button>
          <Button color="inherit" className={classes.menuButton} href="./Estadistica">Dashboard</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
