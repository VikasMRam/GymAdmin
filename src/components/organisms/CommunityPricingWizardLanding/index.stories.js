import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricingWizardLanding from 'sly/components/organisms/CommunityPricingWizardLanding';

const defaultProps = {
  name: 'Test name',
};

storiesOf('Organisms|CommunityPricingWizardLanding', module)
  .add('default', () => <CommunityPricingWizardLanding {...defaultProps} />);
