import { Component } from 'react';
import { string, func, object, shape } from 'prop-types';
import produce from 'immer';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import isMatch from 'lodash/isMatch';

import SlyEvent from 'sly/services/helpers/events';
import {
  ASSESSMENT,
} from 'sly/services/api/actions';
import {
  AVAILABILITY_REQUEST,
  CONSULTATION_REQUESTED, PRICING_REQUEST,
  PROFILE_CONTACTED,
} from 'sly/services/newApi/constants';
import { prefetch, query, withAuth } from 'sly/services/newApi';
import {
  createBooleanValidator,
  required,
  email,
  usPhone,
} from 'sly/services/validation';
import userPropType, { uuidAux as uuidAuxProptype } from 'sly/propTypes/user';
import { CONCIERGE } from 'sly/constants/modalType';
import { withRedirectTo } from 'sly/services/redirectTo';

export const CONVERSION_FORM = 'conversionForm';
export const ADVANCED_INFO = 'advancedInfo';
export const WHAT_NEXT = 'whatNext';
export const HOW_IT_WORKS = 'howItWorks';

const isAssessment = ({
  housingInfo,
  financialInfo,
}) => typeof housingInfo.moveTimeline !== 'undefined'
  && typeof housingInfo.typeCare !== 'undefined'
  && typeof financialInfo.maxMonthlyBudget !== 'undefined';

const hasAllUserData = createBooleanValidator({
  name: [required],
  email: [required, email],
  phoneNumber: [required, usPhone],
});

const createHasProfileAction = uuidActions => (type, actionInfo) => {
  if (!uuidActions) return false;
  return uuidActions.some((uuidAction) => {
    return (
      uuidAction.actionType === type &&
      isMatch(uuidAction.actionInfo, actionInfo)
    );
  });
};

const mapStateToProps = (state, { communitySlug, queryParams, uuidActions }) => {
  const { modal, currentStep } = queryParams;
  const hasProfileAction = createHasProfileAction(uuidActions);
  const pricingRequested = hasProfileAction(PROFILE_CONTACTED, {
    contactType: PRICING_REQUEST,
  });

  const availabilityRequested = hasProfileAction(PROFILE_CONTACTED, {
    contactType: AVAILABILITY_REQUEST,
  });

  return {
    communitySlug,
    concierge: {
      currentStep: currentStep || CONVERSION_FORM,
      modalIsOpen: modal === CONCIERGE || false,
      pricingRequested,
      availabilityRequested,
      contactRequested: pricingRequested || availabilityRequested,
    },
  };
};

@withRouter
@withRedirectTo

@withAuth
@prefetch('uuidActions', 'getUuidActions', (req, { communitySlug }) =>
  req({
    'filter[actionType]': `${PROFILE_CONTACTED}`,
    'filter[actionInfo-slug]': communitySlug,
  })
)
@prefetch('uuidAux', 'getUuidAux', req => req({ id: 'me' }))
@query('createAction', 'createUuidAction')
@query('updateUuidAux', 'updateUuidAux')
@connect(mapStateToProps)

export default class ConciergeController extends Component {
  static displayName = 'ConciergeController';

  static propTypes = {
    match: shape({ url: string.isRequired }),
    redirectTo: func.isRequired,
    children: func.isRequired,
    concierge: object.isRequired,
    communitySlug: string,
    pathName: string,
    user: userPropType,
    uuidAux: uuidAuxProptype,
    queryParams: object,
    setQueryParams: func.isRequired,
    submit: func,
    gotoGetCustomPricing: func,
    status: shape({
      uuidAux: object,
      user: object,
    }).isRequired,
    updateUuidAux: func,
    createAction: func,
    createOrUpdateUser: func,
  };

  gotoAdvancedInfo = () => {
    const {
      uuidAux,
      setQueryParams,
    } = this.props;

    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'adRequestConsultation',
      label: 'profilePage',
    });

    if (!isAssessment(uuidAux.uuidInfo)) {
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
      return this.doSubmitConversion(data, CONSULTATION_REQUESTED, true);
    }
    SlyEvent.getInstance().sendEvent({
      action: 'contactCommunity',
      category: 'requestAvailability',
      label: communitySlug || pathName,
    });
    return this.doSubmitConversion(data, PROFILE_CONTACTED, true);
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
    return this.doSubmitConversion(data, CONSULTATION_REQUESTED, false);
  };

  doSubmitConversion = (data = {}, action) => {
    const {
      communitySlug,
      gotoGetCustomPricing,
      createAction,
      match,
      createOrUpdateUser,
    } = this.props;

    const { email, phone, full_name: name } = data;

    const attributes = {
      actionInfo: { email, phone, name },
      actionPage: match.url,
      actionType: action,
    };

    if (action === PROFILE_CONTACTED) {
      attributes.actionInfo.slug = communitySlug;
      attributes.actionInfo.contactType = AVAILABILITY_REQUEST;
    }

    return createAction({
      type: 'UUIDAction',
      attributes,
    }).then(() => createOrUpdateUser({
      email,
      name,
      phone,
    })).then(() => {
      if (communitySlug && gotoGetCustomPricing) {
        gotoGetCustomPricing();
      } else {
        this.next();
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

    const uuidAux = status.uuidAux.result;

    return Promise.all([
      submit({
        action: ASSESSMENT,
        value,
      }),
      updateUuidAux({ id: uuidAux }, produce(uuidAux, (draft) => {
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
      user,
      uuidAux,
      communitySlug,
      redirectTo,
    } = this.props;

    if (communitySlug) {
      redirectTo(`/custom-pricing/${communitySlug}`);
    } else {
      const {
        contactRequested,
      } = concierge;

      const done = contactRequested
        && isAssessment(uuidAux.uuidInfo)
        && hasAllUserData(user);

      if (done) {
        setQueryParams({ modal: CONCIERGE, currentStep: WHAT_NEXT });
      } else if (!hasAllUserData(user)) {
        setQueryParams({ modal: CONCIERGE, currentStep: CONVERSION_FORM });
      } else if (!isAssessment(uuidAux.uuidInfo)) {
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
    } = this.props;

    const {
      gotoAdvancedInfo,
      gotoWhatNext,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      close,
    } = this;

    return children({
      concierge,
      gotoWhatNext,
      gotoAdvancedInfo,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      close,
    });
  }
}
