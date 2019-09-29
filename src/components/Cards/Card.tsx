import React from 'react';
import Avatar from './Avatar';
import './Card.scss';

interface Props {
  source: {
    id: number | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const Card: React.FC<Props> = props => {
  const { source, title, description, url, urlToImage, publishedAt, content } = props;
  const { name } = source;
  return (
    <div className="news-app-card">
      <div className="news-app-card-header">
        <Avatar initial={name.substring(0, 1)} text={name} date={publishedAt} />
      </div>
      <div className="news-app-card-image">
        <img src={urlToImage} />
      </div>
      <div className="news-app-card-title">{title}</div>
      <div className="news-app-card-content">{content}</div>
    </div>
  );
};

export default Card;
