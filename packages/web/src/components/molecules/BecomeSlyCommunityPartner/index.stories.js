import React from 'react';
import { storiesOf } from '@storybook/react';

import BecomeSlyPartnerBanner from 'sly/web/components/molecules/BecomeSlyPartnerBanner';

storiesOf('Molecules|BecomeSlyCommunityPartnerBanner', module)
  .add('default', () => <BecomeSlyPartnerBanner />)
  .add('with palette', () => <BecomeSlyPartnerBanner palette="slate" />);
