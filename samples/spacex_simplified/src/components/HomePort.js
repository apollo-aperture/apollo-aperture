import React from 'react';

const HomePort = props => {
  const { home_port } = props;
  return (
    <div>
      <p>Home Port: {home_port}</p>
    </div>
  );
};

export default HomePort;
