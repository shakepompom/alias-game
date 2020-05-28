import React from 'react';
import { useCommonComponentState } from '@hooks';
import { Content, Header } from '@components';
import { getTotalScore, getWordDeclension } from '@utils';

type FinishGameProps = {
  roomId: string;
};

export const FinishGame = ({ roomId }: FinishGameProps): JSX.Element => {
  const { teams, winnerTeamIndex } = useCommonComponentState(roomId);

  const score =
    teams && typeof winnerTeamIndex === 'number'
      ? getTotalScore(
          teams[winnerTeamIndex].users,
          teams[winnerTeamIndex].guessedWords,
        )
      : 0;

  return (
    <>
      <Header roomId={roomId} />
      {teams && typeof winnerTeamIndex === 'number' ? (
        <Content.CenteredBlockWrapper>
          <Content.Subtitle>Ура!</Content.Subtitle>
          <Content.Title>
            Команда {teams[winnerTeamIndex].name} выиграла!
          </Content.Title>
          <Content.Subtitle>
            Команда набрала {score}{' '}
            {getWordDeclension(score, ['очко', 'очка', 'очков'])}.
          </Content.Subtitle>
        </Content.CenteredBlockWrapper>
      ) : (
        <div>Загрузка...</div>
      )}
    </>
  );
};
