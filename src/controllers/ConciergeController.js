import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';

import {
  resourceCreateRequest,
} from 'sly/store/resource/actions';

import SlyEvent from 'sly/services/helpers/events';
import { next, gotoStep, close, getDetailedPricing } from 'sly/store/concierge/actions';
import { community as communityPropType } from 'sly/propTypes/community';
import { ASSESSMENT, REQUEST_CALLBACK } from 'sly/services/api/actions';
import { conciergeSelector } from 'sly/store/concierge/selectors';
import { THANKYOU } from 'sly/store/concierge/constants';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

//function connectController(controllerKey, mapStateToProps, mapDispatchToProps) {
//  return function controllerCreator(WrappedComponent) {
//    class Controller extends Component {
//      render() {
//        return React.createElement(WrappedComponent, this.props);
//      }
//    };
//    return connect(mapStateToProps, mapDispatchToProps)(Controller);
//  }
//}

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

  submitConversion = data => {
    const { submit, community } = this.props;

    let event = {action:'contactCommunity',category:'requestCallback',label:community.id};
    SlyEvent.getInstance().sendEvent(event);

    submit({
      action: REQUEST_CALLBACK,
      value: {
        user: { ...data },
        propertyIds: [community.id],
      }
    }).then(this.next);
  }

  /*
   * IF NOT gotUserDetails OR NOT conversionSent
   *   currentStep = conversion
   * ELSE IF NOT advancedSent
   *   currentStep = advanced
   * ELSE IF advancedSent
   *   currentStep = thankyou
   */

  next = () => {
    const { concierge, getDetailedPricing, community, next, gotoStep, submit } = this.props;
    const { callbackRequested, advancedInfoSent, currentStep } = concierge;

    if (callbackRequested && advancedInfoSent) {
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
    const { next, getPricing, submitAdvancedInfo } = this;
    return children({
      concierge: this,
    });
  }
}

const mapStateToProps = (state, { community }) => {
  const concierge = conciergeSelector(state, community.id);
  return {
    concierge,
    community,
  };
};

const submit = (data) => resourceCreateRequest('userAction', data);

export default connect(
  mapStateToProps,
  {
    next,
    gotoStep,
    close,
    getDetailedPricing,
    submit
  }
)(ConciergeController);
