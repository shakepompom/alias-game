import { database } from './initFirebase';
import { User } from '@common/types';

export const getUser = (ruuid: string, userId: string) =>
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
