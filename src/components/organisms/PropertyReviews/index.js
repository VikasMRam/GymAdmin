import React from 'react';
import { arrayOf, shape, string, number, func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { Icon, Span } from 'sly/components/atoms';
import Modal from 'sly/components/molecules/Modal';
import PropertyReview from 'sly/components/molecules/PropertyReview';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';
import { formatRating } from 'sly/services/helpers/rating';

const ReviewValueSection = styled.div`
  margin-bottom: ${size('spacing.large')};
  align-items: center;
`;

const PropertyReviews = ({
  reviewsValue,
  hasWebReviews,
  reviews,
  reviewRatings,
  onLeaveReview,
  communityReviewsRef,
  onReviewLinkClicked,
  isAskRatingModalOpen,
  setModal,
  user,
  communitySlug,
  communityName,
}) => {
  let propertyReviews = null;
  if (reviews.length > 0) {
    propertyReviews = reviews.map((review) => {
      return <PropertyReview {...review} key={review.id} />;
    });
  }
  return (
    <article ref={communityReviewsRef}>
      {reviewsValue > 0 &&
      <ReviewValueSection>
        <Icon icon="star" size="regular" palette="secondary" />
        <Span size="subtitle" weight="medium"> {formatRating(reviewsValue)}</Span>
        <Span size="caption" palette="grey"> Average rating</Span>
      </ReviewValueSection>
      }
      {propertyReviews}
      {hasWebReviews && (
        <GatheredReviewRatings
          reviewRatings={reviewRatings}
          onLeaveReview={onLeaveReview}
          onReviewLinkClicked={onReviewLinkClicked}
        />
      )}
      {isAskRatingModalOpen &&
      <Modal
        onClose={() => setModal(null)}
        isOpen
        closeable
      >
        <CommunityAddRatingFormContainer user={user} communitySlug={communitySlug} communityName={communityName} setModal={setModal} />
      </Modal>
      }
    </article>
  );
};

PropertyReviews.propTypes = {
  reviewsValue: number.isRequired,
  reviews: arrayOf(shape({
    id: string.isRequired,
    author: string.isRequired,
    createdAt: string.isRequired,
    value: number.isRequired,
    comments: string.isRequired,
  })).isRequired,
  reviewRatings: arrayOf(shape({
    name: string.isRequired,
    numReviews: number.isRequired,
    reviewsUrl: string.isRequired,
    avgRating: number.isRequired,
  })).isRequired,
  onLeaveReview: func.isRequired,
  hasWebReviews: bool.isRequired,
  communityReviewsRef: object,
  onReviewLinkClicked: func,
  isAskRatingModalOpen: bool,
  setModal: func,
  user: object,
  communitySlug: string,
  communityName: string,
};

export default PropertyReviews;
