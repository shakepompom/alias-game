import React from 'react';
import { setRoundStatus } from '@fb/room';
import { Button } from '@components';

type RoundStartProps = {
  roomId: string;
  isActiveUser: boolean;
  start: Function;
};

export const RoundStart = ({
  roomId,
  isActiveUser,
  start,
}: RoundStartProps): JSX.Element => {
  const handleButtonStartRound = (): void => {
    setRoundStatus(roomId, true);
    start();
  };

  return (
    <div>
      <h2>RoundStart</h2>
      <div>
        {isActiveUser
          ? 'Если твоя команда готова, жми кнопку ниже'
          : 'Команда, будьте готовы!'}
      </div>
      {isActiveUser && <h3 style={{ color: 'green' }}>Я вижу тут кнопку</h3>}
      {/* TODO: Show this button if user is active */}
      <div>
        Для определения статуса слова, можно кликать по кнопкам "Пропустить" и
        "Угадали" или по стрелочкам на клавиатуре "Влево" и "Вправо"
        соответственно.
      </div>
      <div>{`"<- Пропустить" / "Угадали ->"`}</div>
      <div>
        <Button onClick={handleButtonStartRound}>Начать</Button>
      </div>
    </div>
  );
};
