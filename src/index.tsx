import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { LandingPage } from 'pages';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <LandingPage />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
