import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import SaveCommunityForm from 'sly/components/organisms/SaveCommunityForm';

const SaveCommunityFormContainer = reduxForm({
  form: 'SaveCommunityForm',
})(SaveCommunityForm);

storiesOf('Organisms|SaveCommunityForm', module)
  .add('default', () => <SaveCommunityFormContainer />)
  .add('with cancel', () => <SaveCommunityFormContainer hasCancel onCancelClick={action('onCancelClick')} />);
