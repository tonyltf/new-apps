import React from 'react';
import Search from '@bit/mui-org.material-ui-icons.search';
import './Search.scss';

const Searchbox: React.FC = () => {
  return (
    <span className="news-app-search">
      <Search />
      <input type="text" placeholder="Search" className="news-app-search-input" />
    </span>
  );
};

export default Searchbox;
