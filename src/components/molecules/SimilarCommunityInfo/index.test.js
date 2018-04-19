import React from 'react';
import { shallow } from 'enzyme';
import SimilarCommunityInfo from '.';
// import Rating from 'sly/components/atoms/Rating';

// const community = {
//   name: 'Rhoda Goldman Plaza',
//   uri: 'rhoda-goldman-plaze',
//   picture: 'blah',
//   rating: 4.5,
//   startingRate: 4500,
//   numReviews: 55,
// };

const similarProperty = {
  name: 'Rhoda Goldman Plaza',
  mainImage: 'foo',
  startingRate: 4500,
  propInfo: {
    communityDescription: 'description',
    typeCare: ['A', 'B'],
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
      .text()).toEqual('$4500 per month');
    // expect(wrapper
    //   .childAt(1)
    //   .childAt(1)
    //   .childAt(0)
    //   .contains('Rating')).toBeTruthy();
    expect(wrapper
      .childAt(2)
      .dive()
      .text()).toEqual('Care Type: A, B');
    expect(wrapper
      .childAt(3)
      .dive()
      .text()).toEqual('Floor Plans: 1 Bedroom, Studio');
    expect(wrapper.childAt(4).contains('description')).toBe(true);

    // expect(wrapper.find('Rating[size="medium"]')).toHaveLength(1);
  });
});
