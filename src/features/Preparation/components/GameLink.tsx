import React from 'react';
import { useLocation, useCopyToClipboard } from 'react-use';
import { Button, Input } from '@components';

export const GameLink = (): JSX.Element => {
  const { href = '' } = useLocation();
  const [{ value }, copyToClipboard] = useCopyToClipboard();

  return (
    <>
      <div>
        Вы создали комнату, теперь можете пригласить своих друзей. Скопируйте
        эту ссылку и поделитесь ею с теми, с кем хотите поиграть в ALIAS.
      </div>
      <div>
        <Input value={href} readOnly />
        <Button onClick={(): void => copyToClipboard(href)}>
          {value ? 'Ссылка скопирована' : 'Скопировать ссылку'}
        </Button>
      </div>
    </>
  );
};
