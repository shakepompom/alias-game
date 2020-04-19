import React from 'react';

type InputProps = {
  onChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.DOMAttributes<HTMLInputElement>;

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
