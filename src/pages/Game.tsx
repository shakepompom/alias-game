import React from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { Game, Preparation, FinishGame } from '@features';
import { getGameStatus } from '@fb/room';
import { Content, AppWrapper, Button } from '@components';

type GamePageProps = {
  roomId: string;
};

export const GamePage = ({ roomId }: GamePageProps): JSX.Element => {
  const [gameStatus] = useObjectVal(getGameStatus(roomId));

  const renderContent = (): JSX.Element => {
    switch (gameStatus) {
      case 'preparation':
        return <Preparation roomId={roomId} />;
      case 'progress':
        return <Game roomId={roomId} />;
      case 'finish':
        return <FinishGame roomId={roomId} />;
      case null:
        return (
          <Content.BlockWrapper>
            <Content.Text>Такой комнаты не существует.</Content.Text>
            <Button onClick={() => (window.location.href = '/')}>
              На главную
            </Button>
          </Content.BlockWrapper>
        );
      default:
        return <div>Что-то пошло не так... Перезагрузите страницу.</div>;
    }
  };

  return (
    <AppWrapper>
      {gameStatus !== undefined ? renderContent() : <div>Загрузка...</div>}
    </AppWrapper>
  );
};
