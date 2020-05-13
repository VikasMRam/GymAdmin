import React from 'react';
import { shallow } from 'enzyme';

import EntityReviews from 'sly/web/components/organisms/EntityReviews';
import GatheredReviewRatings from 'sly/web/components/molecules/GatheredReviewRatings';
import EntityReview from 'sly/web/components/molecules/EntityReview';

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
const reviewsValue = 3.4;

const reviewRatings = [reviewRating, reviewRating];
const reviews = [review, review, review];

const wrap = (props = {}) =>
  shallow(<EntityReviews
    {...props}
  />);

describe('EntityReviews', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders EntityReview', () => {
    const wrapper = wrap({ reviews });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(0);
    expect(wrapper.find(EntityReview)).toHaveLength(3);
  });

  it('renders Reviews Value only when reviewsValue is passed', () => {
    const wrapper = wrap({ reviewsValue });
    expect(wrapper.find('ReviewValueSection').childAt(1).dive().render()
      .text()).toEqual(' 3.4');
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(0);
    expect(wrapper.find(EntityReview)).toHaveLength(0);
  });

  it('renders Web Reviews only when reviewRatings is passed', () => {
    const wrapper = wrap({ reviewRatings });
    expect(wrapper.find(GatheredReviewRatings)).toHaveLength(1);
    expect(wrapper.find(EntityReview)).toHaveLength(0);
  });
});
