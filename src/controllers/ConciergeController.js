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
import { next, gotoStep, close, getDetailedPricing } from 'sly/store/concierge/actions';
import { community as communityPropType } from 'sly/propTypes/community';
import { ASSESSMENT, REQUEST_CALLBACK } from 'sly/services/api/actions';
import { conciergeSelector } from 'sly/store/concierge/selectors';
import { THANKYOU } from 'sly/store/concierge/constants';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

// TODO: Make an abstraction for Controllers
// This outlines the idea of a 'Controller', which passes
// itself down, once created the abstraction with a simple setter
// and getter to the store, it will be useful to avoid all the
// synchronous mess in the reducer, actions and selectors.
class ConciergeController extends Component {
  static propTypes = {
    next: func.isRequired,
    close: func.isRequired,
    community: communityPropType.isRequired,
    concierge: object.isRequired,
    children: func.isRequired,
    expressConversionMode: bool,
  };

  static defaultProps = {
    expressConversionMode: false,
  };

  getPricing = () => {
    const { concierge, getDetailedPricing, community } = this.props;
    const { callbackRequested, advancedInfoSent } = concierge;
    let event = {action:'submit',category:'requestavailability',label:community.id};
    SlyEvent.getInstance().sendEvent(event);
    getDetailedPricing({ callbackRequested, advancedInfoSent });
  }

  submitAdvancedInfo = data => {
    const { submit, community, next } = this.props;
    const { message, ...rest } = data;

    submit({
      action: ASSESSMENT,
      value: {
        user: { ...rest },
        message,
        propertyIds: [community.id],
      }
    }).then(this.next);
  }

  submitConversion = (data) => {
    const {
      submit, community, expressConversionMode, concierge,
    } = this.props;
    const { callbackRequested } = concierge;

    const event = { action: 'contactCommunity', category: 'requestCallback', label: community.id };
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
  }

  /*
   * IF NOT gotUserDetails OR NOT conversionSent
   *   currentStep = conversion
   * ELSE IF NOT advancedSent AND NOT expressConversionMode
   *   currentStep = advanced
   * ELSE IF advancedSent OR expressConversionMode
   *   currentStep = thankyou
   */
  next = () => {
    const { concierge, getDetailedPricing, community, next, gotoStep, submit, expressConversionMode } = this.props;
    const { callbackRequested, advancedInfoSent, currentStep } = concierge;

    if (expressConversionMode || (callbackRequested && advancedInfoSent)) {
      gotoStep({ step: THANKYOU });
    } else {
      next({ callbackRequested, advancedInfoSent });
    }
  }

  get = path => path
    ? get(this.props.concierge, path)
    : this.props.concierge;

  close = () => this.props.close();

  render() {
    const { children, concierge, close, ...props } = this.props;
    const { next, getPricing, submitConversion, submitAdvancedInfo } = this;
    return children({
      concierge,
      getPricing,
      submitConversion,
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
  const { currentStep, modalIsOpen } = concierge;
  const userActions = getDetail(state, 'userAction') || {};
  const callbackRequested = (userActions.profilesContacted || [])
    .some(isCallback(community.id));
  const advancedInfoSent = isAssessment(userActions.userDetails || {});
  return {
    concierge: {
      currentStep,
      modalIsOpen,
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
  {
    next,
    gotoStep,
    close,
    getDetailedPricing,
    submit,
  },
)(ConciergeController);
