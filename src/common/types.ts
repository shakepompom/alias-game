export type User = {
  id: string;
  name: string;
  isAdmin?: boolean;
  score?: WordStatus[][];
};

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
  isLastWordToGuess: boolean;
  pointsToWin: number;
  timer: number;
};

export type CommonComponentState = {
  users: User[] | undefined;
  userId: string | undefined;
  isAdmin: boolean | undefined;
  gameId: string | undefined;
  teams: Team[] | undefined;
  round: number | undefined;
  activeTeamOrder: number | undefined;
  roundStatus: RoundStatus | undefined;
  wordsOrder: number[] | undefined;
  winnerTeamIndex: number | undefined;
  settings: Settings | undefined;
};
