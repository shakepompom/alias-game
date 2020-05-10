import React, { useState } from 'react';
import { useKeyPressEvent } from 'react-use';
import { useCommonComponentState } from '@hooks';
import { Button } from '@components';

type RoundProgressProps = {
  roomId: string;
  isActiveUser: boolean;
  time: number;
  isRunning: boolean;
};

type WordsStatus = {
  skipped: string[];
  guessed: string[];
};

const transformTimerToFriendlyDisplaying = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const RoundProgress = ({
  roomId,
  isActiveUser,
  time,
  isRunning,
}: RoundProgressProps): JSX.Element => {
  const { teams, round, activeTeamOrder } = useCommonComponentState(roomId);
  const [wordsStatus, setWordsStatus] = useState<WordsStatus>({
    skipped: [],
    guessed: [],
  });

  const handleSkipAction = (): void =>
    setWordsStatus({
      ...wordsStatus,
      skipped: [...wordsStatus.skipped, 'Слово'],
    });
  const handleGuessAction = (): void =>
    setWordsStatus({
      ...wordsStatus,
      guessed: [...wordsStatus.guessed, 'Слово'],
    });
  useKeyPressEvent('ArrowLeft', handleSkipAction);
  useKeyPressEvent('ArrowRight', handleGuessAction);

  return (
    <div>
      <h2>RoundProgress</h2>
      <div>{transformTimerToFriendlyDisplaying(time)}</div>
      {isActiveUser && (
        <h3 style={{ color: 'green' }}>Я вижу тут слово и кнопки</h3>
      )}
      {/* TODO: Show this word and buttons if user is active */}
      <h3>Слово</h3>
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
                console.log(index, name);
              }}
            >
              {name}
            </Button>
          ))}
          <Button
            onClick={() => {
              console.log('Никто');
            }}
          >
            Никто
          </Button>
        </>
      )}
    </div>
  );
};
