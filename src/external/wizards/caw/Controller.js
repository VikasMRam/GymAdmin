import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { number, func, object } from 'prop-types';

import { resourceCreateRequest, resourceListReadRequest } from 'sly/store/resource/actions';

import { connectController } from 'sly/controllers';
import { createValidator, required, minLength, usPhone, email } from 'sly/services/validation';
import { selectFormData } from 'sly/services/helpers/forms';
import { CAW_PROGRESS } from 'sly/services/api/actions';

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
    care_needs: {},
    renting_or_buying: null,
    monthly_budget: 0,
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
    postUserAction: func,
    searchResultCount: number,
    data: object,
  };

  handleSeeMore = () => {
    const {
      currentStep, totalNumberofSteps, postUserAction, data,
    } = this.props;

    if (currentStep === totalNumberofSteps) {
      const newData = { ...data };
      const {
        email, name, phone, ...careAssessment
      } = newData;
      const user = { email, name, phone };
      const transformedCareNeeds = Object.keys(careAssessment.care_needs).filter(key => careAssessment.care_needs[key]);
      careAssessment.care_needs = transformedCareNeeds;
      const payload = {
        action: CAW_PROGRESS,
        value: {
          user,
          wizard_progress: {
            current_step: currentStep,
          },
          careAssessment,
        },
      };
      postUserAction(payload).then(() => {
        if (window.parent) {
          window.parent.postMessage(JSON.stringify({ action: 'closePopup' }), '*');
        }
      });
    }
  }

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
            searchResultCount: result.meta['filtered-count'],
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
    const { locationSearchParams } = this.props;
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        onBackButton={this.handleBackButton}
        setStoreKey={this.handleSetStoreKey}
        onSeeMore={this.handleSeeMore}
        locationSearchParams={locationSearchParams}
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
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
  };
};

export default connectController(
  mapStateToProps,
  mapDispatchToProps,
)(Controller);
