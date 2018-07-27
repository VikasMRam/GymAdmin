import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { number, func, object, shape, string } from 'prop-types';
import queryString from 'query-string';

import { resourceCreateRequest, resourceListReadRequest } from 'sly/store/resource/actions';

import { connectController } from 'sly/controllers';
import { createValidator, required, minLength, usPhone, email } from 'sly/services/validation';
import { selectFormData } from 'sly/services/helpers/forms';
import { CAW_PROGRESS } from 'sly/services/api/actions';

import CAWComponent from './Component';
import { stepOrders, defaultStepOrder } from './helpers';

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
    monthly_budget: 2000,
    location: null,
    full_name: null,
    email: null,
    phone: null,
  },
})(CAWComponent);

class Controller extends Component {
  static propTypes = {
    currentStep: number,
    set: func,
    locationSearchParams: object,
    searchCommunities: func,
    postUserAction: func,
    searchResultCount: number,
    data: object,
    location: shape({
      search: string,
    }),
  };

  componentWillMount() {
    this.flowName = defaultStepOrder;

    const { location } = this.props;
    if (location && location.search) {
      const params = queryString.parse(location.search);
      if (params.order && stepOrders[params.order]) {
        this.flowName = params.order;
      }
    }

    this.flow = stepOrders[this.flowName];
  }

  handleSeeMore = () => {
    const {
      currentStep, postUserAction, data,
    } = this.props;

    if (currentStep === this.flow.length) {
      const newData = { ...data };
      const {
        email, full_name, phone, ...careAssessment
      } = newData;

      const user = { email, full_name, phone };
      const transformedCareNeeds = Object.keys(careAssessment.care_needs).filter(key => careAssessment.care_needs[key]);
      careAssessment.care_needs = transformedCareNeeds;
      const payload = {
        action: CAW_PROGRESS,
        value: {
          user,
          wizard_progress: {
            current_step: this.flow[currentStep - 1],
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
      currentStep, set, locationSearchParams, searchCommunities,
    } = props;

    if (this.flow[currentStep - 1] === 'CitySearch') {
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
    } else if (currentStep + 1 <= this.flow.length) {
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
        flow={this.flowName}
        totalNumberofSteps={this.flow.length}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, { controller }) => {
  return {
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
