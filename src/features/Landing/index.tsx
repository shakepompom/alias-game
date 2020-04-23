import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Input } from '@components';
import { signIn } from '@fb/auth';
import { addUser } from '@fb/user';
import { addRoom } from '@fb/room';

type LandingProps = {
  roomId: string;
};

export const Landing = ({ roomId }: LandingProps): JSX.Element => {
  const [userName, setUserName] = useState('');

  const handleCreateRoom = (user: firebase.User): void => {
    const ruuid = uuid();
    const userData = {
      id: user?.uid,
      name: userName,
      isAdmin: true,
    };

    window.location.replace(`/${ruuid}`);
    addRoom(ruuid, userData);
  };

  const handleJoinRoom = (user: firebase.User): void => {
    const userData = {
      id: user?.uid,
      name: userName,
      isAdmin: false,
    };

    addUser(roomId, userData);
  };

  return (
    <>
      <div>Welcome to alias game!</div>
      <div>
        Enter your name:
        <Input
          value={userName}
          handleChange={(val: string): void => setUserName(val)}
        />
      </div>
      {roomId ? (
        <Button
          disabled={!userName}
          handleClick={(): void => signIn({ loggedInCallback: handleJoinRoom })}
        >
          Join game
        </Button>
      ) : (
        <Button
          disabled={!userName}
          handleClick={(): void =>
            signIn({ loggedInCallback: handleCreateRoom })
          }
        >
          Start game
        </Button>
      )}
    </>
  );
};
