import React from 'react';
import { AppWrapper, Footer, Header } from '@components';
import AppRouter from '@src/AppRouter';

// TODO правила игры вынести в шапку

const Layout: React.FC = () => (
  <AppWrapper>
    <Header />
    <AppRouter />
    <Footer />
  </AppWrapper>
);

export default Layout;
