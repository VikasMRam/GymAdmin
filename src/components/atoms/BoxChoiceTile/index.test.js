import React from 'react';
import { shallow } from 'enzyme';

import BoxChoiceTile from 'sly/components/atoms/BoxChoiceTile';

const label = 'hello';
const wrap = (props = {}) =>
  shallow(<BoxChoiceTile {...props} />);
const wrapChildren = (props = {}) =>
  shallow(<BoxChoiceTile {...props}>{label}</BoxChoiceTile>);

describe('BoxChoiceTile', () => {
  it('renders', () => {
    const wrapper = wrap({ label });
    expect(wrapper.contains(label)).toBe(true);
  });

  it('renders with children', () => {
    const wrapper = wrapChildren({ label });
    expect(wrapper.contains(label)).toBe(true);
  });

  it('renders with selected', () => {
    const wrapper = wrap({
      label, selected: true,
    });
    expect(wrapper.contains(label)).toBe(true);
  });

  it('onClick is called', () => {
    const onClick = jest.fn();
    const wrapper = wrap({
      label, onClick,
    });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
