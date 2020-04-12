export type GameProps = {
  roomId: string;
  roomSettings: RoomSettings;
};

export type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

export type Team = {
  name: string;
  users: string[];
};

export type Order = {
  list: string[];
  current: number;
};

export type RoomSettings = {
  users: User[];
  teams: Team[];
  order: Order;
  isGameStarted: false;
};
