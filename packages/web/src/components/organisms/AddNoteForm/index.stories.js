import React from 'react';
import { storiesOf } from '@storybook/react';
import { reduxForm } from 'redux-form';
import { action } from '@storybook/addon-actions';

import AddNoteForm from 'sly/web/components/organisms/AddNoteForm';

const AddNoteFormContainer = reduxForm({
  form: 'AddNoteForm',
})(AddNoteForm);
const placeholder = 'What are some things about this community that you like...';
const defaultProps = {
  placeholder,
};

storiesOf('Organisms|AddNoteForm', module)
  .add('default', () => <AddNoteFormContainer {...defaultProps} onSubmit={action('onSubmit')} />)
  .add('with cancel', () => <AddNoteFormContainer {...defaultProps} hasCancel onSubmit={action('onSubmit')} onCancelClick={action('onCancelClick')} />)
  .add('with heading and submitButtonText', () => <AddNoteFormContainer {...defaultProps} hasCancel heading="hello world" submitButtonText="Save note" onSubmit={action('onSubmit')} onCancelClick={action('onCancelClick')} />);
