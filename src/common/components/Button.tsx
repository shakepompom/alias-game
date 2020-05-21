import React from 'react';
import styled from 'styled-components';
import { Theme } from '@styles/theme';

type Kind = 'primary' | 'secondary';
type getButtonStylesTypes = {
  kind: Kind;
  theme: Theme;
};

const getButtonStyles = ({ kind, theme }: getButtonStylesTypes): string => {
  const kindsMap = {
    primary: `
      color: ${theme.color.purple};
      background-color: ${theme.color.yellow};
      border: 1px solid ${theme.color.yellow};
      `,
    secondary: `
      font-size: ${theme.font.size.small};
      color: ${theme.color.white};
      background-color: ${theme.color.purple};
      border: 1px solid ${theme.color.lightPurple};
    `,
  };

  return kindsMap[kind];
};

const Wrapper = styled.button`
  ${getButtonStyles};
  padding: 8px 16px;
  border-radius: 4px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &[disabled] {
    opacity: 0.3;
    pointer-events: none;
  }
`;

type ButtonProps = {
  kind?: Kind;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.DOMAttributes<HTMLButtonElement>;

export const Button = ({
  type = 'button',
  kind = 'primary',
  disabled,
  onClick,
  children,
  className,
}: ButtonProps): JSX.Element => (
  <Wrapper
    type={type}
    kind={kind}
    disabled={disabled}
    onClick={onClick}
    className={className}
  >
    {children}
  </Wrapper>
);
