import React from 'react';
import { useCommonComponentState } from '@hooks';
import { Content } from '@components';
import { getTotalScore, getWordDeclension } from '@utils';

type FinishGameProps = {
  roomId: string;
};

export const FinishGame = ({ roomId }: FinishGameProps): JSX.Element => {
  const { teams, winnersIndices } = useCommonComponentState(roomId);
  const isPluralWinners =
    typeof winnersIndices === 'object' && winnersIndices?.length > 1;
  const score =
    teams && typeof winnersIndices === 'object'
      ? getTotalScore(
          teams[winnersIndices[0]].users,
          teams[winnersIndices[0]].guessedWords
        )
      : 0;

  return (
    <>
      {teams && typeof winnersIndices === 'object' ? (
        <Content.CenteredBlockWrapper>
          <Content.Subtitle>Ура!</Content.Subtitle>
          <Content.Title>
            {isPluralWinners ? 'Команды ' : 'Команда '}
            {teams &&
              teams
                .filter((_, index) => winnersIndices.includes(index))
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
    </>
  );
};
