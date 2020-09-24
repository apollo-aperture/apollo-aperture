import {React} from 'react';

const BlockStatement = () => {
  return (
    <div>
      Simple Stateless
    </div>
  );
};

const FunctionBodyWithJSXElement = () => (
  <div>
    <InnerStateless/>
  </div>
);

const ShorthandJSXElement = () => <div>Foo</div>;

const InnerStateless = () => (
  <div>
    <h1>Inner Stateless Component</h1>
  </div>
);

export default Stateless;