import { ObjectedUser } from '@common/model/user';

export const getNewAdmin = (users: ObjectedUser): string => {
  if (!users) return '';

  return Object.keys(users).filter((id) => !users[id].isAdmin)[0];
};
