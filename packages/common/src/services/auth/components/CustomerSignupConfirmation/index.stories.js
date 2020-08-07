import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CustomerSignupConfirmation from '.';

storiesOf('Common|Services/Auth/CustomerSignupConfirmation', module)
  .add('default', () => (
    <CustomerSignupConfirmation
      onSubmit={action('continue clicked')}
    />
  ));
