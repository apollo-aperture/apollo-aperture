import React from 'react';

const DisplayText = ({idx, text}) => (
  <p key={idx}>{text}</p>
);

export default DisplayText;
