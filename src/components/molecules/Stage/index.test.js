import React from 'react';
import { shallow } from 'enzyme';

import Stage from 'sly/components/molecules/Stage';

const stage = 'New';

const wrap = (props = {}) => shallow(<Stage stage={stage} {...props} />);

describe('Stage', () => {
  it('does not renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });
});
