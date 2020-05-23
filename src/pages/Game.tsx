import React from 'react';
import { useObjectVal } from 'react-firebase-hooks/database';
import { Game, Preparation, FinishGame } from '@features';
import { getGameStatus } from '@fb/room';
import { AppWrapper } from '@components';

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
      default:
        return <div>Что-то пошло не так... Перезагрузите страницу.</div>;
    }
  };

  return (
    <AppWrapper>
      {gameStatus ? renderContent() : <div>Загрузка...</div>}
    </AppWrapper>
  );
};
