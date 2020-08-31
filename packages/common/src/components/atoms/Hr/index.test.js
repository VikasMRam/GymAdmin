import React from 'react';
import { shallow } from 'enzyme';

import Hr from '.';

const wrap = (props = {}) => shallow(<Hr {...props} />);

describe('Hr|Web', () => {
  it('does not render children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.dive().dive().contains('test')).toBeFalsy();
  });
});
