import React from 'react';
import { shallow } from 'enzyme';

import Th from 'sly/components/molecules/Th';

const wrap = (props = {}) => shallow(<Th {...props} />);

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'Stage' });
  expect(wrapper.contains('Stage')).toBe(true);
  expect(wrapper.find('SortIcon')).toHaveLength(0);
  expect(wrapper.find('DropDownIcon')).toHaveLength(1);
});

it('renders sort asc', () => {
  const wrapper = wrap({ children: 'Stage', sort: 'asc' });
  expect(wrapper.contains('Stage')).toBe(true);
  expect(wrapper.find('SortIcon')).toHaveLength(1);
  expect(wrapper.find('DropDownIcon')).toHaveLength(1);
});

it('renders sort desc', () => {
  const wrapper = wrap({ children: 'Stage', sort: 'desc' });
  expect(wrapper.contains('Stage')).toBe(true);
  expect(wrapper.find('SortIcon')).toHaveLength(1);
  expect(wrapper.find('DropDownIcon')).toHaveLength(1);
  expect(wrapper.find('SortIcon').prop('flip')).toBeTruthy();
});
