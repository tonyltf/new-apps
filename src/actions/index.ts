import { News } from '../store/news';

export const FETCHING_NEWS = 'FETCHING_NEWS';
export const FETCHING_NEWS_SUCCESS = 'FETCHING_NEWS_SUCCESS';
export const FETCHING_NEWS_FAILED = 'FETCHING_NEWS_FAILED';
export const SEARCH_NEWS = 'SEARCH_NEWS';

interface FetchNewsAction {
  type: typeof FETCHING_NEWS;
  loading: boolean;
}
interface FetchNewsSuccessAction {
  type: typeof FETCHING_NEWS_SUCCESS;
  news: News[];
}
interface FetchNewsFailedAction {
  type: typeof FETCHING_NEWS_FAILED;
  message: string;
}

interface SearchNewsAction {
  type: typeof SEARCH_NEWS;
  search: string;
}

export type NewsActionType = FetchNewsAction | FetchNewsSuccessAction | FetchNewsFailedAction | SearchNewsAction;

export function fetchNews(loading: boolean): FetchNewsAction {
  return {
    type: FETCHING_NEWS,
    loading,
  };
}

export function fetchNewsSuccess(news: News[]): FetchNewsSuccessAction {
  return {
    type: FETCHING_NEWS_SUCCESS,
    news,
  };
}

export function fetchNewsFailed(message: string): FetchNewsFailedAction {
  return {
    type: FETCHING_NEWS_FAILED,
    message,
  };
}

export function searchNews(search: string): SearchNewsAction {
  return {
    type: SEARCH_NEWS,
    search,
  };
}
