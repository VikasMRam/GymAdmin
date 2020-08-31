import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import LocalSearch from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const LocalSearchContainer = reduxForm({
  form: 'LocalSearch',
})(LocalSearch);

storiesOf('Wizards|assessment/Steps/LocalSearch', module)
  .add('default', () => (
    <LocalSearchContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
    />
  ))
  .add('without tip', () => (
    <LocalSearchContainer
      handleSubmit={withPreventDefault(action('form submitted'))}
      onSkipClick={action('onSkipClick')}
      onBackClick={action('onBackClick')}
      hasTip={false}
    />
  ));
