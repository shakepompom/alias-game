import React, { useState } from 'react';
import { useStateValidator } from 'react-use';
import styled from 'styled-components';
import { Button, Input, TeamsList } from '@components';
import { useCommonComponentState } from '@hooks';
import { splitToTeams } from '@fb/room';
import { splitToTeams as splitToTeamsUtil } from '../utils';

const Inner = styled.div`
  display: flex;
  align-items: center;
`;

const TeamsNumberInput = styled(Input)`
  flex-grow: 1;
  margin-right: 24px;
`;

type TeamsProps = {
  roomId: string;
};

export const Teams = ({ roomId }: TeamsProps): JSX.Element => {
  const { users, teams, isAdmin, gameId } = useCommonComponentState(roomId);
  const [teamCount, setTeamCount] = useState(0);
  const teamCountValidator = (v: number): [boolean] => [
    !users ? false : v >= 2 && v <= Math.floor(Object.keys(users).length / 2),
  ];
  const [[isValid]] = useStateValidator(teamCount, teamCountValidator);

  const handleSplitToTeams = (): void => {
    const teams = splitToTeamsUtil(teamCount, users);

    splitToTeams(roomId, gameId, teams);
  };

  return (
    <>
      {isAdmin && !teams?.length && (
        <>
          <div>Количество команд:</div>
          <Inner>
            {isAdmin && (
              <TeamsNumberInput
                value={String(teamCount)}
                type="number"
                min={0}
                onChange={(e) => setTeamCount(+e.target.value)}
              />
            )}
            <Button
              onClick={handleSplitToTeams}
              disabled={!teamCount || !isValid}
            >
              Распределить по командам
            </Button>
          </Inner>
        </>
      )}
      <TeamsList roomId={roomId} />
    </>
  );
};
