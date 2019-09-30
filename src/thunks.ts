// src/thunks.ts

import { Action } from 'redux';
import { fetchNews, fetchNewsSuccess, fetchNewsFailed } from './actions';
import { AppState } from './store';
import { ThunkAction } from 'redux-thunk';
import './index.css';

const API_KEY = process.env.REACT_APP_API_KEY || 'c5c6371f560c41d69b65b6e6ad184c19';
const SOURCE_LIST = ['the-washington-post', 'the-new-york-times'];
const pageSize = 10;

export const thunkFetchNews = (
  page: number,
  search: string,
): ThunkAction<void, AppState, null, Action<string>> => async dispatch => {
  try {
    
    dispatch(
      fetchNews(true)
    );
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&sources=${SOURCE_LIST.join(
        ',',
      )}&pageSize=${pageSize}&page=${page}&apiKey=${API_KEY}`,
    );
    const json = await res.json();
    console.log({json})
    dispatch(
      fetchNewsSuccess(json.articles)
    );
  } catch (e) {
    console.error({ e });
    fetchNewsFailed(e)
  }
};
