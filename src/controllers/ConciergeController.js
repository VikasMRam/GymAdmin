import { Component } from 'react';
import { string, func, object, shape } from 'prop-types';
import produce from 'immer';
import { withRouter } from 'react-router';

import { resourceCreateRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';
import { connectController } from 'sly/controllers';
import SlyEvent from 'sly/services/helpers/events';

import {
  ASSESSMENT,
  REQUEST_CALLBACK,
  REQUEST_CONSULTATION,
  REQUEST_PRICING,
  REQUEST_AVAILABILITY,
} from 'sly/services/api/actions';

import {
  CONSULTATION_REQUESTED,
  PROFILE_CONTACTED,
} from 'sly/services/newApi/constants';

import { prefetch, query, withAuth } from 'sly/services/newApi';

import {
  createBooleanValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

import userPropType from 'sly/propTypes/user';

import { CONCIERGE } from 'sly/constants/modalType';

export const CONVERSION_FORM = 'conversionForm';
export const EXPRESS_CONVERSION_FORM = 'expressConversionForm';
export const ADVANCED_INFO = 'advancedInfo';
export const SIMILAR_COMMUNITIES = 'similarCommunities';
export const WHAT_NEXT = 'whatNext';
export const HOW_IT_WORKS = 'howItWorks';

const isAssessment = ({
  typeOfCare,
  timeToMove,
  budget,
}) => !!(typeOfCare && timeToMove && budget);

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

const isCallbackorPricingAvailReq = slug => contact =>
  contact.slug === slug
  && (contact.contactType === REQUEST_CALLBACK || contact.contactType === REQUEST_PRICING || contact.contactType === REQUEST_AVAILABILITY);

const isPricingReq = slug => contact =>
  contact.slug === slug
  && (contact.contactType === REQUEST_PRICING);

const isAvailReq = slug => contact =>
  contact.slug === slug
  && (contact.contactType === REQUEST_AVAILABILITY);

const mapStateToProps = (state, props) => {
  const { communitySlug, queryParams, history } = props;
  const {
    profilesContacted,
    consultationRequested,
    userDetails = {},
  } = getDetail(state, 'userAction') || {};
  const { modal, currentStep } = queryParams;
  return {
    history,
    communitySlug,
    userDetails,
    concierge: {
      currentStep: currentStep || CONVERSION_FORM,
      modalIsOpen: modal === CONCIERGE || false,
      consultationRequested,
      pricingRequested: (profilesContacted || []).some(isPricingReq(communitySlug)),
      availabilityRequested: (profilesContacted || []).some(isAvailReq(communitySlug)),
      contactRequested: (profilesContacted || []).some(isCallbackorPricingAvailReq(communitySlug)),
    },
  };
};

const submit = data => resourceCreateRequest('userAction', data);

@withRouter

@connectController(
  mapStateToProps,
  dispatch => ({
    submit: data => dispatch(submit(data)),
  }),
)

@withAuth
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')

export default class ConciergeController extends Component {
  static displayName = 'ConciergeController';

  static propTypes = {
    match: shape({ url: string.isRequired }),
    history: object,
    children: func.isRequired,
    set: func.isRequired,
    concierge: object.isRequired,
    communitySlug: string,
    pathName: string,
    user: userPropType,
    queryParams: object,
    setQueryParams: func.isRequired,
    submit: func,
    gotoGetCustomPricing: func,
    userDetails: object,
    status: shape({
      uuidAux: object,
      user: object,
    }).isRequired,
    updateUuidAux: func,
    createAction: func,
    registerUser: func,
  };

  getPricing = () => {
    const {
      concierge,
      communitySlug,
      pathName,
      userDetails,
    } = this.props;

    const {
      pricingRequested,
    } = concierge;

    SlyEvent.getInstance().sendEvent({
      action: 'click-gcp-button',
      category: 'PricingWizard',
      label: communitySlug || pathName,
    });

    if (!pricingRequested && hasAllUserData(userDetails)) {
      return this.doSubmitConversion(userDetails, REQUEST_PRICING, true);
    }
    return this.next();
  };

  gotoAdvancedInfo = () => {
    const {
      userDetails,
      setQueryParams,
    } = this.props;

    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'adRequestConsultation',
      label: 'profilePage',
    });

    if (!isAssessment(userDetails)) {
      setQueryParams({ modal: CONCIERGE, currentStep: ADVANCED_INFO });
    } else {
      this.next();
    }
  };

  gotoWhatNext = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: CONCIERGE, currentStep: HOW_IT_WORKS });
  };

  submitExpressConversion = (data) => {
    const {
      communitySlug,
      pathName,
      concierge,
    } = this.props;
    if (data.phone && data.phone.match(/\d+/)) {
      const eventCategory = concierge.modalIsOpen ? 'requestAvailabilityConsultation' : 'requestConsultation';
      SlyEvent.getInstance().sendEvent({
        action: 'contactCommunity',
        category: eventCategory,
        label: communitySlug || pathName,
      });
      return this.doSubmitConversion(data, REQUEST_CONSULTATION, true);
    } else {
      SlyEvent.getInstance().sendEvent({
        action: 'contactCommunity',
        category: 'requestAvailability',
        label: communitySlug || pathName,
      });
      return this.doSubmitConversion(data, REQUEST_AVAILABILITY, true);
    }
  };

  submitRegularConversion = (data) => {
    const {
      communitySlug,
      pathName,
      concierge,
    } = this.props;
    let eventCategory = 'requestConsultation';
    if (!concierge.pricingRequested && !concierge.availabilityRequested) {
      eventCategory = 'requestConsultation';
      // Regular advanced info
    } else if (concierge.modalIsOpen && concierge.pricingRequested) {
      // Pricing advanced info
      eventCategory = 'requestConsultationPricing';
    } else if (concierge.modalIsOpen && concierge.availabilityRequested) {
      // Availability Advanced Info
      eventCategory = 'requestConsultationAvailability';
    }

    SlyEvent.getInstance().sendEvent({
      action: 'contactCommunity',
      category: eventCategory,
      label: communitySlug || pathName,
    });
    return this.doSubmitConversion(data, REQUEST_CONSULTATION, false);
  };

  doSubmitConversion = (data = {}, action, isExpress = false) => {
    const {
      submit,
      communitySlug,
      gotoGetCustomPricing,
      createAction,
      match,
      registerUser,
    } = this.props;

    const value = {
      user: { ...data },
      propertyIds: [],
    };

    if (communitySlug) {
      value.propertyIds = [communitySlug];
    }

    const { email, phone, full_name: name } = data;

    return Promise.all([
      submit({
        action,
        value,
      }),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: { email, phone, name },
          actionPage: match.url,
          actionType: CONSULTATION_REQUESTED,
        },
      }),
    ]).then(() => registerUser({
      email,
      name,
      phone_number: phone,
      ignoreExisting: true,
    })).then(() => {
      if (communitySlug && gotoGetCustomPricing) {
        gotoGetCustomPricing();
      } else {
        this.next(isExpress);
      }
    });
  };

  submitAdvancedInfo = (data) => {
    const {
      submit,
      communitySlug,
      pathName,
      concierge,
      createAction,
      match,
      updateUuidAux,
      status,
    } = this.props;

    const { message, ...rest } = data;

    const uuidAux = status.uuidAux.result;

    let eventCategory = 'advancedInfo';
    // Not a 100% correct.
    if (!concierge.pricingRequested && !concierge.availabilityRequested) {
      eventCategory = 'advancedInfo';
      // Regular advanced info
    } else if (concierge.pricingRequested) {
      // Pricing advanced info
      eventCategory = 'advancedInfoPricing';
    } else if (concierge.availabilityRequested) {
      // Availability Advanced Info
      eventCategory = 'advancedInfoAvailability';
    }

    SlyEvent.getInstance().sendEvent({
      action: 'submit',
      category: eventCategory,
      label: communitySlug || pathName,
    });

    const value = {
      user: { ...rest },
      propertyIds: [],
      message,
    };

    if (communitySlug) {
      value.propertyIds = [communitySlug];
    }

    return Promise.all([
      submit({
        action: ASSESSMENT,
        value,
      }),
      updateUuidAux({ id: uuidAux.id }, produce(uuidAux, (draft) => {
        const uuidInfo = draft.attributes.uuidInfo || {};

        const housingInfo = uuidInfo.housingInfo || {};
        housingInfo.roomPreference = data.type_of_room;
        housingInfo.typeCare = data.type_of_care;
        housingInfo.moveTimeline = (data.time_to_move || 0).toString();
        uuidInfo.housingInfo = housingInfo;

        const financialInfo = uuidInfo.financialInfo || {};
        financialInfo.maxMonthlyBudget = data.budget;
        financialInfo.medicare = data.medicaid_coverage;
        uuidInfo.financialInfo = financialInfo;

        draft.attributes.uuidInfo = uuidInfo;
      })),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            slug: communitySlug,
            contactType: eventCategory,
            notes: message,
          },
          actionPage: match.url,
          actionType: PROFILE_CONTACTED,
        },
      }),
    ]).then(this.next);
  };

  next = () => {
    const {
      concierge,
      setQueryParams,
      userDetails,
      communitySlug,
      history,
    } = this.props;

    if (communitySlug) {
      history.push(`/custom-pricing/${communitySlug}`);
    } else {
      const {
        contactRequested,
        consultationRequested,
      } = concierge;

      const done = (
        (contactRequested || consultationRequested)
        && isAssessment(userDetails)
        && hasAllUserData(userDetails)
      );

      if (done) {
        setQueryParams({ modal: CONCIERGE, currentStep: WHAT_NEXT });
      } else if (!hasAllUserData(userDetails)) {
        setQueryParams({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
      } else if (!isAssessment(userDetails)) {
        setQueryParams({ modal: CONCIERGE, currentStep: ADVANCED_INFO });
      }
    }
  };

  close = () => {
    const { setQueryParams } = this.props;
    setQueryParams({ modal: null, currentStep: null });
  };

  render() {
    const {
      children,
      concierge,
      userDetails,
    } = this.props;

    const {
      getPricing,
      gotoAdvancedInfo,
      gotoWhatNext,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      close,
    } = this;

    return children({
      concierge,
      userDetails,
      getPricing,
      gotoWhatNext,
      gotoAdvancedInfo,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      close,
    });
  }
}

