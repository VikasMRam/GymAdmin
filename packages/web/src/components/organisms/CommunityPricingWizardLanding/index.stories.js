import React from 'react';
import { storiesOf } from '@storybook/react';

import CommunityPricingWizardLanding from 'sly/web/components/organisms/CommunityPricingWizardLanding';
import SushanthRamakrishna from 'sly/storybook/sample-data/user-sushanth-ramakrishna.json';

storiesOf('Organisms|CommunityPricingWizardLanding', module)
  .add('default', () => <CommunityPricingWizardLanding user={SushanthRamakrishna} />)
  .add('without user', () => <CommunityPricingWizardLanding />);

