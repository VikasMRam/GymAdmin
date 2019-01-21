import React from 'react';
import { arrayOf, shape, string, number, func } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes';
import { Block } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';

const ReviewHeadingDiv = styled(Block)`
  margin-bottom: ${size('spacing.large')};
`;

const RatingsDiv = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: ${size('spacing.large')};
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    grid-template-columns: 50% 50%;
  }
`;

const StartNumDiv = styled.div`
  display: flex;
  margin-right: ${size('spacing.large')};
`;

export const ReviewDiv = styled.div`
  display: flex;
`;

const ReviewProviderDiv = styled.div`
  display: flex;
  > a {
    text-decoration: none;
  }
`;

// const LeaveAReviewTextDiv = styled.div`
//   padding-bottom: ${size('spacing.xLarge')};
// `;

// const LeaveAReviewButtonDiv = styled.div`
//   padding-bottom: ${size('spacing.xLarge')};
// `;

// const PaddedHR = styled(Hr)`
//   margin-top: ${size('spacing.xLarge')};
//   margin-bottom: ${size('spacing.xLarge')};
// `;

const Link = styled.a`
  color: ${palette('primary', 'base')};
`;

const GatheredReviewRatings = ({ reviewRatings, onReviewLinkClicked }) => {
  /* eslint-disable react/no-array-index-key */
  const ratings = reviewRatings.map((review, i) => {
    return (
      <ReviewDiv key={review.name + i}>
        <StartNumDiv>
          <Rating value={review.avgRating} palette="secondary" />
          {' ('}{review.numReviews }{')'}
        </StartNumDiv>
        <ReviewProviderDiv>
          <Link
            onClick={() => onReviewLinkClicked(review.name)}
            href={review.reviewsUrl}
            target="_blank"
            rel="nofollow"
          >
            {review.name}&reg;
          </Link>
        </ReviewProviderDiv>
      </ReviewDiv>
    );
  });
  return (
    <div>
      {reviewRatings.length > 0 && (
        <div>
          <ReviewHeadingDiv weight="medium">
            Reviews gathered from across the web
          </ReviewHeadingDiv>
          <RatingsDiv>{ratings}</RatingsDiv>
          {/* <PaddedHR />
          <LeaveAReviewTextDiv>
            If you are familiar with this community, your review will help
            other families in a similar situation make a more informed
            decision.
          </LeaveAReviewTextDiv>
          <LeaveAReviewButtonDiv>
            <Button onClick={onLeaveReview}>Leave a Review</Button>
          </LeaveAReviewButtonDiv>
          <Hr /> */}
          <Block size="caption" palette="grey">
            {`Disclaimer: All trademarks and copyrights for names are owned by the respective companies.
            They do not endorse Seniorly and are not
            related to Seniorly's service in any way.`}
          </Block>
        </div>
      )}
    </div>
  );
};

GatheredReviewRatings.propTypes = {
  reviewRatings: arrayOf(shape({
    name: string.isRequired,
    numReviews: number.isRequired,
    reviewsUrl: string.isRequired,
    avgRating: number.isRequired,
  })).isRequired,
  // onLeaveReview: func,
  onReviewLinkClicked: func,
};

export default GatheredReviewRatings;
