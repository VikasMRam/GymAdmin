import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ProviderConfirmation from '.';

storiesOf('Common|Services/Auth/ProviderConfirmation', module)
  .add('default', () => (
    <ProviderConfirmation
      onSubmit={action('form submitted')}
      mode="Approved"
    />
  ))
  .add('mode NotFound', () => (
    <ProviderConfirmation
      onSubmit={action('form submitted')}
      mode="NotFound"
    />
  ))
  .add('mode NeedApproval', () => (
    <ProviderConfirmation
      onSubmit={action('form submitted')}
      mode="NeedApproval"
    />
  ));
