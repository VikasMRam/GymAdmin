import React from 'react';
import { shallow } from 'enzyme';

import CareNeeds from 'sly/web/external/apps/wizards/careAssessment/steps/CareNeeds';

const wrap = (props = {}) => shallow(<CareNeeds {...props} />);

describe('CareNeeds', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('Description')).toHaveLength(1);
    expect(wrapper.find('StyledField')).toHaveLength(1);
  });
});
