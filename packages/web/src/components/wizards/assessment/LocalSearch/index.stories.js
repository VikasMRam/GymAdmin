import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/common/services/helpers/forms';
import { LocalSearch } from 'sly/web/components/wizards/assessment';

const LocalSearchContainer = reduxForm({
  form: 'Feeling',
})(LocalSearch);

storiesOf('Wizards|assessment/Steps/Feeling', module)
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
