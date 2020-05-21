import React from 'react';
import { setRoundStatus } from '@fb/room';
import { Button } from '@components';

type RoundStartProps = {
  roomId: string;
  isActiveUser: boolean;
};

export const RoundStart = ({
  roomId,
  isActiveUser,
}: RoundStartProps): JSX.Element => {
  const handleButtonStartRound = (): void => {
    setRoundStatus(roomId, 'progress');
  };

  return (
    <div>
      <h2>RoundStart</h2>
      <div>
        {isActiveUser
          ? 'Если твоя команда готова, жми кнопку ниже'
          : 'Команда, будьте готовы!'}
      </div>
      {isActiveUser && (
        <>
          <div>
            Для определения статуса слова, можно кликать по кнопкам
            &quot;Пропустить&quot; и &quot;Угадали&quot; или по стрелочкам на
            клавиатуре &quot;Влево&quot; и &quot;Вправо&quot; соответственно.
          </div>
          <div>{`"<- Пропустить" / "Угадали ->"`}</div>
          <div>
            <Button onClick={handleButtonStartRound}>Начать</Button>
          </div>
        </>
      )}
    </div>
  );
};
