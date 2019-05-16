import React from 'react';
import { reduxForm } from 'redux-form';

import AddNoteForm from 'sly/components/organisms/AddNoteForm';

const ReduxForm = reduxForm({
  form: 'AddNoteForm',
  // required to refresh when initialValues change. Ref: https://redux-form.com/6.7.0/examples/initializefromstate/
  enableReinitialize: true,
  keepDirtyOnReinitialize: false,
})(AddNoteForm);

const AddNoteFormContainer = props => <ReduxForm {...props} />;

export default AddNoteFormContainer;
