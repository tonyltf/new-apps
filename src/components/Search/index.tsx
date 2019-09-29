import React from 'react';
import SearchIcon from '@bit/mui-org.material-ui-icons.search';
import './Search.scss';

const Search: React.FC = () => {
  return (
    <span className="news-app-search">
      <SearchIcon />
      <input type="text" placeholder="Search" className="news-app-search-input" />
    </span>
  );
};

export default Search;
