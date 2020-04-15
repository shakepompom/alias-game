import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { Button, Input } from '@components';
import { splitToTeams } from '@fb/room';
import { getUserHook } from '@fb/user';
import { GameProps } from '@common/types';
import { splitToTeams as splitToTeamsUtil } from '../utils';

export const Teams = ({ roomId, roomSettings }: GameProps): JSX.Element => {
  const [authUser] = useAuthState(auth);
  const [user] = useObject(getUserHook(roomId, authUser?.uid));
  const isAdmin = user?.val()?.isAdmin;
  const [teamCount, setTeamCount] = useState(3);
  const [currentGameId, setCurrentGameId] = useState('');
  const { users, games } = roomSettings;

  const handleSplitToTeams = (): void => {
    const teams = splitToTeamsUtil(users, teamCount);
    const guuid = uuid();
    setCurrentGameId(guuid);

    splitToTeams(roomId, guuid, teams);
  };

  return (
    <>
      <div>
        Количество команд:
        {isAdmin && (
          <Input
            value={teamCount}
            type="number"
            onChange={(val: string): void => setTeamCount(val)}
          />
        )}
      </div>
      {/* {isAdmin && !teams && ( */}
      {isAdmin && (
        <div>
          <Button onClick={handleSplitToTeams} disabled={!teamCount}>
            Распределить по командам
          </Button>
        </div>
      )}
      <div>
        Teams:
        <ul>
          {currentGameId &&
            games[currentGameId].teams &&
            Object.values(games[currentGameId].teams).map(
              ({ name, users }: User): JSX.Element => (
                <li key={name}>
                  {name}
                  <ul>
                    {Object.values(users).map(
                      ({ id, name }): JSX.Element => (
                        <li key={id}>{name}</li>
                      )
                    )}
                  </ul>
                </li>
              )
            )}
        </ul>
      </div>
    </>
  );
};
