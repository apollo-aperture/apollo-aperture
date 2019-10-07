import React from 'react';
import ShipName from './ShipName';
import HomePort from './HomePort';

const style = {
  border: '1px solid black',
};

const Launches = props => {
  const { name, home_port } = props;
  return (
    <div style={style}>
      <ShipName name={name} />
      <HomePort home_port={home_port} />
    </div>
  );
};

export default Launches;
