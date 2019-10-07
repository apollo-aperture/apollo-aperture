import {React} from 'react';

const Stateless = () => (
  <div>
    <InnerStateless/>
  </div>
);

const InnerStateless = () => (
  <div>
    <h1>Inner Stateless Component</h1>
    <Query getUser={GET_STATELESSUSER}/>
  </div>
);

export default Stateless;