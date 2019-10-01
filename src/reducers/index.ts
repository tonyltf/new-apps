import { NewsAppState } from '../store/news';
import { FETCHING_NEWS, FETCHING_NEWS_SUCCESS, FETCHING_NEWS_FAILED, NewsActionType } from '../actions';

export const initialState: NewsAppState = {
  loading: false,
  news: [],
  message: '',
  allNews: [],
};

export function newsReducer(state: NewsAppState = initialState, action: NewsActionType): NewsAppState {
  console.log({ state, action });
  switch (action.type) {
    case FETCHING_NEWS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCHING_NEWS_SUCCESS: {
      return {
        ...state,
        news: [...state.news, ...action.news],
        allNews: [...state.allNews, ...action.news],
        loading: false,
      };
    }
    case FETCHING_NEWS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
}
