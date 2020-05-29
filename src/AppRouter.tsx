import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@fb/initFirebase';
import { ROUTES } from '@common/constants';

const LandingPage = lazy(() => import('@pages/Landing'));
const GamePage = lazy(() => import('@pages/Game'));

export const AppRouter = (): JSX.Element => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Switch>
        <Route path={ROUTES.FEEDBACK}>
          <div>Feedback</div>
        </Route>
        <Route path={ROUTES.ROADMAP}>
          <div>Roadmap</div>
        </Route>
        <Route path={ROUTES.GAME} component={user ? GamePage : LandingPage} />
        <Route path={ROUTES.LANDING} component={LandingPage} />
      </Switch>
    </Suspense>
  );
};
