import React from 'react';
import { v4 as uuid } from 'uuid';
import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { Button } from '@components';
import { startGame, splitToTeams } from '@fb/room';
import { getUserHook } from '@fb/user';
import { GameProps, User } from '@common/types';
import { Teams } from './components';

export const Preparation = ({
  roomId,
  roomSettings,
}: GameProps): JSX.Element => {
  const [authUser] = useAuthState(auth);
  const [user] = useObject(getUserHook(roomId, authUser?.uid));
  const isAdmin = user?.val()?.isAdmin;
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
        <Teams roomId={roomId} roomSettings={roomSettings} />
      </div>
      {/* {isAdmin && teams && ( */}
      {isAdmin && (
        <div>
          <Button onClick={handleStartGame}>Начать игру</Button>
        </div>
      )}
    </>
  );
};
