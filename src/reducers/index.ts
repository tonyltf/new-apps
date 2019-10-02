import { NewsAppState, News } from '../store/news';
import { FETCHING_NEWS, FETCH_NEWS_SUCCESS, FETCH_NEWS_FAILED, NewsActionType, SEARCH_NEWS, CLEAR_NEWS } from '../actions';

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
      const newsSet = new Set<News>(state.allNews);
      state.allNews.forEach(item => (!state.allNews.map(item => item.title).includes(item.title) ? newsSet.add(item) : ''));
      action.news.forEach(item => (!state.allNews.map(item => item.title).includes(item.title) ? newsSet.add(item) : ''));
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
      const filteredNews = filterNews(state.allNews, state.search);
      const newsSet = new Set<News>();
      filteredNews.forEach(item => (!state.allNews.map(item => item.title).includes(item.title) ?  newsSet.add(item) : ''));
      return {
        ...state,
        search: action.search,
        news: filterNews(state.allNews, action.search),
      };
    }
    case CLEAR_NEWS: {
      return {
        ...state,
        news: [],
      }
    }
    default:
      return state;
  }
}
