import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { number, func } from 'prop-types';

import { resourceCreateRequest } from 'sly/store/resource/actions';

import { connectController } from 'sly/controllers';
import { createValidator, required } from 'sly/services/validation';
import CAWComponent from './Component';

const totalNumberofSteps = 5;
const validate = createValidator({
  looking_for: [required],
  care_needs: [required],
  renting_or_buying: [required],
  monthly_budget: [required],
});
const ReduxForm = reduxForm({
  form: 'CAWForm',
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  validate,
  initialValues: {
    looking_for: null,
    care_needs: null,
    renting_or_buying: null,
    monthly_budget: 1,
  },
})(CAWComponent);

class Controller extends Component {
  static propTypes = {
    currentStep: number,
    totalNumberofSteps: number,
    set: func,
  };

  handleSubmit = (values, dispatch, props) => {
    const { currentStep, totalNumberofSteps, set } = props;
    if (currentStep + 1 <= totalNumberofSteps) {
      set({
        currentStep: currentStep + 1,
      });
    }

    console.log(currentStep);
    console.log(values);
  }

  handleBackButton = () => {
    const { currentStep, set } = this.props;
    if (currentStep > 1) {
      set({
        currentStep: currentStep - 1,
      });
    }
  }

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        onBackButton={this.handleBackButton}
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
    totalNumberofSteps,
    currentStep: controller.currentStep || 1,
    data: selectFormData(state, 'CAWForm'),
  };
};

const submit = data => resourceCreateRequest('userAction', data);

export default connectController(
  mapStateToProps,
  { submit }
)(Controller);

