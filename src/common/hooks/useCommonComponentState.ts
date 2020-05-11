import { useObject } from 'react-firebase-hooks/database';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import {
  getUsers,
  getCurrentGameId,
  getTeams,
  getTeamOrderIndex,
  getGameRound,
  getGameSettings,
  getRoundStatus,
} from '@fb/room';
import { getUser } from '@fb/user';
import { CommonComponentState } from '../types';

// TODO: Split this hook in 2 different depends on game status/feature component
export const useCommonComponentState = (
  roomId: string,
): CommonComponentState => {
  const [authUser] = useAuthState(auth);
  const [users] = useObject(getUsers(roomId));
  const [user] = useObject(getUser(roomId, authUser?.uid));
  const isAdmin = user?.val()?.isAdmin;
  const [gameId] = useObject(getCurrentGameId(roomId));
  const [teams] = useObject(getTeams(roomId, gameId?.val()));
  const [activeTeamOrder] = useObject(getTeamOrderIndex(roomId));
  const [round] = useObject(getGameRound(roomId));
  const [roundStatus] = useObject(getRoundStatus(roomId));
  const [settings] = useObject(getGameSettings(roomId, gameId?.val()));

  return {
    users: users?.val(),
    userId: authUser?.uid,
    isAdmin,
    gameId: gameId?.val(),
    teams: teams?.val(),
    round: round?.val(),
    activeTeamOrder: activeTeamOrder?.val(),
    roundStatus: roundStatus?.val(),
    settings: settings?.val(),
  };
};
