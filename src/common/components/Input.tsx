import React from 'react';
import styled from 'styled-components';

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
  color: inherit;
  background-color: ${({ theme }) => theme.color.purple};
  border: 1px solid ${({ theme }) => theme.color.lightPurple};
  border-radius: 4px;
`;

type InputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  label,
  type = 'text',
  value,
  min,
  readOnly,
  onChange,
}: InputProps): JSX.Element => (
  <Wrapper>
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
