import React from 'react';
import { shallow } from 'enzyme';

import SimilarCommunityInfo from 'sly/components/molecules/SimilarCommunityInfo';

const similarProperty = {
  name: 'Rhoda Goldman Plaza',
  url: 'url',
  mainImage: 'foo',
  startingRate: 4500,
  description: 'description',
  addressString: '601 Laguna Street, San Francisco, CA 94102',
  reviewsValue: 4.5,
  numReviews: 4,
  webViewInfo: {
    firstLineValue: 'A, B',
    secondLineValue: 'Suite, One Bedroom',
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
    expect(wrapper.find('Link').contains(similarProperty.name)).toBe(true);
    expect(parseInt(wrapper.childAt(1)
      .childAt(0)
      .childAt(0)
      .dive()
      .text()
      .match(/\d/g)
      .join(''), 10)).toEqual(similarProperty.startingRate);
    expect(wrapper.childAt(2).contains(similarProperty.addressString)).toBe(true);
    similarProperty.webViewInfo.secondLineValue.split(',').forEach((roomType) => {
      expect(wrapper.childAt(3).contains(roomType)).toBe(true);
    });
    similarProperty.webViewInfo.firstLineValue.split(',').forEach((livingType) => {
      expect(wrapper.childAt(4).contains(livingType)).toBe(true);
    });
    expect(wrapper.childAt(5).contains(similarProperty.description)).toBe(true);

    // expect(wrapper.find('Rating[size="medium"]')).toHaveLength(1);
  });

  it('renders similarProperty heading without url', () => {
    const similarPropertyWithoutUrl = { ...similarProperty };
    similarPropertyWithoutUrl.url = null;
    const wrapper = wrap({ similarProperty: similarPropertyWithoutUrl });

    expect(wrapper.find('StyledHeading').contains(similarProperty.name)).toBe(true);
  });
});
