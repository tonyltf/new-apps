/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized';
import Card from './Card';
import { NewsAppState } from '../../store/news';
import { connect } from 'react-redux';
import { thunkFetchNews } from '../../thunks';
import Spinner from '../common/Spinner';
import { ThunkDispatch } from 'redux-thunk';
import 'react-virtualized/styles.css';
import './CardsList.scss';
import { maxCount, pageSize } from 'components/common/constants';

interface AppProps {
  newsState?: NewsAppState;
  fetchNews?: (page: number, search: string) => Promise<any>;
}

class CardsList extends React.PureComponent<AppProps> {
  state = {
    loading: false,
    news: [],
    message: '',
  };

  remoteRowCount = maxCount;

  constructor(props: AppProps) {
    super(props);
    this.itemRenderer = this.itemRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  componentDidMount(): void {
    const { fetchNews } = this.props;
    console.log({ fetchNews });
    if (fetchNews) fetchNews(1, '');
  }

  itemRenderer(): ReactElement | ReactElement[] {
    const { newsState: N } = this.props;
    if (!N) return <div />;
    const { news } = N;
    return news && news.map((item: any, index: number) => <Card key={index} {...item} />);
  }

  isRowLoaded({ index }: { index: number }): boolean {
    const { newsState: N } = this.props;
    if (!N) return false;
    const { news } = N;
    console.log({ news });
    return !!news[index];
  }

  loadMoreRows({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }): Promise<any> {
    try {
      const { fetchNews } = this.props;
      console.log({ startIndex, stopIndex });
      if (fetchNews && stopIndex) {
        return fetchNews(Math.ceil(stopIndex / pageSize), '');
      }
    } catch (error) {
      console.log({ error });
    }
    return new Promise((resolve): void => {
      resolve();
    });
  }

  rowRenderer({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: React.CSSProperties;
  }): boolean | ReactElement {
    const { newsState: N } = this.props;
    if (!N) return <div />;
    const { news } = N;
    console.log({ news, index });
    return (
      index < news.length && (
        <div key={key} style={style} className="cards-list-card-wrapper">
          <Card key={index} {...news[index]} />
        </div>
      )
    );
  }
  //  {news && news.map((item: any, index: number) => <Card key={index} {...item} />)}

  render(): ReactElement {
    const { newsState: N } = this.props;
    if (!N) return <Spinner />;
    const { news, loading } = N;
    return (
      <div className="card-list-wrapper" style={{ flex: '1 1 auto', minHeight: '500px' }}>
        <InfiniteLoader
          className="infinte-loader-wrapper"
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={this.remoteRowCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer className="autoszier-wrapper">
              {({ height, width }) => (
                <React.Fragment>
                  {loading && <Spinner />}
                  <List
                    ref={registerChild}
                    height={height}
                    onRowsRendered={onRowsRendered}
                    rowCount={this.remoteRowCount}
                    rowHeight={630}
                    rowRenderer={this.rowRenderer}
                    width={width}
                  />
                </React.Fragment>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}

const mapStateToProps = (state: NewsAppState): any => {
  console.log({ state });
  return {
    newsState: state.news,
    loading: state.loading,
    message: state.message,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): any => {
  return {
    fetchNews: async (page: number, search: string): Promise<any> => await dispatch(thunkFetchNews(page, search)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsList);
