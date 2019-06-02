import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import IconMenu from 'material-ui/IconMenu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import cyan from '@material-ui/core/colors/cyan';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';

const PastQuery = (props) => {
  const styles = {
    subheader: {
      fontSize: 24,
      fontWeight: Typography.fontWeightLight,
      backgroundColor: cyan[600],
      color: grey[100],
    }
  };
  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey[400]} />
    </IconButton>
  );
  const rightIconMenu = (
    <List iconButtonElement={iconButtonElement}>
      <ListItemIcon>star</ListItemIcon>
    </List>
  );
  return (
    <Paper>
      <List>
        <ListSubheader style={styles.subheader}>Past Queries</ListSubheader>
        {props.data.map(item =>
          <div key={item.title}>
            <ListItem
              primarytext={"Schema Name"}
              secondarytext={"Click to Expand"}
              righticonbutton={rightIconMenu}
            />
            <Divider inset={"true"} />
          </div>
        )}
      </List>
    </Paper>
  );
};

export default PastQuery;
