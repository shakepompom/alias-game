import React from 'react';
import { Content, Button } from '@components';

export const EmptyRoom = (): JSX.Element => (
  <Content.BlockWrapper>
    <Content.Text>Такой комнаты не существует.</Content.Text>
    <Button onClick={() => (window.location.href = '/')}>На главную</Button>
  </Content.BlockWrapper>
);
