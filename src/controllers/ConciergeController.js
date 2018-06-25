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

import { resourceDetailReadRequest } from 'sly/store/resource/actions';

export const CONVERSION_FORM = 'conversionForm';
export const ADVANCED_INFO = 'advancedInfo';
export const SIMILAR_COMMUNITIES = 'similarCommunities';
export const CALENDLY_APPOINTMENT = 'calendlyAppointment';
export const THANKYOU = 'thankyou';

const steps = [
  CONVERSION_FORM,
  ADVANCED_INFO,
  // SIMILAR_COMMUNITIES,
  THANKYOU,
];

export class ConciergeController extends Component {
  static propTypes = {
    community: communityPropType.isRequired,
    concierge: object.isRequired,
    children: func.isRequired,
    expressConversionMode: bool,
    set: func.isRequired,
  };

  static defaultProps = {
    expressConversionMode: false,
  };

  getPricing = () => {
    const {
      concierge,
      community,
      set,
    } = this.props;

    const {
      callbackRequested,
      advancedInfoSent,
      userDetailsHasOnlyEmail,
    } = concierge;

    const event = {
      action: 'submit',
      category: 'requestavailability',
      label: community.id
    };

    SlyEvent.getInstance().sendEvent(event);

    const currentStep = (callbackRequested && advancedInfoSent)
      ? THANKYOU
      : callbackRequested && !userDetailsHasOnlyEmail
        ? ADVANCED_INFO
        : CONVERSION_FORM;

    set({ currentStep, modalIsOpen: true });
  };

  submitConversion = (data) => {
    const {
      submit,
      community,
      expressConversionMode,
      concierge,
      set,
    } = this.props;

    const { callbackRequested } = concierge;

    const event = {
      action: 'contactCommunity',
      category: 'requestCallback',
      label: community.id
    };

    SlyEvent.getInstance().sendEvent(event);

    if (!expressConversionMode || (expressConversionMode && !callbackRequested)) {
      submit({
        action: REQUEST_CALLBACK,
        value: {
          user: { ...data },
          propertyIds: [community.id],
        }
      }).then(this.next);
    } else {
      this.next();
    }
  };

  submitAdvancedInfo = data => {
    const { submit, community } = this.props;
    const { message, ...rest } = data;

    submit({
      action: ASSESSMENT,
      value: {
        user: { ...rest },
        message,
        propertyIds: [community.id],
      }
    }).then(this.next);
  };

  launchCalendly = () => {
    const { set } = this.props;
    set({
      currentStep: CALENDLY_APPOINTMENT,
      modalIsOpen: true,
    });
  };

  /*
   * IF NOT gotUserDetails OR NOT conversionSent
   *   currentStep = conversion
   * ELSE IF NOT advancedSent AND NOT expressConversionMode
   *   currentStep = advanced
   * ELSE IF advancedSent OR expressConversionMode
   *   currentStep = thankyou
   */
  next = () => {
    const {
      concierge,
      expressConversionMode,
      getDetailedPricing,
      set,
    } = this.props;

    const { callbackRequested, advancedInfoSent, currentStep } = concierge;

    if (expressConversionMode || (callbackRequested && advancedInfoSent)) {
      set({
        currentStep: THANKYOU,
        modalIsOpen: true,
      });
    } else {
      const stepIndex = steps.indexOf(currentStep);
      const nextStepIndex = stepIndex + 1;

      if(nextStepIndex < steps.length) {
        set({
          currentStep: steps[nextStepIndex],
          modalIsOpen: true,
        });
      } else {
        set({
          modalIsOpen: false,
        });
      }
    }
  }

  close = () => {
    const { set } = this.props;
    set({ modalIsOpen: false });
  };

  render() {
    const { children, concierge } = this.props;

    const {
      getPricing,
      submitConversion,
      submitAdvancedInfo,
      launchCalendly,
      close,
    } = this;

    return children({
      concierge,
      getPricing,
      submitConversion,
      submitAdvancedInfo,
      launchCalendly,
      close,
    });
  }
}

const isCallback = slug => contact =>
  contact.slug === slug
  && contact.contactType === REQUEST_CALLBACK;

const isAssessment = ({
  typeOfCare,
  typeOfRoom,
  timeToMove,
  budget
}) => !!(typeOfCare && typeOfRoom && timeToMove && budget);

const hasOnlyEmail = userDetails =>
  (!(userDetails.fullName || '').length || !(userDetails.phone || '').length) && (userDetails.email || '').length;

const mapStateToProps = (state, { concierge, community }) => {
  const userActions = getDetail(state, 'userAction') || {};
  const callbackRequested = (userActions.profilesContacted || [])
    .some(isCallback(community.id));
  const advancedInfoSent = isAssessment(userActions.userDetails || {});
  const userDetailsHasOnlyEmail = hasOnlyEmail(userActions.userDetails || {});

  return {
    concierge: {
      currentStep: concierge.currentStep || CONVERSION_FORM,
      modalIsOpen: concierge.modalIsOpen || false,
      callbackRequested,
      advancedInfoSent,
      userDetailsHasOnlyEmail,
    },
    community,
  };
};

const submit = data => resourceCreateRequest('userAction', data);

export default connectController(
  'concierge',
  mapStateToProps,
  { submit },
)(ConciergeController);
