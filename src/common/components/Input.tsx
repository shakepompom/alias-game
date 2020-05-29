import React from 'react';
import styled from 'styled-components';
import { Theme, Color } from '@styles/theme';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  margin-bottom: 16px;
`;

const InputLabel = styled.label`
  margin-bottom: 8px;
`;

const InputField = styled.input`
  padding: 8px 16px;
  color: ${({ theme }: { theme: Theme }): Color => theme.color.white};
  background-color: ${({ theme }: { theme: Theme }): Color =>
    theme.color.purple};
  border: 1px solid
    ${({ theme }: { theme: Theme }): Color => theme.color.lightPurple};
  border-radius: 4px;
`;

type InputProps = {
  label?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  type = 'text',
  value,
  min,
  readOnly,
  onChange,
  className,
}: InputProps): JSX.Element => (
  <Wrapper className={className}>
    <InputLabel>{label}</InputLabel>
    <InputField
      type={type}
      value={value}
      min={min}
      readOnly={readOnly}
      onChange={onChange}
    />
  </Wrapper>
);
