import React from 'react';
import { GameProps, User, Team } from '@common/types';

export const Game = ({ roomId, roomSettings }: GameProps): JSX.Element => {
  const { users, teams, order } = roomSettings;

  return (
    <>
      <div>Game page</div>
      <div>
        Room data:
        <div>
          All Users:
          <ul>
            {users &&
              users.map(
                ({ id, name, isAdmin }: User): JSX.Element => (
                  <li key={id} style={{ color: isAdmin ? 'blue' : 'default' }}>
                    {name} ({id}){isAdmin && ' - создатель игры'}
                  </li>
                )
              )}
          </ul>
        </div>
        <div>
          Teams:
          <ul>
            {teams &&
              teams.map(
                ({ name, users }: Team): JSX.Element => (
                  <li key={name}>
                    {name}
                    <ul>
                      {users &&
                        users.map(
                          (id: string): JSX.Element => (
                            <li
                              key={id}
                              style={{
                                color:
                                  order.list[order.current] === id
                                    ? 'green'
                                    : 'default',
                              }}
                            >
                              {id}
                              {order.list[order.current] === id &&
                                ' - твой ход'}
                            </li>
                          )
                        )}
                    </ul>
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
    </>
  );
};
