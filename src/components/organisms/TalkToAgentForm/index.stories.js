import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';

import TalkToAgentForm from 'sly/components/organisms/TalkToAgentForm';

const TalkToAgentFormContainer = reduxForm({
  form: 'TalkToAgentForm',
})(TalkToAgentForm);

storiesOf('Organisms|TalkToAgentForm', module)
  .add('default', () => <TalkToAgentFormContainer />);
