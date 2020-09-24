import React from 'react';

const AnotherComponent = () => (
  <div>
    Foo
  </div>
);

const ImportedComponent = () => (
  <div>
    <AnotherComponent />
  </div>
);

export default ImportedComponent;
