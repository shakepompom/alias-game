import { User } from '@common/types';
import { database } from './initFirebase';

export const getUser = (
  ruuid: string,
  userId = '',
): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/users/${userId}`);

export const addUser = (
  ruuid: string,
  { id, name, isAdmin = false }: User,
): void => {
  const data = {
    [id]: { id, name, isAdmin },
  };

  database.ref(`rooms/${ruuid}/users`).update(data);
};

export const setNewAdmin = (ruuid: string, userId = ''): void => {
  database.ref(`rooms/${ruuid}/users/${userId}`).update({ isAdmin: true });
};

export const removeUser = (ruuid: string, userId = ''): void => {
  database.ref(`rooms/${ruuid}/users/${userId}`).remove();
};
