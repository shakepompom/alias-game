import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Button, Input } from '@components';
import { addRoom, addUser } from '@common/firebase/roomFirebase';
import { setUserData } from '@common/ducks';

type LandingProps = {
  roomId: string;
};

export const Landing = ({ roomId }: LandingProps): JSX.Element => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [, setLSUser] = useLocalStorage('aliasUser', {});

  const handleCreateRoom = (): void => {
    const ruuid = uuid();
    const userData = {
      id: uuid(),
      name: userName,
      isAdmin: true,
    };

    dispatch(setUserData(userData));
    setLSUser(userData);
    window.location.replace(`/${ruuid}`);
    addRoom(ruuid, userData);
  };

  const handleJoinRoom = (): void => {
    const userData = {
      id: uuid(),
      name: userName,
      isAdmin: false,
    };

    dispatch(setUserData(userData));
    setLSUser(userData);
    addUser(roomId, userData);
  };

  return (
    <>
      <div>Welcome to alias game!</div>
      <div>
        Enter your name:
        <Input
          value={userName}
          onChange={(val: string): void => setUserName(val)}
        />
      </div>
      {roomId ? (
        <Button onClick={handleJoinRoom}>Join game</Button>
      ) : (
        <Button onClick={handleCreateRoom}>Start game</Button>
      )}
    </>
  );
};
