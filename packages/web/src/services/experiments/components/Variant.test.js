import React from 'react';
import { shallow } from 'enzyme';

import Variant from './Variant';

const wrap = (props = {}) => shallow(<Variant {...props} />);

describe('Experiments|Variant', () => {
  it('renders', () => {
    const wrapper = wrap({ name: 'test', children: <span>test content</span> });
    expect(wrapper.find('span').length).toBe(1);
  });
});
