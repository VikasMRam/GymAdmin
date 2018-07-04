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
export const EXPRESS_CONVERSION_FORM = 'expressConversionForm';
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

    SlyEvent.getInstance().sendEvent({
      action: 'click',
      category: 'getPricing',
      label: community.id
    });

    this.next();
  };

  submitConversion = (data, isExpress) => {
    const {
      submit,
      community,
      concierge,
      expressConversionMode,
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
    }).then(() => this.next(expressConversionMode || isExpress));
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
    }).then(this.next);
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

  /*
   * IF NOT gotUserDetails OR NOT conversionSent
   *   currentStep = conversion
   * ELSE IF NOT advancedSent AND NOT expressConversionMode
   *   currentStep = advanced
   * ELSE IF advancedSent OR expressConversionMode
   *   currentStep = thankyou
   */
  next = (isExpress) => {
    const {
      concierge,
      getDetailedPricing,
      set,
    } = this.props;

    const {
      callbackRequested,
      advancedInfoSent,
      currentStep,
      userDetailsHasOnlyEmail,
    } = concierge;

    const expressDone = (isExpress
      && callbackRequested
      && !userDetailsHasOnlyEmail
    );

    const normalDone = (!isExpress
      && callbackRequested
      && advancedInfoSent
    );

    if (expressDone || normalDone) {
      return set({
        currentStep: THANKYOU,
        modalIsOpen: true,
      });
    }

    if(isExpress) {
      return set({
        currentStep: EXPRESS_CONVERSION_FORM,
        modalIsOpen: true,
      });
    } 

    if (callbackRequested) {
      set({
        currentStep: ADVANCED_INFO,
        modalIsOpen: true,
      });
    } else {
      set({
        currentStep: CONVERSION_FORM,
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
      expressConversionMode,
    } = this.props;

    const {
      getPricing,
      submitConversion,
      submitAdvancedInfo,
      launchCalendly,
      close,
    } = this;

    return children({
      concierge,
      expressConversionMode,
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
