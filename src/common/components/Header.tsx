import React from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { signOut } from '@fb/auth';
import { Button } from '@components';

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
  children?: React.ReactNode;
};

export const Header = ({ children }: HeaderProps): JSX.Element => {
  const [user, loading, error] = useAuthState(auth);

  const handleLogout = (): void => {
    signOut();
    window.location.replace(`/`);
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
