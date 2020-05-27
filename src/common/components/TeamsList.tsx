import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Team, User } from '@common/types';
import { setGameWinnerTeamIndex } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { getTotalScore } from '@utils';
import { Theme, Color } from '@styles/theme';

type ScPropsType = {
  theme: Theme;
  isActiveTeam?: boolean;
  isCurrent?: boolean;
  isActiveUser?: boolean;
};

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TeamWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TeamName = styled.div<Pick<ScPropsType, 'isActiveTeam'>>`
  width: 100%;
  padding: 8px 16px;
  margin-bottom: 4px;
  font-weight: 600;
  text-align: center;
  background-color: ${({ isActiveTeam, theme }: ScPropsType): Color =>
    isActiveTeam ? theme.color.purple : theme.color.transparent};
  border: 1px solid
    ${({ isActiveTeam, theme }: ScPropsType): Color =>
      isActiveTeam ? theme.color.white : theme.color.transparent};
  border-radius: 4px;
`;

const TeamScore = styled.div`
  margin-top: 8px;
  font-weight: 600;
`;

const StyledUser = styled.div<Pick<ScPropsType, 'isCurrent' | 'isActiveUser'>>`
  width: 100%;
  padding: 4px 8px;
  margin: 2px 0;
  text-align: center;
  color: ${({ isCurrent, theme }: ScPropsType): Color =>
    isCurrent ? theme.color.yellow : theme.color.default};
  background-color: ${({ isActiveUser, theme }: ScPropsType): Color =>
    isActiveUser ? theme.color.purple : theme.color.transparent};
  border: 1px solid
    ${({ isActiveUser, theme }: ScPropsType): Color =>
      isActiveUser ? theme.color.white : theme.color.transparent};
  border-radius: 4px;
`;

type TeamsListProps = {
  roomId: string;
  setIsActiveUser?: Function;
};

export const TeamsList = ({
  roomId,
  setIsActiveUser,
}: TeamsListProps): JSX.Element => {
  const {
    userId,
    isAdmin,
    gameId,
    teams,
    activeTeamOrder,
    round,
    settings,
  } = useCommonComponentState(roomId);
  const [activeUserId, setActiveUserId] = useState('');
  const [totalScore, setTotalScore] = useState<number[]>([]);

  useEffect(() => {
    if (setIsActiveUser) {
      setIsActiveUser(activeUserId === userId);
    }
  }, [setIsActiveUser, activeUserId]);

  useEffect(() => {
    const isToFinishGame = settings?.pointsToWin
      ? totalScore.some((score) => score >= settings?.pointsToWin)
      : false;

    if (isToFinishGame && isAdmin) {
      const maxScore = Math.max(...totalScore);

      setGameWinnerTeamIndex(roomId, gameId, totalScore.indexOf(maxScore));
    }
  }, [settings, isAdmin, totalScore]);

  return teams ? (
    <div>
      <TableWrapper>
        {Object.values(teams).map(
          ({ name, users, guessedWords }: Team, index): JSX.Element => {
            const isActiveTeam = index === activeTeamOrder;
            const newScore = getTotalScore(users, guessedWords);

            if (newScore !== totalScore[index]) {
              totalScore[index] = newScore;
              setTotalScore(totalScore);
            }

            return (
              <TeamWrapper key={name}>
                <TeamName isActiveTeam={isActiveTeam}>{name}</TeamName>
                <TeamList>
                  {Object.values(users).map(
                    ({ id, name }: User, index: number): JSX.Element => {
                      const isActiveUser =
                        isActiveTeam &&
                        round % Object.values(users).length === index;

                      if (isActiveUser && activeUserId !== id) {
                        setActiveUserId(id);
                      }

                      return (
                        <StyledUser
                          key={id}
                          isCurrent={userId === id}
                          isActiveUser={isActiveUser}
                        >
                          {name}
                        </StyledUser>
                      );
                    },
                  )}
                </TeamList>
                <TeamScore>{newScore}</TeamScore>
              </TeamWrapper>
            );
          },
        )}
      </TableWrapper>
    </div>
  ) : (
    <></>
  );
};
