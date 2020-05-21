import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, GameRules } from '@components';
import { startGame } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { User } from '@common/types';
import { Header, Content } from '@components';
import { GameLink, Teams, Settings } from './components';
import { Theme, Color } from '@styles/theme';

type ScPropsType = {
  theme: Theme;
  isCurrent: boolean;
};

const StyledUser = styled(Content.Li)<Pick<ScPropsType, 'isCurrent'>>`
  color: ${({ isCurrent, theme }): Color =>
    isCurrent ? theme.color.yellow : theme.color.default};
`;

type PreparationProps = {
  roomId: string;
};

export const Preparation = ({ roomId }: PreparationProps): JSX.Element => {
  const [showRules, setShowRules] = useState(false);
  const { users, userId, isAdmin, teams } = useCommonComponentState(roomId);

  const handleStartGame = (): void => {
    startGame(roomId);
  };

  return (
    <>
      <Header>
        {!showRules ? (
          <Button onClick={() => setShowRules(true)}>Правила игры</Button>
        ) : (
          <></>
        )}
      </Header>
      {showRules ? (
        <GameRules returnBackCallback={() => setShowRules(false)} />
      ) : (
        <>
          <Content.Title>Предбанник</Content.Title>
          {!teams?.length && <GameLink />}
          <div>
            {!teams?.length && (
              <Content.BlockWrapper>
                <Content.Subtitle>
                  Список присоединившихся пользователей:
                </Content.Subtitle>
                <Content.Ul>
                  {users &&
                    Object.values(users).map(
                      (
                        { id, name, isAdmin }: User,
                        index: number,
                      ): JSX.Element => (
                        <StyledUser key={id} isCurrent={userId === id}>
                          {index + 1}. {name}
                          {userId === id && ' - это вы'}
                          {isAdmin && ' - создатель игры'}
                        </StyledUser>
                      ),
                    )}
                </Content.Ul>
              </Content.BlockWrapper>
            )}
            <Teams roomId={roomId} />
            <Settings roomId={roomId} />
          </div>
          {isAdmin && teams?.length && (
            <div>
              <Button onClick={handleStartGame}>Начать игру</Button>
            </div>
          )}
        </>
      )}
    </>
  );
};
