import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import Timing from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const TimingContainer = reduxForm({
  form: 'Timing',
})(Timing);

storiesOf('Wizards|assessment/Steps/Timing', module)
  .add('default', () => (
    <TimingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
    />
  ))
  .add('without tip', () => (
    <TimingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      hasTip={false}
    />
  ));
