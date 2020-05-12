import React from 'react';
import { shallow } from 'enzyme';

import Tag from 'sly/web/components/atoms/Tag';

const wrap = (props = {}) => shallow(<Tag {...props} />);

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(true);
});

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' });
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1);
});
