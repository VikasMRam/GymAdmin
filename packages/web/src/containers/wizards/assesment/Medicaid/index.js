import React from 'react';
import { reduxForm } from 'redux-form';

import { Medicaid } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  medicaid: [required],
});

const ReduxForm = reduxForm({
  form: 'MedicaidForm',
  destroyOnUnmount: false,
  validate,
})(Medicaid);

const MedicaidFormContainer = props => <ReduxForm {...props} />;

export default MedicaidFormContainer;
