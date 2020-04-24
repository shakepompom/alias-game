import React from 'react';

export const Settings = (): JSX.Element => {
  return (
    <div>
      Настройки:
      <ul>
        <li>Длительность хода: 60 секунд</li>
        <li>Количество очков для победы: 100</li>
        <li>Последнее слово в ходе: могут угадывать все команды</li>
      </ul>
    </div>
  );
};
