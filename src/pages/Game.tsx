import React, { useState, useEffect } from 'react';
import { Game, Preparation } from '@features';
import { getRoom } from '@fb/room';
import { RoomSettings } from '@common/types';

const defaultState: RoomSettings = {
  users: [],
  currentGameStatus: {
    isGameStarted: false,
  },
};

type GamePageProps = {
  roomId: string;
};

export const GamePage = ({ roomId }: GamePageProps): JSX.Element => {
  const [roomSettings, setRoomSettings] = useState(defaultState);
  const {
    currentGameStatus: { isGameStarted },
  } = roomSettings;

  useEffect(() => {
    getRoom(roomId, (val: RoomSettings) => val && setRoomSettings(val));
  }, [getRoom]);

  return isGameStarted ? (
    <Game roomId={roomId} roomSettings={roomSettings} />
  ) : (
    <Preparation roomId={roomId} roomSettings={roomSettings} />
  );
};
