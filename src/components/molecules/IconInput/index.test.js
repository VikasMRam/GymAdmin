import React from 'react';
import { shallow } from 'enzyme';

import IconInput from 'sly/components/molecules/IconInput';

const wrap = (props = {}) => shallow(<IconInput {...props} />);

describe('IconInput', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find('StyledInput')).toHaveLength(1);
    expect(wrapper.find('IconWrapper')).toHaveLength(1);
  });
});
