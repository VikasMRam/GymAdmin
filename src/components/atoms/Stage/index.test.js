import React from 'react';
import { shallow } from 'enzyme';

import Stage from 'sly/components/atoms/Stage';

const defaultProps = {
  text: 'New',
  currentStage: 2,
};

const wrap = (props = {}) => shallow(<Stage {...defaultProps} {...props} />);

describe('Stage', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });
});
