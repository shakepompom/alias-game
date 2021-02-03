import { database } from './initFirebase';
import { Team, RoundStatus, WordStatus } from '@common/types';
import firebase from 'firebase';
import { User } from '@common/model/user';

export const getRoom = (roomId: string): firebase.database.Reference =>
  database.ref(`rooms/${roomId}`);

export const getGameStatus = (roomId: string): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/currentGameStatus/gameStatus`);

export const getCurrentGameId = (roomId: string): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/currentGameStatus/gameId`);

export const getUsers = (roomId: string): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/users`);

export const getTeams = (
  roomId: string,
  gameId: string | undefined
): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/games/${gameId}/teams`);

export const getTeamOrderIndex = (
  roomId: string
): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/currentGameStatus/activeTeam`);

export const getGameRound = (roomId: string): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/currentGameStatus/round`);

export const getGameSettings = (
  roomId: string,
  gameId: string | undefined
): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/games/${gameId}/settings`);

export const getRoundStatus = (roomId: string): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/currentGameStatus/roundStatus`);

export const getWordsOrder = (
  roomId: string,
  gameId: string | undefined
): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/games/${gameId}/wordsOrder`);

export const getRoundResult = (
  roomId: string,
  gameId: string | undefined,
  activeTeam: number | undefined,
  userIndex: number | undefined,
  roundOrder: number | undefined
): firebase.database.Reference =>
  database.ref(
    `rooms/${roomId}/games/${gameId}/teams/${activeTeam}/users/${userIndex}/score/${roundOrder}`
  );

export const getGameWinnersIndices = (
  roomId: string,
  gameId: string | undefined
): firebase.database.Reference =>
  database.ref(`rooms/${roomId}/games/${gameId}/gameResult/winnersIndices`);

export const addRoom = (
  roomId: string,
  admin: User,
  gameId: string | undefined
): void => {
  if (gameId) {
    const data = {
      [roomId]: {
        createdAt: new Date(),
        users: {
          [admin.id]: {
            id: admin.id,
            name: admin.name,
            isAdmin: true,
          },
        },
        currentGameStatus: {
          gameStatus: 'preparation',
          gameId: gameId,
        },
        games: {
          [gameId]: {
            id: gameId,
            settings: {
              timer: 60,
              pointsToWin: 100,
              missedWordIsMinusPoint: false,
              isLastWordToGuess: true,
            },
          },
        },
      },
    };

    database.ref('rooms/').update(data);
  }
};

export const splitToTeams = (
  roomId: string,
  gameId: string | undefined,
  teams: Team[]
): void => {
  database.ref(`rooms/${roomId}/games/${gameId}`).update({ teams });
};

export const setWordsOrder = (
  roomId: string,
  gameId: string | undefined,
  wordsOrder: number[] = []
): void => {
  database.ref(`rooms/${roomId}/games/${gameId}`).update({
    wordsOrder,
  });
};

export const startGame = (roomId: string): void => {
  database.ref(`rooms/${roomId}/currentGameStatus`).update({
    gameStatus: 'progress',
    round: 0,
    activeTeam: 0,
    roundStatus: 'start',
  });
};

export const setRoundStatus = (roomId: string, value: RoundStatus): void => {
  database
    .ref(`rooms/${roomId}/currentGameStatus`)
    .update({ roundStatus: value });
};

export const switchNextOrder = (
  roomId: string,
  nextState: {
    round: number | undefined;
    activeTeam: number | undefined;
  }
): void => {
  database.ref(`rooms/${roomId}/currentGameStatus`).update({
    round: nextState.round,
    activeTeam: nextState.activeTeam,
  });
};

export const setTeamRoundResult = (
  roomId: string,
  gameId: string | undefined,
  activeTeam: number | undefined,
  userIndex: number | undefined,
  roundOrder: number | undefined,
  results: WordStatus[]
): void => {
  if (typeof roundOrder === 'number') {
    database
      .ref(
        `rooms/${roomId}/games/${gameId}/teams/${activeTeam}/users/${userIndex}/score`
      )
      .update({
        [roundOrder]: results,
      });
  }
};

export const setLastWordRoundResult = (
  roomId: string,
  gameId: string | undefined,
  team: number | undefined,
  roundOrder: number | undefined,
  results: WordStatus
): void => {
  if (typeof roundOrder === 'number') {
    database
      .ref(`rooms/${roomId}/games/${gameId}/teams/${team}/guessedWords`)
      .update({
        [roundOrder]: results,
      });
  }
};

export const setGameWinnersIndices = (
  roomId: string,
  gameId: string | undefined,
  winnersIndices: number[] | undefined
): void => {
  database
    .ref(`rooms/${roomId}/games/${gameId}/gameResult`)
    .update({ winnersIndices });
};

export const finishGame = (roomId: string): void => {
  database
    .ref(`rooms/${roomId}/currentGameStatus/`)
    .update({ gameStatus: 'finish' });
};

export const removeTeams = (roomId: string, gameId?: string): void => {
  database.ref(`rooms/${roomId}/games/${gameId}/teams`).remove();
};

export const removeRoom = (roomId: string): void => {
  database.ref(`rooms/${roomId}`).remove();
};
