import React from 'react';
import { Button } from '@components';
import { startGame } from '@common/firebase/room';
import { GameProps, User } from '@common/types';

export const Preparation = ({
  roomId,
  roomSettings,
}: GameProps): JSX.Element => {
  const { users } = roomSettings;

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
      <div>
        <Button onClick={handleStartGame}>Начать игру</Button>
      </div>
    </>
  );
};
