import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getDetail } from 'sly/store/selectors';

import Concierge from 'sly/components/organisms/Concierge';

import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class ConciergeContainer extends Component {
  static propTypes = {
    // TODO: shape
    community: object,
    userRequestedCB: bool,
  };

  static defaultProps = {
    userRequestedCB: false,
  };

  steps = [
    'conversionForm',
    'advancedInfo',
    'similarCommunities',
    'thankyou',
  ];

  state = {
    currentStep: 'conversionForm',
    modalIsOpen: false,
  };

  nextStep = (...args) => {
    const { currentStep } = this.state;
    const stepIndex = this.steps.indexOf(currentStep);
    const nextStepIndex = stepIndex + 1;
    if(nextStepIndex < this.steps.length) {
      this.setState({
        currentStep: this.steps[nextStepIndex],
        modalIsOpen: true,
      });
    } else {
      this.setState({
        modalIsOpen: false,
      });
    }
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { ...props } = this.props;
    const { modalIsOpen, currentStep } = this.state;
    // I return an array here as Concierge is not even rendered here in the three
    
    return (
      <Concierge
        key="modal"
        onClose={this.closeModal}
        isOpen={modalIsOpen}
        currentStep={currentStep}
        next={this.nextStep}
        {...props}
      />
    );
  }
}

const isCallback = contact => contact.type === 'request_callback';
const mapStateToProps = (state, { userActions, community }) => {
  const userRequestedCB = userActions && (userActions.profilesContacted || [])
    .some(contact => contact.slug === community.id && isCallback(contact));
  return { userRequestedCB, community };
};

export default connect(mapStateToProps)(ConciergeContainer);
