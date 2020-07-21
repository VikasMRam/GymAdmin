import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/common/services/helpers/forms';
import { Dementia } from 'sly/web/components/wizards/assessment';

const DementiaContainer = reduxForm({
  form: 'Dementia',
})(Dementia);

storiesOf('Wizards|assessment/Steps/Dementia', module)
  .add('default', () => (
    <DementiaContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
    />
  ))
  .add('without tip', () => (
    <DementiaContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
      hasTip={false}
    />
  ))
  .add('default male selected', () => (
    <DementiaContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="dad"
    />
  ))
  .add('default client selected', () => (
    <DementiaContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="client"
    />
  ))
  .add('default myself selected', () => (
    <DementiaContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself"
    />
  ))
  .add('with parents selected', () => (
    <DementiaContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ))
  .add('with myself-and-spouse selected', () => (
    <DementiaContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself-and-spouse"
    />
  ));
