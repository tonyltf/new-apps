import React from 'react';
import MyText from '../common/Text';
import './Header.scss';
import Search from '../Search';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="news-app-header">
      <MyText>{title}</MyText>
      <Search />
    </header>
  );
};

export default Header;
