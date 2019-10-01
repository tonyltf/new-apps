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
import { maxCount, pageSize, xsLayout, lgLayout } from 'components/common/constants';

interface AppProps {
  newsState?: NewsAppState;
  fetchNews?: (page: number, search: string) => Promise<any>;
}

class CardsList extends React.PureComponent<AppProps> {
  state = {
    loading: false,
    news: [],
    search: '',
    data1Col: [],
    news2Col: [],
    news3Col: [],
  };

  remoteRowCount = maxCount;
  _loadMoreRowsStartIndex = 0;
  _loadMoreRowsStopIndex = 0;
  _numOfCol = 1;
  
  constructor(props: AppProps) {
    super(props);
    this.itemRenderer = this.itemRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this.rowRenderer = this.rowRenderer.bind(this);
  }
  
  componentDidMount(): void {
    const { newsState: N } = this.props;
    if (N) {
      // const { news } = N;
      // const data1Col: News[] = news;
      // const news2Col: News[][] = [];
      // const news3Col: News[][] = [];
      // news.forEach((item, index) => {
      //   if (index % 2) {
      //     news2Col.push([news[index - 1], news[index]]);
      //   }
      //   if (index % 3) {
      //     news3Col.push([news[index - 2], news[index - 1], news[index]]);
      //   }
      // });
      // this.setState({
      //   data1Col,
      //   news2Col,
      //   news3Col,
      // });
    }
    // if (fetchNews) fetchNews(1, '');
  }

  componentDidUpdate(prevProps: AppProps): void {
    const { newsState: N1 } = this.props;
    const { newsState: N2 } = prevProps;
    console.log({ N1, N2 });
    if (N1 && N2) {
      if (N1.search !== N2.search) {
        this.loadMoreRows({
          startIndex: this._loadMoreRowsStartIndex,
          stopIndex: this._loadMoreRowsStopIndex,
        });
      }
    }
  }

  itemRenderer(): ReactElement | ReactElement[] {
    const { newsState: N } = this.props;
    if (!N) return <div />;
    const { news } = N;
    return news && news.map((item: any, index: number) => <Card key={index} {...item} />);
  }

  isRowLoaded({ index }: { index: number }): boolean {
    console.log('isRowLoaded');
    const { newsState: N } = this.props;
    if (!N) return false;
    const { news, allNews } = N;
    console.log({ news });
    return !!allNews[index];
  }

  loadMoreRows({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }): Promise<any> {
    console.log('loadMoreRows', { startIndex, stopIndex });
    try {
      this._loadMoreRowsStartIndex = startIndex;
      this._loadMoreRowsStopIndex = stopIndex;
      const { newsState: N, fetchNews } = this.props;
      if (N) {
        const { news, allNews } = N;
        if (allNews && fetchNews && stopIndex) {
          console.log(allNews, stopIndex);
          if (stopIndex > allNews.length) {
            return fetchNews(Math.ceil(stopIndex / pageSize), '');
          }
        }
      }
    } catch (error) {
      console.log({ error });
    }
    return new Promise((resolve): void => {
      resolve();
    });
  }

  // rowRenderer({
  //   key,
  //   index,
  //   style,
  // }: {
  //   key: string;
  //   index: number;
  //   style: React.CSSProperties;
  // }): boolean | ReactElement {
  //   const { newsState: N } = this.props;
  //   if (!N) return <div />;
  //   const { news } = N;
  //   console.log({ news, index });

  //   const news1Col: News[][] = [];
  //   const news2Col: News[][] = [];
  //   const news3Col: News[][] = [];
  //   news.forEach((item, index) => {
  //     if (this._numOfCol === 1) {
  //       news1Col.push([news[index]]);
  //     }
  //     if (this._numOfCol === 2 && index % 2) {
  //       news2Col.push([news[index - 1], news[index]]);
  //     }
  //     if (this._numOfCol === 3 && index % 3) {
  //       news3Col.push([news[index - 2], news[index - 1], news[index]]);
  //     }
  //   });
  //   console.log(this._numOfCol, { news1Col, news2Col, news3Col });

  //   return (
  //     <React.Fragment>
  //       {this._numOfCol === 1 && news1Col.length > 0 && (
  //         <div key={key} style={style} className={`card-list-card-wrapper col${this._numOfCol}`}>
  //           <Card key={index} {...news1Col[index][0]} />
  //         </div>
  //       )}
  //       {this._numOfCol === 2 && index % 2 && news2Col.length > 0 && (
  //         <div key={key} style={style} className={`card-list-card-wrapper col${this._numOfCol}`}>
  //           {news2Col[index] && <Card key={`${index}0`} {...news2Col[index][0]} />}
  //           {news2Col[index] && <Card key={`${index}1`} {...news2Col[index][1]} />}
  //         </div>
  //       )}
  //       {this._numOfCol === 3 && index !== 0 && index % 3 === 0 && news3Col.length > 0 && (
  //         <div key={key} style={style} className={`card-list-card-wrapper col${this._numOfCol}`}>
  //           {news3Col[index] && news3Col[index][0] && <Card key={`${index}0`} {...news3Col[index][0]} />}
  //           {news3Col[index] && news3Col[index][1] && <Card key={`${index}1`} {...news3Col[index][1]} />}
  //           {news3Col[index] && news3Col[index][2] && <Card key={`${index}2`} {...news3Col[index][2]} />}
  //         </div>
  //       )}
  //     </React.Fragment>
  //   );
  // }

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

    return (
      index < news.length && (
        <div key={key} style={style} className="card-list-card-wrapper">
          <Card key={index} {...news[index]} />
        </div>
    ));
  }
  //  {news && news.map((item: any, index: number) => <Card key={index} {...item} />)}

  render(): ReactElement {
    const { newsState: N } = this.props;
    if (!N) return <Spinner />;
    const { news, loading } = N;
    return (
      <div className="card-list-wrapper">
        <InfiniteLoader
          className="infinte-loader-wrapper"
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={this.remoteRowCount}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer className="autoszier-wrapper">
              {({ height, width }) => {
                if (width < xsLayout) {
                  this._numOfCol = 1;
                }
                if (width >= xsLayout && width <= lgLayout) {
                  this._numOfCol = 2;
                }
                if (width >= lgLayout) {
                  this._numOfCol = 3;
                }
                console.log({ width }, this._numOfCol);
                return (
                  <React.Fragment>
                    {loading && (
                      <div className="spinner-container">
                        <Spinner />
                      </div>
                    )}
                    <List 
                      ref={registerChild}
                      height={height}
                      onRowsRendered={onRowsRendered}
                      rowCount={Math.round(this.remoteRowCount / this._numOfCol)}
                      rowHeight={630}
                      rowRenderer={this.rowRenderer}
                      width={width}
                    />
                    {!news.length && <div>No news found</div>}
                  </React.Fragment>
                );
              }}
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
