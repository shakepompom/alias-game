import { User, WordStatus } from '@common/types';

export const getTotalScore = (
  users: User[],
  guessedWords: WordStatus[],
): number => {
  const teamScore = users.reduce((acc, user) => {
    let score = acc;

    if (user.score) {
      for (let i = 0; i < user.score.length; i++) {
        if (user.score[i]) {
          for (let j = 0; j < user.score[i].length; j++) {
            // TODO: If missed word decrese score, the condition must be
            // user.score[i][j].status ? score++ : score--;
            user.score[i][j].status ? score++ : score;
          }
        }
      }
    }

    return score;
  }, 0);

  return teamScore + guessedWords.length;
};
