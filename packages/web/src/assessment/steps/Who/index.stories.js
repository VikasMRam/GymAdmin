import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import Who from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const WhoContainer = reduxForm({
  form: 'Who',
})(Who);

storiesOf('Wizards|assessment/Steps/Who', module)
  .add('default', () => <WhoContainer handleSubmit={withPreventDefault(action('form submitted'))} />)
  .add('without tip', () => <WhoContainer handleSubmit={withPreventDefault(action('form submitted'))} hasTip={false} />);
