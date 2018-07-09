import React from 'react';
import { reduxForm } from 'redux-form';

import { connectController } from 'sly/controllers';
import { createValidator, required } from 'sly/services/validation';
import CAWComponent from './Component';

const steps = [
  'STEP1',
];
const validate = createValidator({
  looking_for: [required],
});
const ReduxForm = reduxForm({
  form: 'CAWForm',
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  validate,
})(CAWComponent);
const handleSubmit = (values) => {
console.log(values);
};

const Controller = props => (
  <ReduxForm
    onSubmit={handleSubmit}
    {...props}
  />
);

const mapStateToProps = (state, { controller }) => {
  return {
    currentStep: controller.currentStep || steps[0],
  };
};

export default connectController(mapStateToProps, {})(Controller);

