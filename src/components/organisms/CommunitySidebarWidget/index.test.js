import React from 'react';
import { shallow } from 'enzyme';

import CommunitySidebarWidget from 'sly/components/organisms/CommunitySidebarWidget';

const onSATClick = jest.fn();

const wrap = (props = {}) =>
  shallow(<CommunitySidebarWidget price={4300} rating={3.6} onSATClick={onSATClick} {...props} />);

describe('CommunitySidebarWidget', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap();
    expect(wrapper.contains('test')).toBe(false);
  });
});
