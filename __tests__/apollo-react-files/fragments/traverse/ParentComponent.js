import React from 'react';
import ChildComponent from './ChildComponent';

const OuterComponent = () => (
  <div>
    <ChildComponent />
  </div>
)

const App = () => (
  <div>
    <OuterComponent />
  </div>
)

export default App;
