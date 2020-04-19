import React from 'react';
import { Button } from '@components';
import { startGame } from '@fb/room';
import { useComponentState } from '@hooks';
import { GameProps, User } from '@common/types';
import { Teams } from './components';

export const Preparation = ({ roomId }: GameProps): JSX.Element => {
  const { users, teams, isAdmin } = useComponentState(roomId);

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
                ({ id, name, isAdmin }: User, index: number): JSX.Element => (
                  <li key={id} style={{ color: isAdmin ? 'blue' : 'default' }}>
                    {index + 1}. {name} ({id}){isAdmin && ' - создатель игры'}
                  </li>
                )
              )}
          </ul>
        </div>
        <Teams roomId={roomId} />
      </div>
      {isAdmin && teams?.length && (
        <div>
          <Button onClick={handleStartGame}>Начать игру</Button>
        </div>
      )}
    </>
  );
};
