import React from 'react';
import { string, number } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import Rating from 'sly/components/atoms/Rating';
import Hr from 'sly/components/atoms/Hr';

const RatingHeadingDiv = styled.div`
  display: flex;
  padding-top: ${size('spacing.large')};
`;

const RatingIconDiv = styled.div`
  padding-right: ${size('spacing.large')};
`;

const ReviewHeadingText = styled.div`
  padding-top: ${size('spacing.small')};
  padding-right:  ${size('spacing.large')};
  color: grey;
`;

const ReviewContentText = styled.div`
  padding-bottom: ${size('spacing.xLarge')};
`;

const PropertyReview = ({
  rating, name, uri, date, content,
}) => (
  <div>
    <RatingHeadingDiv>
      <RatingIconDiv>
        <Rating value={rating} />
      </RatingIconDiv>
      <ReviewHeadingText>By {name}</ReviewHeadingText>
      <ReviewHeadingText>{date}</ReviewHeadingText>
    </RatingHeadingDiv>
    <ReviewContentText>{content}</ReviewContentText>
    <Hr />
  </div>
);

PropertyReview.prototype = {
  rating: number.isRequired,
  name: string.isRequired,
  uri: string.isRequired,
  date: string.isRequired,
  content: string.isRequired,
};

export default PropertyReview;
