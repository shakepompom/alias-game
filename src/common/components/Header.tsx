import React from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { signOut } from '@fb/auth';
import { removeUser, setNewAdmin } from '@fb/user';
import { removeRoom } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Button } from '@components';
import { ROUTES } from '@common/constants';
import { getNewAdmin, isCurrentUserInAnyTeam } from '@utils';
import { Theme, Color } from '../styles/theme';

const Wrapper = styled.div``;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

const LogoutButton = styled(Button)`
  margin-left: auto;
`;

const Warning = styled.div`
  color: ${({ theme }: { theme: Theme }): Color => theme.color.yellow};
  text-align: center;
`;

type HeaderProps = {
  roomId: string;
  children?: React.ReactNode;
};

export const Header = ({ roomId, children }: HeaderProps): JSX.Element => {
  const [user, loading, error] = useAuthState(auth);
  const { users, teams, isAdmin } = useCommonComponentState(roomId);

  const handleLogout = (): void => {
    signOut();
    removeUser(roomId, user?.uid);
    window.location.replace(ROUTES.LANDING);

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
      <Inner>
        {children}
        {user?.uid && (
          <LogoutButton kind="secondary" onClick={handleLogout}>
            Выйти
          </LogoutButton>
        )}
      </Inner>
      {roomId && teams && !isCurrentUserInAnyTeam(user?.uid, teams) && (
        <Warning>
          Игра уже началась. Ты можешь просто наблюдать за процессом.
        </Warning>
      )}
    </Wrapper>
  );
};
