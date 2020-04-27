import React, { useState, useEffect } from 'react';
import { Team, User } from '@common/types';
import { useCommonComponentState } from '@hooks';

type TeamsListProps = {
  roomId: string;
  setIsActiveUser?: Function;
};

export const TeamsList = ({
  roomId,
  setIsActiveUser,
}: TeamsListProps): JSX.Element => {
  const { userId, teams, activeTeamOrder, round } = useCommonComponentState(
    roomId
  );

  const [activeUserId, setActiveUserId] = useState('');

  useEffect(() => {
    if (setIsActiveUser) {
      setIsActiveUser(activeUserId === userId);
    }
  }, [setIsActiveUser, activeUserId]);

  return teams ? (
    <div>
      Команды:
      <ul>
        {Object.values(teams).map(
          ({ name, users }: Team, index): JSX.Element => {
            const isActiveTeam = index === activeTeamOrder;

            return (
              <li key={name}>
                {name}
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
                    }
                  )}
                </ul>
              </li>
            );
          }
        )}
      </ul>
    </div>
  ) : (
    <></>
  );
};
