import React from 'react';
import { useLocation } from 'react-use';
import { useObjectVal } from 'react-firebase-hooks/database';
import { Game, Preparation, FinishGame } from '@features';
import { getGameStatus } from '@fb/room';
import { AppWrapper, EmptyRoom } from '@components';

const GamePage = (): JSX.Element => {
  const { pathname = '' } = useLocation();
  const roomId = pathname.slice(1);
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
        return <EmptyRoom />;
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

export default GamePage;
