import React from 'react';
import { shallow } from 'enzyme';

import DateChoiceTile from 'sly/web/components/molecules/DateChoiceTile';

const wrap = (props = {}) =>
  shallow(<DateChoiceTile {...props} />);

describe('DateChoiceTile', () => {
  it('renders', () => {
    const date = '2018-1-30';
    const dayName = 'Tuesday';
    const day = 30;
    const month = 'JAN';
    const wrapper = wrap({ date });
    expect(wrapper.contains(dayName)).toBe(true);
    expect(wrapper.find('StyledHeading').text()).toContain(day);
    expect(wrapper.contains(month)).toBe(true);
  });

  it('renders with selected', () => {
    const date = '2018-1-30';
    const dayName = 'Tuesday';
    const day = 30;
    const month = 'JAN';
    const wrapper = wrap({
      date, selected: true,
    });
    expect(wrapper.contains(dayName)).toBe(true);
    expect(wrapper.find('StyledHeading').text()).toContain(day);
    expect(wrapper.contains(month)).toBe(true);
  });

  it('onClick is called', () => {
    const date = '2018-1-30';
    const onClick = jest.fn();
    const wrapper = wrap({
      date, onClick,
    });
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('errors with invalid date', () => {
    const date = 'blah';
    const wrapper = wrap({
      date,
    });
    expect(wrapper.contains('Failed to parse date')).toBe(true);
  });
});
