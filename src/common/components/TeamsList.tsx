import React from 'react';
import { Team, User } from '@common/types';
import { useCommonComponentState } from '@hooks';

type TeamsListProps = {
  roomId: string;
};

export const TeamsList = ({ roomId }: TeamsListProps): JSX.Element => {
  const { userId, teams, activeUserId } = useCommonComponentState(roomId);

  return teams ? (
    <div>
      Команды:
      <ul>
        {Object.values(teams).map(
          ({ name, users }: Team): JSX.Element => (
            <li key={name}>
              {name}
              <ul>
                {Object.values(users).map(
                  ({ id, name }: User): JSX.Element => (
                    <li
                      key={id}
                      style={{
                        color: userId === id ? 'green' : 'default',
                      }}
                    >
                      {name}
                      {activeUserId === id && ' - ходит'}
                    </li>
                  )
                )}
              </ul>
            </li>
          )
        )}
      </ul>
    </div>
  ) : (
    <></>
  );
};
