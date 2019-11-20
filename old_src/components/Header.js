import React from 'react';
// import {Link} from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import deepPurple from '@material-ui/core/colors/deepPurple';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    color: deepPurple[800],
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  iconsRightContainer: {
    marginLeft: 20
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Apollo Aperture
          </Typography>
          <MoreIcon color="inherit" className={classes.menuButton}>
          </MoreIcon>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;