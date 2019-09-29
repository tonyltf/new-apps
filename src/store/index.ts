import { combineReducers, createStore, applyMiddleware } from 'redux';
import { newsReducer } from '../reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  newsR: newsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(): typeof store {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

  return store;
}
