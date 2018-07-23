import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { number, func, object } from 'prop-types';

import { resourceCreateRequest, resourceListReadRequest } from 'sly/store/resource/actions';

import { connectController } from 'sly/controllers';
import { createValidator, required, minLength, usPhone, email } from 'sly/services/validation';
import { selectFormData } from 'sly/services/helpers/forms';

import CAWComponent from './Component';

const totalNumberofSteps = 6;
const validate = createValidator({
  looking_for: [required],
  care_needs: [required],
  renting_or_buying: [required],
  monthly_budget: [required],
  location: [required, minLength(3)],
  name: [required],
  email: [required, email],
  phone: [required, usPhone],
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
    location: null,
    name: null,
    email: null,
    phone: null,
  },
})(CAWComponent);

class Controller extends Component {
  static propTypes = {
    currentStep: number,
    totalNumberofSteps: number,
    set: func,
    locationSearchParams: object,
    searchCommunities: func,
    searchResultCount: number,
  };

  handleSubmit = (values, dispatch, props) => {
    const {
      currentStep, totalNumberofSteps, set, locationSearchParams, searchCommunities,
    } = props;

    if (currentStep === 5) {
      set({
        searching: true,
      });
      searchCommunities(locationSearchParams)
        .then((result) => {
          set({
            currentStep: currentStep + 1,
            searchResultCount: result.data.length,
            searching: false,
          });
        });
    } else if (currentStep + 1 <= totalNumberofSteps) {
      set({
        currentStep: currentStep + 1,
      });
    }
  }

  handleBackButton = () => {
    const { currentStep, set } = this.props;
    if (currentStep > 1) {
      set({
        currentStep: currentStep - 1,
      });
    }
  }

  handleSetStoreKey = (key, value) => {
    const { set } = this.props;
    const param = {};
    param[key] = value;
    set(param);
  }

  render() {
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        onBackButton={this.handleBackButton}
        setStoreKey={this.handleSetStoreKey}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, { controller }) => {
  return {
    totalNumberofSteps,
    currentStep: controller.currentStep || 1,
    locationSearchParams: controller.locationSearchParams,
    searchResultCount: controller.searchResultCount,
    searching: controller.searching,
    data: selectFormData(state, 'CAWForm', {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchCommunities: searchParams => dispatch(resourceListReadRequest('searchResource', searchParams)),
    submit: data => resourceCreateRequest('userAction', data),
  };
};

export default connectController(
  mapStateToProps,
  mapDispatchToProps,
)(Controller);

