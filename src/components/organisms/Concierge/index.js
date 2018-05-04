import React, { Component } from 'react';
import { oneOf, object } from 'prop-types';
import styled from 'styled-components';

import { isBrowser } from 'sly/config';

import Modal from 'sly/components/molecules/Modal';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import AdvancedInfoContainer from 'sly/containers/AdvancedInfoContainer';
import SimilarCommunitiesContainer from 'sly/containers/SimilarCommunitiesContainer';
import Thankyou from 'sly/components/molecules/Thankyou';

const steps = {
  advancedInfo:       AdvancedInfoContainer,
  similarCommunities: SimilarCommunitiesContainer,
  thankyou:           Thankyou,
};

const appElement = isBrowser && document.querySelector('#app');

export default class Concierge extends Component {
  static propTypes = {
    community: object.isRequired,
  };

  render() {
    const {
      onClose,
      isOpen,
      next,
      community,
      currentStep,
      className,
      userRequestedCB,
      ...props
    } = this.props;

    const StepComponent = steps[currentStep];

    return (
      <div className={className}>
        { userRequestedCB && (
          <Thankyou community={community} />
        )}
        { !userRequestedCB && (
          <ConversionFormContainer community={community} next={next} />
        )}
        { appElement && StepComponent && isOpen && (
          <Modal
            appElement={appElement}
            onClose={onClose}
            isOpen={isOpen}
            closeable {...props}>
            <StepComponent
              community={community}
              next={next}
              onClose={onClose}
              {...props}
            />
          </Modal>
        )}
      </div>
    );
  }
}

