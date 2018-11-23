import React from 'react';
import { mount } from 'enzyme';

import { Heading } from 'sly/components/atoms';

import Section from '.';

const title = 'Section Title';
const wrap = (props = {}) => mount(<Section title={title} {...props} />);

describe('CollapsibleSection', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders title when passed in', () => {
    const wrapper = wrap({ title: 'test', children: 'test' });
    expect(wrapper.contains(Heading)).toBe(true);
  });
});
