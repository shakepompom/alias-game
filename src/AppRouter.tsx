import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from '@common/constants/routes';

const StartPage = lazy(() => import('@pages/Start'));
const RoomPage = lazy(() => import('@pages/Room'));
const FeedbackPage = lazy(() => import('@pages/Feedback'));
const RoadmapPage = lazy(() => import('@pages/Roadmap'));

const AppRouter = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={ROUTES.FEEDBACK} component={FeedbackPage} />
        <Route path={ROUTES.ROADMAP} component={RoadmapPage} />
        <Route path={ROUTES.ROOM} component={RoomPage} />
        <Route exact path={ROUTES.MAIN} component={StartPage} />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;
