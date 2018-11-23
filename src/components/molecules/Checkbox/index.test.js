import React from 'react';
import { shallow } from 'enzyme';

import Checkbox, { StyledIcon } from 'sly/components/molecules/Checkbox';

const wrap = (props = {}) => shallow(<Checkbox {...props} />);

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    const wrapper = wrap();
    expect(wrapper.find(StyledIcon).prop('checked')).toEqual(false);
  });

  it('renders checked', () => {
    const wrapper = wrap({ checked: true });
    expect(wrapper.find(StyledIcon).prop('checked')).toEqual(true);
  });
});

