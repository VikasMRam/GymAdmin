import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/common/services/helpers/forms';
import { ResidentName } from 'sly/web/components/wizards/assessment';

const ResidentNameContainer = reduxForm({
  form: 'ResidentName',
})(ResidentName);

storiesOf('Wizards|assessment/Steps/ResidentName', module)
  .add('default', () => (
    <ResidentNameContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
    />
  ))
  .add('without tip', () => (
    <ResidentNameContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      hasTip={false}
    />
  ))
  .add('with numberOfPeople', () => (
    <ResidentNameContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      numberOfPeople={4}
    />
  ));
