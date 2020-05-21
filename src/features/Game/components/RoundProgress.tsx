import React, { useState } from 'react';
import { useKeyPressEvent, useEffectOnce } from 'react-use';
import { useTimer } from 'use-timer';
import styled from 'styled-components';
import { WordStatus } from '@common/types';
import {
  sendTeamRoundResult,
  sendLastWordRoundResult,
  setRoundStatus,
} from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Content, Button } from '@components';

const Word = styled(Content.Title)`
  margin: 40px 0;
  font-size: 44px;
  font-weight: 600;
`;

const StyledButton = styled(Button)`
  margin: 0 16px;
`;

type RoundProgressProps = {
  roomId: string;
  isActiveUser: boolean;
  timerDuration: number;
};

// TODO: replace this words with words from server
const wordsSet = [
  'Машина',
  'Собака',
  'Игра',
  'Понедельник',
  'Красный крест',
  'Пюпитр',
  'Массив',
  'Счастье',
  'Юла',
  'Тетрадь',
];

const transformTimerToFriendlyDisplaying = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const RoundProgress = ({
  roomId,
  isActiveUser,
  timerDuration,
}: RoundProgressProps): JSX.Element => {
  const { time, start, isRunning } = useTimer({
    initialTime: timerDuration,
    endTime: 0,
    timerType: 'DECREMENTAL',
  });

  useEffectOnce(() => {
    start();
  });

  const { teams, gameId, round, activeTeamOrder } = useCommonComponentState(
    roomId,
  );
  const [wordIndexFromSet, setWordIndexFromSet] = useState(0);
  const [wordsStatus, setWordsStatus] = useState<WordStatus[]>([]);

  const showNextWord = (): void => {
    setWordIndexFromSet(wordIndexFromSet + 1);
  };

  const handleButton = (status: boolean): void => {
    showNextWord();
    setWordsStatus([
      ...wordsStatus,
      {
        word: wordsSet[wordIndexFromSet],
        status,
      },
    ]);
  };
  const handleSkipAction = (): void => handleButton(false);
  const handleGuessAction = (): void => handleButton(true);
  useKeyPressEvent('ArrowLeft', handleSkipAction);
  useKeyPressEvent('ArrowRight', handleGuessAction);

  const handleGuessLastWord = (teamIndex: number | null): void => {
    const userIndex =
      round % Object.values(teams[activeTeamOrder].users).length;

    sendTeamRoundResult(
      roomId,
      gameId,
      activeTeamOrder,
      userIndex,
      round,
      wordsStatus,
    );

    if (teamIndex !== null) {
      const result = {
        word: wordsSet[wordIndexFromSet],
        status: true,
      };

      sendLastWordRoundResult(roomId, gameId, teamIndex, round, result);
    }

    setRoundStatus(roomId, 'result');
  };

  return (
    <>
      <Content.Subtitle>
        {transformTimerToFriendlyDisplaying(time)}
      </Content.Subtitle>
      {isActiveUser && (
        <>
          <Word>{wordsSet[wordIndexFromSet]}</Word>
          {isRunning ? (
            <div>
              <StyledButton onClick={handleSkipAction}>
                &#8592; Пропустить
              </StyledButton>
              <StyledButton onClick={handleGuessAction}>
                Угадали &#8594;
              </StyledButton>
            </div>
          ) : (
            <>
              <Content.Text>
                Выбери команду, которая угадала последнее слово
              </Content.Text>
              {teams?.map(({ name }, index) => (
                <StyledButton
                  key={name}
                  onClick={() => {
                    handleGuessLastWord(index);
                  }}
                >
                  {name}
                </StyledButton>
              ))}
              <StyledButton
                onClick={() => {
                  handleGuessLastWord(null);
                }}
              >
                Никто
              </StyledButton>
            </>
          )}
        </>
      )}
    </>
  );
};
