import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Header from '../components/Header';
import ThemeDefault from '../theme-default';
import LeftDrawer from '../components/LeftDrawer';
import Data from '../data';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      navDrawerOpen: false,
      loading: true,
    };
  }
  // For App Loading...
  componentDidMount() {
    // this simulates an async action, after  component will render the content
    AsyncCall().then(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(nextProps) {  // Refactor to getDerivedStateFromProps...
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
  const { loading } = this.state;
    if(loading) { 
      return null; // render null when app is not ready
    }
  let { navDrawerOpen } = this.state;
  const paddingLeftDrawerOpen = 236;

  const styles = {
    header: {
      paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
    },
    button: {
      marginLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0,
      backgroundColor: 'blue',
      color: 'black',
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
    <Header styles={styles.header} 
            handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>
    <LeftDrawer navDrawerOpen={navDrawerOpen} menus={Data.menus} username="Apollo Admin"/>
      <div style={styles.container}>
      {this.props.children}
      </div>
    </div>
  </ThemeProvider>
  );
 }
}

// Async call for app loading... 
function AsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 1500));
}

export default App;