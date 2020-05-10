import React, { useState } from 'react';
import { useTimer } from 'use-timer';
import { switchNextOrder } from '@fb/room';
import { TeamsList, Button } from '@components';
import { useCommonComponentState } from '@hooks';

type GameProps = {
  roomId: string;
};

const transformTimerToFriendlyDisplaying = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const [isActiveUser, setIsActiveUser] = useState(false);
  const { teams, round, activeTeamOrder, settings } = useCommonComponentState(
    roomId,
  );

  const { time, start, isRunning } = useTimer({
    // TODO: Replace with timer from settings settings?.timer
    initialTime: 60,
    endTime: 0,
    timerType: 'DECREMENTAL',
    onTimeOver: () => {
      console.log('timer is over');
    },
  });

  const handleClickSwitchOrder = (): void => {
    const nextRound = teams.length - 1 === activeTeamOrder ? round + 1 : round;
    const nextActiveTeam =
      teams.length - 1 === activeTeamOrder ? 0 : activeTeamOrder + 1;
    const nextState = {
      round: nextRound,
      activeTeam: nextActiveTeam,
    };

    switchNextOrder(roomId, nextState);
  };

  return (
    <>
      <h1>Дашборд</h1>
      <TeamsList roomId={roomId} setIsActiveUser={setIsActiveUser} />
      {/* TODO: Show this button if user is active */}
      {isActiveUser && <h2>Я вижу тут кнопку</h2>}
      <div>
        <Button onClick={handleClickSwitchOrder}>
          Передать ход следующей команде
        </Button>
      </div>
      <div>
        <Button onClick={() => start()}>Запустить таймер</Button>
      </div>
      {isRunning && <div>{transformTimerToFriendlyDisplaying(time)}</div>}
    </>
  );
};
