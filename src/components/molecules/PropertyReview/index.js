import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/molecules/Rating';
import Hr from 'sly/components/atoms/Hr';

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

function formatDate(dateString) {
  const date = new Date(dateString);
  const locale = 'en-us';
  const month = date.toLocaleString(locale, { month: 'short' });
  let day = `${date.getDate()}`;
  const year = date.getFullYear();
  if (day.length < 2) day = `0${day}`;
  return `${month} ${day}, ${year}`;
}

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
