import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImportedComponent from './Components/Component';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <ImportedComponent />
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <ImportedComponent />
//     </div>
//   );
// }

// const App = () => {
//   return (
//     <div>
//       <ImportedComponent />
//     </div>
//   );
// }

export default App;
