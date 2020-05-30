import React from 'react';
import styled from 'styled-components';
import { useObjectVal } from 'react-firebase-hooks/database';
import {
  switchNextOrder,
  setRoundStatus,
  getRoundResult,
  getGameWinnersIndices,
  finishGame,
} from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Content, Button } from '@components';
import { WordStatus } from '@common/types';
import { Theme, Color } from '@styles/theme';
import { getLastWordRoundResult } from '../utils';

type ScPropsType = {
  theme: Theme;
  status: boolean;
};

const Word = styled(Content.Text)<Pick<ScPropsType, 'status'>>`
  color: ${({ status, theme }: ScPropsType): Color =>
    status ? theme.color.yellow : theme.color.white};
  font-weight: ${({ status }: ScPropsType): number => (status ? 600 : 200)};
`;

const LastWord = styled(Word)`
  position: relative;
  padding-top: 16px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 100px;
    height: 1px;
    transform: translateX(-50%);
    background-color: ${({ theme }) => theme.color.yellow};
  }
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
    typeof round === 'number' &&
    teams &&
    typeof activeTeamOrder === 'number' &&
    round % Object.values(teams[activeTeamOrder].users).length;

  const roundOrder =
    typeof round === 'number' &&
    teams &&
    typeof activeTeamOrder === 'number' &&
    round * teams?.length + activeTeamOrder;
  const [result] = useObjectVal<WordStatus[]>(
    getRoundResult(roomId, gameId, activeTeamOrder, userIndex, roundOrder),
  );
  const [winnersIndices] = useObjectVal<number>(
    getGameWinnersIndices(roomId, gameId),
  );

  const handleClickSwitchOrder = (): void => {
    if (winnersIndices !== null && typeof winnersIndices === 'object') {
      finishGame(roomId);
    }

    const nextRound =
      teams &&
      typeof round === 'number' &&
      teams?.length - 1 === activeTeamOrder
        ? round + 1
        : round;
    const nextActiveTeam =
      teams &&
      typeof activeTeamOrder === 'number' &&
      teams.length - 1 === activeTeamOrder
        ? 0
        : typeof activeTeamOrder === 'number' && activeTeamOrder + 1;
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
        <Content.Subtitle>Результаты раунда</Content.Subtitle>
        {result &&
          result.map(
            ({ word, status }: WordStatus): JSX.Element => (
              <Word key={word} status={status}>
                {word} - {status ? 'Угадано' : 'Пропущено'}
              </Word>
            ),
          )}
        <LastWord status>{getLastWordRoundResult(roundOrder, teams)}</LastWord>
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
