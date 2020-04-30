import React from 'react';
import { storiesOf } from '@storybook/react';

import BecomeSlyPartnerBanner from 'sly/components/molecules/BecomeSlyPartnerBanner';

storiesOf('Molecules|BecomeSlyPartnerBanner', module)
  .add('default', () => <BecomeSlyPartnerBanner />)
  .add('with palette', () => <BecomeSlyPartnerBanner palette="slate" />);
