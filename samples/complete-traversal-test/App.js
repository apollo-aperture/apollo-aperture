import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImportedComponent from './components/ImportedComponent';
import OuterComponent from './components/OuterComponent';
import DisplayText from './components/DisplayText';

// const arrToDisplay = [
//   {
//     idx: 0,
//     text: 'Foo',
//   },
//   {
//     idx: 1,
//     text: 'Bar',
//   },
//   {
//     idx: 2,
//     text: 'Woo',
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <div>
          <OuterComponent>
            <ImportedComponent />
          </OuterComponent>
        </div>
      </div>
    );
  }
}

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return(
//       <div>
//         <ImportedComponent />
//         <p>Here is a text node that should be ignored</p>
//         {arrToDisplay.map(el => (
//           <DisplayText idx={el.idx} text={el.text} />
//         ))}
//       </div>
//     );
//   }
// }

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
