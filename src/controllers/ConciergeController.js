import React, { Component } from 'react';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import { resourceCreateRequest } from 'sly/store/resource/actions';

import { getDetail } from 'sly/store/selectors';
import { connectController } from 'sly/controllers';
import SlyEvent from 'sly/services/helpers/events';
import { community as communityPropType } from 'sly/propTypes/community';
import { ASSESSMENT, REQUEST_CALLBACK } from 'sly/services/api/actions';

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
export const CALENDLY_APPOINTMENT = 'calendlyAppointment';
export const WHAT_NEXT = 'whatNext';

const isAssessment = ({
  typeOfCare,
  typeOfRoom,
  timeToMove,
  budget
}) => !!(typeOfCare && typeOfRoom && timeToMove && budget);

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
      callbackRequested,
    } = concierge;

    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'getPricing',
      label: community.id
    });

    if (!callbackRequested && hasAllUserData(userDetails)) {
      this.submitRegularConversion();
    } else {
      this.next(false);
    }
  };

  submitExpressConversion = data => {
    this.doSubmitConversion(data, true);
  };

  submitRegularConversion = data => {
    this.doSubmitConversion(data, false);
  };

  doSubmitConversion = (data={}, isExpress=false) => {
    const {
      submit,
      community,
      concierge,
    } = this.props;

    SlyEvent.getInstance().sendEvent({
      action: 'contactCommunity',
      category: 'requestCallback',
      label: community.id
    });

    submit({
      action: REQUEST_CALLBACK,
      value: {
        user: { ...data },
        propertyIds: [community.id],
      }
    }).then(() => {
      this.next(isExpress);
    });
  };

  submitAdvancedInfo = data => {
    const { submit, community } = this.props;
    const { message, ...rest } = data;

    SlyEvent.getInstance().sendEvent({
      action: 'submit',
      category: 'advancedInfo',
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

  launchCalendly = () => {
    const { set } = this.props;
     
    const event = {
      action: 'contactCommunity',
      category: 'calendly',
      label: community.id
    };

    SlyEvent.getInstance().sendEvent(event);

    set({
      currentStep: CALENDLY_APPOINTMENT,
      modalIsOpen: true,
    });
  };

  next = (isExpress) => {
    const {
      concierge,
      getDetailedPricing,
      set,
      userDetails,
    } = this.props;

    const {
      callbackRequested,
      currentStep,
    } = concierge;

    const expressDone = (isExpress
      && callbackRequested
      && hasAllUserData(userDetails)
    );

    const normalDone = (!isExpress
      && callbackRequested
      && isAssessment(userDetails) 
    );

    if (expressDone || normalDone) {
      return set({
        currentStep: WHAT_NEXT,
        modalIsOpen: true,
      });
    }

    const needMoreData = hasOnlyEmail(userDetails);

    if(isExpress && hasOnlyEmail(userDetails)) {
      return set({
        currentStep: EXPRESS_CONVERSION_FORM,
        modalIsOpen: true,
      });
    }

    if (!callbackRequested || needMoreData) {
      set({
        currentStep: CONVERSION_FORM,
        modalIsOpen: true,
      });
    } else {
      set({
        currentStep: ADVANCED_INFO,
        modalIsOpen: true,
      });
    }
  }

  close = () => {
    const { set } = this.props;
    set({ modalIsOpen: false });
  };

  render() {
    const { 
      children,
      concierge,
    } = this.props;

    const {
      getPricing,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      launchCalendly,
      close,
    } = this;

    return children({
      concierge,
      getPricing,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      launchCalendly,
      close,
    });
  }
}

const isCallback = slug => contact =>
  contact.slug === slug
  && contact.contactType === REQUEST_CALLBACK;

const mapStateToProps = (state, { controller, community }) => {
  const { 
    profilesContacted = [],
    userDetails = {},
  } = getDetail(state, 'userAction') || {};

  return {
    community,
    userDetails,
    concierge: {
      currentStep: controller.currentStep || CONVERSION_FORM,
      modalIsOpen: controller.modalIsOpen || false,
      callbackRequested: profilesContacted.some(isCallback(community.id)),
    },
  };
};

const submit = data => resourceCreateRequest('userAction', data);

export default connectController(
  mapStateToProps,
  { submit },
)(ConciergeController);

