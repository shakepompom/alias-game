import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input } from '@components';
import { useComponentState } from '@hooks';
import { splitToTeams } from '@fb/room';
import { GameProps } from '@common/types';
import { splitToTeams as splitToTeamsUtil } from '../utils';

export const Teams = ({ roomId }: GameProps): JSX.Element => {
  const { users, teams, isAdmin } = useComponentState(roomId);
  const [teamCount, setTeamCount] = useState(3);

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
          {teams &&
            Object.values(teams).map(
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
