import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { useLocation } from 'react-use';
import { LandingPage, GamePage } from '@pages';
import { store } from './store';

const App = (): JSX.Element => {
  const { pathname = '' } = useLocation();

  return (
    <Provider store={store}>
      {pathname.length > 1 ? (
        <GamePage roomId={pathname.slice(1)} />
      ) : (
        <LandingPage />
      )}
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
