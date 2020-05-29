import React from 'react';
import styled from 'styled-components';

type PageWrapperProps = {
  children: React.ReactNode;
};

const Wrapper = styled.div`
  position: relative;
  max-width: 1200px;
  min-height: 100vh;
  padding: 0 24px 170px;
  margin: 0 auto;
`;

export const AppWrapper = ({ children }: PageWrapperProps): JSX.Element => (
  <Wrapper>{children}</Wrapper>
);
