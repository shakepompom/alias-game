import { User } from '@common/types';
import { database } from './initFirebase';

export const getUser = (
  ruuid: string,
  userId: string
): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/users/${userId}`);

export const addUser = (
  ruuid: string,
  { id, name, isAdmin = false }: User
): void => {
  const data = {
    [id]: { id, name, isAdmin },
  };

  database.ref(`rooms/${ruuid}/users/`).update(data);
};
