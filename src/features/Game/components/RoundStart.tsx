import React from 'react';
import { setRoundStatus } from '@fb/room';
import { Content, Button } from '@components';

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
    <>
      {isActiveUser && (
        <>
          <Content.Text>
            Для определения статуса слова, можно кликать по кнопкам
            &quot;Пропустить&quot; и &quot;Угадали&quot;.
          </Content.Text>
          <Content.Text>
            Или по стрелочкам на клавиатуре &quot;Влево&quot; и
            &quot;Вправо&quot; соответственно.
          </Content.Text>
          <Content.Text>&#8592; Пропустить / Угадали &#8594;</Content.Text>
        </>
      )}
      <Content.Subtitle>
        {isActiveUser
          ? 'Если твоя команда готова, жми кнопку ниже'
          : 'Команда, будьте готовы!'}
      </Content.Subtitle>
      {isActiveUser && <Button onClick={handleButtonStartRound}>Начать</Button>}
    </>
  );
};
