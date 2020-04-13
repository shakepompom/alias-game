import React from 'react';
import { GameProps, User } from '@common/types';

export const Game = ({ roomId, roomSettings }: GameProps): JSX.Element => {
  const { users } = roomSettings;

  return (
    <>
      <div>Game page</div>
      <div>
        Room data:
        <div>
          All Users:
          <ul>
            {users &&
              Object.values(users).map(
                ({ id, name, isAdmin }: User): JSX.Element => (
                  <li key={id} style={{ color: isAdmin ? 'blue' : 'default' }}>
                    {name} ({id}){isAdmin && ' - создатель игры'}
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
      <div>Игра запущена...</div>
    </>
  );
};
