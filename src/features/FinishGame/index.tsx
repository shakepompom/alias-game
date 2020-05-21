import React from 'react';
import { useCommonComponentState } from '@hooks';
import { getTotalScore, getWordDeclension } from '@utils';

type FinishGameProps = {
  roomId: string;
};

export const FinishGame = ({ roomId }: FinishGameProps): JSX.Element => {
  const { teams, winnerTeamIndex } = useCommonComponentState(roomId);

  const score =
    teams && winnerTeamIndex
      ? getTotalScore(
          teams[winnerTeamIndex].users,
          teams[winnerTeamIndex].guessedWords,
        )
      : 0;

  return teams && winnerTeamIndex ? (
    <>
      <div>Ура!</div>
      <h3>Команда {teams[winnerTeamIndex].name} выиграла!</h3>
      <div>
        Команда набрала {score}{' '}
        {getWordDeclension(score, ['очко', 'очка', 'очков'])}.
      </div>
    </>
  ) : (
    <div>Загрузка...</div>
  );
};
