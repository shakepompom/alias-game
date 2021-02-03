import { Team } from '@common/types';

export const getLastWordRoundResult = (
  roundOrder: number | undefined,
  teams: Team[] = []
): string =>
  teams?.reduce((acc, { name, guessedWords }) => {
    if (
      guessedWords &&
      typeof roundOrder === 'number' &&
      guessedWords[roundOrder]
    ) {
      return `${guessedWords[roundOrder].word} - ${name}`;
    }

    return acc;
  }, '');
