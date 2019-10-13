import React from 'react';
import { shallow } from 'enzyme';

import CommunityPricingWizardLanding from 'sly/components/organisms/CommunityPricingWizardLanding';

const name = 'test';
const defaultProp = { name };

const wrap = (props = {}) =>
  shallow(<CommunityPricingWizardLanding {...defaultProp} {...props} />);

describe('CommunityPricingWizardLanding', () => {
  it('renders', () => {
    const wrapper = wrap();
    expect(wrapper.contains(name)).toBeTruthy();
  });
});
