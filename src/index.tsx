import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { GamePage, LandingPage } from '@pages';
import { store } from './store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      {/*<LandingPage /> Add react router */}
      <GamePage />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
