import React from 'react';
import { shallow } from 'enzyme';

import CommunityAverageRating from 'sly/components/molecules/CommunityAverageRating';

const wrap = (props = {}) =>
  shallow(<CommunityAverageRating rating={3.6} {...props} />);

describe('CommunityAverageRating', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('does renders rating', () => {
    const wrapper = wrap();
    expect(wrapper.contains(3.6)).toBe(true);
  });
});
