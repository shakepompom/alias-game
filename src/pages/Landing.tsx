import React from 'react';
import { Landing } from '@features';

type LandingPageProps = {
  roomId: string;
};

export const LandingPage = (props: LandingPageProps): JSX.Element => (
  <Landing {...props} />
);
