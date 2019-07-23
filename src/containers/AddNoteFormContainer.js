import React from 'react';
import { reduxForm } from 'redux-form';

import { createValidator, required } from 'sly/services/validation';
import AddNoteForm from 'sly/components/organisms/AddNoteForm';

const validate = createValidator({
  note: [required],
});

const ReduxForm = reduxForm({
  form: 'AddNoteForm',
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(AddNoteForm);

const AddNoteFormContainer = props => props.noteRequired ? <ReduxForm {...props} validate={validate} /> : <ReduxForm {...props} />;

export default AddNoteFormContainer;
