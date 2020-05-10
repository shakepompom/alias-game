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
    onTimeOver: () => {
      console.log('timer is over');
    },
  });

  const renderGameContent = (): JSX.Element => {
    switch (true) {
      case isRoundStarted:
        return (
          <RoundProgress
            roomId={roomId}
            isActiveUser={isActiveUser}
            time={time}
            isRunning={isRunning}
          />
        );
      case !isRoundStarted:
        return <RoundResults roomId={roomId} isActiveUser={isActiveUser} />;
      default:
        return (
          <RoundStart
            roomId={roomId}
            isActiveUser={isActiveUser}
            start={start}
          />
        );
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
