import React, { useState } from 'react';
import styled from 'styled-components';
import { sendFeedback } from '@fb/feedback';
import { Content, Button } from '@components';
import { Theme, Color } from '@common/styles/theme';

const Textarea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 8px 16px;
  color: ${({ theme }: { theme: Theme }): Color => theme.color.white};
  background-color: ${({ theme }: { theme: Theme }): Color =>
    theme.color.purple};
  border: 1px solid
    ${({ theme }: { theme: Theme }): Color => theme.color.lightPurple};
  border-radius: 4px;
  resize: none;
`;

export const Feedback = (): JSX.Element => {
  const [value, setValue] = useState('');
  const [hasSent, setHasSent] = useState(false);

  const handleSendButton = (): void => {
    sendFeedback(value);
    setHasSent(true);
  };

  return (
    <>
      <Content.BlockWrapper>
        {hasSent ? (
          <>
            <Content.Title>Благодарю!</Content.Title>
            <Content.CenteredBlockWrapper>
              <Content.Subtitle>Я очень ценю твой отзыв!</Content.Subtitle>
            </Content.CenteredBlockWrapper>
          </>
        ) : (
          <>
            <Content.Title>Оставить отзыв</Content.Title>
            <Content.Text>
              Можешь написать здесь свои впечатления от проведённого с друзьями
              времени, рассказать, что понравилось, что можно улучшить, какие
              баги всплыли и какие фичи было бы круто добавить в проект.
            </Content.Text>
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Content.BlockWrapper>
              <Button onClick={handleSendButton}>Отправить</Button>
            </Content.BlockWrapper>
          </>
        )}
      </Content.BlockWrapper>
    </>
  );
};
