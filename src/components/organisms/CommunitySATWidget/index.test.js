import React from 'react';
import { shallow } from 'enzyme';

import CommunitySATWidget from 'sly/components/organisms/CommunitySATWidget';

const onSATClick = jest.fn();

const wrap = (props = {}) =>
  shallow(<CommunitySATWidget price={4300} rating={3.6} onSATClick={onSATClick} {...props} />);

describe('CommunitySATWidget', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });
});
