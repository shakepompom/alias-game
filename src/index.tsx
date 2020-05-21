import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { useLocation } from 'react-use';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { theme } from '@styles/theme';
import { GlobalStyles } from '@styles/GlobalStyles';
import { LandingPage, GamePage } from '@pages';
import { store } from './store';

const App = (): JSX.Element => {
  const [user, loading, error] = useAuthState(auth);
  const { pathname = '' } = useLocation();
  const isUserIsInRoom = pathname.length > 1 && !!user;
  const roomId = pathname.slice(1);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        {isUserIsInRoom ? (
          <GamePage roomId={roomId} />
        ) : (
          <LandingPage roomId={roomId} />
        )}
      </Provider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
