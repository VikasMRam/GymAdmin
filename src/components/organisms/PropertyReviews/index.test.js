import React from 'react';
import { shallow } from 'enzyme';

import GatheredReviewRatings from 'sly/components/molecules/GatheredReviewRatings';
import PropertyReview from 'sly/components/molecules/PropertyReview';
import PropertyReviews from '.';

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

const wrap = (props = {}) =>
  shallow(<PropertyReviews
    reviewRatings={reviewRatings}
    reviews={reviews}
    onLeaveReview={onLeaveReview}
    {...props}
  />);

describe('PropertyReviews', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({
      hasSlyReviews: true,
      hasWebReviews: true,
      children: 'test',
    });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Property review', () => {
    const wrapper = wrap({ hasSlyReviews: true, hasWebReviews: true });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(1);
    expect(wrapper.find(PropertyReview)).toHaveLength(3);
  });

  it('renders Property review', () => {
    const wrapper = wrap({ hasSlyReviews: true, hasWebReviews: true });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(1);
    expect(wrapper.find(PropertyReview)).toHaveLength(3);
  });

  it('renders Seniorly Reviews only when hasSlyReviews is true', () => {
    const wrapper = wrap({ hasSlyReviews: true, hasWebReviews: false });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(0);
    expect(wrapper.find(PropertyReview)).toHaveLength(3);
  });

  it('renders Web Reviews only when hasWebReviews is true', () => {
    const wrapper = wrap({ hasSlyReviews: false, hasWebReviews: true });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(1);
    expect(wrapper.find(PropertyReview)).toHaveLength(0);
  });
});
