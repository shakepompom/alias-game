import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import { fonts } from './fonts';
import { Theme, Color, FontSize } from '@styles/theme';

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
    font-size: ${({ theme }: { theme: Theme }): FontSize =>
      theme.font.size.main};
    line-height: 1.4;
    color: ${({ theme }: { theme: Theme }): Color => theme.color.white};
    background-color: ${({ theme }: { theme: Theme }): Color =>
      theme.color.deepPurple};
  }

  a {
    color: ${({ theme }: { theme: Theme }): Color => theme.color.yellow};
    text-decoration: none;
    border-bottom: 1px solid currentColor;
    transition: border-bottom 0.2s;

    &:hover {
      text-decoration: none;
      border-bottom: 1px solid transparent;
    }
  }

  button {
    cursor: pointer;
  }
`;
