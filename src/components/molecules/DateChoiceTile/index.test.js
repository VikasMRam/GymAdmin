import React from 'react';
import { shallow } from 'enzyme';

import DateChoiceTile from 'sly/components/molecules/DateChoiceTile';

const wrap = (props = {}) =>
  shallow(<DateChoiceTile {...props} />);

describe('DateChoiceTile', () => {
  it('renders', () => {
    const date = '1-30-2018';
    const dayName = 'Tuesday';
    const day = 30;
    const month = 'JAN';
    const wrapper = wrap({ date });
    expect(wrapper.contains(dayName)).toBe(true);
    expect(wrapper.find('StyledHeading').dive().dive().dive()
      .text()).toContain(day);
    expect(wrapper.contains(month)).toBe(true);
  });

  it('renders with selected', () => {
    const date = '1-30-2018';
    const dayName = 'Tuesday';
    const day = 30;
    const month = 'JAN';
    const wrapper = wrap({
      date, selected: true,
    });
    expect(wrapper.contains(dayName)).toBe(true);
    expect(wrapper.find('StyledHeading').dive().dive().dive()
      .text()).toContain(day);
    expect(wrapper.contains(month)).toBe(true);
  });

  it('onClick is called', () => {
    const date = '1-30-2018';
    const onClick = jest.fn();
    const wrapper = wrap({
      date, onClick,
    });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
