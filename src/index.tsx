import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import { fetchNews } from './actions';
import { thunkFetchNews } from './thunks';

const store = configureStore();

const Root = (): ReactElement => (
  <Provider store={store}>
    <App
      news={{
        loading: false,
        news: [],
      }}
      fetchNews={fetchNews}
      thunkFetchNews={thunkFetchNews}
    />
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
