import React from 'react';
import { mount } from 'enzyme';

import ClampedText from 'sly/components/atoms/ClampedText';

const wrap = (props = {}, text = '') => mount(<ClampedText {...props}>{text}</ClampedText>);
const palette = 'slate';
const title = 'title';
const size = 'title';
const weight = 'bold';

describe('ClampedText', () => {
  it('renders', () => {
    const wrapper = wrap({}, 'test');
    expect(wrapper.contains('test')).toBe(true);
  });

  it('renders with correct palette', () => {
    const wrapper = wrap({ palette });
    expect(wrapper.props().palette).toBe(palette);
  });

  it('renders with correct title', () => {
    const wrapper = wrap({ title });
    expect(wrapper.props().title).toBe(title);
  });

  it('renders with correct size', () => {
    const wrapper = wrap({ size });
    expect(wrapper.props().size).toBe(size);
  });

  it('renders with correct weight', () => {
    const wrapper = wrap({ weight });
    expect(wrapper.props().weight).toBe(weight);
  });
});
