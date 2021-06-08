import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import ADL from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const ADLContainer = reduxForm({
  form: 'ADL',
})(ADL);

storiesOf('Wizards|assessment/Steps/ADL', module)
  .add('default', () => (
    <ADLContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
    />
  ))
  .add('without tip', () => (
    <ADLContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      whoNeedsHelp="parents"
      hasTip={false}
    />
  ));
