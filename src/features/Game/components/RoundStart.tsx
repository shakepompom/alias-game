import React from 'react';
import { setRoundStatus } from '@fb/room';
import { Button } from '@components';

type RoundStartProps = {
  roomId: string;
  isActiveUser: boolean;
  start: Function;
};

export const RoundStart = ({
  roomId,
  isActiveUser,
  start,
}: RoundStartProps): JSX.Element => {
  const handleButtonStartRound = (): void => {
    setRoundStatus(roomId, true);
    start();
  };

  return (
    <div>
      <h2>RoundStart</h2>
      <div>
        <Button onClick={handleButtonStartRound}>Запустить таймер</Button>
      </div>
    </div>
  );
};
