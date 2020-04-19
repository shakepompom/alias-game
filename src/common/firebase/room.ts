import { database } from './initFirebase';
import { User } from '@common/types';

export const getRoom = (ruuid: string, userId: string) =>
  database.ref(`rooms/${ruuid}`);

export const getIsGameStarted = (ruuid: string, userId: string) =>
  database.ref(`rooms/${ruuid}/currentGameStatus/isGameStarted`);

export const getCurrentGameId = (ruuid: string) =>
  database.ref(`rooms/${ruuid}/currentGameStatus/gameId`);

export const getUsers = (ruuid: string) => database.ref(`rooms/${ruuid}/users`);

export const getTeams = (ruuid: string, guuid: string) =>
  database.ref(`rooms/${ruuid}/games/${guuid}/teams`);

export const startGame = (ruuid: string): void => {
  database
    .ref(`rooms/${ruuid}/currentGameStatus`)
    .update({ isGameStarted: true });
};

export const addRoom = (ruuid: string, admin: User): void => {
  const data = {
    [ruuid]: {
      users: {
        [admin.id]: {
          id: admin.id,
          name: admin.name,
          isAdmin: true,
        },
      },
      currentGameStatus: {
        isGameStarted: false,
      },
    },
  };

  database.ref('rooms/').update(data);
};

export const splitToTeams = (ruuid: string, guuid: string, teams): void => {
  database.ref(`rooms/${ruuid}/games/${guuid}`).update({ id: guuid, teams });
  database.ref(`rooms/${ruuid}/currentGameStatus`).update({ gameId: guuid });
};
