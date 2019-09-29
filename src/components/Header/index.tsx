import React from 'react';
import MyText from '../common/Text';
import Search from '../Search';
import './Header.scss';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className="news-app-header-wrapper">
      <div className="news-app-header">
        <MyText>{title}</MyText>
        <Search />
      </div>
    </header>
  );
};

export default Header;
