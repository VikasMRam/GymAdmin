import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { size } from 'sly/web/components/themes';
import Rating from 'sly/web/components/molecules/Rating';
import { Hr, Block } from 'sly/web/components/atoms';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${size('spacing.regular')};
`;

const RatingIconDiv = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;

const ReviewHeadingText = styled(Block)`
  margin-right: ${size('spacing.large')};
`;

const BottomSection = styled.div`
  display: flex;
`;

const CommentBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const EntityReview = ({
  value, author, createdAt, comments,
}) => (
  <Wrapper>
    <RatingIconDiv>
      <Rating value={value} palette="primary" variation="base" />
    </RatingIconDiv>
    <CommentBlock>{comments}</CommentBlock>
    <BottomSection>
      <ReviewHeadingText size="caption" palette="grey">{`By ${author}`}</ReviewHeadingText>
      <ReviewHeadingText size="caption" palette="grey">{dayjs(createdAt).format('MMMM YYYY')}</ReviewHeadingText>
    </BottomSection>
    <Hr />
  </Wrapper>
);

EntityReview.propTypes = {
  value: number.isRequired,
  author: string.isRequired,
  createdAt: string.isRequired,
  comments: string.isRequired,
};

export default EntityReview;
