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
        {isActiveUser
          ? 'Если твоя команда готова, жми кнопку ниже'
          : 'Команда, будьте готовы!'}
      </div>
      {isActiveUser && <h2>Я вижу тут кнопку</h2>}
      {/* TODO: Show this button if user is active */}
      <div>
        <Button onClick={handleButtonStartRound}>Начать</Button>
      </div>
    </div>
  );
};
