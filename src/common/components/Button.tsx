import React from 'react';

type ButtonProps = {
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.DOMAttributes<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  onClick,
  children,
}: ButtonProps): JSX.Element => (
  <button type={type} onClick={onClick}>
    {children}
  </button>
);
