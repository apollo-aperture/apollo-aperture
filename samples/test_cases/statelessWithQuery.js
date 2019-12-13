import {React} from 'react';
import GET_STATELESSUSER from '../queries'; // file does not actually exist

const StatelessWithQuery = () => (
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

export default StatelessWithQuery;