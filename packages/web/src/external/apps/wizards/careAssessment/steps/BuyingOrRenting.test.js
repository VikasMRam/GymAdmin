import React from 'react';
import { shallow } from 'enzyme';

import BuyingOrRenting from 'sly/web/external/apps/wizards/careAssessment/steps/BuyingOrRenting';

const wrap = (props = {}) => shallow(<BuyingOrRenting {...props} />);

describe('BuyingOrRenting', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('StyledField')).toHaveLength(1);
  });
});
