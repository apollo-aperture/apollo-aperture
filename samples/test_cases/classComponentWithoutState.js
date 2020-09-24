/**
 * React Class Component without any Components inside the return method
 */
import { Component } from 'react';

class ClassComponentWithoutState extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default ClassComponentWithoutState;
