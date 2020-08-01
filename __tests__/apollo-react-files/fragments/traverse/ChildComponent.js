import React from 'react';

const LocalComponent = () => (
  <div>
    Foo
  </div>
);

const ChildComponent = () => (
  <div>
    <LocalComponent />
  </div>
);

export default ChildComponent;
