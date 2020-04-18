import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { Button, Input } from '@components';
import { getUsers, getCurrentGameId, getTeams, splitToTeams } from '@fb/room';
import { getUser } from '@fb/user';
import { GameProps } from '@common/types';
import { splitToTeams as splitToTeamsUtil } from '../utils';

export const Teams = ({ roomId }: GameProps): JSX.Element => {
  const [authUser] = useAuthState(auth);
  const [users] = useObject(getUsers(roomId));
  const [gameId] = useObject(getCurrentGameId(roomId));
  const [teams] = useObject(getTeams(roomId, gameId?.val()));
  const [user] = useObject(getUser(roomId, authUser?.uid));
  const isAdmin = user?.val()?.isAdmin;
  const [teamCount, setTeamCount] = useState(3);

  const handleSplitToTeams = (): void => {
    const teams = splitToTeamsUtil(users, teamCount);
    const guuid = uuid();

    splitToTeams(roomId, guuid, teams);
  };

  return (
    <>
      {isAdmin && !teams?.val()?.length && (
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
          <div>
            <Button onClick={handleSplitToTeams} disabled={!teamCount}>
              Распределить по командам
            </Button>
          </div>
        </>
      )}
      <div>
        Teams:
        <ul>
          {teams?.val() &&
            Object.values(teams.val()).map(
              ({ name, users }): JSX.Element => (
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
