import { Team } from '@common/types';
import { ObjectedUser } from '@common/model/user';

const TEAM_NAMES = [
  'Котики',
  'Зайчики',
  'Поняшки',
  'Динозаврики',
  'Птички',
  'Ёжики',
  'Пёсики',
];

export const splitToTeams = (
  teamCount: number,
  users?: ObjectedUser
): Team[] => {
  if (!users) return [];

  const teams: Team[] = [];

  for (let i = 0; i < teamCount; i++) {
    teams.push({ name: TEAM_NAMES[i], users: [] });
  }

  return Object.values(users).reduce((acc, { id, name }, index: number) => {
    acc[index % teamCount].users.push({ id, name });

    return acc;
  }, teams);
};
