import { NewsState } from '../store/news';
import { FETCH_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILED, NewsActionType } from '../actions';

export const initialState: NewsState = {
  loading: false,
  news: [],
  message: '',
};

export function newsReducer(state: NewsState = initialState, action: NewsActionType): NewsState {
  console.log({state, action})
  switch (action.type) {
    case FETCH_NEWS: {
      return {
        ...state,
        loading: true,
        message: '',
      };
    }
    case FETCH_NEWS_SUCCESS: {
      return {
        ...state,
        news: [...state.news, ...action.news],
        loading: false,
        message: '',
      };
    }
    case FETCH_NEWS_FAILED: {
      return {
        ...state,
        loading: false,
        message: action.message,
      };
    }
    default:
      return state;
  }
}
