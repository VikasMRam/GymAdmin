import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import Medicaid from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const MedicaidContainer = reduxForm({
  form: 'Medicaid',
})(Medicaid);

storiesOf('Wizards|assessment/Steps/Medicaid', module)
  .add('default', () => (
    <MedicaidContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
    />
  ))
  .add('without tip', () => (
    <MedicaidContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
      hasTip={false}
    />
  ))
  .add('with parent selected', () => (
    <MedicaidContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ))
  .add('with myself-and-spouse selected', () => (
    <MedicaidContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself-and-spouse"
    />
  ))
  .add('with myself selected', () => (
    <MedicaidContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself"
    />
  ));