import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import WorkingWith from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const WorkingWithContainer = reduxForm({
  form: 'WorkingWith',
})(WorkingWith);

storiesOf('Wizards|assessment/Steps/WorkingWith', module)
  .add('default', () => (
    <WorkingWithContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
    />
  ))
  .add('without tip', () => (
    <WorkingWithContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      hasTip={false}
    />
  ));
