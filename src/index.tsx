import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useLocation, useLocalStorage, useEffectOnce } from 'react-use';
import { LandingPage, GamePage } from '@pages';
import { getUser } from '@common/firebase/user';
import { User } from '@common/types';
import { userSelector } from '@common/selectors';
import { setUserData } from '@common/ducks';
import { store } from './store';

const App = (): JSX.Element => {
  const dispatch = useDispatch();
  const { pathname = '' } = useLocation();
  const [LSUserId, setLSUserId]: User = useLocalStorage('aliasUser');
  const user = useSelector(userSelector);
  const isUserIsInRoom = pathname.length > 1 && LSUserId;
  const roomId = pathname.slice(1);

  useEffect(() => {
    if (!LSUserId) {
      setLSUserId(user.id);
    }
  }, [user]);

  useEffectOnce(() => {
    getUser(roomId, LSUserId, (val): void => dispatch(setUserData(val)));
  });

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
