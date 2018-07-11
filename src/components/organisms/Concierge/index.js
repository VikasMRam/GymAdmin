import React, {Component, Fragment} from 'react';
import { object, func } from 'prop-types';


import { isBrowser } from 'sly/config';
import Modal from 'sly/components/molecules/Modal';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import AdvancedInfoContainer from 'sly/containers/AdvancedInfoContainer';
// import SimilarCommunitiesContainer from 'sly/containers/SimilarCommunitiesContainer';
import Thankyou from 'sly/components/molecules/Thankyou';
import WhatNext from 'sly/components/organisms/WhatNext';

const ExpressConversionFormContainer = props => (
  <ConversionFormContainer
    express={true}
    {...props}
  />
);

const steps = {
  conversionForm: ConversionFormContainer,
  expressConversionForm: ExpressConversionFormContainer,
  advancedInfo: AdvancedInfoContainer,
  whatNext: WhatNext,
  // similarCommunities: SimilarCommunitiesContainer,
  thankyou: Thankyou,
};

const appElement = isBrowser && document.querySelector('#app');


export default class Concierge extends Component {
  static propTypes = {
    community: object.isRequired,
    concierge: object.isRequired,
    close: func.isRequired,
    submitExpressConversion: func.isRequired,
    submitRegularConversion: func.isRequired,
    submitAdvancedInfo: func.isRequired,

  };

  render() {
    const {
      community,
      concierge,
      close,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      ...props
    } = this.props;

    const { modalIsOpen, currentStep, callbackRequested } = concierge;

    const StepComponent = steps[currentStep];
    return (
      <Fragment >
        {callbackRequested && (
          <Thankyou community={community} />
        )}
        {!callbackRequested && (
          <ConversionFormContainer
            submitRegularConversion={submitRegularConversion}
            submitExpressConversion={submitExpressConversion}
            community={community}
            concierge={concierge}
            express={false}
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
              submitRegularConversion={submitRegularConversion}
              submitExpressConversion={submitExpressConversion}
              submitAdvancedInfo={submitAdvancedInfo}
              onClose={close}
              {...props}
            />
          </Modal>
        )}
      </Fragment>
    );
  }
}

