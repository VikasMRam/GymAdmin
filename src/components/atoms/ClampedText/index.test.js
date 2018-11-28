import React from 'react';
import { shallow } from 'enzyme';

import ClampedText from 'sly/components/atoms/ClampedText';

const wrap = (props = {}, text = '') => shallow(<ClampedText {...props}>{text}</ClampedText>);
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
    expect(wrapper.instance().props.palette).toBe(palette);
  });

  it('renders with correct title', () => {
    const wrapper = wrap({ title });
    expect(wrapper.instance().props.title).toBe(title);
  });

  it('renders with correct size', () => {
    const wrapper = wrap({ size });
    expect(wrapper.instance().props.size).toBe(size);
  });

  it('renders with correct weight', () => {
    const wrapper = wrap({ weight });
    expect(wrapper.instance().props.weight).toBe(weight);
  });
});
