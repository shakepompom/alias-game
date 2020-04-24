import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input } from '@components';
import { signIn } from '@fb/auth';
import { addUser } from '@fb/user';
import { addRoom } from '@fb/room';

type LandingProps = {
  roomId: string;
};

export const Landing = ({ roomId }: LandingProps): JSX.Element => {
  const [userName, setUserName] = useState('');

  const handleCreateRoom = (user: firebase.User): void => {
    const ruuid = uuid();
    const userData = {
      id: user?.uid,
      name: userName,
      isAdmin: true,
    };

    window.location.replace(`/${ruuid}`);
    addRoom(ruuid, userData);
  };

  const handleJoinRoom = (user: firebase.User): void => {
    const userData = {
      id: user?.uid,
      name: userName,
      isAdmin: false,
    };

    addUser(roomId, userData);
  };

  return (
    <>
      <div>Добро пожаловать в онлайн-игру ALIAS!</div>
      <div>
        Введи свое имя:
        <Input
          value={userName}
          onChange={(val: string): void => setUserName(val)}
        />
      </div>
      {roomId ? (
        <Button
          disabled={!userName}
          onClick={(): void => signIn({ loggedInCallback: handleJoinRoom })}
        >
          Присоединиться
        </Button>
      ) : (
        <Button
          disabled={!userName}
          onClick={(): void => signIn({ loggedInCallback: handleCreateRoom })}
        >
          Начать игру
        </Button>
      )}
    </>
  );
};
