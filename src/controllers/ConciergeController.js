import { Component } from 'react';
import { string, func, object } from 'prop-types';

import { resourceCreateRequest } from 'sly/store/resource/actions';
import { getDetail } from 'sly/store/selectors';
import { connectController } from 'sly/controllers';
import SlyEvent from 'sly/services/helpers/events';

import { ASSESSMENT, REQUEST_CALLBACK, REQUEST_CONSULTATION, REQUEST_PRICING, REQUEST_AVAILABILITY } from 'sly/services/api/actions';

import { prefetch, query } from 'sly/services/newApi';

import {
  createBooleanValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';

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

@connectController(
  mapStateToProps,
  dispatch => ({
    submit: data => dispatch(submit(data)),
  }),
)
@prefetch('user', 'getUser', req => req({ id: 'me' }))
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')

export default class ConciergeController extends Component {
  static propTypes = {
    communitySlug: string,
    pathName: string,
    concierge: object.isRequired,
    children: func.isRequired,
    set: func.isRequired,
    queryParams: object,
    setQueryParams: func.isRequired,
    submit: func,
    gotoGetCustomPricing: func,
    userDetails: object,
    history: object,
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
      this.doSubmitConversion(userDetails, REQUEST_PRICING, true);
    } else {
      this.next(false);
    }
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
      this.doSubmitConversion(data, REQUEST_CONSULTATION, true);
    } else {
      SlyEvent.getInstance().sendEvent({
        action: 'contactCommunity',
        category: 'requestAvailability',
        label: communitySlug || pathName,
      });
      this.doSubmitConversion(data, REQUEST_AVAILABILITY, true);
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
    this.doSubmitConversion(data, REQUEST_CONSULTATION, false);
  };

  doSubmitConversion = (data = {}, action, isExpress = false) => {
    const {
      submit,
      communitySlug,
      gotoGetCustomPricing,
      createAction,
    } = this.props;
    const value = {
      user: { ...data },
      propertyIds: [],
    };
    if (communitySlug) {
      value.propertyIds = [communitySlug];
    }
    Promise.all([
      submit({
        action,
        value,
      }),
      createAction({
        type: 'UUIDAction',
        attributes: {
          actionInfo: {
            slug: communitySlug,
          },
          actionPage: match.url,
          actionType: 'profileViewed',
        },
      }),
    ]).then(() => {
      if (communitySlug && gotoGetCustomPricing) {
        gotoGetCustomPricing();
      } else {
        this.next(isExpress);
      }
    });
  };

  submitAdvancedInfo = (data) => {
    const {
      submit, communitySlug, pathName, concierge,
    } = this.props;
    const { message, ...rest } = data;
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
    submit({
      action: ASSESSMENT,
      value,
    }).then(() => this.next(false));
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

      const Done = (
        (contactRequested || consultationRequested)
        && isAssessment(userDetails)
        && hasAllUserData(userDetails)
      );

      if (Done) {
        setQueryParams({ modal: CONCIERGE, currentStep: WHAT_NEXT });
      }

      if (!hasAllUserData(userDetails)) {
        setQueryParams({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
      }

      if (!isAssessment(userDetails)) {
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

    console.log('rendering');

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

