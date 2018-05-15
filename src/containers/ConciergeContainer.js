import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, func, bool, object } from 'prop-types';
import styled from 'styled-components';

import { size } from 'sly/components/themes';
import { getDetail } from 'sly/store/selectors';
import { next, close } from 'sly/store/concierge/actions';

import Concierge from 'sly/components/organisms/Concierge';
import { REQUEST_CALLBACK } from 'sly/services/api/actions';
import {
  resourceDetailReadRequest,
} from 'sly/store/resource/actions';

class ConciergeContainer extends Component {
  static propTypes = {
    // TODO: shape
    next: func.isRequired,
    close: func.isRequired,
    currentStep: string.isRequired,
    modalIsOpen: bool.isRequired,
    community: object,
    userRequestedCB: bool,
  };

  static defaultProps = {
    userRequestedCB: false,
  };

  render() {
    const { modalIsOpen, currentStep, next, close, ...props } = this.props;
    // I return an array here as Concierge is not even rendered here in the three

    return (
      <Concierge
        key="modal"
        onClose={close}
        isOpen={modalIsOpen}
        currentStep={currentStep}
        next={next}
        {...props}
      />
    );
  }
}

const isCallback = contact => contact.contactType === REQUEST_CALLBACK;
const mapStateToProps = (state, { userActions, community }) => {
  const { currentStep, modalIsOpen } = state.concierge;
  const userRequestedCB = userActions && (userActions.profilesContacted || [])
    .some(contact => contact.slug === community.id && isCallback(contact));

  return {
    currentStep,
    modalIsOpen,
    userRequestedCB,
    community,
  };
};

export default connect(mapStateToProps, { next, close })(ConciergeContainer);
