import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricingWizardLanding from 'sly/components/organisms/CommunityPricingWizardLanding';
import userPropType from 'sly/propTypes/user';

storiesOf('Organisms|CommunityPricingWizardLanding', module)
  .add('default', () => <CommunityPricingWizardLanding user={userPropType} />)
  .add('without user', () => <CommunityPricingWizardLanding />);

