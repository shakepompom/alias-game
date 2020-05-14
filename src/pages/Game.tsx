import React from 'react';
import { useObject } from 'react-firebase-hooks/database';
import { Game, Preparation, FinishGame } from '@features';
import { getGameStatus } from '@fb/room';

type GamePageProps = {
  roomId: string;
};

export const GamePage = ({ roomId }: GamePageProps): JSX.Element => {
  const [gameStatus] = useObject(getGameStatus(roomId));

  const renderContent = (): JSX.Element => {
    switch (gameStatus?.val()) {
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

  return gameStatus ? renderContent() : <div>Загрузка...</div>;
};
