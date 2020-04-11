import React from 'react';

type ButtonProps = {
  children: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  children,
}: ButtonProps): JSX.Element => <button type={type}>{children}</button>;
