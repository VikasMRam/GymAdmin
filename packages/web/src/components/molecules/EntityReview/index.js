import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';
import dayjs from 'dayjs';

import { space, Block } from 'sly/common/system';
import Rating from 'sly/web/components/molecules/Rating';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${space('xl')};
`;

const RatingIconDiv = styled.div`
  margin-bottom: ${space('xs')};
`;

const ReviewHeadingText = styled(Block)`
  margin-right: ${space('s')};
`;

const BottomSection = styled.div`
  display: flex;
`;

const CommentBlock = styled(Block)`
  margin-bottom: ${space('xs')};
`;

const EntityReview = ({
  value, author, createdAt, comments,
}) => (
  <Wrapper>
    <RatingIconDiv>
      <Rating value={value} color="primary" variation="base" />
    </RatingIconDiv>
    <CommentBlock>{comments}</CommentBlock>
    <BottomSection>
      <ReviewHeadingText font="body-s" color="grey">{author}</ReviewHeadingText>
      <ReviewHeadingText font="body-s" color="grey">{dayjs(createdAt).format('MMMM YYYY')}</ReviewHeadingText>
    </BottomSection>
  </Wrapper>
);

EntityReview.propTypes = {
  value: number.isRequired,
  author: string.isRequired,
  createdAt: string.isRequired,
  comments: string.isRequired,
};

export default EntityReview;
