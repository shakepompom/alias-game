import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input } from '@components';
import { useCommonComponentState } from '@hooks';
import { splitToTeams } from '@fb/room';
import { Team, User } from '@common/types';
import { splitToTeams as splitToTeamsUtil } from '../utils';

type TeamsProps = {
  roomId: string;
};

export const Teams = ({ roomId }: TeamsProps): JSX.Element => {
  const { users, teams, isAdmin } = useCommonComponentState(roomId);
  const [teamCount, setTeamCount] = useState(0);

  const handleSplitToTeams = (): void => {
    const teams = splitToTeamsUtil(users, teamCount);
    const guuid = uuid();

    splitToTeams(roomId, guuid, teams);
  };

  return (
    <>
      {isAdmin && !teams?.length && (
        <>
          <div>
            Количество команд:
            {isAdmin && (
              <Input
                value={teamCount}
                type="number"
                onChange={(val: string): void => setTeamCount(+val)}
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
      {teams && (
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
                        <li key={id}>{name}</li>
                      )
                    )}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </>
  );
};
