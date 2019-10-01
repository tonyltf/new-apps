import { NewsAppState, News } from '../store/news';
import { FETCHING_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILED, NewsActionType, SEARCH_NEWS } from '../actions';
import { timeout } from 'q';

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
      const allUrl = state.allNews.map(item => item.url);
      const newsSet = new Set<News>();
      state.news.forEach(item => (!state.allNews.map(item => item.url).includes(item.url) ? newsSet.add(item) : ''));
      action.news.forEach(item => (!state.allNews.map(item => item.url).includes(item.url) ? newsSet.add(item) : ''));
      console.log({ newsSet });
      return {
        ...state,
        news: [...filterNews(Array.from(newsSet), state.search)],
        allNews: [...Array.from(newsSet)],
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
      const filteredNews = filterNews(state.allNews, state.search);
      const newsSet = new Set<News>();
      filteredNews.forEach(item => newsSet.add(item));
      console.log({ newsSet });
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
