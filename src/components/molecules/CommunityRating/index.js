import React from 'react';
import { number, func, string } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { text as textPropType } from 'sly/propTypes/text';
import { palette as palettePropType } from 'sly/propTypes/palette';
import { formatRating } from 'sly/services/helpers/rating';
import pad from 'sly/components/helpers/pad';
import { Block, Link } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';

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

const CommunityRating = ({ rating, numReviews, description, size, palette, numReviewsPalette, starPalette, goToReviews, className }) => {
  const content = (
    <>
      {description && <DescriptionBlock size="caption">{description}</DescriptionBlock>}
      <TwoColumn>
        {rating > 0 ?
          <TwoColumn>
            <RatingValue palette={palette} size={size} weight="medium">
              {formatRating(rating)}
            </RatingValue>
            <StyledRating value={rating} palette={starPalette || palette} size="small" />
          </TwoColumn> : <RatingValue palette={palette} size={size} weight="medium">Not yet rated</RatingValue>
        }
        {numReviews > 0 &&
          <Block size="caption" palette={numReviewsPalette || palette}>
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
  numReviewsPalette: palettePropType,
  starPalette: palettePropType,
  className: string,
};

CommunityRating.defaultProps = {
  size: 'subtitle',
  palette: 'primary',
};

export default CommunityRating;
