import { getWordByIndex } from '@fb/words';

type PropsType = {
  wordsOrder: number[] | undefined;
  round: number | undefined;
  teamsLength: number | undefined;
  activeTeamOrder: number | undefined;
};

const WORDS_PER_ROUND = 15;

export const getRoundWordsSet = async ({
  wordsOrder,
  round,
  teamsLength,
  activeTeamOrder,
}: PropsType): Promise<string[]> => {
  const startFromIndex =
    (round * teamsLength + activeTeamOrder) * WORDS_PER_ROUND;
  const result: string[] = [];

  if (wordsOrder) {
    for (let i = startFromIndex; i < startFromIndex + WORDS_PER_ROUND; i++) {
      await getWordByIndex(wordsOrder[i]).then((w) => result.push(w?.val()));
    }
  }

  return result;
};
