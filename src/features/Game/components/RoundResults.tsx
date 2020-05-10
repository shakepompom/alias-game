import React from 'react';
import { switchNextOrder } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Button } from '@components';

type RoundResultsProps = {
  roomId: string;
  isActiveUser: boolean;
};

export const RoundResults = ({
  roomId,
  isActiveUser,
}: RoundResultsProps): JSX.Element => {
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
    <div>
      <h2>RoundResults</h2>
      {isActiveUser && <h3 style={{ color: 'green' }}>Я вижу тут кнопку</h3>}
      {/* TODO: Show this button if user is active */}
      <div>
        <Button onClick={handleClickSwitchOrder}>
          Передать ход следующей команде
        </Button>
      </div>
    </div>
  );
};
