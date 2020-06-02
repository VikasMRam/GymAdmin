import React from 'react';
import { reduxForm } from 'redux-form';

import { ResidentName } from 'sly/web/components/wizards/assesment';

const ReduxForm = reduxForm({
  form: 'ResidentNameForm',
  destroyOnUnmount: false,
})(ResidentName);

const ResidentNameFormContainer = props => <ReduxForm {...props} />;

export default ResidentNameFormContainer;
