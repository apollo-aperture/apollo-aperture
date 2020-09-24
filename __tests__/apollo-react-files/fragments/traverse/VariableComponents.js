import React from 'react';

const App = () => (
  <div>
    <Foo>
      <Moo>
        <Bar />
        <Woo />
      </Moo>
    </Foo>
  </div>
);

const Moo = () => <div>Moo</div>;

const Foo = () => <div>Foo</div>;

const Bar = () => <div>Bar</div>;

const Woo = () => (
  <div>
    <Boo/>
  </div>
);

const Boo = () => <div>Boo</div>

export default App;