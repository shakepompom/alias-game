import { database } from './initFirebase';
import { User, Team } from '@common/types';

export const getRoom = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}`);

export const getIsGameStarted = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/isGameStarted`);

export const getCurrentGameId = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/gameId`);

export const getUsers = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/users`);

export const getTeams = (
  ruuid: string,
  guuid: string
): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/games/${guuid}/teams`);

export const getOrder = (
  ruuid: string,
  guuid: string
): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/games/${guuid}/order`);

export const getOrderIndex = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/activeUser`);

export const startGame = (
  ruuid: string,
  guuid: string,
  order: string[]
): void => {
  database.ref(`rooms/${ruuid}/currentGameStatus`).update({
    isGameStarted: true,
    activeUser: 0,
  });
  database.ref(`rooms/${ruuid}/games/${guuid}`).update({
    order,
  });
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

export const splitToTeams = (
  ruuid: string,
  guuid: string,
  teams: Team[]
): void => {
  database.ref(`rooms/${ruuid}/games/${guuid}`).update({ id: guuid, teams });
  database.ref(`rooms/${ruuid}/currentGameStatus`).update({ gameId: guuid });
};

export const switchNextOrder = (ruuid: string, orderIndex: number): void => {
  database.ref(`rooms/${ruuid}/currentGameStatus`).update({
    activeUser: orderIndex,
  });
};
