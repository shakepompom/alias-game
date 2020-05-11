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

type CurrentGameStatus = {
  isGameStarted: boolean;
};

export type RoomSettings = {
  users: User[];
  currentGameStatus: CurrentGameStatus;
};

export type RoundStatus = 'start' | 'progress' | 'result';

export type WordStatus = {
  word: string;
  status: boolean;
};

export type CommonComponentState = {
  users: User[];
  userId: string | undefined;
  isAdmin: boolean;
  gameId: string;
  teams: Team[];
  round: number;
  activeTeamOrder: number;
  roundStatus: RoundStatus;
  settings: {
    isLastWordToGuess: boolean;
    pointsToWin: number;
    timer: number;
  };
};
