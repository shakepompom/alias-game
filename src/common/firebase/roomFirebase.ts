import { v4 as uuid } from 'uuid';
import { database } from './initFirebase';

export const addRoom = (ruuid: string): void => {
  const OlegId = uuid();
  const MashaId = uuid();

  // TODO: Replace with request data
  const data = {
    [ruuid]: {
      users: {
        0: {
          id: OlegId,
          name: 'Олег',
          isAdmin: true,
        },
        1: {
          id: MashaId,
          name: 'Маша',
          isAdmin: false,
        },
      },
      teams: {
        0: {
          name: 'Котики',
          users: {
            0: OlegId,
          },
        },
        1: {
          name: 'Пёсики',
          users: {
            0: MashaId,
          },
        },
      },
      order: {
        list: {
          0: OlegId,
          1: MashaId,
        },
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
