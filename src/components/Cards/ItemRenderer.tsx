import React, { ReactElement } from 'react';
import Card from './Card';

interface Props {
  data: [];
  index: number;
  style: object;
}
// Declare your item renderer outside of the render method:
export default class ItemRenderer extends React.PureComponent<Props> {
  render(): ReactElement {
    const { data, index, style } = this.props;
    const item = data[index];
    return (
      <div style={style}>
        <Card {...item} />
      </div>
    );
  }
}
