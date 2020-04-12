import React from 'react';
import { Button } from '@components';
import { startGame } from '@common/firebase/roomFirebase';
import { GameProps, User, Team } from '@common/types';

export const Preparation = ({
  roomId,
  roomSettings,
}: GameProps): JSX.Element => {
  const { users, teams } = roomSettings;

  const handleStartGame = (): void => {
    startGame(roomId);
  };

  return (
    <>
      <div>Preparation page</div>
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
                          (id: string): JSX.Element => <li key={id}>{id}</li>
                        )}
                    </ul>
                  </li>
                )
              )}
          </ul>
        </div>
      </div>
      <div>
        <Button onClick={handleStartGame}>Начать игру</Button>
      </div>
    </>
  );
};
