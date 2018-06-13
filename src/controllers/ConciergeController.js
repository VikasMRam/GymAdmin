import React, { Component } from 'react';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import {
  resourceCreateRequest,
} from 'sly/store/resource/actions';

import { getDetail } from 'sly/store/selectors';
import { connectController } from 'sly/controllers';
import SlyEvent from 'sly/services/helpers/events';
import { community as communityPropType } from 'sly/propTypes/community';
import { ASSESSMENT, REQUEST_CALLBACK } from 'sly/services/api/actions';

import {
  CONVERSION_FORM,
  ADVANCED_INFO,
  // SIMILAR_COMMUNITIES,
  THANKYOU,
} from 'sly/store/controller/constants';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

const steps = [
  CONVERSION_FORM,
  ADVANCED_INFO,
  // SIMILAR_COMMUNITIES,
  THANKYOU,
];

class ConciergeController extends Component {
  static propTypes = {
    community: communityPropType.isRequired,
    concierge: object.isRequired,
    children: func.isRequired,
    expressConversionMode: bool,
  };

  static defaultProps = {
    expressConversionMode: false,
  };

  getPricing = () => {
    const { 
      concierge,
      getDetailedPricing,
      community,
      set
    } = this.props;

    const { 
      callbackRequested,
      advancedInfoSent
    } = concierge;

    const event = {
      action: 'submit',
      category: 'requestavailability',
      label: community.id
    };

    SlyEvent.getInstance().sendEvent(event);

    const currentStep = (callbackRequested && advancedInfoSent)
      ? THANKYOU
      : callbackRequested
        ? ADVANCED_INFO
        : CONVERSION_FORM;

    set({ currentStep, modalIsOpen: true });
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

  submitConversion = (data) => {
    const {
      submit, community, expressConversionMode, concierge,
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
      community,
      expressConversionMode,
      getDetailedPricing,
      gotoStep,
      submit,
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

  get = path => path
    ? get(this.props.concierge, path)
    : this.props.concierge;

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
      close,
    } = this;

    return children({
      concierge,
      getPricing,
      submitConversion,
      submitAdvancedInfo,
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
}) => typeOfCare && typeOfRoom && timeToMove && budget;

const mapStateToProps = (state, { concierge, community }) => {
  const userActions = getDetail(state, 'userAction') || {};
  const callbackRequested = (userActions.profilesContacted || [])
    .some(isCallback(community.id));
  const advancedInfoSent = isAssessment(userActions.userDetails || {});
  return {
    concierge: {
      ...concierge,
      callbackRequested,
      advancedInfoSent,
    },
    community,
  };
};

const submit = (data) => resourceCreateRequest('userAction', data);

export default connectController(
  'concierge',
  mapStateToProps,
  { submit },
)(ConciergeController);
