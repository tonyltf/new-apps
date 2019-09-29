import React, { ReactElement } from 'react';
import { FixedSizeList as List, FixedSizeGrid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Card from './Card';
import ItemRenderer from './ItemRenderer';
import './CardsList.scss';
import { News } from '../../store/news';

interface Props {
  data: News[];
}

class CardsList extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }
  render(): ReactElement {
    const { data } = this.props;
    console.log({ data });
    return (
      <div className="card-list-wrapper">
        {data && data.map((item: any, index: number) => <Card key={index} {...item} />)}
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

export default CardsList;
