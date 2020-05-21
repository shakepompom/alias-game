import React from 'react';
import { useCommonComponentState } from '@hooks';
import { Content } from '@components';

type SettingsProps = {
  roomId: string;
};

export const Settings = ({ roomId }: SettingsProps): JSX.Element => {
  const { settings } = useCommonComponentState(roomId);

  return (
    <Content.BlockWrapper>
      <Content.Subtitle>Настройки:</Content.Subtitle>
      <Content.Ul>
        <Content.Li>Длительность хода: {settings?.timer} секунд</Content.Li>
        <Content.Li>
          Количество очков для победы: {settings?.pointsToWin}
        </Content.Li>
        <Content.Li>
          Последнее слово в ходе:{' '}
          {settings?.isLastWordToGuess
            ? 'могут угадывать все команды'
            : 'никто не угадывает'}
        </Content.Li>
      </Content.Ul>
    </Content.BlockWrapper>
  );
};
