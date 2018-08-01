import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { number, func, object, shape, string, bool } from 'prop-types';
import queryString from 'query-string';

import { resourceCreateRequest, resourceListReadRequest } from 'sly/store/resource/actions';

import { connectController } from 'sly/controllers';
import { createValidator, required, minLength, usPhone, email } from 'sly/services/validation';
import { selectFormData } from 'sly/services/helpers/forms';
import { CAW_PROGRESS } from 'sly/services/api/actions';

import CAWComponent from './Component';
import { stepOrders, defaultStepOrder, inputBasedNextSteps } from './helpers';

const formName = 'CAWForm';
const validate = createValidator({
  looking_for: [required],
  care_needs: [required],
  renting_or_buying: [required],
  monthly_budget: [required],
  location: [required, minLength(3)],
  full_name: [required],
  email: [required, email],
  phone: [required, usPhone],
});
const ReduxForm = reduxForm({
  form: formName,
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
    currentStep: number.isRequired,
    set: func.isRequired,
    locationSearchParams: object,
    searchCommunities: func,
    postUserAction: func.isRequired,
    searchResultCount: number,
    data: object,
    location: shape({
      search: string,
    }),
    dispatchResetForm: func.isRequired,
    progressPath: object.isRequired,
    searching: bool,
  };

  componentWillMount() {
    this.flowName = defaultStepOrder;

    const { location } = this.props;
    if (location && location.search) {
      const params = queryString.parse(location.search);
      if (params.order && stepOrders[params.order]) {
        this.flowName = params.order;
      }
      if (params.formWidgetType) {
        this.widgetType = params.formWidgetType;
      }
      if (params.city && params.state) {
        this.providedLocationSearchParams = { city: params.city, state: params.state };
      }
    }

    this.flow = stepOrders[this.flowName];
    const searchStepIndex = this.flow.indexOf('CitySearch');
    if (searchStepIndex !== -1 && this.providedLocationSearchParams) {
      this.flow.splice(searchStepIndex, 1);
      this.doSearch();
    }
  }

  handleSeeMore = () => {
    const {
      currentStep, postUserAction, data, dispatchResetForm, set,
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
        if (window.parent && this.widgetType === 'popup') {
          window.parent.postMessage(JSON.stringify({ action: 'closePopup' }), '*');
        } else {
          dispatchResetForm();
          set({
            currentStep: null,
            progressPath: null,
          });
        }
      });
    }
  }

  doSearch() {
    const {
      currentStep, set, locationSearchParams, searchCommunities,
    } = this.props;

    set({
      searching: true,
    });
    searchCommunities(locationSearchParams || this.providedLocationSearchParams)
      .then((result) => {
        const newState = {
          searchResultCount: result.meta['filtered-count'],
          searching: false,
        };
        if (!this.providedLocationSearchParams) {
          newState.currentStep = currentStep + 1;
        } else {
          newState.locationSearchParams = this.providedLocationSearchParams;
        }

        set(newState);
      });
  }

  handleSubmit = (values, dispatch, props) => {
    const { currentStep, set, progressPath } = props;
    const currentStepName = this.flow[currentStep - 1];

    if (this.flow[currentStep - 1] === 'CitySearch') {
      this.doSearch();
    } else if (currentStep + 1 <= this.flow.length) {
      let nextStep = currentStep + 1;

      if (inputBasedNextSteps[this.flowName]) {
        const conditions = inputBasedNextSteps[this.flowName][currentStepName];
        if (conditions) {
          let matchingConditionNextStep = false;
          for (let i = 0; i < conditions.length; i += 1) {
            if (conditions[i].condition(values)) {
              matchingConditionNextStep = conditions[i].nextStep;
              break;
            }
          }
          if (matchingConditionNextStep) {
            nextStep = this.flow.indexOf(matchingConditionNextStep) + 1;
          }
        }
      }
      progressPath.add(currentStep);
      set({
        currentStep: nextStep,
        progressPath,
      });
    }
  }

  handleBackButton = () => {
    const { currentStep, set, progressPath } = this.props;
    if (currentStep > 1) {
      const progressPathArr = Array.from(progressPath);
      const prevStep = progressPathArr.pop();
      set({
        currentStep: prevStep,
        progressPath: new Set(progressPathArr),
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
    progressPath: controller.progressPath || new Set([1]),
    currentStep: controller.currentStep || 1,
    locationSearchParams: controller.locationSearchParams,
    searchResultCount: controller.searchResultCount,
    searching: controller.searching,
    data: selectFormData(state, formName, {}),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchCommunities: searchParams => dispatch(resourceListReadRequest('searchResource', searchParams)),
    postUserAction: data => dispatch(resourceCreateRequest('userAction', data)),
    dispatchResetForm: () => dispatch(reset(formName)),
  };
};

export default connectController(
  mapStateToProps,
  mapDispatchToProps,
)(Controller);
