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
  searchParams,
  changeSearchParams,
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
  const { modal } = searchParams;
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
      <Button onClick={() => changeSearchParams({ changedParams: { modal: 'addRating' } })} >Leave a Review</Button>
      <Modal
        appElement={appElement}
        onClose={() => changeSearchParams({ changedParams: { modal: null } })}
        isOpen={modal === 'addRating'}
        closeable
      >
        <CommunityAddRatingFormContainer user={user} communitySlug={communitySlug} communityName={communityName} />
      </Modal>
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
  searchParams: object,
  changeSearchParams: func,
  user: object,
  communitySlug: string,
  communityName: string,
};

export default PropertyReviews;
