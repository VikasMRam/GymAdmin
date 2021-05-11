import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OfferNotification from 'sly/web/profile/OfferNotification/OfferNotification';

storiesOf('Molecules|OfferNotification', module)
  .add('default', () => (
    <OfferNotification onLearnMoreClick={action('onLearnMoreClick')} title="Hello" />
  ))
  .add('with palette', () => (
    <OfferNotification onLearnMoreClick={action('onLearnMoreClick')} title="Hello" palette="warning" />
  ))
  .add('with description', () => (
    <OfferNotification onLearnMoreClick={action('onLearnMoreClick')} title="Holiday promotion!" description="Holiday promotion - Put a deposit down before the end of year and get your first month's rent free." />
  ))
  .add('with description and learn more', () => (
    <OfferNotification onLearnMoreClick={action('onLearnMoreClick')} hasLearnMore title="Holiday promotion!" description="Holiday promotion - Put a deposit down before the end of year and get your first month's rent free." />
  ));
