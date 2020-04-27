import React, { useState } from 'react';
import { switchNextOrder } from '@fb/room';
import { TeamsList, Button } from '@components';
import { useCommonComponentState } from '@hooks';

type GameProps = {
  roomId: string;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const [isActiveUser, setIsActiveUser] = useState(false);
  const { teams, round, activeTeamOrder } = useCommonComponentState(roomId);

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
    </>
  );
};
