import React from 'react';
import { mount } from 'enzyme';

import { Heading, Block } from 'sly/web/components/atoms';
import Section from 'sly/web/components/molecules/Section';

const title = 'Section Title';
const subtitle = 'Section SubTitle';
const wrap = (props = {}) => mount(<Section title={title} {...props} />);

describe('Section', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders title when passed in', () => {
    const wrapper = wrap({ title, children: 'test' });
    expect(wrapper.contains(Heading)).toBe(true);
    expect(wrapper.find(Heading).text()).toBe(title);
  });

  it('renders subtitle when passed in', () => {
    const wrapper = wrap({ title, subtitle, children: 'test' });
    expect(wrapper.contains(Block)).toBe(true);
    expect(wrapper.find(Block).text()).toBe(subtitle);
  });
});
