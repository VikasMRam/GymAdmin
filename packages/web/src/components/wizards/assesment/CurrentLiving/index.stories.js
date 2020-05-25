import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { CurrentLiving } from 'sly/web/components/wizards/assesment';

const CurrentLivingContainer = reduxForm({
  form: 'CurrentLiving',
})(CurrentLiving);

storiesOf('Wizards|Assesment/Steps/CurrentLiving', module)
  .add('default', () => (
    <CurrentLivingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
    />
  ))
  .add('default myself-and-spouse selected', () => (
    <CurrentLivingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself-and-spouse"
    />
  ))
  .add('default myself selected', () => (
    <CurrentLivingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself"
    />
  ))
  .add('default parents selected', () => (
    <CurrentLivingContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ));
