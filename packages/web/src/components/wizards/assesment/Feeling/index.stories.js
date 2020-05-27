import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { Feeling } from 'sly/web/components/wizards/assesment';

const FeelingContainer = reduxForm({
  form: 'Feeling',
})(Feeling);

storiesOf('Wizards|Assesment/Steps/Feeling', module)
  .add('default', () => (
    <FeelingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
    />
  ));
