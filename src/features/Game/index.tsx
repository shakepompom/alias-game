import React, { useState } from 'react';
import { TeamsList } from '@components';
import { useCommonComponentState } from '@hooks';
import { RoundStart, RoundProgress, RoundResults } from './components';

type GameProps = {
  roomId: string;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const [isActiveUser, setIsActiveUser] = useState(false);
  const { roundStatus, settings } = useCommonComponentState(roomId);

  const renderGameContent = (): JSX.Element | null => {
    switch (roundStatus) {
      case 'start':
        return <RoundStart roomId={roomId} isActiveUser={isActiveUser} />;
      case 'progress':
        return (
          <RoundProgress
            roomId={roomId}
            isActiveUser={isActiveUser}
            timerDuration={settings?.timer}
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
      <h1>Дашборд</h1>
      <TeamsList roomId={roomId} setIsActiveUser={setIsActiveUser} />
      <div>{renderGameContent()}</div>
    </>
  );
};
