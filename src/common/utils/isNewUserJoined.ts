import { User, Team } from '../types';

export const isNewUserJoined = (
  users: { [key: string]: User },
  teams: Team[],
): boolean => {
  const usersInRoomLength = Object.keys(users).length;
  const usersInTeamsLength = teams.reduce(
    (acc, { users }) => acc + users.length,
    0,
  );

  return usersInRoomLength !== usersInTeamsLength;
};
