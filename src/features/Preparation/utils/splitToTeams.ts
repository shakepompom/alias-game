const TEAM_NAMES = ['Котики', 'Пёсики', 'Птички', 'Динозаврики', 'Поняшки'];

export const splitToTeams = (users, teamCount) => {
  const teams = [];

  for (let i = 0; i < teamCount; i++) {
    teams.push({ name: TEAM_NAMES[i], users: [] });
  }

  return Object.values(users).reduce((acc, { id, name }, index) => {
    acc[index % teamCount].users.push({ id, name });

    return acc;
  }, teams);
};
