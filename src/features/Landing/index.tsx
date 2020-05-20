import React, { useState } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import { Button, Input, GameRules } from '@components';
import { signIn } from '@fb/auth';
import { addUser } from '@fb/user';
import { addRoom } from '@fb/room';

const Title = styled.div`
  margin-bottom: 40px;
  font-size: ${({ theme }) => theme.font.size.big};
`;

const ShowRulesButton = styled(Button)`
  position: absolute;
  top: 21px;
  left: 24px;
`;

type LandingProps = {
  roomId: string;
};

export const Landing = ({ roomId }: LandingProps): JSX.Element => {
  const [userName, setUserName] = useState('');
  const [showRules, setShowRules] = useState(false);

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

  return showRules ? (
    <GameRules returnBackCallback={() => setShowRules(false)} />
  ) : (
    <>
      <Title>Добро пожаловать в онлайн-игру ALIAS!</Title>
      <ShowRulesButton onClick={(): void => setShowRules(true)}>
        Правила игры
      </ShowRulesButton>
      <Input
        label="Введи свое имя:"
        value={userName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setUserName(e.target.value)
        }
      />
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
