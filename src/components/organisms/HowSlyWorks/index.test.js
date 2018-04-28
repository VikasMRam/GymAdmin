import React from 'react';
import { mount } from 'enzyme';

import HowSlyWorks from '.';

const wrap = (props = {}) => mount(<HowSlyWorks {...props} />);


describe('HowSeniorlyWorks', () => {
  it('verify image being set', () => {
    const wrapper = wrap({
      image
    });
    expect(wrapper.find('img').props()).toHaveProperty('src', image);
  });
});
