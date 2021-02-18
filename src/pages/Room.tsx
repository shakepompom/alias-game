import React, { useCallback } from 'react';
import {
  EmptyRoom,
  FinishGame,
  Game,
  RoomConnection,
  RoomPreparation,
} from '@features';
import { useParams } from 'react-router';
import { useObjectVal } from 'react-firebase-hooks/database';
import { getGameStatus, getUsers } from '@fb/room';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { RoomParams } from '@common/model/routes';
import { ObjectedUser } from '@common/model/user';

const Room: React.FC = () => {
  const { roomId } = useParams<RoomParams>();
  const [gameStatus] = useObjectVal(getGameStatus(roomId));
  // TODO вынести тип users
  const [roomUsers] = useObjectVal<ObjectedUser>(getUsers(roomId));
  const [user] = useAuthState(auth);

  const renderContent = useCallback(() => {
    switch (gameStatus) {
      case 'preparation':
        return <RoomPreparation roomId={roomId} />;
      case 'progress':
        return <Game roomId={roomId} />;
      case 'finish':
        return <FinishGame roomId={roomId} />;
      case null:
        return <EmptyRoom />;
      default:
        return <div>Что-то пошло не так... Перезагрузите страницу.</div>;
    }
  }, [gameStatus]);

  // TODO сделать компонент загрузки
  if (user && roomUsers && roomUsers[user.uid]) {
    return gameStatus !== undefined ? renderContent() : <div>Загрузка...</div>;
  } else {
    return <RoomConnection />;
  }
};

export default Room;
