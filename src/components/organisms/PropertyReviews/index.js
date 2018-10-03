import React from 'react';
import { arrayOf, shape, string, number, func, bool, object } from 'prop-types';

import Button from 'sly/components/atoms/Button';
import Modal from 'sly/components/molecules/Modal';
import PropertyReview from 'sly/components/molecules/PropertyReview';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';

import { isBrowser } from 'sly/config';
import CommunityAddRatingFormContainer from 'sly/containers/CommunityAddRatingFormContainer';

const appElement = isBrowser && document.querySelector('#app');

const PropertyReviews = ({
  hasSlyReviews,
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
  if (hasSlyReviews) {
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
      <Button onClick={() => setModal('addRating')} >Leave a Review</Button>
      {isAskRatingModalOpen &&
      <Modal
        appElement={appElement}
        onClose={() => setModal(null)}
        isOpen
        closeable
      >
        <CommunityAddRatingFormContainer user={user} communitySlug={communitySlug} communityName={communityName} />
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
  hasSlyReviews: bool.isRequired,
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
