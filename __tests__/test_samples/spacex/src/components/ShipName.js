import React from 'react';

const ShipName = props => {
  const { name } = props;
  return (
    <div>
      <p>Ship Name: {name}</p>
    </div>
  );
};

export default ShipName;
