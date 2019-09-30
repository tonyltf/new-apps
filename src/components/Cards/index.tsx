import React, { ReactElement } from 'react';
// import { FixedSizeList as List, FixedSizeGrid, GridChildComponentProps } from 'react-window';
// import AutoSizer from 'react-virtualized-auto-sizer';
import Card from './Card';
// import ItemRenderer from './ItemRenderer';
import './CardsList.scss';
import { News, NewsState } from '../../store/news';
import { connect } from 'react-redux';
// import { fetchNews as fetchNewsA。ction } from '../../actions';
import { thunkFetchNews } from '../../thunks';
import Spinner from '../common/Spinner';

// interface Props {
//   data: News[];
// }

interface AppProps {
  news?: NewsState;
  fetchNews?: (page: number, search: string) => () => void;
}

class CardsList extends React.PureComponent<AppProps> {
  state = {
    loading: false,
    news: [],
    message: '',
  };

  constructor(props: AppProps) {
    super(props);
  }

  componentDidMount(): void {
    const { fetchNews } = this.props;
    console.log({fetchNews})
    if (fetchNews) fetchNews(1, '');
  }

  render(): ReactElement {
    const { news: N } = this.props;
    if (!N) return <Spinner /> ;
    const { news, loading } = N;
    console.log({ news });
    return (
      <div className="card-list-wrapper">
        {news && news.map((item: any, index: number) => <Card key={index} {...item} />)}
        { loading && <Spinner /> } 
        {/* <AutoSizer>
          {({ height, width }): ReactElement => (
            <List`
              className="card-list"
              itemData={sampleData}
              itemCount={sampleData.length}
              height={height}
              itemSize={500}
              width={width}
            >
              {ItemRenderer}
            </List>
          )}
        </AutoSizer> */}
      </div>
    );
  }
}

const mapStateToProps = (state: NewsState): any => {
  console.log({ state });
  return {
    news: state.news,
    loading: state.loading,
    message: state.message,
  };
};

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
  return {
    fetchNews: (page: number, search: string) => dispatch(thunkFetchNews(page, search)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardsList);

