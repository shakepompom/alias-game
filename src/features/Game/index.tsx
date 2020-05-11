import React, { useState } from 'react';
import { useTimer } from 'use-timer';
import { TeamsList } from '@components';
import { useCommonComponentState } from '@hooks';
import { RoundStart, RoundProgress, RoundResults } from './components';

type GameProps = {
  roomId: string;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const [isActiveUser, setIsActiveUser] = useState(false);
  const { isRoundStarted, settings } = useCommonComponentState(roomId);

  const { time, start, isRunning } = useTimer({
    // TODO: Replace with timer from settings settings?.timer
    initialTime: 60,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  const renderGameContent = (): JSX.Element | null => {
    switch (true) {
      case !isRoundStarted:
        return <RoundStart roomId={roomId} isActiveUser={isActiveUser} />;
      case isRoundStarted:
        return (
          <RoundProgress
            roomId={roomId}
            isActiveUser={isActiveUser}
            start={start}
            time={time}
            isRunning={isRunning}
          />
        );
      case !isRoundStarted:
        return <RoundResults roomId={roomId} isActiveUser={isActiveUser} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h1>Дашборд</h1>
      <TeamsList roomId={roomId} setIsActiveUser={setIsActiveUser} />
      <div>{renderGameContent()}</div>
    </>
  );
};
