import React, { useState } from 'react';
import { useCommonComponentState } from '@hooks';
import { Content, Header, TeamsList } from '@components';
import { RoundStart, RoundProgress, RoundResults } from './components';

type GameProps = {
  roomId: string;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [wordsSet, setWordsSet] = useState<string[]>([]);
  const { roundStatus, settings } = useCommonComponentState(roomId);

  const renderGameContent = (): JSX.Element | null => {
    switch (roundStatus) {
      case 'start':
        return (
          <RoundStart
            roomId={roomId}
            isActiveUser={isActiveUser}
            wordsSet={wordsSet}
            setWordsSet={setWordsSet}
          />
        );
      case 'progress':
        return (
          <RoundProgress
            roomId={roomId}
            isActiveUser={isActiveUser}
            timerDuration={settings?.timer}
            wordsSet={wordsSet}
          />
        );
      case 'result':
        return <RoundResults roomId={roomId} isActiveUser={isActiveUser} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header roomId={roomId} />
      <Content.CenteredBlockWrapper>
        <TeamsList roomId={roomId} setIsActiveUser={setIsActiveUser} />
        <Content.BlockWrapper>
          <div>{renderGameContent()}</div>
        </Content.BlockWrapper>
      </Content.CenteredBlockWrapper>
    </>
  );
};
