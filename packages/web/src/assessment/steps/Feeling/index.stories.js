import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import Feeling from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const FeelingContainer = reduxForm({
  form: 'Feeling',
})(Feeling);

storiesOf('Wizards|assessment/Steps/Feeling', module)
  .add('default', () => (
    <FeelingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
    />
  ))
  .add('without tip', () => (
    <FeelingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      hasTip={false}
    />
  ));
