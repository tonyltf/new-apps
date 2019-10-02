/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, forwardRef } from 'react';
import { InfiniteLoader, AutoSizer, List, Grid } from 'react-virtualized';
import { FixedSizeGrid, GridOnItemsRenderedProps } from 'react-window';
import Card from './Card';
import { NewsAppState } from '../../store/news';
import { connect } from 'react-redux';
import { thunkFetchNews, thunkClearNews } from '../../thunks';
import Spinner from '../common/Spinner';
import { ThunkDispatch } from 'redux-thunk';
import 'react-virtualized/styles.css';
import './CardsList.scss';
import { maxCount, pageSize, xsLayout, lgLayout, cardHeight, cardWidth, cardPaddingX, cardPaddingY, xlLayout } from 'components/common/constants';
import { clearNews } from 'actions';

interface AppProps {
  newsState?: NewsAppState;
  fetchNews?: (page: number, search: string) => Promise<any>;
  clearNews?: () => void;
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
  _onRowsRendered = ({ startIndex, stopIndex }: { startIndex: number; stopIndex: number; }) => {};

  constructor(props: AppProps) {
    super(props);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
    this._onSectionRendered = this._onSectionRendered.bind(this);
    this._cellRenderer = this._cellRenderer.bind(this);
  }

  componentDidMount(): void {
    const {  fetchNews } = this.props;
    if (fetchNews) fetchNews(1, '');
  }

  componentDidUpdate(prevProps: AppProps): void {
    const { newsState: N1, clearNews } = this.props;
    const { newsState: N2 } = prevProps;
    if (N1 && N2 && clearNews) {
      if (N1.search !== N2.search) {
          this.loadMoreRows({
            startIndex: this._loadMoreRowsStartIndex,
            stopIndex: this._loadMoreRowsStopIndex,
          });
      }
    }
  }

  isRowLoaded({ index }: { index: number }): boolean {
    const { newsState: N } = this.props;
    if (!N) return false;
    const { news, allNews } = N;
    return !!allNews[index];
  }

  loadMoreRows({ startIndex, stopIndex }: { startIndex: number; stopIndex: number }): Promise<any> {
    try {
      this._loadMoreRowsStartIndex = startIndex;
      this._loadMoreRowsStopIndex = stopIndex;
      const { newsState: N, fetchNews } = this.props;
      if (N) {
        const { allNews } = N;
        if (allNews && fetchNews && stopIndex) {
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

  _cellRenderer ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: any }) {
    const { newsState: N } = this.props;
    if (!N) return <div />;
    const { news } = N;
    const newIndex = (this._numOfCol * rowIndex + columnIndex);
    return (
      newIndex < news.length ? (
        <div key={newIndex} style={{ ...style, 
          left: style.left + cardPaddingX * (columnIndex * 2 + 1) ,
          top: style.top + cardPaddingY * (rowIndex * 2 + 1),
          width: style.width - cardPaddingX ,
          height: style.height - cardPaddingY * 2,
          }} className="card-list-card-wrapper">
          <Card key={newIndex} {...news[newIndex]} />
        </div>
      ) : (
        <div key={newIndex} style={style} className="card-list-card-wrapper">
        </div>
      )
    );
  }
  
  _onSectionRendered (props: GridOnItemsRenderedProps): any {
    const { visibleColumnStartIndex, visibleColumnStopIndex, visibleRowStartIndex, visibleRowStopIndex } = props
    const startIndex = visibleRowStartIndex * this._numOfCol + visibleColumnStartIndex
    const stopIndex = visibleRowStopIndex * this._numOfCol + visibleColumnStopIndex
  
    this._onRowsRendered({ startIndex, stopIndex })
  }

  render(): ReactElement {
    const { newsState: N } = this.props;
    if (!N) return <Spinner />;
    const { news, loading, search } = N;
    return (
      <div className="card-list-wrapper">
        <InfiniteLoader
          className="infinte-loader-wrapper"
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={this.remoteRowCount}
        >
          {({ onRowsRendered, registerChild }) => {
            this._onRowsRendered = onRowsRendered;
            return (
            <AutoSizer className="autoszier-wrapper">
              {({ height, width }) => {
                this._numOfCol = 1;
                if (width < xsLayout) {
                  this._numOfCol = 1;
                }
                if (width >= xsLayout && width <= lgLayout) {
                  this._numOfCol = 2;
                }
                if (width > lgLayout) {
                  this._numOfCol = 3;
                }
                const innerElementType = forwardRef(({ style, ...rest }: { style: any }, ref: any) => (
                  <div
                    ref={ref}
                    style={{
                      ...style,
                      paddingLeft: cardPaddingX,
                      paddingTop: cardPaddingY,
                      maxWidth: xlLayout,
                      margin: width > xlLayout ? '0 auto' : '0',
                      position: 'relative',
                    }}
                    {...rest}
                  />
                ));
                return (
                  <React.Fragment>
                    {loading && (
                      <div className="spinner-container">
                        <Spinner />
                      </div>
                    )}
                    {!loading && !news.length && search.length > 0 && <div>No news found</div>}
                    <FixedSizeGrid
                      ref={registerChild}
                      columnCount={this._numOfCol}
                      columnWidth={ width > xlLayout ? (xlLayout / this._numOfCol - cardPaddingX * 2) : width / this._numOfCol - cardPaddingX * 2 }
                      height={height}
                      rowCount={this.remoteRowCount}
                      rowHeight={cardHeight}
                      width={width}
                      innerElementType={innerElementType}
                      onItemsRendered={this._onSectionRendered}
                    >
                     {this._cellRenderer}
                    </FixedSizeGrid>
                  </React.Fragment>
                );
              }}
            </AutoSizer>
          )}}
        </InfiniteLoader>
      </div>
    );
  }
}

const mapStateToProps = (state: NewsAppState): any => {
  return {
    newsState: state.news,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): any => {
  return {
    fetchNews: async (page: number, search: string): Promise<any> => await dispatch(thunkFetchNews(page, search)),
    clearNews: () => dispatch(clearNews()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsList);
