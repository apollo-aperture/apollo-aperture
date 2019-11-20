import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import deepPurple from '@material-ui/core/colors/deepPurple';

const themeDefault = createMuiTheme({
  palette: {
  },
  appBar: {
    height: 60,
    color: deepPurple[800]
  },
  drawer: {
    width: 230,
    color: blueGrey[500]
  },
  raisedButton: {
    primaryColor: deepPurple[800],
  }
});

export default themeDefault;