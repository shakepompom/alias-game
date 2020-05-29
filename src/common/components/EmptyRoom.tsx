import React from 'react';
import { Content, Button } from '@components';
import { ROUTES } from '@common/constants';

export const EmptyRoom = (): JSX.Element => (
  <Content.BlockWrapper>
    <Content.Text>Такой комнаты не существует.</Content.Text>
    <Button onClick={() => (window.location.href = ROUTES.LANDING)}>
      На главную
    </Button>
  </Content.BlockWrapper>
);
