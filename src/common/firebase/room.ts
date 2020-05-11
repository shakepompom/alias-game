import { database } from './initFirebase';
import { User, Team, WordStatus } from '@common/types';

export const getRoom = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}`);

export const getIsGameStarted = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/isGameStarted`);

export const getCurrentGameId = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/gameId`);

export const getUsers = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/users`);

export const getTeams = (
  ruuid: string,
  guuid: string,
): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/games/${guuid}/teams`);

export const getTeamOrderIndex = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/activeTeam`);

export const getGameRound = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/round`);

export const getGameSettings = (
  ruuid: string,
  guuid: string,
): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/games/${guuid}/settings`);

export const getIsRoundStarted = (ruuid: string): firebase.database.Reference =>
  database.ref(`rooms/${ruuid}/currentGameStatus/isRoundStarted`);

export const getRoundResult = (
  ruuid: string,
  guuid: string,
  activeTeam: number,
  userIndex: number,
  round: number,
): firebase.database.Reference =>
  database.ref(
    `rooms/${ruuid}/games/${guuid}/teams/${activeTeam}/users/${userIndex}/score/${round}`,
  );

export const addRoom = (ruuid: string, admin: User, guuid: string): void => {
  const data = {
    [ruuid]: {
      users: {
        [admin.id]: {
          id: admin.id,
          name: admin.name,
          isAdmin: true,
        },
      },
      currentGameStatus: {
        isGameStarted: false,
        gameId: guuid,
      },
      games: {
        [guuid]: {
          id: guuid,
          settings: {
            timer: 60,
            pointsToWin: 100,
            isLastWordToGuess: true,
          },
        },
      },
    },
  };

  database.ref('rooms/').update(data);
};

export const splitToTeams = (
  ruuid: string,
  guuid: string,
  teams: Team[],
): void => {
  database.ref(`rooms/${ruuid}/games/${guuid}`).update({ teams });
};

export const switchNextOrder = (
  ruuid: string,
  nextState: {
    round: number;
    activeTeam: number;
  },
): void => {
  database.ref(`rooms/${ruuid}/currentGameStatus`).update({
    round: nextState.round,
    activeTeam: nextState.activeTeam,
  });
};

export const startGame = (ruuid: string): void => {
  database.ref(`rooms/${ruuid}/currentGameStatus`).update({
    isGameStarted: true,
    round: 0,
    activeTeam: 0,
    isRoundStarted: false,
  });
};

export const setRoundStatus = (ruuid: string, value: boolean): void => {
  database
    .ref(`rooms/${ruuid}/currentGameStatus`)
    .update({ isRoundStarted: value });
};

export const sendTeamRoundResult = (
  ruuid: string,
  guuid: string,
  activeTeam: number,
  userIndex: number,
  round: number,
  results: WordStatus[],
): void => {
  database
    .ref(
      `rooms/${ruuid}/games/${guuid}/teams/${activeTeam}/users/${userIndex}/score`,
    )
    .update({
      [round]: results,
    });
};

export const sendLastWordRoundResult = (
  ruuid: string,
  guuid: string,
  team: number,
  round: number,
  results: WordStatus,
): void => {
  database
    .ref(`rooms/${ruuid}/games/${guuid}/teams/${team}/guessedWords`)
    .update({
      [round]: results,
    });
};
