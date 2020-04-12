import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { useLocation, useLocalStorage } from 'react-use';
import { LandingPage, GamePage } from '@pages';
import { User } from '@common/types';
import { userSelector } from '@common/selectors';
import { store } from './store';

const App = (): JSX.Element => {
  const { pathname = '' } = useLocation();
  const [LSUser, setLSUser]: User = useLocalStorage('aliasUser');
  const user = useSelector(userSelector);
  const isUserIsInRoom = pathname.length > 1 && LSUser?.id;
  const roomId = pathname.slice(1);

  useEffect(() => {
    if (!LSUser?.id) {
      setLSUser(user);
    }
  }, [user]);

  return (
    <Provider store={store}>
      {isUserIsInRoom ? (
        <GamePage roomId={roomId} />
      ) : (
        <LandingPage roomId={roomId} />
      )}
    </Provider>
  );
};

const WrappedApp = (): JSX.Element => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<WrappedApp />, document.getElementById('app'));
