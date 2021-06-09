import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import Intro from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const IntroContainer = reduxForm({
  form: 'Intro',
})(Intro);

storiesOf('Wizards|assessment/Steps/Intro', module)
  .add('default', () => <IntroContainer handleSubmit={withPreventDefault(action('form submitted'))} />)
  .add('showSkipOption', () => <IntroContainer handleSubmit={withPreventDefault(action('form submitted'))} showSkipOption />);
