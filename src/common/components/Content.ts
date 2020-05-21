import styled from 'styled-components';
import { Theme, FontSize } from '@styles/theme';

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
  Ul,
  Li,
  BlockWrapper,
  CenteredBlockWrapper,
};
