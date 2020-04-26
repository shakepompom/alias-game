import { Team } from '@common/types';

export const generateOrder = (teams: Team[], usersLength: number): string[] => {
  const order = [];
  let i = 0;

  while (order.length < usersLength) {
    for (let j = 0; j < teams.length; j++) {
      if (teams[j]?.users[i]?.id) {
        order.push(teams[j]?.users[i]?.id);
      }
    }

    i++;
  }

  return order;
};
