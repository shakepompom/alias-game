import { User } from '@common/model/user';

export type Team = {
  name: string;
  users: User[];
  guessedWords?: WordStatus[];
};

export type RoundStatus = 'start' | 'progress' | 'result';

export type WordStatus = {
  word: string;
  status: boolean;
};

export type Settings = {
  timer: number;
  pointsToWin: number;
  missedWordIsMinusPoint: boolean;
  isLastWordToGuess: boolean;
};

export type CommonComponentState = {
  users: { [key: string]: User } | undefined;
  userId: string | undefined;
  isAdmin: boolean | undefined;
  gameId: string | undefined;
  teams: Team[] | undefined;
  round: number | undefined;
  activeTeamOrder: number | undefined;
  roundStatus: RoundStatus | undefined;
  wordsOrder: number[] | undefined;
  winnersIndices: number[] | undefined;
  settings: Settings | undefined;
};
