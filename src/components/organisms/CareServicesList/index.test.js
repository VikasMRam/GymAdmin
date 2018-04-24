import React from 'react';
import { mount } from 'enzyme';

import List from 'sly/components/molecules/List';
import CareServicesList from '.';

const wrap = () =>
  mount(<CareServicesList
    communityName="ABC"
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
  expect(wrapper.find(List)).toHaveLength(2);
});

it('does not render children when passed in', () => {
  const wrapper = wrap({ children: 'test' });
  expect(wrapper.contains('test')).toBe(false);
});
