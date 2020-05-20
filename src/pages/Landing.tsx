import React from 'react';
import { Landing } from '@features';
import { AppWrapper } from '@components';

type LandingPageProps = {
  roomId: string;
};

export const LandingPage = (props: LandingPageProps): JSX.Element => (
  <AppWrapper>
    <Landing {...props} />
  </AppWrapper>
);
