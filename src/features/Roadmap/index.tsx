import React from 'react';
import { Content, Header, Footer, Button } from '@components';
import { ROUTES } from '@common/constants';

export const Roadmap = (): JSX.Element => (
  <>
    <Header>
      <Button onClick={() => (window.location.href = ROUTES.LANDING)}>
        На главную
      </Button>
    </Header>
    <Content.Title>Roadmap</Content.Title>
    <Content.BlockWrapper>
      <Content.Ul>
        <Content.Subtitle>v1.2.0 (Q3'2020)</Content.Subtitle>
        <Content.Li>Изменение настроек игры</Content.Li>
        <Content.Li>Изменение названия команд</Content.Li>
        <Content.Li>
          Возможность выйти во время игры (вопрос на засыпку: что должно
          происходить с игрой, если в команде останется 1 человек?)
        </Content.Li>
      </Content.Ul>
      <Content.Ul>
        <Content.Subtitle>v1.3.0 (Q4'2020)</Content.Subtitle>
        <Content.Li>
          Подключение по видео-связи в приложении без использования сторонних
          сервисов (Google Meet, Zoom, Skype...)
        </Content.Li>
        <Content.Li>Мобильная версия</Content.Li>
        <Content.Li>
          Изменение состава команд (не рандомное, а кто с кем хочет)
        </Content.Li>
        <Content.Li>
          Рандомное распределение по командам будет более рандомным
        </Content.Li>
      </Content.Ul>
    </Content.BlockWrapper>
    <Footer />
  </>
);
