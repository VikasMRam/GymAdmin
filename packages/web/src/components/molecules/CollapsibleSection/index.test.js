import React from 'react';
import { mount } from 'enzyme';

import CollapsibleSection, { Header } from 'sly/web/components/molecules/CollapsibleSection';
import { ClampedText } from 'sly/web/components/atoms';

const title = 'Section Title';
const wrap = (props = {}) => mount(<CollapsibleSection title={title} {...props} />);

describe('CollapsibleSection', () => {
  it('renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    const heading = wrapper.find(Header);

    expect(wrapper.contains('test')).toBe(true);
    expect(heading.find(ClampedText)).toHaveLength(0);
  });

  it('renders props when passed in', () => {
    const wrapper = wrap({ id: 'foo' });
    expect(wrapper.find('div[id="foo"]')).toHaveLength(1);
  });

  it('renders default collapsed, calls toggle', () => {
    const wrapper = wrap({ collapsedDefault: true });
    const heading = wrapper.find(Header);

    expect(heading.find(ClampedText)).toHaveLength(0);
    expect(wrapper.state()).toEqual({ collapsed: true });
    heading.simulate('click');
    expect(wrapper.state()).toEqual({ collapsed: false });
  });

  it.only('renders default not collapsed, calls toggle', () => {
    const wrapper = wrap();
    const heading = wrapper.find('Heading');
    expect(wrapper.find('Content').prop('maxHeight')).toBe(undefined);
    expect(wrapper.find('Content').prop('collapsed')).toBe(false);
    heading.simulate('click');
    expect(wrapper.find('Content').prop('maxHeight')).toBe.a.Number();
    expect(wrapper.find('Content').prop('collapsed')).toBe(true);
  });
});

