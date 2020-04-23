import React from 'react';

type InputProps = {
  handleChange?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.DOMAttributes<HTMLInputElement>;

export const Input = ({
  type = 'text',
  value,
  handleChange,
}: InputProps): JSX.Element => (
  <input
    type={type}
    value={value}
    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
      handleChange && handleChange(e.target.value);
    }}
  />
);
