import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import { GlobalStyles } from '@styles/GlobalStyles';
import { store } from './store';
import Layout from '@common/layout';

const App = (): JSX.Element => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
