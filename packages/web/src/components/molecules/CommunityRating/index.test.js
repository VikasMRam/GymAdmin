import React from 'react';
import { shallow } from 'enzyme';

import CommunityRating from '.';

const defaultProps = {
  rating: 3.6234,
  numReviews: 50,
};

const wrap = (props = {}) =>
  shallow(<CommunityRating {...defaultProps} {...props} />);

describe('CommunityRating', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();

    expect(wrapper.contains('test')).toBeFalsy();
  });

  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('[testID="RatingValue"]').contains('3.6')).toBeTruthy();
    expect(wrapper.contains(defaultProps.numReviews)).toBeTruthy();
  });
});
