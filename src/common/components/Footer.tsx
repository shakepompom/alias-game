import React from 'react';
import { useLocation } from 'react-use';
import styled from 'styled-components';
import { Content, Button } from '@components';
import { ROUTES } from '@common/constants';

const Wrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
`;

const FeedbackButton = styled(Button)`
  margin-right: 16px;
`;

export const Footer = (): JSX.Element => {
  const { pathname } = useLocation();
  const isFeedbackPage = pathname === ROUTES.FEEDBACK;
  const isRoadmapPage = pathname === ROUTES.ROADMAP;

  return (
    <Wrapper>
      <Content.CenteredBlockWrapper>
        {!isFeedbackPage && (
          <>
            <FeedbackButton
              onClick={() => {
                window.open(ROUTES.FEEDBACK, '_blank');
              }}
            >
              Оставить отзыв
            </FeedbackButton>
            или{' '}
          </>
        )}
        {!isFeedbackPage ? 'о' : 'О'}формить Issue на{' '}
        <Content.Link
          href="https://github.com/shakepompom/alias-game/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </Content.Link>
        .
      </Content.CenteredBlockWrapper>
      {!isRoadmapPage && (
        <Content.CenteredBlockWrapper>
          <Content.Link
            href={ROUTES.ROADMAP}
            target="_blank"
            rel="noopener noreferrer"
          >
            Roadmap
          </Content.Link>{' '}
          проекта
        </Content.CenteredBlockWrapper>
      )}
    </Wrapper>
  );
};
