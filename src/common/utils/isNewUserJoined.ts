import { Team } from '../types';
import { ObjectedUser } from '@common/model/user';

export const isNewUserJoined = (
  users: ObjectedUser,
  teams: Team[]
): boolean => {
  const usersInRoomLength = Object.keys(users).length;
  const usersInTeamsLength = teams.reduce(
    (acc, { users }) => acc + users.length,
    0
  );

  return usersInRoomLength !== usersInTeamsLength;
};
