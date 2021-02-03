import { Team } from '../types';

export const isCurrentUserInAnyTeam = (
  userId: string | undefined,
  teams: Team[]
): boolean => {
  let isInAnyTeam = false;

  for (let i = 0; i < teams.length; i++) {
    if (teams[i].users.filter(({ id }) => id === userId).length) {
      isInAnyTeam = true;
    }
  }

  return isInAnyTeam;
};
