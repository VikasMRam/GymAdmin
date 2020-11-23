import React from 'react';
import { number, func, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { text as textPropType } from 'sly/common/propTypes/text';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { formatRating } from 'sly/web/services/helpers/rating';
import { Block, Link } from 'sly/common/components/atoms';
import Rating from 'sly/web/components/molecules/Rating';

const StyledRating = styled(Rating)`
  margin-right: ${size('spacing.small')};
`;

const CommunityRating = ({ rating, numReviews, description, size, palette, variation, goToReviews, seedId, ...props }) => {
  if (rating < 1) {
    return <div />;
  }

  const linkProps = goToReviews
    ? { href: '#reviews', onClick: goToReviews, as: Link }
    : {};

  return (
    <Block {...linkProps} {...props}>
      <Block testID="RatingValue" marginRight="small" palette={palette} variation={variation} weight="medium">
        {rating > 0 ? formatRating(rating) : 'Not yet rated'}
      </Block>
      {rating > 0 &&
        <StyledRating
          seedId={seedId}
          value={rating}
          palette={palette}
          variation={variation}
          size={size}
        />
      }
      {numReviews > 0 &&
        <Block size="caption" palette={palette} variation={variation}>
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
  size: textPropType,
  palette: palettePropType,
  variation: variationPropType,
  className: string,
  seedId: string,
};

CommunityRating.defaultProps = {
  size: 'body',
  palette: 'primary',
  display: 'flex',
  alignItems: 'center',
};

export default CommunityRating;
