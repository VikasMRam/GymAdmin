import React, { Component } from 'react';
import { reduxForm, reset } from 'redux-form';
import { number, func, object, shape, string, bool } from 'prop-types';
import queryString from 'query-string';
import Cookies from 'universal-cookie';

import { host, domain } from 'sly/config';
import SlyEvent from 'sly/services/helpers/events';
import { STEP_ORDERS, DEFAULT_STEP_ORDER, STEP_INPUT_FIELD_NAMES } from 'sly/external/constants/steps';
import { connectController } from 'sly/controllers';
import { createValidator } from 'sly/services/validation';
import { selectFormData } from 'sly/services/helpers/forms';
import { CARE_ASSESSMENT } from 'sly/services/newApi/constants';
import CareAssessmentComponent from 'sly/external/apps/wizards/careAssessment/Component';
import {
  inputBasedNextSteps, getStepInputFieldValidations,
  getStepInputFieldDefaultValues, converStepInputToString,
} from 'sly/external/apps/wizards/careAssessment/helpers';
import { query } from 'sly/services/newApi';

const formName = 'CareAssessmentForm';
const validate = createValidator(getStepInputFieldValidations());
const ReduxForm = reduxForm({
  form: formName,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
  validate,
  initialValues: getStepInputFieldDefaultValues(),
})(CareAssessmentComponent);

const defaultProgressPath = new Set([1]);
const defaultFormData = {};

const mapStateToProps = (state, { controller, ...ownProps }) => {
  return {
    progressPath: controller.progressPath || defaultProgressPath,
    currentStep: controller.currentStep || ownProps.currentStep || 1,
    locationSearchParams: controller.locationSearchParams || ownProps.locationSearchParams,
    href: controller.href || '',
    searchResultCount: controller.searchResultCount,
    searching: controller.searching,
    data: selectFormData(state, formName, defaultFormData),
  };
};

@query('createAction', 'createUuidAction')
@query('searchCommunities', 'getSearchResources')
@connectController(mapStateToProps, { resetForm: reset })

export default class Controller extends Component {
  static propTypes = {
    currentStep: number.isRequired,
    set: func.isRequired,
    locationSearchParams: object,
    utmParams: object,
    pixel: string,
    searchCommunities: func,
    createAction: func.isRequired,
    searchResultCount: number,
    data: object,
    location: shape({
      search: string,
    }),
    resetForm: func.isRequired,
    progressPath: object.isRequired,
    searching: bool,
    href: string,
  };

  constructor(props) {
    super(props);

    this.flowName = DEFAULT_STEP_ORDER;
    let clickID = Math.random().toString().slice(2, 11);

    const {
      location, locationSearchParams,
    } = props;
    // get query params passed
    if (location && location.search) {
      const params = queryString.parse(location.search);
      if (params.order && STEP_ORDERS[params.order]) {
        this.flowName = params.order;
      }
      if (params.fromWidgetType) {
        this.widgetType = params.fromWidgetType;
      }
      if (params.city && params.state) {
        this.providedLocationSearchParams = { city: params.city, state: params.state };
      }
      if (params.clickid) {
        clickID = params.clickid;
      }
      if (params.utm_campaign) {
        this.providedUtmParams = {
          campaign: params.utm_campaign,
          source: params.utm_source || 'external',
          medium: params.utm_medium || 'widget',
          term: clickID,
        };
        const utm = this.providedUtmParams;
        const utmStr = `utm_campaign=${utm.campaign}&utm_source=${utm.source}&utm_medium=${utm.medium}&utm_term=${utm.term}`;
        const cookies = new Cookies();
        cookies.set('utm', utmStr, { domain, path: '/', maxAge: 27000000 });
      }

      if (params.pixel) {
        this.providedPixel = decodeURIComponent(params.pixel);
        // substitute information in pixel
        this.providedPixel = this.providedPixel.replace('CLIENT_ID', clickID);
      }
    }
    // get ones passed as prop
    if (locationSearchParams) {
      this.providedLocationSearchParams = locationSearchParams;
    }

    // important : create a copy since we might modify the array later
    this.flow = STEP_ORDERS[this.flowName].slice();
    const searchStepIndex = this.flow.indexOf('CitySearch');
    if (searchStepIndex !== -1 && this.providedLocationSearchParams) {
      this.flow.splice(searchStepIndex, 1);
      this.doSearch();
    }
  }

  handleSeeMore = () => {
    const {
      currentStep, createAction, data, resetForm, set,
    } = this.props;

    const currentStepName = this.flow[currentStep - 1];

    const closePopup = () => {
      if (window.parent && this.widgetType === 'popup') {
        window.parent.postMessage(JSON.stringify({ action: 'closePopup' }), '*');
      } else {
        resetForm(formName);
        set({
          currentStep: null,
          progressPath: null,
        });
      }
    };

    const {
      name,
      email,
      phone,
      lookingFor,
      careNeeds,
      monthlyBudget,
      medicaidCoverage,
      location,
      rentingOrBuying,
    } = data;

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionInfo: {
          name,
          email,
          phone,
          currentStep,
          stepData: {
            lookingFor,
            careNeeds: careNeeds.join(', '),
            monthlyBudget: monthlyBudget.toString(),
            medicaidCoverage: (medicaidCoverage || false).toString(),
            location,
            rentingOrBuying,
          },
        },
        actionType: CARE_ASSESSMENT,
      },
    }).then(() => {
      const event = {
        action: `step_${currentStepName}`, category: 'cawizard', label: 'complete',
      };
      SlyEvent.getInstance().sendEvent(event);
      // Fire pixel
      if (this.providedPixel) {
        return fetch(this.providedPixel, { mode: 'no-cors' })
          .then(closePopup);
      }
      return closePopup();
    });
  };

  doSearch() {
    const {
      currentStep, set, locationSearchParams, searchCommunities,
    } = this.props;
    set({
      searching: true,
    });

    return searchCommunities(locationSearchParams || this.providedLocationSearchParams).then(({ body: result }) => {
      const newState = {
        searchResultCount: result.meta['filtered-count'],
        searching: false,
      };
      if (!this.providedLocationSearchParams) {
        newState.currentStep = currentStep + 1;
      } else {
        newState.locationSearchParams = this.providedLocationSearchParams;
      }
      const state = this.providedLocationSearchParams ? this.providedLocationSearchParams.state : locationSearchParams.state;
      const city = this.providedLocationSearchParams ? this.providedLocationSearchParams.city : locationSearchParams.city;
      let href = `${host}/assisted-living/${state}/${city}?modal=thankyou`;
      const utm = this.providedUtmParams;
      if (utm) {
        href = `${href}&utm_campaign=${utm.campaign}&utm_source=${utm.source}&utm_medium=${utm.medium}&utm_term=${utm.term}`;
      }
      newState.href = href;

      set(newState);
    }).catch((err) => {
      // todo: use correct method for surfacing errors
      // eslint-disable-next-line no-console
      console.error(err);
      set({
        searching: false,
      });
    });
  }

  handleSubmit = (values, dispatch, props) => {
    const { currentStep, set, progressPath } = props;
    const currentStepName = this.flow[currentStep - 1];

    const concatedValues = STEP_INPUT_FIELD_NAMES[currentStepName]
      .reduce((prev, value) => {
        if (values[value]) {
          return `${prev}${prev.length ? '|' : ''}${converStepInputToString(values[value])}`;
        }
        return prev;
      }, '');
    const event = {
      action: `step_${currentStepName}`, category: 'cawizard', label: concatedValues,
    };
    SlyEvent.getInstance().sendEvent(event);

    let nextStep = currentStep + 1;
    if (this.flow[currentStep - 1] === 'CitySearch') {
      this.doSearch();
    } else if (currentStep + 1 <= this.flow.length &&
      inputBasedNextSteps[this.flowName]) {
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
        flow={this.flow}
        totalNumberofSteps={this.flow.length}
        {...this.props}
      />
    );
  }
}

