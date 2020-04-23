import React from 'react';

type ButtonProps = {
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.DOMAttributes<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  disabled,
  handleClick,
  children,
}: ButtonProps): JSX.Element => (
  <button type={type} disabled={disabled} onClick={handleClick}>
    {children}
  </button>
);
