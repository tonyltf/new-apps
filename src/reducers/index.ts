import { NewsAppState, News } from '../store/news';
import { FETCHING_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILED, NewsActionType, SEARCH_NEWS } from '../actions';

export const initialState: NewsAppState = {
  loading: false,
  news: [],
  allNews: [],
  search: '',
};

const filterNews = (news: News[], search: string): News[] => {
  if (!search) return news;
  return news.filter(item => {
    const { title, description } = item;
    return (
      (title && title.match(new RegExp(search, 'i'))) || (description && description.match(new RegExp(search, 'i')))
    );
  });
};

export function newsReducer(state: NewsAppState = initialState, action: NewsActionType): NewsAppState {
  switch (action.type) {
    case FETCHING_NEWS: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_NEWS_SUCCESS: {
      console.log({ state, action });
      const filteredNews = filterNews(action.news, state.search);
      const newsSet = new Set<News>();
      state.news.forEach(item => newsSet.add(item));
      filteredNews.forEach(item => newsSet.add(item));
      return {
        ...state,
        news: [...Array.from(newsSet)],
        allNews: [...state.allNews, ...action.news],
        loading: false,
      };
    }
    case FETCH_NEWS_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case SEARCH_NEWS: {
      console.log({ state, action });
      return {
        ...state,
        search: action.search,
        news: filterNews(state.allNews, action.search),
      };
    }
    default:
      return state;
  }
}
