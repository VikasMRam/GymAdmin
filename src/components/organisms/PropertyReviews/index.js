import React from 'react';
import { arrayOf, shape, string, number, func, bool, object } from 'prop-types';

import Button from 'sly/components/atoms/Button';
import Modal from 'sly/components/molecules/Modal';
import PropertyReview from 'sly/components/molecules/PropertyReview';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';
import { ADD_RATING } from 'sly/constants/modalType';

const PropertyReviews = ({
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
      {propertyReviews}
      {hasWebReviews && (
        <GatheredReviewRatings
          reviewRatings={reviewRatings}
          onLeaveReview={onLeaveReview}
          onReviewLinkClicked={onReviewLinkClicked}
        />
      )}
      <Button onClick={() => setModal(ADD_RATING)} >Leave a Review</Button>
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
