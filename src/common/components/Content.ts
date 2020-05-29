import styled from 'styled-components';
import { Theme, FontSize, Color } from '@styles/theme';

const Title = styled.h1`
  margin: 24px 0;
  font-size: ${({ theme }: { theme: Theme }): FontSize => theme.font.size.big};
  font-weight: 400;
  text-align: center;
`;

const Subtitle = styled.h2`
  margin: 16px 0;
  font-size: ${({ theme }: { theme: Theme }): FontSize =>
    theme.font.size.medium};
  font-weight: 400;
`;

const Text = styled.div`
  margin: 16px 0;
`;

const Link = styled.a`
  color: ${({ theme }: { theme: Theme }): Color => theme.color.yellow};
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  transition: border-bottom 0.2s;

  &:hover {
    text-decoration: none;
    border-bottom: 1px solid transparent;
  }
`;

const Ul = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const Li = styled.li`
  position: relative;
  padding-left: 40px;
  margin: 8px 0;

  &:before {
    content: '⚀';
    position: absolute;
    top: 30%;
    left: 0;
    font-size: ${({ theme }: { theme: Theme }): FontSize =>
      theme.font.size.medium};
    transform: translateY(-50%);
  }
`;

const BlockWrapper = styled.div`
  margin: 24px 0;
`;

const CenteredBlockWrapper = styled(BlockWrapper)`
  text-align: center;
`;

export const Content = {
  Title,
  Subtitle,
  Text,
  Link,
  Ul,
  Li,
  BlockWrapper,
  CenteredBlockWrapper,
};
