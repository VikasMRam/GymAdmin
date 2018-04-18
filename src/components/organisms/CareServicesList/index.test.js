import React from 'react';
import { mount } from 'enzyme';

import ListItem from 'sly/components/molecules/ListItem';
import CareServicesList from '.';

const wrap = () =>
  mount(<CareServicesList
    propertyName="ABC"
    careServices={['A', 'B']}
    serviceHighlights={['C', 'D', 'E']}
  />);

it('renders Property name when passed in', () => {
  const wrapper = wrap();
  expect(wrapper.text()).toContain('ABC is known for');
  expect(wrapper.text()).toContain('ABC also offers');
});

it('renders ListItems properly', () => {
  const wrapper = wrap();
  expect(wrapper.find(ListItem)).toHaveLength(5);
});

it('does not render children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(false);
});
