import React from 'react';
import { v4 as uuid } from 'uuid';
import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { Button } from '@components';
import { startGame, getUsers, getCurrentGameId, getTeams } from '@fb/room';
import { getUser } from '@fb/user';
import { GameProps, User } from '@common/types';
import { Teams } from './components';

export const Preparation = ({ roomId }: GameProps): JSX.Element => {
  const [authUser] = useAuthState(auth);
  const [users] = useObject(getUsers(roomId));
  const [gameId] = useObject(getCurrentGameId(roomId));
  const [teams] = useObject(getTeams(roomId, gameId?.val()));
  const [user] = useObject(getUser(roomId, authUser?.uid));
  const isAdmin = user?.val()?.isAdmin;

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
              Object.values(users.val()).map(
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
      {isAdmin && teams?.val().length && (
        <div>
          <Button onClick={handleStartGame}>Начать игру</Button>
        </div>
      )}
    </>
  );
};
