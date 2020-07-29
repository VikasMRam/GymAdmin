import React from 'react';
import { number, func, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/common/components/themes';
import { text as textPropType } from 'sly/common/propTypes/text';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { variation as variationPropType } from 'sly/common/propTypes/variation';
import { formatRating } from 'sly/web/services/helpers/rating';
import { Block, Link } from 'sly/web/components/atoms';
import Rating from 'sly/web/components/molecules/Rating';

const RatingValue = styled(Block)`
  margin-right: ${size('spacing.small')};
`;

const StyledRating = styled(Rating)`
  margin-right: ${size('spacing.small')};
`;

const TwoColumn = styled.div`
  display: flex;
  align-items: center;
`;

const CommunityRating = ({ rating, numReviews, description, size, palette, variation, goToReviews, ...props }) => {
  const linkProps = goToReviews
    ? { href: '#reviews', onClick: goToReviews, as: Link }
    : {};

  return (
    <TwoColumn {...linkProps} {...props}>
      <RatingValue palette={palette} variation={variation} weight="medium">
        {rating > 0 ? formatRating(rating) : 'Not yet rated'}
      </RatingValue>
      {rating > 0 &&
        <StyledRating
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
    </TwoColumn>
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
};

CommunityRating.defaultProps = {
  size: 'body',
  palette: 'primary.base',
};

export default CommunityRating;
