import { Team, User } from '@common/types';

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
  users: { [key: string]: User } | undefined,
  teamCount: number,
): Team[] => {
  if (!users) return [];

  const teams = [];

  for (let i = 0; i < teamCount; i++) {
    teams.push({ name: TEAM_NAMES[i], users: [] });
  }

  return Object.values(users).reduce(
    (acc: Team[], { id, name }: User, index: number) => {
      acc[index % teamCount].users.push({ id, name });

      return acc;
    },
    teams,
  );
};
