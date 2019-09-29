import { NewsState } from '../store/news';
import { FETCH_NEWS, NewsActionType } from '../actions';

export const initialState: NewsState = {
  loading: false,
  news: [],
};

export function newsReducer(state = initialState, action: NewsActionType): NewsState {
  switch (action.type) {
    case FETCH_NEWS: {
      return {
        loading: state.loading,
        news: [...state.news, ...action.payload],
      };
    }
    default:
      return state;
  }
}
