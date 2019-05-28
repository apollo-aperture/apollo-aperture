import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
// import Header from '../components/Header';
import ThemeDefault from '../theme-default';
// import Data from '../data';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      navDrawerOpen: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  } 

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
};

render() {
  let { navDrawerOpen } = this.state;
  const paddingLeftDrawerOpen = 236;

  const styles = {
    header: {
      paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
    },
    button: {
      marginLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      backgroundColor: 'blue',
      color: 'white',
      fontWeight: 'bold',
    },
    footer: {
      display: 'block',
      margin: '0 auto',
      paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
    },
    container: {
      margin: '80px 20px 20px 15px',
      paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
    },
    imageTitle: {
      textAlign: 'center',
      color: 'blue',
    },
  };

  return (
  <ThemeProvider theme={ThemeDefault}>
    <div>
     <h1> HOWDY </h1>
    </div>
  </ThemeProvider>
  );
}
}

export default App;