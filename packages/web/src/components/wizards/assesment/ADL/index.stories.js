import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { ADL } from 'sly/web/components/wizards/assesment';

const ADLContainer = reduxForm({
  form: 'ADL',
})(ADL);

storiesOf('Wizards|Assesment/Steps/ADL', module)
  .add('default', () => (
    <ADLContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ));
