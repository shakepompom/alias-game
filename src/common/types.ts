export type User = {
  id: string;
  name: string;
  isAdmin?: boolean;
};

export type Team = {
  name: string;
  users: User[];
};

type CurrentGameStatus = {
  isGameStarted: boolean;
};

export type RoomSettings = {
  users: User[];
  currentGameStatus: CurrentGameStatus;
};

export type CommonComponentState = {
  users: User[];
  userId: string | undefined;
  isAdmin: boolean;
  gameId: string;
  teams: Team[];
  round: number;
  activeTeamOrder: number;
};
