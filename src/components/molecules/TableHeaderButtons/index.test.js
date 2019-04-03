import React from 'react';
import { shallow } from 'enzyme';

import TableHeaderButtons from 'sly/components/molecules/TableHeaderButtons';

const wrap = (props = {}) => shallow(<TableHeaderButtons {...props} />);

describe('TableHeaderButtons', () => {
  it('does renders children when passed in', () => {
    const wrapper = wrap({ children: 'test' });
    expect(wrapper.contains('test')).toBe(false);
  });
});
