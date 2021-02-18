import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { signOut } from '@fb/auth';
import { removeUser, setNewAdmin } from '@fb/user';
import { removeRoom } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { Button, GameRules } from '@components';
import { ROUTES } from '@common/constants/routes';
import { getNewAdmin, isCurrentUserInAnyTeam } from '@utils';
import { Theme, Color, FontSize } from '@styles/theme';
import { useHistory, useParams } from 'react-router';
import { RoomParams } from '@common/model/routes';

const Wrapper = styled.div`
  position: relative;
`;

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

const ControlButtons = styled.div`
  display: flex;
  gap: ${({ theme }: { theme: Theme }): FontSize => theme.font.size.small};
`;

const GameRuleWrapper = styled.div`
  background-color: ${({ theme }: { theme: Theme }): Color =>
    theme.color.deepPurple};
  position: absolute;
  z-index: 999;
`;

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [user] = useAuthState(auth);
  const { roomId } = useParams<RoomParams>();
  const { users, teams, isAdmin } = useCommonComponentState(roomId);
  const [isOpenRules, toggleRules] = useState(false);
  const history = useHistory();

  const handleLogout = (): void => {
    signOut();
    removeUser(roomId, user?.uid);
    history.push(ROUTES.MAIN);

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
        <ControlButtons>
          <Button onClick={() => history.push(ROUTES.MAIN)}>На главную</Button>
          <Button onClick={() => toggleRules(!isOpenRules)}>
            Правила игры
          </Button>
        </ControlButtons>
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
      {isOpenRules && (
        <GameRuleWrapper>
          <GameRules />
        </GameRuleWrapper>
      )}
    </Wrapper>
  );
};
