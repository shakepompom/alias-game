import React from 'react';
import { switchNextOrder } from '@fb/room';
import { TeamsList, Button } from '@components';
import { useCommonComponentState } from '@hooks';

type GameProps = {
  roomId: string;
};

export const Game = ({ roomId }: GameProps): JSX.Element => {
  const { orderIndex, order } = useCommonComponentState(roomId);

  const handleClickSwitchOrder = (): void => {
    const newIndex = orderIndex === order.length - 1 ? 0 : orderIndex + 1;

    switchNextOrder(roomId, newIndex);
  };

  return (
    <>
      <div>Дашборд</div>
      <TeamsList roomId={roomId} />
      {/* TODO: Show this button if user is active */}
      <div>
        <Button onClick={handleClickSwitchOrder}>
          Передать ход следующей команде
        </Button>
      </div>
    </>
  );
};
