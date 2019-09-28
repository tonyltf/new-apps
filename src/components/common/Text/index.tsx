import React from 'react';

const MyText: React.FC<{}> = props => {
  return <span className="text">{props.children}</span>;
};

export default MyText;
