import React from 'react';
import { mount } from 'enzyme';

import GatheredReviewRatings, { ReviewDiv }
  from 'sly/web/components/molecules/GatheredReviewRatings';

const review = {
  name: 'Yelp',
  numReviews: 60,
  reviewsUrl: 'foo',
  avgRating: 4,
};

const reviewRatings = [review, review, review];
const wrap = (props = {}) =>
  mount(<GatheredReviewRatings reviewRatings={reviewRatings} {...props} />);

describe('GatheredReviewRatings', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Property review', () => {
    const wrapper = wrap();
    expect(wrapper.contains('Reviews gathered from across the web')).toBeTruthy();
    expect(wrapper.find(ReviewDiv)).toHaveLength(3);
    const reviewDiv = wrapper.find(ReviewDiv).at(0);
    expect(reviewDiv.find('Rating[value=4]')).toHaveLength(1);
    expect(reviewDiv
      .childAt(0)
      .text()).toContain('Yelp');
    expect(reviewDiv.childAt(0).find('a[href="foo"]')).toHaveLength(1);
    expect(reviewDiv.childAt(0).find('a[rel="nofollow noopener"]')).toHaveLength(1);
  });

  it('handles onReviewLinkClicked', () => {
    const onReviewLinkClicked = jest.fn();
    const wrapper = wrap({ onReviewLinkClicked });
    const link = wrapper.find(ReviewDiv).find('Link').at(0);
    link.simulate('click');
    expect(onReviewLinkClicked).toHaveBeenCalledWith('Yelp');
  });
});
