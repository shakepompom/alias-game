import React, { useState, useEffect } from 'react';
import { Team, User } from '@common/types';
import { finishGame } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { getTotalScore } from '@utils';

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

      finishGame(roomId, gameId, totalScore.indexOf(maxScore));
    }
  }, [settings, isAdmin, totalScore, finishGame]);

  return teams ? (
    <div>
      Команды:
      <ul>
        {Object.values(teams).map(
          ({ name, users, guessedWords }: Team, index): JSX.Element => {
            const isActiveTeam = index === activeTeamOrder;
            const newScore = getTotalScore(users, guessedWords);

            if (newScore !== totalScore[index]) {
              totalScore[index] = newScore;
              setTotalScore(totalScore);
            }

            return (
              <li key={name}>
                {name} - {newScore}
                {isActiveTeam && ' - ходят'}
                <ul>
                  {Object.values(users).map(
                    ({ id, name }: User, index: number): JSX.Element => {
                      const isActiveUser =
                        isActiveTeam &&
                        round % Object.values(users).length === index;

                      if (isActiveUser && activeUserId !== id) {
                        setActiveUserId(id);
                      }

                      return (
                        <li
                          key={id}
                          style={{
                            color: userId === id ? 'green' : 'default',
                          }}
                        >
                          {name}
                          {isActiveUser && ' - ходит'}
                        </li>
                      );
                    },
                  )}
                </ul>
              </li>
            );
          },
        )}
      </ul>
    </div>
  ) : (
    <></>
  );
};
