import React from 'react';
import {Route} from 'react-router-dom';
import D3 from './D3';
import MutationQueryVisualization from './MutationQueryVisualization';

const Visualization = () => {
  return (
    <>
      <Route exact path="/" component={D3} />
      <Route exact path="/mutation" component={MutationQueryVisualization} />
    </>
  );
};

export default Visualization;
