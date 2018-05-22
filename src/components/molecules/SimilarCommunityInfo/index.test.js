import React from 'react';
import { shallow } from 'enzyme';
import SimilarCommunityInfo from '.';

const similarProperty = {
  name: 'Rhoda Goldman Plaza',
  url: 'url',
  mainImage: 'foo',
  startingRate: 4500,
  description: 'description',
  reviewsValue: 4.5,
  numReviews: 4,
  webViewInfo: {
    firstLineValue: 'A, B',
    secondLineValue : 'Suite, One Bedroom',
  },
};
const wrap = (props = {}) =>
  shallow(<SimilarCommunityInfo similarProperty={similarProperty} {...props} />);

describe('SimilarCommunityInfo', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });

  it('renders similarProperty', () => {
    const wrapper = wrap();
    expect(wrapper.childAt(0).contains('Rhoda Goldman Plaza')).toBe(true);
    expect(wrapper
      .childAt(1)
      .childAt(0)
      .html()).toEqual('<div>$4500 per month</div>');
    expect(wrapper.childAt(2).childAt(0).html()).toEqual('<div>A, B</div>');
    expect(wrapper.childAt(2).childAt(1).html()).toEqual('<div>Floor Plans: Suite, One Bedroom</div>');
    expect(wrapper.childAt(3).contains('description')).toBe(true);

    // expect(wrapper.find('Rating[size="medium"]')).toHaveLength(1);
  });
});
