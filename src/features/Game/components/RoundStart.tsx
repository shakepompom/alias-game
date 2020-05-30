import React from 'react';
import { useUpdateEffect } from 'react-use';
import { setRoundStatus } from '@fb/room';
import { Content, Button } from '@components';
import { useCommonComponentState, getRoundWordsSet } from '@hooks';

type RoundStartProps = {
  roomId: string;
  isActiveUser: boolean;
  wordsSet: string[];
  setWordsSet: Function;
};

export const RoundStart = ({
  roomId,
  isActiveUser,
  wordsSet,
  setWordsSet,
}: RoundStartProps): JSX.Element => {
  const { wordsOrder, teams, round, activeTeamOrder } = useCommonComponentState(
    roomId,
  );

  const handleButtonStartRound = (): void => {
    setRoundStatus(roomId, 'progress');
  };

  const getWordsSet = async (): Promise<void> => {
    const set = await getRoundWordsSet({
      wordsOrder,
      round,
      teamsLength: teams?.length,
      activeTeamOrder,
    });

    if (wordsSet[0] !== set[0]) {
      setWordsSet(set);
    }
  };

  useUpdateEffect(() => {
    if (isActiveUser) {
      getWordsSet();
    }
  }, [isActiveUser, setWordsSet, wordsOrder, round, teams, activeTeamOrder]);

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
