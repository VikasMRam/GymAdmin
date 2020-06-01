import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { ResidentName } from 'sly/web/components/wizards/assesment';

const ResidentNameContainer = reduxForm({
  form: 'ResidentName',
})(ResidentName);

storiesOf('Wizards|Assesment/Steps/ResidentName', module)
  .add('default', () => (
    <ResidentNameContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
    />
  ))
  .add('with numberOfPeople', () => (
    <ResidentNameContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      numberOfPeople={4}
    />
  ));
