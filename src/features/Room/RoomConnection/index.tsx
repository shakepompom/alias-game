import React, { useCallback, useState } from 'react';
import { signIn } from '@fb/auth';
import { addUser } from '@fb/user';
import { Content, Button, Input } from '@components';
import firebase from 'firebase';
import { useParams } from 'react-router';
import { RoomParams } from '@common/model/routes';

export const RoomConnection: React.FC = () => {
  const [userName, setUserName] = useState('');
  const { roomId } = useParams<RoomParams>();

  const handleJoinRoom = useCallback(
    (user: firebase.User) => {
      const userData = {
        id: user.uid,
        name: userName,
        isAdmin: false,
      };

      addUser(roomId, userData);
    },
    [roomId, userName]
  );

  return (
    <>
      <Content.Title>Добро пожаловать в онлайн-игру ALIAS!</Content.Title>
      <Input
        label="Введи свое имя:"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button
        disabled={!userName}
        onClick={() => signIn({ loggedInCallback: handleJoinRoom })}
      >
        Присоединиться
      </Button>
    </>
  );
};
