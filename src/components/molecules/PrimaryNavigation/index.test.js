import React from 'react';
import { shallow } from 'enzyme';
import PrimaryNavigation from '.';

const wrap = (props = {}) => shallow(<PrimaryNavigation {...props} />);

describe('PrimaryNavigation', () => {
  it.skip('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
  });
});
