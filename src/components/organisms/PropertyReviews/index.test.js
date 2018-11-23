import React from 'react';
import { shallow } from 'enzyme';

import PropertyReviews from 'sly/components/organisms/PropertyReviews';
import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';
import PropertyReview from 'sly/components/molecules/PropertyReview';
import Modal from 'sly/components/molecules/Modal';

const reviewRating = {
  name: 'Yelp',
  numReviews: 60,
  reviewsUrl: 'foo',
  avgRating: 4,
};

const review = {
  id: '1',
  value: 3.5,
  author: 'Pranesh',
  createdAt: '2018-04-20T04:26:04.418Z',
  comments: 'Best Community',
};

function onLeaveReview() {
  //   console.log('onLeaveReview');
}

const reviewRatings = [reviewRating, reviewRating];
const reviews = [review, review, review];
const user = {
  id: 1,
  name: 'Pranesh Kumar',
};

const wrap = (props = {}) =>
  shallow(<PropertyReviews
    reviewRatings={reviewRatings}
    reviews={reviews}
    onLeaveReview={onLeaveReview}
    communitySlug="abc"
    communityName="Rhoda Goldman Plaza"
    user={user}
    {...props}
  />);

describe('PropertyReviews', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({
      hasWebReviews: true,
      children: 'test',
    });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Property review', () => {
    const wrapper = wrap({ hasWebReviews: true });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(1);
    expect(wrapper.find(PropertyReview)).toHaveLength(3);
  });

  it('renders Seniorly Reviews only when length of reviews > 0', () => {
    const wrapper = wrap({ hasWebReviews: false });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(0);
    expect(wrapper.find(PropertyReview)).toHaveLength(3);
  });

  it('renders Web Reviews only when hasWebReviews is true', () => {
    const wrapper = wrap({ hasWebReviews: true });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(1);
    expect(wrapper.find(PropertyReview)).toHaveLength(3);
  });

  it('renders Modal when isAskRatingModalOpen is true', () => {
    const wrapper = wrap({ hasWebReviews: false, isAskRatingModalOpen: true });
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('does not renders Modal when isAskRatingModalOpen is false', () => {
    const wrapper = wrap({ hasWebReviews: false, isAskRatingModalOpen: false });
    expect(wrapper.find(Modal)).toHaveLength(0);
  });
});
