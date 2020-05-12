import React from 'react';
import { shallow } from 'enzyme';

import Icon from 'sly/web/components/atoms/Icon';
import ListItem from 'sly/web/components/molecules/ListItem';

const wrap = () => shallow(<ListItem>blah</ListItem>);

it('renders text when passed in', () => {
  const wrapper = wrap();
  expect(wrapper.contains('blah')).toBe(true);
});

it('renders icon when text is passed in', () => {
  const wrapper = wrap();
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('renders icon when text is passed in', () => {
  const wrapper = wrap();
  expect(wrapper.find(Icon)).toHaveLength(1);
});

it('does not render children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(false);
});
