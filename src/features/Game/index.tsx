import React from 'react';
import { TeamsList } from '@components';

type GameProps = {
  roomId: string;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  return (
    <>
      <div>Дашборд</div>
      <TeamsList roomId={roomId} />
      <div>Игра запущена...</div>
    </>
  );
};
