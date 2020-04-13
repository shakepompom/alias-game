import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Button, Input } from '@components';
import { addRoom } from '@common/firebase/room';
import { addUser } from '@common/firebase/user';
import { setUserData } from '@common/ducks';

type LandingProps = {
  roomId: string;
};

export const Landing = ({ roomId }: LandingProps): JSX.Element => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [, setLSUserId] = useLocalStorage('aliasUser', '');

  const handleCreateRoom = (): void => {
    const ruuid = uuid();
    const userId = uuid();
    const userData = {
      id: userId,
      name: userName,
      isAdmin: true,
    };

    dispatch(setUserData(userData));
    setLSUserId(userId);
    window.location.replace(`/${ruuid}`);
    addRoom(ruuid, userData);
  };

  const handleJoinRoom = (): void => {
    const userId = uuid();
    const userData = {
      id: userId,
      name: userName,
      isAdmin: false,
    };

    dispatch(setUserData(userData));
    setLSUserId(userId);
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
