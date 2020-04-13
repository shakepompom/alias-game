export type GameProps = {
  roomId: string;
  roomSettings: RoomSettings;
};

export type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

type CurrentGameStatus = {
  isGameStarted: boolean;
};

export type RoomSettings = {
  users: User[];
  currentGameStatus: CurrentGameStatus;
};

export type MainReducer = {
  user: User;
};
