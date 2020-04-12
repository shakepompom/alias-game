import { database } from './initFirebase';
import { User } from '@common/types';

export const addUser = async (
  ruuid: string,
  { id, name, isAdmin = false }: User
): Promise<void> => {
  let index = 0;
  const setIndex = (i: number): void => {
    index = i;
  };

  await database
    .ref(`rooms/${ruuid}/users/`)
    .once('value', (snapshot): void => {
      setIndex(snapshot.val().length);
    });

  const data = {
    [index]: { id, name, isAdmin },
  };

  await database.ref(`rooms/${ruuid}/users/`).update(data);
};

export const addRoom = (ruuid: string, admin: User): void => {
  const data = {
    [ruuid]: {
      users: {
        0: {
          id: admin.id,
          name: admin.name,
          isAdmin: true,
        },
      },
      teams: {
        0: {
          name: 'Котики',
        },
        1: {
          name: 'Пёсики',
        },
      },
      order: {
        current: 0,
      },
      isGameStarted: false,
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
  database.ref(`rooms/${ruuid}`).update({ isGameStarted: true });
};
