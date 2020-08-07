import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CustomerSignupConfirmation from '.';

import AmalFrancis from 'sly/storybook/sample-data/user-amal-francis.json';

storiesOf('Common|Services/Auth/CustomerSignupConfirmation', module)
  .add('default', () => (
    <CustomerSignupConfirmation
      onSubmit={action('continue clicked')}
      user={AmalFrancis}
    />
  ));
