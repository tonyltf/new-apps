import React from 'react';
import SpringSpinner from '@bit/bondz.react-epic-spinners.spring-spinner';
import './Spinner.scss';

const Spinner: React.FC<{}> = () => {
  return (
    <div className="mySpinner-wrapper">
      <SpringSpinner color="#000000" className="mySpinner" />
    </div>
  );
};

export default Spinner;
