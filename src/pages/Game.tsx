import React from 'react';
import { useObject } from 'react-firebase-hooks/database';
import { Game, Preparation } from '@features';
import { getIsGameStarted } from '@fb/room';

type GamePageProps = {
  roomId: string;
};

export const GamePage = ({ roomId }: GamePageProps): JSX.Element => {
  const [isGameStarted] = useObject(getIsGameStarted(roomId));

  return isGameStarted ? (
    isGameStarted.val() ? (
      <Game roomId={roomId} />
    ) : (
      <Preparation roomId={roomId} />
    )
  ) : (
    <div>Загрузка...</div>
  );
};
