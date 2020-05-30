import { Team } from '@src/common/types';

export const getUserIndex = (
  round: number | undefined,
  teams: Team[] | undefined,
  activeTeamOrder: number | undefined,
): number | undefined => {
  if (
    typeof round === 'number' &&
    teams &&
    typeof activeTeamOrder === 'number'
  ) {
    return round % Object.values(teams[activeTeamOrder].users).length;
  }

  return undefined;
};

export const getRoundOrder = (
  round: number | undefined,
  teams: Team[] | undefined,
  activeTeamOrder: number | undefined,
): number | undefined => {
  if (
    typeof round === 'number' &&
    teams &&
    typeof activeTeamOrder === 'number'
  ) {
    return round * teams?.length + activeTeamOrder;
  }

  return undefined;
};
