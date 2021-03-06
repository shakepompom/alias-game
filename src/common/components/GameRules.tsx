import React from 'react';
import styled from 'styled-components';
import { Content } from './Content';
import { Button } from './Button';

const BackButton = styled(Button)`
  display: block;
  margin: 40px auto 0;
`;

type GameRulesProps = {
  returnBackCallback: Function;
};

export const GameRules = ({
  returnBackCallback,
}: GameRulesProps): JSX.Element => (
  <div>
    <Content.Title>Правила игры:</Content.Title>
    <Content.Ul>
      <Content.Li>
        ALIAS - словесная развивающая командная игра, в которой каждый ход один
        игрок из команды объясняет слова своим товарищам по команде, а команда
        должна отгадать, как можно больше слов. Игроки играют по очереди в этой
        роли.
      </Content.Li>
      <Content.Li>
        Для старта игры должно быть не менее двух команд и, по крайней мере, по
        два игрока в каждой команде.
      </Content.Li>
      <Content.Li>
        За каждое правильно отгаданное слово команда получает очко. Команда,
        которая наберет наибольшее количество очков, побеждает.
      </Content.Li>
      <Content.Li>
        При объяснении нельзя использовать однокоренные слова, использовать
        переводы на иностранные языки и явно показывать слово жестами.
      </Content.Li>
    </Content.Ul>
    <Content.BlockWrapper>
      <Content.Subtitle>Начисление очков</Content.Subtitle>
      <Content.Ul>
        <Content.Li>
          За отгаданное слово команда получает 1 очко. За пропущенное слово - 0
          очков или минус 1. Этот параметр можно задать в настройках игры.
        </Content.Li>
        <Content.Li>
          По истечению времени, отведенного на игру, если команда не успела
          ответить на последнее слово, слово могут отгадывать все команды. В
          этом случае 1 балл получит команда, отгадавшая слово. Если ни одна из
          команд не отгадала последнее слово, слово пропускается. Можно
          поставить такую настройку, что при истечении времени слово отгадывать
          никто не будет.
        </Content.Li>
      </Content.Ul>
    </Content.BlockWrapper>
    <Content.BlockWrapper>
      <Content.Subtitle>Определение победителя</Content.Subtitle>
      <Content.Ul>
        <Content.Li>
          Игра длится до тех пор, пока одна из команд не наберет необходимое для
          победы количество очков.
        </Content.Li>
      </Content.Ul>
    </Content.BlockWrapper>
    <BackButton onClick={() => returnBackCallback()}>
      Вернуться обратно
    </BackButton>
  </div>
);
