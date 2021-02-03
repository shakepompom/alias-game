import { database } from './initFirebase';
import firebase from 'firebase';
import { User } from '@common/model/user';

export const getUser = (
  roomId: string,
  userId: string | undefined
): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/users/${userId}`);

export const addUser = (roomId: string, user: User): void => {
  const { id, name, isAdmin = false } = user;
  const data = {
    [id]: { id, name, isAdmin },
  };

  database.ref(`rooms/${roomId}/users`).update(data);
};

export const setNewAdmin = (
  roomId: string,
  userId: string | undefined
): void => {
  database.ref(`rooms/${roomId}/users/${userId}`).update({ isAdmin: true });
};

export const removeUser = (roomId: string, userId?: string): void => {
  database.ref(`rooms/${roomId}/users/${userId}`).remove();
};
