import React from 'react';
import { mount } from 'enzyme';

import SearchBox from '.';
import { Icon, Input, Button } from 'sly/components/atoms';

const wrap = (props = {}) => mount(<SearchBox {...props} />);

it('renders', () => {
  const wrapper = wrap();
  expect(wrapper.find(Icon)).toHaveLength(2);
  expect(wrapper.find(Button)).toHaveLength(2);
  expect(wrapper.find(Input)).toHaveLength(1);
});

it('renders with homeHero layout', () => {
  const wrapper = wrap({ layout: 'homeHero' });
  expect(wrapper.find(Icon)).toHaveLength(1);
  expect(wrapper.find(Button)).toHaveLength(1);
  expect(wrapper.find(Input)).toHaveLength(1);
});
