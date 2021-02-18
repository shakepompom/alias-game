import { database } from './initFirebase';
import { ololo } from './ololo';
import firebase from 'firebase';

export const getAllWords = (): Promise<firebase.database.DataSnapshot> =>
  database.ref(`words`).once('value');

export const getWordByIndex = (
  index: number
): Promise<firebase.database.DataSnapshot> =>
  database.ref(`words/${index}`).once('value');

export const addWords = (): void => {
  database.ref(`words`).update([...new Set(ololo)]);
};
