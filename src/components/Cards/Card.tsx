import React from 'react';
import Avatar from './Avatar';
import { News } from '../../store/news';
import './Card.scss';

const Card: React.FC<News> = props => {
  const { source, title, url, urlToImage, publishedAt, content } = props;
  const { name } = source;
  return (
    <div className="news-app-card">
      <a href={url}>
        <div className="news-app-card-header">
          <Avatar initial={name.substring(0, 1)} text={name} date={publishedAt} />
        </div>
        <div className="news-app-card-image">
          <img src={urlToImage} />
        </div>
        <div className="news-app-card-title">{title}</div>
        <div className="news-app-card-content">{content}</div>
      </a>
    </div>
  );
};

export default Card;
