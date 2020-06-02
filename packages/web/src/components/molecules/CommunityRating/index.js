import React from 'react';
import { number, func, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/web/components/themes';
import { text as textPropType } from 'sly/web/propTypes/text';
import { palette as palettePropType } from 'sly/web/propTypes/palette';
import { variation as variationPropType } from 'sly/web/propTypes/variation';
import { formatRating } from 'sly/web/services/helpers/rating';
import pad from 'sly/web/components/helpers/pad';
import { Block, Link } from 'sly/web/components/atoms';
import Rating from 'sly/web/components/molecules/Rating';

const DescriptionBlock = pad(Block, 'regular');

const RatingValue = styled(Block)`
  margin-right: ${size('spacing.regular')};
`;

const StyledRating = styled(Rating)`
  margin-right: ${size('spacing.small')};
`;

const TwoColumn = styled.div`
  display: flex;
  align-items: center;
`;

const CommunityRating = ({ rating, numReviews, description, size, palette, variation, numReviewsPalette, numReviewsVariation, starPalette, starVariation, goToReviews, className }) => {
  const content = (
    <>
      {description && <DescriptionBlock size="caption">{description}</DescriptionBlock>}
      <TwoColumn>
        {rating > 0 ?
          <TwoColumn>
            <RatingValue palette={palette} variation={variation} size={size} weight="medium">
              {formatRating(rating)}
            </RatingValue>
            <StyledRating value={rating} palette={starPalette || palette} variation={starVariation || variation} size="small" />
          </TwoColumn> : <RatingValue palette={palette} variation={variation} size={size} weight="medium">Not yet rated</RatingValue>
        }
        {numReviews > 0 &&
          <Block size="caption" palette={numReviewsPalette || palette} variation={numReviewsVariation || variation} >
            ({numReviews})
          </Block>
        }
      </TwoColumn>
    </>
  );

  if (goToReviews) {
    return (
      <Link href="#reviews" onClick={goToReviews} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
};

CommunityRating.propTypes = {
  description: string,
  rating: number.isRequired,
  numReviews: number.isRequired,
  goToReviews: func,
  size: textPropType,
  palette: palettePropType,
  variation: variationPropType,
  numReviewsPalette: palettePropType,
  numReviewsVariation: variationPropType,
  starPalette: palettePropType,
  starVariation: variationPropType,
  className: string,
};

CommunityRating.defaultProps = {
  size: 'subtitle',
  palette: 'secondary',
  variation: 'darker-30',
};

export default CommunityRating;
