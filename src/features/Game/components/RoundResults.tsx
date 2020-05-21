import React from 'react';
import styled from 'styled-components';
import { useObject } from 'react-firebase-hooks/database';
import { switchNextOrder, setRoundStatus, getRoundResult } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Content, Button } from '@components';
import { WordStatus } from '@common/types';
import { Theme, Color } from '@styles/theme';

type ScPropsType = {
  theme: Theme;
  status: boolean;
};

const Word = styled(Content.Text)<Pick<ScPropsType, 'status'>>`
  color: ${({ status, theme }: ScPropsType): Color =>
    status ? theme.color.yellow : theme.color.lightPurple};
`;

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
    round &&
    teams &&
    activeTeamOrder &&
    round % Object.values(teams[activeTeamOrder].users).length;
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
      <Content.BlockWrapper>
        {result?.val() &&
          result.val().map(
            ({ word, status }: WordStatus): JSX.Element => (
              <Word key={word} status={status}>
                {word} - {status ? 'Угадано' : 'Пропущено'}
              </Word>
            ),
          )}
      </Content.BlockWrapper>
      {isActiveUser && (
        <div>
          <Button onClick={handleClickSwitchOrder}>
            Передать ход следующей команде
          </Button>
        </div>
      )}
    </div>
  );
};
