import React from 'react';
import './Avatar.scss';
import DateTime from '../common/DateTime';

interface Props {
  initial: string;
  text: string;
  date: string;
}

const Avatar: React.FC<Props> = props => {
  const { initial, text, date } = props;
  return (
    <div className="card-avatar">
      <div className="card-avatar-initial">{initial}</div>
      <span>
        <div className="card-avatar-source">{text}</div>
        <div className="card-avatar-date">
          <DateTime text={date} />
        </div>
      </span>
    </div>
  );
};

export default Avatar;
