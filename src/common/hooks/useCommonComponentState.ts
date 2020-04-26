import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { getUsers, getCurrentGameId, getTeams } from '@fb/room';
import { getUser } from '@fb/user';
import { CommonComponentState } from '../types';

export const useCommonComponentState = (
  roomId: string
): CommonComponentState => {
  const [authUser] = useAuthState(auth);
  const [users] = useObject(getUsers(roomId));
  const [gameId] = useObject(getCurrentGameId(roomId));
  const [teams] = useObject(getTeams(roomId, gameId?.val()));
  const [user] = useObject(getUser(roomId, authUser?.uid));
  const isAdmin = user?.val()?.isAdmin;

  return {
    users: users?.val(),
    teams: teams?.val(),
    userId: authUser?.uid,
    isAdmin,
  };
};
