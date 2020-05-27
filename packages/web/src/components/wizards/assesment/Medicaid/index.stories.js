import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { Medicaid } from 'sly/web/components/wizards/assesment';

const MedicaidContainer = reduxForm({
  form: 'Medicaid',
})(Medicaid);

storiesOf('Wizards|Assesment/Steps/Medicaid', module)
  .add('default', () => (
    <MedicaidContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
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
