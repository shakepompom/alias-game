import { User } from '@common/types';

export const getNewAdmin = (users: { [key: string]: User }): string => {
  if (!users) return '';

  return Object.keys(users).filter((id) => !users[id].isAdmin)[0];
};
