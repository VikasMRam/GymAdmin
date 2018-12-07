import React from 'react';
import { storiesOf } from '@storybook/react';

import OfferNotification from 'sly/components/molecules/OfferNotification';

storiesOf('Molecules|OfferNotification', module)
  .add('default', () => (
    <OfferNotification title="Hello" />
  ))
  .add('with palette', () => (
    <OfferNotification title="Hello" palette="warning" />
  ))
  .add('with description', () => (
    <OfferNotification title="Holiday promotion!" description="Holiday promotion - Put a deposit down before the end of year and get your first month's rent free." />
  ))
  .add('with description and learn more', () => (
    <OfferNotification hasLearnMore title="Holiday promotion!" description="Holiday promotion - Put a deposit down before the end of year and get your first month's rent free." />
  ));

