import React from 'react';
import { shallow } from 'enzyme';

import CommunityPricingWizardLanding from 'sly/components/organisms/CommunityPricingWizardLanding';
import SushanthRamakrishna from 'sly/../private/storybook/sample-data/user-sushanth-ramakrishna.json';

const defaultProp = {
  user: SushanthRamakrishna,
};

const wrap = (props = {}) =>
  shallow(<CommunityPricingWizardLanding {...defaultProp} {...props} />);

describe('CommunityPricingWizardLanding', () => {
  it('renders', () => {
    const wrapper = wrap();

    expect(wrapper.find('PaddedHeading').dive().dive().dive()
      .text()).toContain(SushanthRamakrishna.name);
  });
});
