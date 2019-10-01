/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import SearchIcon from '@bit/mui-org.material-ui-icons.search';
import './Search.scss';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { searchNews } from 'actions';
import debounce from 'lodash/debounce';

interface Props {
  searchNews?: (search: string) => Promise<any>;
}

const Search: React.FC<Props> = (props): ReactElement => {
  const { searchNews } = props;
  const _keyPress = (e: any): void => {
    const { value } = e.target;
    if (searchNews && value !== undefined) {
      // debounce(() => {
        searchNews(value);
      // }, 500)();
    }
  };
  return (
    <span className="news-app-search">
      <SearchIcon />
      <input type="text" placeholder="Search" className="news-app-search-input" onChange={_keyPress} />
    </span>
  );
};

const mapStateToProps = (): any => {
  return {};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): any => {
  return {
    searchNews: async (search: string): Promise<any> => await dispatch(searchNews(search)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
