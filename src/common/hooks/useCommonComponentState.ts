import { useObjectVal } from 'react-firebase-hooks/database';
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
  getWordsOrder,
  getGameWinnerTeamIndex,
} from '@fb/room';
import { getUser } from '@fb/user';
import {
  CommonComponentState,
  User,
  Team,
  RoundStatus,
  Settings,
} from '../types';

export const useCommonComponentState = (
  roomId: string,
): CommonComponentState => {
  const [authUser] = useAuthState(auth);
  const [users] = useObjectVal<User[]>(getUsers(roomId));
  const [user] = useObjectVal<User>(getUser(roomId, authUser?.uid));
  const isAdmin = user?.isAdmin;
  const [gameId] = useObjectVal<string>(getCurrentGameId(roomId));
  const [teams] = useObjectVal<Team[]>(getTeams(roomId, gameId));
  const [activeTeamOrder] = useObjectVal<number>(getTeamOrderIndex(roomId));
  const [round] = useObjectVal<number>(getGameRound(roomId));
  const [roundStatus] = useObjectVal<RoundStatus>(getRoundStatus(roomId));
  const [wordsOrder] = useObjectVal<number[]>(getWordsOrder(roomId, gameId));
  const [winnerTeamIndex] = useObjectVal<number>(
    getGameWinnerTeamIndex(roomId, gameId),
  );
  const [settings] = useObjectVal<Settings>(getGameSettings(roomId, gameId));

  return {
    users,
    userId: authUser?.uid,
    isAdmin,
    gameId,
    teams,
    round,
    activeTeamOrder,
    roundStatus,
    wordsOrder,
    winnerTeamIndex,
    settings,
  };
};
