import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const Foo = () => (
  <div>
    <Foo />
  </div>
);

const Bar = () => (
  <div>
    <Bar />
  </div>
);

// const foo = () => {
//   return (
//     <div>
//       <Foo />
//     </div>
//   );
// };
// function bar(){
//   return 'bar';
// }
//
// class ClassComponent extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>Class Component</div>
//     );
//   }
// }
//
// ReactDOM.render(
//   <React.StrictMode>
//     <ApolloProvider client={client}>
//       <App />
//     </ApolloProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );