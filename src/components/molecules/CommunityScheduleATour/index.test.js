import React from 'react';
import { shallow } from 'enzyme';

import CommunityScheduleATour from 'sly/components/molecules/CommunityScheduleATour';

const onSATClick = jest.fn();

const wrap = (props = {}) =>
  shallow(<CommunityScheduleATour onSATClick={onSATClick} {...props} />);

describe('CommunityScheduleATour', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });

  it('does handles onSATClick', () => {
    const wrapper = wrap();
    const SATButton = wrapper.find('SATButton');

    expect(SATButton).toHaveLength(1);
    SATButton.simulate('click');
    expect(onSATClick).toHaveBeenCalled();
  });
});
