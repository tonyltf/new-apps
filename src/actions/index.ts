import { News } from '../store/news';

export const FETCH_NEWS = 'FETCH_NEWS';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILED = 'FETCH_NEWS_FAILED';

interface FetchNewsAction {
  type: typeof FETCH_NEWS;
  loading: boolean;
}
interface FetchNewsSuccessAction {
  type: typeof FETCH_NEWS_SUCCESS;
  news: News[];
}
interface FetchNewsFailedAction {
  type: typeof FETCH_NEWS_FAILED;
  message: string;
}

export type NewsActionType = FetchNewsAction | FetchNewsSuccessAction | FetchNewsFailedAction;

export function fetchNews(loading: boolean): FetchNewsAction {
  return {
    type: FETCH_NEWS,
    loading,
  };
}

export function fetchNewsSuccess(news: News[]): FetchNewsSuccessAction {
  return {
    type: FETCH_NEWS_SUCCESS,
    news,
  };
}

export function fetchNewsFailed(message: string): FetchNewsFailedAction {
  return {
    type: FETCH_NEWS_FAILED,
    message,
  };
}
