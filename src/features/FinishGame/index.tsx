import React from 'react';
import { useCommonComponentState } from '@hooks';
import { Content, Header, Footer } from '@components';
import { getTotalScore, getWordDeclension } from '@utils';

type FinishGameProps = {
  roomId: string;
};

export const FinishGame = ({ roomId }: FinishGameProps): JSX.Element => {
  const { teams, winnerTeamIndex } = useCommonComponentState(roomId);
  const isPluralWinners = winnerTeamIndex?.length > 1;
  const score =
    teams && typeof winnerTeamIndex === 'object'
      ? getTotalScore(
          teams[winnerTeamIndex[0]].users,
          teams[winnerTeamIndex[0]].guessedWords,
        )
      : 0;

  return (
    <>
      <Header roomId={roomId} />
      {teams && typeof winnerTeamIndex === 'object' ? (
        <Content.CenteredBlockWrapper>
          <Content.Subtitle>Ура!</Content.Subtitle>
          <Content.Title>
            {isPluralWinners ? 'Команды ' : 'Команда '}
            {teams &&
              teams
                .filter((_, index) => winnerTeamIndex.includes(index))
                .map(({ name }, index) => (index === 0 ? name : ` и ${name}`))}
            {isPluralWinners ? ' выиграли' : ' выиграла'}!
          </Content.Title>
          <Content.Subtitle>
            {isPluralWinners ? 'Команды набрали по ' : 'Команда набрала '}
            {score} {getWordDeclension(score, ['очко', 'очка', 'очков'])}.
          </Content.Subtitle>
        </Content.CenteredBlockWrapper>
      ) : (
        <div>Загрузка...</div>
      )}
      <Footer />
    </>
  );
};
