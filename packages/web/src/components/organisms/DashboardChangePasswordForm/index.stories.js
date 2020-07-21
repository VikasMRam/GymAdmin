import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import DashboardChangePasswordForm from 'sly/web/containers/DashboardChangePasswordFormContainer';
import { withPreventDefault } from 'sly/common/services/helpers/forms';

storiesOf('Organisms|DashboardChangePasswordForm', module).add('default', () => (
  <DashboardChangePasswordForm
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
