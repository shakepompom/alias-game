import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLButtonElement> &
  React.DOMAttributes<HTMLInputElement>;

export const Input = ({
  type = 'text',
  value,
  onChange,
}: InputProps): JSX.Element => (
  <input
    type={type}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
      onChange(e?.target?.value)
    }
  />
);
