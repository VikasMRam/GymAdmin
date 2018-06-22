import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/molecules/Rating';
import Hr from 'sly/components/atoms/Hr';
import { formatDate } from 'sly/services/helpers/date';

const RatingHeadingDiv = styled.div`
  display: flex;
  padding-bottom: ${size('spacing.regular')};
`;

const RatingIconDiv = styled.div`
  padding-right: ${size('spacing.large')};
`;

const ReviewHeadingText = styled.div`
  padding-top: ${size('spacing.small')};
  padding-right: ${size('spacing.large')};
  color: grey;
`;

const PaddedHR = styled(Hr)`
  margin-top: ${size('spacing.xLarge')};
  margin-bottom: ${size('spacing.xLarge')};
`;

const PropertyReview = ({
  value, author, createdAt, comments,
}) => (
  <div>
    <RatingHeadingDiv>
      <RatingIconDiv>
        <Rating value={value} />
      </RatingIconDiv>
      <ReviewHeadingText>By {author}</ReviewHeadingText>
      <ReviewHeadingText>{formatDate(createdAt)}</ReviewHeadingText>
    </RatingHeadingDiv>
    {comments}
    <PaddedHR />
  </div>
);

PropertyReview.propTypes = {
  value: number.isRequired,
  author: string.isRequired,
  createdAt: string.isRequired,
  comments: string.isRequired,
};

export default PropertyReview;
