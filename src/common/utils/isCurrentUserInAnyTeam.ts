import { Team } from '../types';

export const isCurrentUserInAnyTeam = (
  userId: string,
  teams: Team[],
): boolean =>
  teams?.reduce((acc, { users }) => {
    if (users.filter(({ id }) => id === userId).length) {
      return true;
    }

    return acc;
  }, false);
