// src/thunks.ts

import { Action, AnyAction } from 'redux';
import { fetchNews, fetchNewsSuccess, fetchNewsFailed, searchNews } from './actions';
import { AppState } from './store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import './index.css';
import { News } from 'store/news';
import { pageSize, API_KEY, SOURCE_LIST } from 'components/common/constants';

interface NewsJson {
  status: string;
  totalResult: number;
  articles: News[];
}
interface NewsResponse<T = any> extends Response {
  json<P = T>(): Promise<P>;
}

export const fetchPromise = async <T>(_page: number, _search: string): Promise<NewsResponse<T>> => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${_search}&sources=${SOURCE_LIST.join(
      ',',
    )}&pageSize=${pageSize}&page=${_page}&apiKey=${API_KEY}`,
  );
};

export const fetchRes = async <T>(_page: number, _search: string): Promise<NewsResponse<T>> => {
  return await fetch(
    `https://newsapi.org/v2/everything?q=${_search}&sources=${SOURCE_LIST.join(
      ',',
    )}&pageSize=${pageSize}&page=${_page}&apiKey=${API_KEY}`,
  );
};

export const fetchParse = async (_res: NewsResponse): Promise<NewsJson> => {
  return await _res.json();
};

export const thunkFetchNews = (
  page: number,
  search: string,
): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
): Promise<void> => {
  try {
    dispatch(fetchNews(true));
    const res = await fetchRes(page, search);
    const json = await fetchParse(res);
    console.log({ json });
    dispatch(fetchNewsSuccess(json.articles));
  } catch (e) {
    console.error({ e });
    dispatch(fetchNewsFailed(e));
  }
};

export const thunkSearchNews = (text: string): ThunkAction<void, AppState, null, Action<string>> => async (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
): Promise<void> => {
  dispatch(fetchNews(true));
  dispatch(searchNews(text));
};
