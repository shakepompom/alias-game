import React from 'react';
import styled from 'styled-components';

type PageWrapperProps = {
  children: JSX.Element;
};

const Wrapper = styled.div`
  position: relative;
  padding: 80px 24px 24px;
  margin: 0 auto;
`;

export const AppWrapper = ({ children }: PageWrapperProps): JSX.Element => (
  <Wrapper>{children}</Wrapper>
);
