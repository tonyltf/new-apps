import { News } from '../store/news';

export const FETCH_NEWS = 'FETCH_NEWS';

interface FetchNewsAction {
  type: typeof FETCH_NEWS;
  payload: News[];
}

export type NewsActionType = FetchNewsAction;

export function fetchNews(news: News[]): FetchNewsAction {
  return {
    type: FETCH_NEWS,
    payload: news,
  };
}
