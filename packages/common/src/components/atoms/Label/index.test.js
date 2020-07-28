import React from 'react';
import { shallow } from 'enzyme';

import Label from '.';

const wrap = (props = {}) => shallow(<Label {...props} />);

describe('Label', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBeTruthy();
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ htmlFor: 'foo' });
    expect(wrapper.find({ htmlFor: 'foo' })).toHaveLength(1);
  });
});
