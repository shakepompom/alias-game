import { database } from './initFirebase';
import { User } from '@common/types';

export const addUser = (
  ruuid: string,
  { id, name, isAdmin = false }: User
): void => {
  const data = {
    [id]: { id, name, isAdmin },
  };

  database.ref(`rooms/${ruuid}/users/`).update(data);
};

export const getUser = (
  ruuid: string,
  userId: string,
  callback: Function = Function.prototype
): void => {
  database
    .ref(`rooms/${ruuid}/users/${userId}`)
    .on('value', (snapshot): void => {
      callback(snapshot.val());
    });
};
