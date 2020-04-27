import React, { useState } from 'react';
import { Button, GameRules } from '@components';
import { startGame } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { User } from '@common/types';
import { GameLink, Teams, Settings } from './components';

type PreparationProps = {
  roomId: string;
};

export const Preparation = ({ roomId }: PreparationProps): JSX.Element => {
  const [showRules, setShowRules] = useState(false);
  const { users, userId, isAdmin, teams } = useCommonComponentState(roomId);

  const handleStartGame = (): void => {
    startGame(roomId);
  };

  return showRules ? (
    <GameRules returnBackCallback={() => setShowRules(false)} />
  ) : (
    <>
      <h1>Предбанник</h1>
      <Button onClick={(): void => setShowRules(true)}>Правила игры</Button>
      <GameLink />
      <div>
        {!teams?.length && (
          <div>
            Список присоединившихся пользователей:
            <ul>
              {users &&
                Object.values(users).map(
                  ({ id, name, isAdmin }: User, index: number): JSX.Element => (
                    <li
                      key={id}
                      style={{
                        color:
                          userId === id
                            ? 'green'
                            : isAdmin
                            ? 'blue'
                            : 'default',
                      }}
                    >
                      {index + 1}. {name} ({id}){userId === id && ' - это вы'}
                      {isAdmin && ' - создатель игры'}
                    </li>
                  )
                )}
            </ul>
          </div>
        )}
        <Teams roomId={roomId} />
        <Settings />
      </div>
      {isAdmin && teams?.length && (
        <div>
          <Button onClick={handleStartGame}>Начать игру</Button>
        </div>
      )}
    </>
  );
};
