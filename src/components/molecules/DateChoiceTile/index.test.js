import React from 'react';
import { shallow } from 'enzyme';

import DateChoiceTile from 'sly/components/molecules/DateChoiceTile';

const wrap = (props = {}) =>
  shallow(<DateChoiceTile {...props} />);

describe('DateChoiceTile', () => {
  it('renders', () => {
    const dayName = 'Monday';
    const day = 12;
    const month = 'JAN';
    const wrapper = wrap({ dayName, day, month });
    expect(wrapper.contains(dayName)).toBe(true);
    expect(wrapper.contains(day)).toBe(true);
    expect(wrapper.contains(month)).toBe(true);
  });

  it('renders with selected', () => {
    const dayName = 'Monday';
    const day = 12;
    const month = 'JAN';
    const wrapper = wrap({
      dayName, day, month, selected: true,
    });
    expect(wrapper.contains(dayName)).toBe(true);
    expect(wrapper.contains(day)).toBe(true);
    expect(wrapper.contains(month)).toBe(true);
  });

  it('onClick is called', () => {
    const dayName = 'Monday';
    const day = 12;
    const month = 'JAN';
    const onClick = jest.fn();
    const wrapper = wrap({
      dayName, day, month, onClick,
    });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
