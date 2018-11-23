import React from 'react';
import { shallow } from 'enzyme';

import GatheredReviewRatings, { ReviewDiv }
  from 'sly/components/molecules/GatheredReviewRatings';

const review = {
  name: 'Yelp',
  numReviews: 60,
  reviewsUrl: 'foo',
  avgRating: 4,
};

const reviewRatings = [review, review, review];
const wrap = (props = {}) =>
  shallow(<GatheredReviewRatings reviewRatings={reviewRatings} {...props} />);

describe('GatheredReviewRatings', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders Property review', () => {
    const wrapper = wrap();
    expect(wrapper
      .childAt(0)
      .childAt(0)
      .dive()
      .text()).toEqual('Reviews gathered from across the web');
    expect(wrapper.find(ReviewDiv)).toHaveLength(3);
    const reviewDiv = wrapper.find(ReviewDiv).at(0);
    expect(reviewDiv.find('Rating[value=4]')).toHaveLength(1);
    expect(reviewDiv
      .childAt(1)
      .childAt(0)
      .dive()
      .text()).toContain('Yelp');
    expect(reviewDiv.childAt(1).find('[href="foo"]')).toHaveLength(1);
    expect(reviewDiv.childAt(1).find('[rel="nofollow"]')).toHaveLength(1);
  });
});
