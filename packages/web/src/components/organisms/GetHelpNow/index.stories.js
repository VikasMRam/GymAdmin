import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { reduxForm } from 'redux-form';

import GetHelpNow from 'sly/web/components/organisms/GetHelpNow';
import { withPreventDefault } from 'sly/web/services/helpers/forms';

const GetHelpNowContainer = reduxForm({
  form: 'GetHelpNow',
})(GetHelpNow);

storiesOf('Organisms|GetHelpNow', module)
  .add('default', () => (
    <GetHelpNowContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onPhoneClick={action('onPhoneClick')}
    />
  ));
