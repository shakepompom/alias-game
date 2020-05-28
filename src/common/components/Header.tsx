import React from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { signOut } from '@fb/auth';
import { removeUser, setNewAdmin } from '@fb/user';
import { removeRoom } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Button } from '@components';
import { getNewAdmin } from '@utils';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

const LogoutButton = styled(Button)`
  margin-left: auto;
`;

type HeaderProps = {
  roomId: string;
  children?: React.ReactNode;
};

export const Header = ({ roomId, children }: HeaderProps): JSX.Element => {
  const [user, loading, error] = useAuthState(auth);
  const { users, isAdmin } = useCommonComponentState(roomId);

  const handleLogout = (): void => {
    signOut();
    removeUser(roomId, user?.uid);
    window.location.replace(`/`);

    if (isAdmin && users) {
      const newAdminId = getNewAdmin(users);
      setNewAdmin(roomId, newAdminId);
    }

    if (users && Object.keys(users).length === 1) {
      removeRoom(roomId);
    }
  };

  return (
    <Wrapper>
      {children}
      {user?.uid && (
        <LogoutButton kind="secondary" onClick={handleLogout}>
          Выйти
        </LogoutButton>
      )}
    </Wrapper>
  );
};
