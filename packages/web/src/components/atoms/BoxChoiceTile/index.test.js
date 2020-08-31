import React from 'react';
import { shallow } from 'enzyme';

import BoxChoiceTile from '.';

const label = 'hello';
const wrap = (props = {}) =>
  shallow(<BoxChoiceTile {...props} />);
const wrapChildren = (props = {}) =>
  shallow(<BoxChoiceTile {...props}>{label}</BoxChoiceTile>);

describe('BoxChoiceTile', () => {
  it('renders', () => {
    const wrapper = wrap({ label });
    expect(wrapper.contains(label)).toBeTruthy();
  });

  it('renders with children', () => {
    const wrapper = wrapChildren({ label });
    expect(wrapper.contains(label)).toBeTruthy();
  });

  it('renders with selected', () => {
    const wrapper = wrap({
      label, selected: true,
    });
    expect(wrapper.contains(label)).toBeTruthy();
  });

  it('renders with hasCheckbox', () => {
    const wrapper = wrap({
      label, hasCheckbox: true,
    });
    expect(wrapper.contains(label)).toBeTruthy();
    expect(wrapper.find('StyledIcon').filter({ icon: 'checkbox-empty' })).toHaveLength(1);
  });

  it('renders with hasCheckbox and selected', () => {
    const wrapper = wrap({
      label, hasCheckbox: true, selected: true,
    });
    expect(wrapper.contains(label)).toBeTruthy();
    expect(wrapper.find('StyledIcon').filter({ icon: 'checkbox' })).toHaveLength(1);
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
