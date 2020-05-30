import React from 'react';
import { useLocation } from 'react-use';
import { Landing } from '@features';
import { AppWrapper } from '@components';

const LandingPage = (): JSX.Element => {
  const { pathname = '' } = useLocation();
  const roomId = pathname.slice(1);

  return (
    <AppWrapper>
      <Landing roomId={roomId} />
    </AppWrapper>
  );
};

export default LandingPage;
