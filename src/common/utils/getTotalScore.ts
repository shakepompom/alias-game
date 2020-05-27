import { User, WordStatus } from '@common/types';

export const getTotalScore = (
  users: User[],
  guessedWords: WordStatus[] = [],
): number => {
  const teamScore = users.reduce((acc, user) => {
    let score = acc;

    if (user.score) {
      Object.values(user.score).forEach((roundScore) => {
        for (let j = 0; j < roundScore.length; j++) {
          // TODO: If missed word decrese score, the condition must be
          // user.score[i][j].status ? score++ : score--;
          roundScore[j].status ? score++ : score;
        }
      });
    }

    return score;
  }, 0);

  return teamScore + Object.keys(guessedWords).length;
};
