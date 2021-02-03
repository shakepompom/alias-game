import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { signIn } from '@fb/auth';
import { addRoom } from '@fb/room';
import { Content, Button, Input } from '@components';
import { useHistory } from 'react-router';
import { ROUTES } from '@common/constants/routes';
import firebase from 'firebase';
import { User } from '@common/model/user';

export const Main = (): JSX.Element => {
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const handleCreateRoom = (user: firebase.User): void => {
    const roomId = uuid();
    const gameId = uuid();
    const userData: User = {
      id: user.uid,
      name: userName,
      isAdmin: true,
    };

    history.push(`${ROUTES.ROOMS}/${roomId}`);
    addRoom(roomId, userData, gameId);
  };

  return (
    <>
      <Content.Title>Добро пожаловать в онлайн-игру ALIAS!</Content.Title>
      <Content.BlockWrapper>
        <Content.Ul>
          <Content.Li>Создавай комнату для игры</Content.Li>
          <Content.Li>Делись созданной ссылкой с друзьями</Content.Li>
          <Content.Li>
            Для видеосвязи можешь использовать любой удобный тебе способ (Google
            Meet, Zoom, Skype...)
          </Content.Li>
          <Content.Li>
            Проведи время с друзьями на расстоянии весело!
          </Content.Li>
        </Content.Ul>
      </Content.BlockWrapper>
      <Input
        label="Введи свое имя:"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Button
        disabled={!userName}
        onClick={() => signIn({ loggedInCallback: handleCreateRoom })}
      >
        Начать игру
      </Button>
    </>
  );
};
