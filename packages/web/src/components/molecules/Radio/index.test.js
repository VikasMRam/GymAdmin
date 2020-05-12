import React from 'react';
import { shallow } from 'enzyme';

import Radio, { StyledIcon } from 'sly/web/components/molecules/Radio';

const wrap = (props = {}) => shallow(<Radio {...props} />);

describe('Radio', () => {
  it('renders unchecked by default', () => {
    const wrapper = wrap();
    expect(wrapper.find(StyledIcon).prop('checked')).toEqual(false);
  });

  it('renders checked', () => {
    const wrapper = wrap({ checked: true });
    expect(wrapper.find(StyledIcon).prop('checked')).toEqual(true);
  });
});

