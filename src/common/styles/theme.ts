export enum Color {
  deepPurple = '#18121b',
  purple = '#261e2a',
  lightPurple = '#362d3a',
  white = '#e6e1da',
  yellow = '#f9f871',
  transparent = 'transparent',
  default = 'default',
}

export enum FontSize {
  big = '30px',
  medium = '24px',
  main = '16px',
  small = '14px',
}

export const theme = {
  color: Color,
  font: {
    size: FontSize,
  },
};

export type Theme = typeof theme;
