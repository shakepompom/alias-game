import React from 'react';
import { v4 as uuid } from 'uuid';
import { Button } from '@components';
import { addRoom } from '@common/firebase/roomFirebase';

export const Landing = (): JSX.Element => {
  const handleCreateRoom = (): void => {
    const ruuid = uuid();

    window.location.replace(`/${ruuid}`);
    addRoom(ruuid);
  };

  return (
    <>
      <div>Welcome to alias game!</div>
      <Button onClick={handleCreateRoom}>Start game</Button>
    </>
  );
};
