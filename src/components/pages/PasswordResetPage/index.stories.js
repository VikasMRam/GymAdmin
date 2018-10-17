import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import { withPreventDefault } from 'sly/services/helpers/forms';

import PasswordResetPage from '.';

const PasswordResetPageContainer = reduxForm({
  form: 'PasswordResetPage',
  destroyOnUnmount: false,
})(PasswordResetPage);

storiesOf('Pages|PasswordResetPage', module)
  .add('default', () => (
    <PasswordResetPageContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
    />
  ));
