import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import Agent from '.';

import { withPreventDefault } from 'sly/common/services/helpers/forms';

const AgentContainer = reduxForm({
  form: 'Agent',
})(Agent);

storiesOf('Wizards|assessment/Steps/Who', module)
  .add('default', () => <AgentContainer handleSubmit={withPreventDefault(action('form submitted'))} />)
  .add('without tip', () => <AgentContainer handleSubmit={withPreventDefault(action('form submitted'))} hasTip={false} />);
