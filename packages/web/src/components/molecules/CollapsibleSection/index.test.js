import React from 'react';
import { mount } from 'enzyme';
import Measure from 'react-measure';

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

  it('renders default not collapsed, calls toggle', () => {
    const wrapper = wrap();
    const heading = wrapper.find(Header);

    expect(heading.find(ClampedText)).toHaveLength(0);
    expect(wrapper.state()).toEqual({ collapsed: false });
    heading.simulate('click');
    expect(wrapper.state()).toEqual({ collapsed: true });
  });

  it('receives onResize event', () => {
    const wrapper = wrap();
    const onResize = wrapper.find(Measure).prop('onResize');
    expect(wrapper.state('maxHeight')).toEqual(undefined);

    onResize({});
    expect(wrapper.state('maxHeight')).toEqual(undefined);

    onResize({ entry: { height: 600 } });
    expect(wrapper.state('maxHeight')).toEqual(600);
  });

  it('renders with clampTitle', () => {
    const wrapper = wrap({ clampTitle: true });
    const heading = wrapper.find(Header);

    expect(heading.find(ClampedText)).toHaveLength(1);
  });
});

