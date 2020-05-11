import React from 'react';
import { useObject } from 'react-firebase-hooks/database';
import { switchNextOrder, setRoundStatus, getRoundResult } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Button } from '@components';
import { WordStatus } from '@common/types';

type RoundResultsProps = {
  roomId: string;
  isActiveUser: boolean;
};

export const RoundResults = ({
  roomId,
  isActiveUser,
}: RoundResultsProps): JSX.Element => {
  const { gameId, teams, round, activeTeamOrder } = useCommonComponentState(
    roomId,
  );
  const userIndex =
    round && round % Object.values(teams[activeTeamOrder].users).length;
  const [result] = useObject(
    getRoundResult(roomId, gameId, activeTeamOrder, userIndex, round),
  );

  const handleClickSwitchOrder = (): void => {
    const nextRound = teams.length - 1 === activeTeamOrder ? round + 1 : round;
    const nextActiveTeam =
      teams.length - 1 === activeTeamOrder ? 0 : activeTeamOrder + 1;
    const nextState = {
      round: nextRound,
      activeTeam: nextActiveTeam,
    };

    switchNextOrder(roomId, nextState);
    setRoundStatus(roomId, 'start');
  };

  return (
    <div>
      <h2>RoundResults</h2>
      <div>
        {result?.val() &&
          result.val().map(
            ({ word, status }: WordStatus): JSX.Element => (
              <div
                key={word}
                style={{ color: status ? 'deepskyblue' : 'gray' }}
              >
                {word} - {status ? 'Угадано' : 'Пропущено'}
              </div>
            ),
          )}
      </div>
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
