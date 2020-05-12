import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import DashboardProfileUserDetailsFormContainer from 'sly/web/containers/DashboardProfileUserDetailsFormContainer';

storiesOf('Organisms|DashboardProfileUserDetailsForm', module).add('default', () => (
  <DashboardProfileUserDetailsFormContainer
    handleSubmit={withPreventDefault(action('form submitted'))}
  />
));
