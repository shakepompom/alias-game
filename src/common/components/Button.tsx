import React from 'react';

type ButtonProps = {
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.DOMAttributes<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  disabled,
  onClick,
  children,
}: ButtonProps): JSX.Element => (
  <button type={type} disabled={disabled} onClick={onClick}>
    {children}
  </button>
);
