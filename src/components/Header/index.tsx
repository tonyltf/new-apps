import React from 'react';
import MyText from '../common/Text';
import Search from '../Search';
import './Header.scss';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="news-app-header">
      <MyText>{title}</MyText>
      <span className="separate" />
      <Search />
    </header>
  );
};

export default Header;
