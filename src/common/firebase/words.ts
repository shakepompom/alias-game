import { database } from './initFirebase';
import { ololo } from './ololo';

export const getAllWords = (): firebase.database.Reference =>
  database.ref(`words`);

export const getWordByIndex = (
  index: number,
): Promise<firebase.database.DataSnapshot> =>
  database.ref(`words/${index}`).once('value');

export const addWords = (): void => {
  database.ref(`words`).update([...new Set(ololo)]);
};
