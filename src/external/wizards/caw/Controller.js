import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { number, func, object, shape, string, bool } from 'prop-types';
import queryString from 'query-string';

import { host } from 'sly/config';

import { resourceCreateRequest, resourceListReadRequest } from 'sly/store/resource/actions';
import SlyEvent from 'sly/services/helpers/events';

import { connectController } from 'sly/controllers';
import { createValidator } from 'sly/services/validation';
import { selectFormData } from 'sly/services/helpers/forms';
import { CAW_PROGRESS } from 'sly/services/api/actions';

import CAWComponent from './Component';
import {
  stepOrders, defaultStepOrder, inputBasedNextSteps, getStepInputFieldValidations,
  getStepInputFieldDefaultValues, stepInputFieldNames, converStepInputToString,
} from './helpers';

const formName = 'CAWForm';
const validate = createValidator(getStepInputFieldValidations());
const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  validate,
  initialValues: getStepInputFieldDefaultValues(),
})(CAWComponent);

class Controller extends Component {
  static propTypes = {
    currentStep: number.isRequired,
    set: func.isRequired,
    locationSearchParams: object,
    utmParams: object,
    pixel: string,
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

    const { location, locationSearchParams, utmParams, pixel } = this.props;
    // get query params passed
    if (location && location.search) {
      const params = queryString.parse(location.search);
      if (params.order && stepOrders[params.order]) {
        this.flowName = params.order;
      }
      if (params.fromWidgetType) {
        this.widgetType = params.fromWidgetType;
      }
      if (params.city && params.state) {
        this.providedLocationSearchParams = { city: params.city, state: params.state };
      }
      if (params.utm_campaign) {
        this.providedUtmParams = { campaign: params.utm_campaign, source: params.utm_source || 'external' , medium: params.utm_medium || 'widget' };
      }
      if (params.pixel) {
        this.providedPixel = decodeURIComponent(params.pixel);
      }
    }
    // get ones passed as prop
    if (locationSearchParams) {
      this.providedLocationSearchParams = locationSearchParams;
    }

    if (utmParams) {
      this.providedUtmParams = utmParams;
    }

    if (pixel) {
      this.providedPixel = decodeURIComponent(pixel);
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


      postUserAction(payload)
        .then(() => {
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

      // Fire pixel
      if (this.providedPixel) {
        fetch(this.providedPixel);
      }

      const currentStepName = this.flow[currentStep - 1];
      const event = {
        action: `step_${currentStepName}`, category: 'cawizard', label: 'complete',
      };
      SlyEvent.getInstance().sendEvent(event);
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
        let href = `${host}/assisted-living/${locationSearchParams.state}/${locationSearchParams.city}?modal=thankyou`;
        const utm = this.providedUtmParams;
        if (utm) {
          href = `${href}&utm_campaign=${utm.campaign}&utm_source=${utm.source}&utm_medium=${utm.medium}`;
        }
        newState.href = href;

        set(newState);
      })
      .catch(() => {
        set({
          searching: false,
        });
      });
  }

  handleSubmit = (values, dispatch, props) => {
    const { currentStep, set, progressPath } = props;
    const currentStepName = this.flow[currentStep - 1];

    let concatedValues = '';
    if (currentStepName === 'CareNeeds') {
      const transformedCareNeeds = Object.keys(values[stepInputFieldNames.CareNeeds])
        .filter(key => values[stepInputFieldNames.CareNeeds][key]);
      concatedValues = converStepInputToString(transformedCareNeeds);
    } else {
      concatedValues = stepInputFieldNames[currentStepName]
        .reduce((prev, value) => {
          if (values[value]) {
            return `${prev}${prev.length ? '|' : ''}${converStepInputToString(values[value])}`;
          }
          return prev;
        }, '');
    }
    const event = {
      action: `step_${currentStepName}`, category: 'cawizard', label: concatedValues,
    };
    SlyEvent.getInstance().sendEvent(event);

    let nextStep = currentStep + 1;
    if (this.flow[currentStep - 1] === 'CitySearch') {
      this.doSearch();
    } else if (currentStep + 1 <= this.flow.length) {
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
    }
    progressPath.add(currentStep);
    set({
      currentStep: nextStep,
      progressPath,
    });
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
    const { href } = this.props;
    return (
      <ReduxForm
        onSubmit={this.handleSubmit}
        onBackButton={this.handleBackButton}
        setStoreKey={this.handleSetStoreKey}
        onSeeMore={this.handleSeeMore}
        href={href}
        flow={this.flowName}
        totalNumberofSteps={this.flow.length}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, { controller, ...ownProps }) => {
  return {
    progressPath: controller.progressPath || new Set([1]),
    currentStep: controller.currentStep || ownProps.currentStep || 1,
    locationSearchParams: controller.locationSearchParams || ownProps.locationSearchParams,
    href: controller.href || '',
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
