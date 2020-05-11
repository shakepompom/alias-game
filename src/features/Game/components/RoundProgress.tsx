import React, { useState } from 'react';
import { useKeyPressEvent, useEffectOnce } from 'react-use';
import { WordStatus } from '@common/types';
import { sendTeamRoundResult, sendLastWordRoundResult } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Button } from '@components';

type RoundProgressProps = {
  roomId: string;
  isActiveUser: boolean;
  start: Function;
  time: number;
  isRunning: boolean;
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
  start,
  time,
  isRunning,
}: RoundProgressProps): JSX.Element => {
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
  };

  return (
    <div>
      <h2>RoundProgress</h2>
      <div>{transformTimerToFriendlyDisplaying(time)}</div>
      {isActiveUser && (
        <h3 style={{ color: 'green' }}>Я вижу тут слово и кнопки</h3>
      )}
      {/* TODO: Show this word and buttons if user is active */}
      <h3 style={{ color: 'red' }}>{wordsSet[wordIndexFromSet]}</h3>
      {isRunning ? (
        <div>
          <Button onClick={handleSkipAction}>Пропустить</Button>
          <Button onClick={handleGuessAction}>Угадали</Button>
        </div>
      ) : (
        <>
          <div>Выбери команду, которая угадала последнее слово</div>
          {teams?.map(({ name }, index) => (
            <Button
              key={name}
              onClick={() => {
                handleGuessLastWord(index);
              }}
            >
              {name}
            </Button>
          ))}
          <Button
            onClick={() => {
              handleGuessLastWord(null);
            }}
          >
            Никто
          </Button>
        </>
      )}
    </div>
  );
};
