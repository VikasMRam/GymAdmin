import React from 'react';
import { mount } from 'enzyme';

import CommunityPricingWizardLanding from 'sly/web/components/organisms/CommunityPricingWizardLanding';
import SushanthRamakrishna from 'sly/web/../private/storybook/sample-data/user-sushanth-ramakrishna.json';

const defaultProp = {
  user: SushanthRamakrishna,
};

const wrap = (props = {}) => mount(<CommunityPricingWizardLanding {...defaultProp} {...props} />);

describe('CommunityPricingWizardLanding', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading').text()).toContain(SushanthRamakrishna.name);
  });
});
