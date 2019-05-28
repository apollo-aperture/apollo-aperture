import { React, Component } from 'react';

const nonReactClass = class {
};

const newConstructor = new nonReactClass();

class Stateful extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const foo = 'bar';
    return (
      <div>

          <h1>Header 1</h1>
          <InnerComponent/>

      </div>
    );
  }
}

const InnerComponent = () => (
  <div>
    <h1>Title</h1>
  </div>
);

export default Stateful;