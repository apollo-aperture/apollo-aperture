import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';
import {deepPurple, blue} from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
// import Moon from '../images/rocket.svg';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: Typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: Typography.fontWeightLight,
      backgroundColor: deepPurple[800],
      paddingLeft: 40,
      height: 57,
    },
    menuItem: {
      color: blue[50],
      fontSize: 14,
      textAlign: 'center',
      padding: '8px',
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        height: 45,
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      },
      image: {
        cursor: 'pointer',
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: Typography.fontWeightLight,
        paddingLeft: 40,
        height: 27,
      }
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div style={styles.logo}>
          Apollo Aperture
        </div>
        <div style={styles.avatar.div}>
          <Avatar src="https://i.imgur.com/ghpRvan.png"
                  size={50}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>Welcome</span>
        </div>
        <div>

            <MenuItem/>
          
        </div>
    </Drawer>
  );
};

export default LeftDrawer;