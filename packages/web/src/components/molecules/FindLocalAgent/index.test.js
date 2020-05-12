import React from 'react';
import { shallow } from 'enzyme';

import FindLocalAgent from 'sly/web/components/molecules/FindLocalAgent';

const wrap = (props = {}) => shallow(<FindLocalAgent {...props} />);

describe('FindLocalAgent', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledSearchBoxContainer')).toHaveLength(1);
  });
});
