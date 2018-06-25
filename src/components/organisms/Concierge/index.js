import React, { Component } from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';

import { isBrowser } from 'sly/config';
import Modal from 'sly/components/molecules/Modal';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import AdvancedInfoContainer from 'sly/containers/AdvancedInfoContainer';
// import SimilarCommunitiesContainer from 'sly/containers/SimilarCommunitiesContainer';
import WhenFormContainer from 'sly/containers/WhenFormContainer';
import Thankyou from 'sly/components/molecules/Thankyou';
import CalendlyAppointment from 'sly/components/molecules/CalendlyAppointment';

const steps = {
  conversionForm: ConversionFormContainer,
  advancedInfo: AdvancedInfoContainer,
  // similarCommunities: SimilarCommunitiesContainer,
  whenForm: WhenFormContainer,
  thankyou: Thankyou,
};

const appElement = isBrowser && document.querySelector('#app');

const Wrapper = styled.div`
  
`;

export default class Concierge extends Component {
  static propTypes = {
    community: object.isRequired,
    concierge: object.isRequired,
  };

  render() {
    const {
      community,
      className,
      concierge,
      close,
      submitConversion,
      submitAdvancedInfo,
      ...props
    } = this.props;

    const { modalIsOpen, currentStep, callbackRequested } = concierge;

    const StepComponent = steps[currentStep];

    return (
      <Wrapper className={className}>
        {callbackRequested && (
            <Thankyou community={community} />
          )}
        {!callbackRequested && (
            <ConversionFormContainer
              submitConversion={submitConversion}
              community={community}
              concierge={concierge}
            />
          )}
        {appElement && StepComponent && modalIsOpen && (
            <Modal
              appElement={appElement}
              onClose={close}
              isOpen={modalIsOpen}
              closeable
            >
              <StepComponent
                community={community}
                concierge={concierge}
                submitConversion={submitConversion}
                submitAdvancedInfo={submitAdvancedInfo}
                onClose={close}
                {...props}
              />
            </Modal>
          )}
      </Wrapper>
    );
  }
}

