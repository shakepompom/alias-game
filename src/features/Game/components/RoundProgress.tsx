import React from 'react';

type RoundProgressProps = {
  isActiveUser: boolean;
  time: number;
};

const transformTimerToFriendlyDisplaying = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const RoundProgress = ({
  isActiveUser,
  time,
}: RoundProgressProps): JSX.Element => {
  return (
    <div>
      <h2>RoundProgress</h2>
      <div>{transformTimerToFriendlyDisplaying(time)}</div>
    </div>
  );
};
