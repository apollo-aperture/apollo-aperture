import React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link } from 'react-router-dom';
import DashboardPage from '../containers/DashboardPage';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import blueGrey from '@material-ui/core/colors/blueGrey';
import People from '@material-ui/icons/People';
import Rocket from '../images/rocket.svg';  


const drawerWidth = 250;
 const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: Typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: Typography.fontWeightLight,
      backgroundColor: 'purple',
      paddingLeft: 40,
      height: 20,
    },
    menuItem: {
      color: 'white',
      fontSize: 14,
      textAlign: 'center',
      padding: '10px',
    },
    headerText: {
      marginTop: -5,
      marginRight: 'auto',
      marginLeft: '55',
      whiteSpace: 'nowrap',
      height: 45,
      width: 55,
      float: 'left',
      color: 'white',
      fontWeight: 'light',
    },
    avatar: {
      div: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        padding: '15px 0 20px 0px',
        height: 2,
      },
      icon: {    
        display: 'block',
        marginTop: 27,
        marginLeft: -30,
        height: 45,
        width: 50,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.10)',
        float: 'left',
      },
      span: {
        paddingTop: 36,
        display: 'inlineBlock',
        textAlign: 'right',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      },
      image: {
        cursor: 'pointer',
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: Typography.fontWeightLight,
        paddingLeft: 40,
        height: 27,
      },
    }
  };

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#4527A0',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  headerSpace: {
    backgroundImage: 'url(' + require('../images/comety.gif') + ')',
  },
  drawerPaper: {
    backgroundColor: blueGrey[300],
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 2px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {

    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    menuitem: {
      textAlign: 'center',
    },
    marginLeft: 0,
  },
}));

function LeftDrawer(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Apollo Aperture
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.headerSpace} style={styles.headerTop}>        
        <div style={styles.avatar.div}>
        <span style={styles.headerText}> Mission Control </span>
          <Avatar src="https://i.imgur.com/ghpRvan.png"
                  size={40}
                  style={styles.avatar.icon}/>
        </div>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose} color="inherit">
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        </div>
        
        <div style={styles.menuItem}>
          {props.menus.map((menu, index) =>
              <ListItem button key={index} button component={Link} to={menu.link}>
              <ListItemIcon>
              {menu.icon}
              </ListItemIcon>
          
              <ListItemText primary={menu.text}/>
              {/* <ListItemText primary={menu.text} containerElement={<Link to={menu.link} />} /> */}
              </ListItem>  
            )}
        </div>
        <Divider />
        <List style={styles.menuItem}>
          
          {['About Us'].map((text, index) => (
            <ListItem button key={text} button component={Link} to="/form">
              <ListItemIcon><People/></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <br>
        </br>
        <img src={Rocket} alt="" style={styles.image} />
      </Drawer>
      {/* Dashboard Component Below  */}
      <main className={clsx(classes.content, {[classes.contentShift]: open,})}>
        <DashboardPage />
      </main>
    </div>
    </Router>
  );
}

export default LeftDrawer;


