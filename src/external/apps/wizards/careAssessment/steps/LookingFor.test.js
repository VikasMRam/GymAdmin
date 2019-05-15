import React from 'react';
import { shallow } from 'enzyme';

import LookingFor from 'sly/external/apps/wizards/careAssessment/steps/LookingFor';

const wrap = (props = {}) => shallow(<LookingFor {...props} />);

describe('LookingFor', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading')).toHaveLength(1);
    expect(wrapper.find('StyledField')).toHaveLength(1);
  });
});
