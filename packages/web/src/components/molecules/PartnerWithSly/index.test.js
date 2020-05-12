import React from 'react';
import { shallow } from 'enzyme';

import PartnerWithSly from 'sly/components/molecules/PartnerWithSly';
import { Button } from 'sly/components/atoms';

const wrap = (props = {}) => shallow(<PartnerWithSly {...props} />);

describe('PartnerWithSly', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
