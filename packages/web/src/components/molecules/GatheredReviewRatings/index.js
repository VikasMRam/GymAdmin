import React from 'react';
import { arrayOf, shape, string, number, func } from 'prop-types';
import styled from 'styled-components';

import { Block, space, sx$tablet, Link } from 'sly/common/system';
import Rating from 'sly/web/components/molecules/Rating';

const ReviewHeadingDiv = styled(Block)`
  margin-bottom: ${space('m')};
`;

const RatingsDiv = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-gap: ${space('m')};
  margin-bottom: ${space('m')};

  ${sx$tablet({
    gridTemplateColumns: '50% 50%',
  })}
`;

const StartNumDiv = styled.div`
  display: flex;
  margin-right: ${space('m')};
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


const GatheredReviewRatings = ({ reviewRatings, onReviewLinkClicked }) => {
  /* eslint-disable react/no-array-index-key */
  const ratings = reviewRatings.map((review, i) => {
    return (
      <ReviewDiv key={review.name + i}>
        <StartNumDiv>
          <Rating value={review.avgRating}  />
          {' ('}{review.numReviews }{')'}
        </StartNumDiv>
        <ReviewProviderDiv>
          <Link
            onClick={() => onReviewLinkClicked(review.name)}
            href={review.reviewsUrl}
            target="_blank"
            rel="nofollow noopener"
          >
            {review.name}&reg;
          </Link>
        </ReviewProviderDiv>
      </ReviewDiv>
    );
  });
  return (
    <>
      {reviewRatings.length > 0 && (
        <>
          <ReviewHeadingDiv font="title-xs-azo">
            Reviews gathered from across the web
          </ReviewHeadingDiv>
          <RatingsDiv>{ratings}</RatingsDiv>
          <Block font="body-s" color="grey">
            {`Disclaimer: All trademarks and copyrights for names are owned by the respective companies.
            They do not endorse Seniorly and are not
            related to Seniorly's service in any way.`}
          </Block>
        </>
      )}
    </>
  );
};

GatheredReviewRatings.propTypes = {
  reviewRatings: arrayOf(shape({
    name: string.isRequired,
    numReviews: number.isRequired,
    reviewsUrl: string.isRequired,
    avgRating: number.isRequired,
  })).isRequired,
  onReviewLinkClicked: func,
};

export default GatheredReviewRatings;
