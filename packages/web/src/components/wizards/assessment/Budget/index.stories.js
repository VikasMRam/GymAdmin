import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { Budget } from 'sly/web/components/wizards/assessment';

const BudgetContainer = reduxForm({
  form: 'Budget',
})(Budget);

storiesOf('Wizards|assessment/Steps/Budget', module)
  .add('default', () => (
    <BudgetContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
      city="San Francisco"
      state="California"
      amount={3000}
    />
  ))
  .add('without tip', () => (
    <BudgetContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="mom"
      city="San Francisco"
      state="California"
      amount={3000}
      hasTip={false}
    />
  ))
  .add('with myself-and-spouse selected', () => (
    <BudgetContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself-and-spouse"
      city="San Francisco"
      state="California"
      amount={3000}
    />
  ))
  .add('with myself selected', () => (
    <BudgetContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="myself"
      city="San Francisco"
      state="California"
      amount={3000}
    />
  ))
  .add('with parents selected', () => (
    <BudgetContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
      city="San Francisco"
      state="California"
      amount={3000}
    />
  ));
