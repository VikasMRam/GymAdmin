import React from 'react';
import { number, func, string, oneOf, bool } from 'prop-types';
import styled from 'styled-components';


import theme from 'sly/common/system/theme';
import { formatRating } from 'sly/web/services/helpers/rating';
import { Block, Link, space } from 'sly/common/system';
import Rating from 'sly/web/components/molecules/Rating';

const StyledRating = styled(Rating)`
  margin-right: ${space('xxs')};
 
`;

const CommunityRating = ({ rating, numReviews, description, size, color, variation, goToReviews, seedId, reviewsText, textColor, ...props }) => {
  if (rating < 1) {
    return <div />;
  }

  const linkProps = goToReviews
    ? { href: '#reviews', onClick: goToReviews, as: Link }
    : {};

  return (
    <Block {...linkProps} {...props}>
      <Block testID="RatingValue" marginRight="xxs" color={color}  fontWeight="500 !important">
        {rating > 0 ? formatRating(rating) : 'Not yet rated'}
      </Block>
      {rating > 0 &&
        <StyledRating
          seedId={seedId}
          value={rating}
          color={color}
          variation={variation}
          font={size}
        />
      }
      {numReviews > 0 &&
        <Block color={textColor}>
          ({numReviews}{reviewsText && ' reviews'})
        </Block>
      }
    </Block>
  );
};

CommunityRating.propTypes = {
  description: string,
  rating: number.isRequired,
  numReviews: number,
  goToReviews: func,
  size: oneOf(Object.keys(theme.fonts)),
  color: string,
  variation: string,
  className: string,
  seedId: string,
  reviewsText: bool,
  textColor: string,
};

CommunityRating.defaultProps = {
  size: 'body-m',
  color: 'primary',
  display: 'flex',
  alignItems: 'center',
  textColor: 'slate.lighter-40',
  reviewsText: false,
};

export default CommunityRating;
