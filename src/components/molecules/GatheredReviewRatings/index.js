import React, { Component } from 'react';
import { arrayOf, shape, string, number, func } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { size } from 'sly/components/themes';
// import { Button, Hr } from 'sly/components/atoms';
import Rating from 'sly/components/molecules/Rating';

const ReviewHeadingDiv = styled.div`
  font-weight: bold;
`;

const RatingsDiv = styled.div`
  margin-bottom: ${size('spacing.large')};
`;

const StartNumDiv = styled.div`
  display: flex;
`;

export const ReviewDiv = styled.div`
  padding-top: ${size('spacing.large')};
  padding-right: ${size('spacing.large')};
  display: flex;
`;

const ReviewProviderDiv = styled.div`
  display: flex;
  padding-top: ${size('spacing.small')};
  padding-left: ${size('spacing.large')};
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
  color: ${palette('secondary', 2)};
`;

const DisclaimerDiv = styled.div``;

export default class GatheredReviewRatings extends Component {
  static propTypes = {
    reviewRatings: arrayOf(shape({
      name: string.isRequired,
      numReviews: number.isRequired,
      reviewsUrl: string.isRequired,
      avgRating: number.isRequired,
    })).isRequired,
    onLeaveReview: func,
    onReviewLinkClicked: func,
  };

  render() {
    const { reviewRatings, onLeaveReview, onReviewLinkClicked } = this.props;
    const ratings = reviewRatings.map((review, i) => {
      return (
        <ReviewDiv key={`${review.name}_${i}`}>
          <StartNumDiv>
            <Rating value={review.avgRating} />
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
            <ReviewHeadingDiv>
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
            <DisclaimerDiv>
              Disclaimer: All trademarks and copyrights for names are owned by
              the respective companies. They do not endorse Seniorly and are not
              related to Seniorly's service in any way.
            </DisclaimerDiv>
          </div>
        )}
      </div>
    );
  }
}
