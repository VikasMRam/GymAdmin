import React from 'react';
import { number, func, string, oneOf } from 'prop-types';
import styled from 'styled-components';


import theme from 'sly/common/system/theme';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { formatRating } from 'sly/web/services/helpers/rating';
import { Block, Link, space } from 'sly/common/system';
import Rating from 'sly/web/components/molecules/Rating';

const StyledRating = styled(Rating)`
  margin-right: ${space('xxs')};
`;

const CommunityRating = ({ rating, numReviews, description, size, color, variation, goToReviews, seedId, ...props }) => {
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
        <Block font="body-s" color="slate.lighter-40" variation={variation}>
          ({numReviews})
        </Block>
      }
    </Block>
  );
};

CommunityRating.propTypes = {
  description: string,
  rating: number.isRequired,
  numReviews: number.isRequired,
  goToReviews: func,
  size: oneOf(Object.keys(theme.fonts)),
  color: palettePropType,
  variation: variationPropType,
  className: string,
  seedId: string,
};

CommunityRating.defaultProps = {
  size: 'body-m',
  color: 'primary',
  display: 'flex',
  alignItems: 'center',
};

export default CommunityRating;
