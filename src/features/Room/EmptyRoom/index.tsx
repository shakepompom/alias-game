import React from 'react';
import { Content, Button } from '@components';
import { ROUTES } from '@common/constants/routes';
import { useHistory } from 'react-router';

// TODO Перенести в features
export const EmptyRoom = (): JSX.Element => {
  const history = useHistory();

  return (
    <Content.BlockWrapper>
      <Content.Text>Такой комнаты не существует.</Content.Text>
      <Button onClick={() => history.push(ROUTES.MAIN)}>На главную</Button>
    </Content.BlockWrapper>
  );
};
