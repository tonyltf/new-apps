import React, { ReactElement } from 'react';
import { FixedSizeList as List, FixedSizeGrid, GridChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Card from './Card';
import ItemRenderer from './ItemRenderer';
import './CardsList.scss';

const sampleData = [
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Jennings Brown',
    title: 'Man Claims He Invented Bitcoin, Is Ordered to Pay Billions in Bitcoin',
    description:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague. Read more...',
    url: 'https://gizmodo.com/man-claims-he-invented-bitcoin-is-ordered-to-pay-billi-1837659816',
    urlToImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--H8pqYMUW--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/ug34lxszlekl8efydtj3.png',
    publishedAt: '2019-08-28T16:50:00Z',
    content:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague.\r\nA U.S. district court ruled on Tuesday tha… [+2903 chars]',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Jennings Brown',
    title: 'Man Claims He Invented Bitcoin, Is Ordered to Pay Billions in Bitcoin',
    description:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague. Read more...',
    url: 'https://gizmodo.com/man-claims-he-invented-bitcoin-is-ordered-to-pay-billi-1837659816',
    urlToImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--H8pqYMUW--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/ug34lxszlekl8efydtj3.png',
    publishedAt: '2019-08-28T16:50:00Z',
    content:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague.\r\nA U.S. district court ruled on Tuesday tha… [+2903 chars]',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Jennings Brown',
    title: 'Man Claims He Invented Bitcoin, Is Ordered to Pay Billions in Bitcoin',
    description:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague. Read more...',
    url: 'https://gizmodo.com/man-claims-he-invented-bitcoin-is-ordered-to-pay-billi-1837659816',
    urlToImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--H8pqYMUW--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/ug34lxszlekl8efydtj3.png',
    publishedAt: '2019-08-28T16:50:00Z',
    content:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague.\r\nA U.S. district court ruled on Tuesday tha… [+2903 chars]',
  },
  {
    source: {
      id: null,
      name: 'Gizmodo.com',
    },
    author: 'Jennings Brown',
    title: 'Man Claims He Invented Bitcoin, Is Ordered to Pay Billions in Bitcoin',
    description:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague. Read more...',
    url: 'https://gizmodo.com/man-claims-he-invented-bitcoin-is-ordered-to-pay-billi-1837659816',
    urlToImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--H8pqYMUW--/c_fill,fl_progressive,g_center,h_900,q_80,w_1600/ug34lxszlekl8efydtj3.png',
    publishedAt: '2019-08-28T16:50:00Z',
    content:
      'A man who has insisted he is the man behind the pseudonymous identity of Satoshi Nakamoto, inventor of bitcoin, has been ordered to pay half of his cryptocurrency bounty to a man believed to be his former colleague.\r\nA U.S. district court ruled on Tuesday tha… [+2903 chars]',
  },
];

class CardsList extends React.PureComponent<{}> {
  constructor(props: any) {
    super(props);
  }
  render(): ReactElement {
    return (
      <div className="card-list-wrapper">
        {sampleData.map((item, index) => (
          <Card key={index} {...item} />
        ))}
        {/* <AutoSizer>
          {({ height, width }): ReactElement => (
            <List
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
