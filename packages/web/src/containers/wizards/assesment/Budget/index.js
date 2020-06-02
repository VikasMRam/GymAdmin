import React from 'react';
import { reduxForm } from 'redux-form';

import { Budget } from 'sly/web/components/wizards/assesment';
import { createValidator, required } from 'sly/web/services/validation';

const validate = createValidator({
  budget: [required],
});

const ReduxForm = reduxForm({
  form: 'BudgetForm',
  destroyOnUnmount: false,
  validate,
})(Budget);

const BudgetFormContainer = props => <ReduxForm {...props} />;

export default BudgetFormContainer;
