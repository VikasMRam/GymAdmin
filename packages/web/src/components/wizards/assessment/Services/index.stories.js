import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/common/services/helpers/forms';
import { Services } from 'sly/web/components/wizards/assessment';

const ServicesContainer = reduxForm({
  form: 'Services',
})(Services);

storiesOf('Wizards|assessment/Steps/Services', module)
  .add('default', () => (
    <ServicesContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ))
  .add('without tip', () => (
    <ServicesContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
      hasTip={false}
    />
  ));
