import React from 'react';
import ImportedComponent from './ImportedComponent';
import OuterComponent
  from '../../../samples/complete-traversal-test/components/OuterComponent';

const AnotherComponent = ({ children }) => (
  <div>
    <h1>Foo</h1>
  </div>
);

const ParentComponent = ({ children }) => (
  <div>
    <AnotherComponent />
  </div>
);

const App = () => (
  <div>
    <div>
      <OuterComponent>
        <ParentComponent />
      </OuterComponent>
    </div>
  </div>
);

export default App;