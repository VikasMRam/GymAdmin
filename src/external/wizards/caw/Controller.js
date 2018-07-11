import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { number } from 'prop-types';

import { connectController } from 'sly/controllers';
import { createValidator, required } from 'sly/services/validation';
import CAWComponent from './Component';

const validate = createValidator({
  looking_for: [required],
});
const ReduxForm = reduxForm({
  form: 'CAWForm',
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  validate,
})(CAWComponent);

class Controller extends Component {
  static propTypes = {
    currentStep: number,
  };

  handleSubmit = (values, dispatch, props) => {
    const { currentStep } = props;
    console.log(currentStep);
    console.log(values);
  }

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        {...this.props}
      />
    );
  }
}

const selectFormData = (state, form) => (!state.form || !state.form[form])
  ? {}
  : state.form[form].values;

const mapStateToProps = (state, { controller }) => {
  return {
    currentStep: controller.currentStep || 1,
    data: selectFormData(state, 'CAWForm'),
  };
};

export default connectController(mapStateToProps, {})(Controller);

