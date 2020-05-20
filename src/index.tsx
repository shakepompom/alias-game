import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { useLocation } from 'react-use';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { signOut } from '@fb/auth';
import { theme } from '@styles/theme';
import { GlobalStyles } from '@styles/GlobalStyles';
import { LandingPage, GamePage } from '@pages';
import { Button } from '@components';
import { store } from './store';

const LogoutButton = styled(Button)`
  position: absolute;
  top: 24px;
  right: 24px;
`;

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
        {user?.uid && (
          <LogoutButton kind="secondary" onClick={(): void => signOut()}>
            Выйти
          </LogoutButton>
        )}
      </Provider>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
