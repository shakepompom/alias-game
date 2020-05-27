import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { signIn } from '@fb/auth';
import { addUser } from '@fb/user';
import { addRoom } from '@fb/room';
import { Content, Button, Input, GameRules, Header } from '@components';
// import { useEffectOnce } from 'react-use';
// import { addWords } from '@fb/words';

type LandingProps = {
  roomId: string;
};

export const Landing = ({ roomId }: LandingProps): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [showRules, setShowRules] = useState(false);

  // Uncomment to add new words to db
  // useEffectOnce(() => {
  //   addWords();
  // });

  const handleCreateRoom = (user: firebase.User): void => {
    const ruuid = uuid();
    const userData = {
      id: user?.uid,
      name: userName,
      isAdmin: true,
    };
    const guuid = uuid();

    window.location.replace(`/${ruuid}`);
    addRoom(ruuid, userData, guuid);
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
      <Header roomId={roomId}>
        {!showRules && (
          <Button onClick={() => setShowRules(true)}>Правила игры</Button>
        )}
      </Header>
      {showRules ? (
        <GameRules returnBackCallback={() => setShowRules(false)} />
      ) : (
        <>
          <Content.Title>Добро пожаловать в онлайн-игру ALIAS!</Content.Title>
          <Content.BlockWrapper>
            <Content.Ul>
              {!roomId && (
                <>
                  <Content.Li>Создавай комнату для игры</Content.Li>
                  <Content.Li>Делись созданной ссылкой с друзьями</Content.Li>
                  <Content.Li>
                    Для видеосвязи можешь использовать любой удобный тебе способ
                    (Google Meet, Zoom, Skype...)
                  </Content.Li>
                  <Content.Li>
                    Проведи время с друзьями на расстоянии весело!
                  </Content.Li>
                </>
              )}
            </Content.Ul>
          </Content.BlockWrapper>
          <Input
            label="Введи свое имя:"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {roomId ? (
            <Button
              disabled={!userName}
              onClick={() => signIn({ loggedInCallback: handleJoinRoom })}
            >
              Присоединиться
            </Button>
          ) : (
            <Button
              disabled={!userName}
              onClick={() => signIn({ loggedInCallback: handleCreateRoom })}
            >
              Начать игру
            </Button>
          )}
        </>
      )}
    </>
  );
};
