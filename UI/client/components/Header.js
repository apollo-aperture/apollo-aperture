import React from 'react';
import { Link } from 'react-router-rom'; 
import AppBar from '@material-ui/core/AppBar'; 
import IconButton from '@material-ui/core/IconButton'; 
// import IconMenu from 'material-ui/IconMenu'; // CHECK IF ICON MENU HAS BEEN DEP
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem'; 
import Menu from '@material-ui/core/Menu';
import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
// import ViewModule from 'material-ui/svg-icons/action/view-module'; // CHECK IF VIEW MODUEL IS DEPRECATED
import blue from '@material-ui/core/colors/blue';


class Header extends React.Component {
  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
        <div>
            <h1> HOWDY PARTNER </h1>
            <AppBar
              style={{...styles, ...style.appBar}}
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={blue[50]} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
                  {/* THIS WAS ICON MENU PREV */}
                  <Icon color={blue[50]}   
                            iconButtonElement={
                              <IconButton><ViewModule color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem key={1} primaryText="Application 1"/>
                    <MenuItem key={2} primaryText="Application 2"/>
                    <MenuItem key={3} primaryText="Application 3"/>
                  </Icon>
                  <Icon color={blue[50]}
                            iconButtonElement={
                              <IconButton><ThreeDRotation color={blue[50]}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Exit" containerElement={<Link to="/"/>}/>
                  </Icon>
                </div>
              }
            />
          </div>
      );
  }
}

export default Header;