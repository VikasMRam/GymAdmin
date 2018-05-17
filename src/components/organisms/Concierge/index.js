import React, { Component } from 'react';
import { oneOf, object } from 'prop-types';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { isBrowser } from 'sly/config';
import { size } from 'sly/components/themes';
import Modal from 'sly/components/molecules/Modal';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import AdvancedInfoContainer from 'sly/containers/AdvancedInfoContainer';
import SimilarCommunitiesContainer from 'sly/containers/SimilarCommunitiesContainer';
import Thankyou from 'sly/components/molecules/Thankyou';

const steps = {
  conversionForm:     ConversionFormContainer,
  advancedInfo:       AdvancedInfoContainer,
  // similarCommunities: SimilarCommunitiesContainer,
  thankyou:           Thankyou,
};

const appElement = isBrowser && document.querySelector('#app');

const Wrapper = styled.div`
  width: 100%;
  border: ${size('border.regular')} solid ${palette('grayscale', 2)};
  padding: ${size('spacing.xLarge')};
`;

export default class Concierge extends Component {
  static propTypes = {
    community: object.isRequired,
    concierge: object.isRequired,
  };

  render() {
    const {
      onClose,
      next,
      community,
      className,
      concierge,
      ...props
    } = this.props;

    const { modalIsOpen, currentStep, callbackRequested } = concierge.get();

    const StepComponent = steps[currentStep];

    return (
      <Wrapper className={className}>
        {callbackRequested && (
          <Thankyou community={community} />
        )}
        {!callbackRequested && (
          <ConversionFormContainer
            community={community}
            concierge={concierge}
            next={next}
          />
        )}
        {appElement && StepComponent && modalIsOpen && (
          <Modal
            appElement={appElement}
            onClose={concierge.close}
            isOpen={modalIsOpen}
            closeable {...props}>
            <StepComponent
              community={community}
              concierge={concierge}
              {...props}
            />
          </Modal>
        )}
      </Wrapper>
    );
  }
}

