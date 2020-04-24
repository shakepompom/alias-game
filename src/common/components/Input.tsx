import React from 'react';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  onChange?: (value: string) => void;
};

export const Input = ({
  type = 'text',
  value,
  onChange,
}: InputProps): JSX.Element => (
  <input
    type={type}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e.target.value);
    }}
  />
);
