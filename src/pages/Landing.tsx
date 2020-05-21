import React from 'react';
import { Landing } from '@features';
import { AppWrapper } from '@components';

type LandingPageProps = {
  roomId: string;
};

export const LandingPage = ({ roomId }: LandingPageProps): JSX.Element => (
  <AppWrapper>
    <Landing roomId={roomId} />
  </AppWrapper>
);
