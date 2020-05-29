import { database } from './initFirebase';

export const sendFeedback = (feedback: string): void => {
  database.ref(`feedback`).push({
    createdAt: `${new Date()}`,
    value: feedback,
  });
};
