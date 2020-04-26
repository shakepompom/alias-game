import React, { useState } from 'react';
import { useStateValidator } from 'react-use';
import { v4 as uuid } from 'uuid';
import { Button, Input, TeamsList } from '@components';
import { useCommonComponentState } from '@hooks';
import { splitToTeams } from '@fb/room';
import { splitToTeams as splitToTeamsUtil } from '../utils';

type TeamsProps = {
  roomId: string;
};

export const Teams = ({ roomId }: TeamsProps): JSX.Element => {
  const { users, teams, isAdmin } = useCommonComponentState(roomId);
  const [teamCount, setTeamCount] = useState(0);
  const teamCountValidator = (v: number): [boolean] => [
    !users ? false : v >= 2 && v <= Math.floor(Object.keys(users).length / 2),
  ];
  const [[isValid]] = useStateValidator(teamCount, teamCountValidator);

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
                min={0}
                onChange={(val: string): void => setTeamCount(+val)}
              />
            )}
          </div>
          <div>
            <Button
              onClick={handleSplitToTeams}
              disabled={!teamCount || !isValid}
            >
              Распределить по командам
            </Button>
          </div>
        </>
      )}
      <TeamsList roomId={roomId} />
    </>
  );
};
