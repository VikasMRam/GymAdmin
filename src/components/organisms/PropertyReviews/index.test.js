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
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Property review', () => {
    const wrapper = wrap();
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(1);
    expect(wrapper.find(PropertyReview)).toHaveLength(3);
  });
});
