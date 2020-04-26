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
  readOnly,
  onChange,
}: InputProps): JSX.Element => (
  <input
    type={type}
    value={value}
    readOnly={readOnly}
    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
      onChange && onChange(e.target.value);
    }}
  />
);
