import React from 'react';
import styled from 'styled-components';
import { useLocation, useCopyToClipboard } from 'react-use';
import { Content, Button, Input } from '@components';

const Inner = styled.div`
  display: flex;
  align-items: center;
`;

const LinkInput = styled(Input)`
  flex-grow: 1;
  margin-right: 24px;
`;

export const GameLink = (): JSX.Element => {
  const { href = '' } = useLocation();
  const [{ value }, copyToClipboard] = useCopyToClipboard();

  return (
    <>
      <Content.Text>
        Вы создали комнату, теперь можете пригласить своих друзей. Скопируйте
        эту ссылку и поделитесь ею с теми, с кем хотите поиграть в ALIAS.
      </Content.Text>
      <Inner>
        <LinkInput value={href} readOnly />
        <Button onClick={() => copyToClipboard(href)}>
          {value ? 'Ссылка скопирована' : 'Скопировать ссылку'}
        </Button>
      </Inner>
    </>
  );
};
