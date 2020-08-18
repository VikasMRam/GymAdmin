import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/common/services/helpers/forms';
import { Age } from 'sly/web/components/wizards/assessment';

const AgeContainer = reduxForm({
  form: 'Age',
})(Age);

storiesOf('Wizards|assessment/Steps/Age', module)
  .add('default', () => (
    <AgeContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ))
  .add('without tip', () => (
    <AgeContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
      hasTip={false}
    />
  ));
