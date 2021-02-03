import React from 'react';
import { useLocation } from 'react-use';
import styled from 'styled-components';
import { Content, Button } from '@components';
import { ROUTES } from '@common/constants/routes';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

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
  const history = useHistory();
  const isFeedbackPage = pathname === ROUTES.FEEDBACK;
  const isRoadmapPage = pathname === ROUTES.ROADMAP;

  return (
    <Wrapper>
      <Content.CenteredBlockWrapper>
        {!isFeedbackPage && (
          <>
            <FeedbackButton onClick={() => history.push(ROUTES.FEEDBACK)}>
              Оставить отзыв
            </FeedbackButton>
            или{' '}
          </>
        )}
        {!isFeedbackPage ? 'о' : 'О'}формить Issue на{' '}
        <a
          href="https://github.com/shakepompom/alias-game/issues"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        .
      </Content.CenteredBlockWrapper>
      {!isRoadmapPage && (
        <Content.CenteredBlockWrapper>
          <Link to={ROUTES.ROADMAP}>Roadmap</Link> проекта
        </Content.CenteredBlockWrapper>
      )}
    </Wrapper>
  );
};
