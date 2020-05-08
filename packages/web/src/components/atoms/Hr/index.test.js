import React from 'react';
import { shallow } from 'enzyme';

import Hr from '.';

const wrap = (props = {}) => shallow(<Hr {...props} />);

it('does not render children when passed in', () => {
  const wrapper = wrap({ childred: 'test' });
  expect(wrapper.contains('test')).toBe(false);
});
