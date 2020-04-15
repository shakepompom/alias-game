import { database } from './initFirebase';
import { User } from '@common/types';

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

export const getRoom = (
  ruuid: string,
  callback: Function = Function.prototype
): void => {
  database.ref(`rooms/${ruuid}`).on('value', (snapshot): void => {
    callback(snapshot.val());
  });
};

export const startGame = (ruuid: string): void => {
  database
    .ref(`rooms/${ruuid}/currentGameStatus`)
    .update({ isGameStarted: true });
};
