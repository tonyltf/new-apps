import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>News App</title>
        <meta name="description" content="A simple news app" />
        <meta name="viewport" content="width=device-width" />
        <link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-1024x1024.png" />
        <meta property="og:title" content="News App" />
        <meta property="og:type" content="article" />
      </Helmet>
      <Header title="US News" />
      <div className="App-Container"></div>
    </div>
  );
};

export default App;
