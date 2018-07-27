import React, { Component } from 'react';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import { resourceCreateRequest } from 'sly/store/resource/actions';

import { getDetail } from 'sly/store/selectors';
import { connectController } from 'sly/controllers';
import SlyEvent from 'sly/services/helpers/events';
import { community as communityPropType } from 'sly/propTypes/community';
import { ASSESSMENT, REQUEST_CALLBACK, REQUEST_CONSULTATION, REQUEST_PRICING, REQUEST_AVAILABILITY  } from 'sly/services/api/actions';

import {
  createValidator,
  createBooleanValidator,
  required,
  notProvided,
  email,
  usPhone,
} from 'sly/services/validation';

import { resourceDetailReadRequest } from 'sly/store/resource/actions';

export const CONVERSION_FORM = 'conversionForm';
export const EXPRESS_CONVERSION_FORM = 'expressConversionForm';
export const ADVANCED_INFO = 'advancedInfo';
export const SIMILAR_COMMUNITIES = 'similarCommunities';
export const WHAT_NEXT = 'whatNext';
export const HOW_IT_WORKS = 'howItWorks';

const isAssessment = ({
  typeOfCare,
  timeToMove,
  budget
}) => !!(typeOfCare && timeToMove && budget);

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

const hasUserData = createValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

const hasOnlyEmail = createBooleanValidator({
  fullName: [notProvided],
  email: [required, email],
  phone: [notProvided],
});

export class ConciergeController extends Component {
  static propTypes = {
    community: communityPropType.isRequired,
    concierge: object.isRequired,
    children: func.isRequired,
    set: func.isRequired,
  };

  getPricing = () => {
    const {
      concierge,
      community,
      set,
      userDetails
    } = this.props;

    const {
      pricingRequested,
    } = concierge;

    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'getPricing',
      label: community.id
    });

    if (!pricingRequested && hasAllUserData(userDetails)) {
      this.doSubmitConversion(userDetails,REQUEST_PRICING, true);
    } else {
      this.next(false);
    }
  };

  gotoAdvancedInfo = () => {
    const {
      set,
      userDetails,
    } = this.props;

    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'adRequestConsultation',
      label: 'profilePage'
    });

    if (!isAssessment(userDetails)) {
      set({
        currentStep: ADVANCED_INFO,
        modalIsOpen: true,
      });
    } else {
      this.next();
    }
  };

  gotoWhatNext = () => this.props.set({
    currentStep: HOW_IT_WORKS,
    modalIsOpen: true,
  });

  submitExpressConversion = data => {
    const {
      community,
      concierge

    } = this.props;
    if (data.phone && data.phone.match(/\d+/)){
      let eventCategory = concierge.modalIsOpen ? 'requestAvailabilityConsultation' : 'requestConsultation';
      SlyEvent.getInstance().sendEvent({
        action: 'contactCommunity',
        category: eventCategory,
        label: community.id
      });
      this.doSubmitConversion(data,REQUEST_CONSULTATION, true);
    } else {
      SlyEvent.getInstance().sendEvent({
        action: 'contactCommunity',
        category: 'requestAvailability',
        label: community.id
      });
      this.doSubmitConversion(data,REQUEST_AVAILABILITY, true);
    }


  };

  submitRegularConversion = data => {
    const {
      community,
      concierge
    } = this.props;
    let eventCategory = 'requestConsultation';
    if (!concierge.pricingRequested && !concierge.availabilityRequested) {
      eventCategory = 'requestConsultation';
      //Regular advanced info
    } else if(concierge.modalIsOpen && concierge.pricingRequested) {
      //Pricing advanced info
      eventCategory = 'requestConsultationPricing';
    } else if (concierge.modalIsOpen && concierge.availabilityRequested) {
      //Availability Advanced Info
      eventCategory = 'requestConsultationAvailability';
    }

    SlyEvent.getInstance().sendEvent({
      action: 'contactCommunity',
      category: eventCategory,
      label: community.id
    });
    this.doSubmitConversion(data,REQUEST_CONSULTATION, false);
  };

  doSubmitConversion = (data={}, action, isExpress=false) => {
    const {
      submit,
      community,
      concierge,
    } = this.props;

    submit({
      action,
      value: {
        user: { ...data },
        propertyIds: [community.id],
      }
    }).then(() => {

      this.next(isExpress);
    });
  };

  submitAdvancedInfo = data => {
    const { submit, community, concierge } = this.props;
    const { message, ...rest } = data;
    let eventCategory = 'advancedInfo';
    //Not a 100% correct.
    if (!concierge.pricingRequested && !concierge.availabilityRequested) {
      eventCategory = 'advancedInfo';
      //Regular advanced info
    } else if(concierge.pricingRequested) {
      //Pricing advanced info
      eventCategory = 'advancedInfoPricing';
    } else if (concierge.availabilityRequested) {
      //Availability Advanced Info
      eventCategory = 'advancedInfoAvailability';
    }

    SlyEvent.getInstance().sendEvent({
      action: 'submit',
      category: eventCategory,
      label: community.id
    });

    submit({
      action: ASSESSMENT,
      value: {
        user: { ...rest },
        message,
        propertyIds: [community.id],
      }
    }).then(() => this.next(false));
  };

  next = (isExpress) => {
    const {
      concierge,
      getDetailedPricing,
      set,
      userDetails,
    } = this.props;


    const {
      contactRequested,
      currentStep,
      consultationRequested,
    } = concierge;

    const Done = (
      ( contactRequested || consultationRequested )
      && isAssessment(userDetails)
      && hasAllUserData(userDetails)
    );

    if (Done) {
      return set({
        currentStep: WHAT_NEXT,
        modalIsOpen: true,
      });
    }

    if (!hasAllUserData(userDetails)) {
      return set({
        currentStep: CONVERSION_FORM,
        modalIsOpen: true,
      });
    }


    if(!isAssessment(userDetails)) {
      return set({
        currentStep: ADVANCED_INFO,
        modalIsOpen: true,
      });
    }




  };

  close = () => {
    const { set } = this.props;
    set({ modalIsOpen: false });
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

const isCallbackorPricingAvailReq = slug => contact =>
  contact.slug === slug
  && (contact.contactType === REQUEST_CALLBACK || contact.contactType === REQUEST_PRICING || contact.contactType == REQUEST_AVAILABILITY) ;

const isPricingReq = slug => contact =>
  contact.slug === slug
  && (contact.contactType === REQUEST_PRICING) ;

const isAvailReq = slug => contact =>
  contact.slug === slug
  && (contact.contactType === REQUEST_AVAILABILITY) ;

const mapStateToProps = (state, { controller, community }) => {
  const {
    profilesContacted,
    consultationRequested,
    userDetails = {},
  } = getDetail(state, 'userAction') || {};

  return {
    community,
    userDetails,
    concierge: {
      currentStep: controller.currentStep || CONVERSION_FORM,
      modalIsOpen: controller.modalIsOpen || false,
      consultationRequested,
      pricingRequested: (profilesContacted || []).some(isPricingReq(community.id)),
      availabilityRequested: (profilesContacted || []).some(isAvailReq(community.id)),
      contactRequested: (profilesContacted || []).some(isCallbackorPricingAvailReq(community.id)),
    },
  };
};

const submit = data => resourceCreateRequest('userAction', data);

export default connectController(
  mapStateToProps,
  { submit },
)(ConciergeController);

