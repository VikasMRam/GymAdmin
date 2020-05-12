import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import DashboardAddPasswordForm from 'sly/web/containers/DashboardAddPasswordFormContainer';

storiesOf('Organisms|DashboardAddPasswordForm', module).add('default', () => (
  <DashboardAddPasswordForm
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
