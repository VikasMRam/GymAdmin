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
      experiements,
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

    this.next();
  };

  submitConversion = (data) => {
    const {
      submit,
      community,
      concierge,
    } = this.props;

    const event = {
      action: 'contactCommunity',
      category: 'requestCallback',
      label: community.id
    };

    SlyEvent.getInstance().sendEvent(event);

    submit({
      action: REQUEST_CALLBACK,
      value: {
        user: { ...data },
        propertyIds: [community.id],
      }
    }).then(this.next);
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

    const { 
      callbackRequested,
      advancedInfoSent,
      currentStep,
      userDetailsHasOnlyEmail,
    } = concierge;

    if (expressConversionMode || (callbackRequested && advancedInfoSent)) {
      set({
        currentStep: THANKYOU,
        modalIsOpen: true,
      });
    } else if(!callbackRequested || userDetailsHasOnlyEmail) {
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

const hasOnlyEmail = userDetails => !userDetails.fullName 
  || !userDetails.phone 
  && userDetails.email;

const mapStateToProps = (state, { controller, community }) => {
  const userActions = getDetail(state, 'userAction') || {};
  const callbackRequested = (userActions.profilesContacted || [])
    .some(isCallback(community.id));
  const advancedInfoSent = isAssessment(userActions.userDetails || {});
  const userDetailsHasOnlyEmail = hasOnlyEmail(userActions.userDetails || {});

  return {
    concierge: {
      currentStep: controller.currentStep || CONVERSION_FORM,
      modalIsOpen: controller.modalIsOpen || false,
      experiments: state.experiments,
      callbackRequested,
      advancedInfoSent,
      userDetailsHasOnlyEmail,
    },
    community,
  };
};

const submit = data => resourceCreateRequest('userAction', data);

export default connectController(
  mapStateToProps,
  { submit },
)(ConciergeController);
