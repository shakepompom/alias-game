import React from 'react';
import { useObject } from 'react-firebase-hooks/database';
import { getCurrentGameId, getTeams } from '@fb/room';
import { GameProps } from '@common/types';

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const [gameId] = useObject(getCurrentGameId(roomId));
  const [teams] = useObject(getTeams(roomId, gameId?.val()));

  return (
    <>
      <div>Game page</div>
      <div>
        Room data:
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
      </div>
      <div>Игра запущена...</div>
    </>
  );
};
