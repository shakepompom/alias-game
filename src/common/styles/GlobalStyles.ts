import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { fonts } from './fonts';

export const GlobalStyles = createGlobalStyle`
  ${normalize()}
  ${fonts}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    outline: none;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: ${({ theme }) => theme.font.size.main};
    line-height: 1.4;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.deepPurple};
  }

  button {
  cursor: pointer;
  }
`;
