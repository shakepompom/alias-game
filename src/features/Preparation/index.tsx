import React from 'react';
import { Button } from '@components';
import { startGame } from '@fb/room';
import { useCommonComponentState } from '@hooks';
import { User } from '@common/types';
import { Teams, Settings } from './components';

type PreparationProps = {
  roomId: string;
};

export const Preparation = ({ roomId }: PreparationProps): JSX.Element => {
  const { users, teams, isAdmin } = useCommonComponentState(roomId);

  const handleStartGame = (): void => {
    startGame(roomId);
  };

  return (
    <>
      <div>Предбанник</div>
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
                      style={{ color: isAdmin ? 'blue' : 'default' }}
                    >
                      {index + 1}. {name} ({id}){isAdmin && ' - создатель игры'}
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
