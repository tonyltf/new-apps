import React from 'react';
import { Helmet } from 'react-helmet';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>News App</title>
        <meta name="description" content="A simple news app" />
        <link rel="apple-touch-icon" sizes="72x72" href="apple-touch-icon-1024x1024.png" />
        <meta property="og:title" content="News App" />
        <meta property="og:type" content="article" />
      </Helmet>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
