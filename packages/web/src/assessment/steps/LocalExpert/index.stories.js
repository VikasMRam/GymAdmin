import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import LocalExpert from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const LocalExpertContainer = reduxForm({
  form: 'LocalExpert',
})(LocalExpert);

storiesOf('Wizards|assessment/Steps/LocalExpert', module)
  .add('default', () => (
    <LocalExpertContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
    />
  ))
  .add('without tip', () => (
    <LocalExpertContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      hasTip={false}
    />
  ));
