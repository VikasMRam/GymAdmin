import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import { withPreventDefault } from 'sly/web/services/helpers/forms';
import { Intro } from 'sly/web/components/wizards/assessment';

const IntroContainer = reduxForm({
  form: 'Intro',
})(Intro);

storiesOf('Wizards|assessment/Steps/Intro', module)
  .add('default', () => <IntroContainer handleSubmit={withPreventDefault(action('form submitted'))} />);
