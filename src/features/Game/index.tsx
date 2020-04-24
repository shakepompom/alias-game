import React from 'react';
import { useObject } from 'react-firebase-hooks/database';
import { getCurrentGameId, getTeams } from '@fb/room';
import { Team, User } from '@common/types';

type GameProps = {
  roomId: string;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const [gameId] = useObject(getCurrentGameId(roomId));
  const [teams] = useObject(getTeams(roomId, gameId?.val()));

  return (
    <>
      <div>Дашборд</div>
      <div>
        <div>
          Команды:
          <ul>
            {teams?.val() &&
              Object.values(teams.val()).map(
                // TODO: Fix type
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
      </div>
      <div>Игра запущена...</div>
    </>
  );
};
