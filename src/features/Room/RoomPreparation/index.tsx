import React, { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import styled from 'styled-components';
import { Button } from '@components';
import { removeTeams, startGame, setWordsOrder } from '@fb/room';
import { getAllWords } from '@fb/words';
import { useCommonComponentState } from '@hooks';
import { Content } from '@components';
import { generateRandomNumbersArray, isNewUserJoined } from '@utils';
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

const Warning = styled.div`
  color: ${({ theme }: { theme: Theme }): Color => theme.color.yellow};
`;

type RoomPreparationProps = {
  // TODO получать roomId из параметров
  roomId: string;
};

export const RoomPreparation: React.FC<RoomPreparationProps> = ({ roomId }) => {
  const [allWordsLength, setAllWordsLength] = useState(0);
  const { users, userId, isAdmin, teams, gameId } = useCommonComponentState(
    roomId
  );

  const handleStartGame = (): void => {
    const wordsOrder = generateRandomNumbersArray(allWordsLength);

    setWordsOrder(roomId, gameId, wordsOrder);
    startGame(roomId);
  };

  useUpdateEffect(() => {
    if (isAdmin) {
      getAllWords().then((snapshot) => {
        if (snapshot.val().length !== allWordsLength) {
          setAllWordsLength(snapshot.val().length);
        }
      });
    }
  }, [isAdmin, setAllWordsLength]);

  return (
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
                  ({ id, name, isAdmin }, index: number): JSX.Element => (
                    <StyledUser key={id} isCurrent={userId === id}>
                      {index + 1}. {name}
                      {userId === id && ' - это ты'}
                      {isAdmin && ' - создатель игры'}
                    </StyledUser>
                  )
                )}
            </Content.Ul>
          </Content.BlockWrapper>
        )}
        <Teams roomId={roomId} />
        {teams?.length && isAdmin && (
          <Content.CenteredBlockWrapper>
            <Button onClick={() => removeTeams(roomId, gameId)}>
              Перераспределить команды
            </Button>
          </Content.CenteredBlockWrapper>
        )}
        <Settings roomId={roomId} />
      </div>
      {users && teams && isNewUserJoined(users, teams) && (
        <Content.BlockWrapper>
          <Warning>
            Пришёл новый игрок. Создатель может сделать перераспределение по
            командам.
          </Warning>
        </Content.BlockWrapper>
      )}
      {isAdmin && teams?.length && (
        <div>
          <Button onClick={handleStartGame}>Начать игру</Button>
        </div>
      )}
    </>
  );
};
