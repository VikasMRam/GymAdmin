import React, { Fragment } from 'react';
import { object, func } from 'prop-types';


import { isBrowser } from 'sly/config';
import Modal from 'sly/components/molecules/Modal';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import AdvancedInfoFormContainer from 'sly/containers/AdvancedInfoFormContainer';
import Thankyou from 'sly/components/molecules/Thankyou';
import WhatNext from 'sly/components/organisms/WhatNext';

const ExpressConversionFormContainer = props => (
  <ConversionFormContainer
    express
    {...props}
  />
);

const HowItWorks = props => <WhatNext reasons="howItWorks" {...props} />;

const steps = {
  conversionForm: ConversionFormContainer,
  expressConversionForm: ExpressConversionFormContainer,
  advancedInfo: AdvancedInfoFormContainer,
  whatNext: WhatNext,
  howItWorks: HowItWorks,
  // similarCommunities: SimilarCommunitiesContainer,
  thankyou: Thankyou,
};

const appElement = isBrowser && document.querySelector('#app');

const Concierge = ({
  community,
  concierge,
  close,
  gotoWhatNext,
  submitRegularConversion,
  submitExpressConversion,
  submitAdvancedInfo,
  ...props
}) => {
  const { modalIsOpen, currentStep } = concierge;

  const StepComponent = steps[currentStep];
  const modal = (
    <Fragment>
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
    </Fragment>);
  let result = modal;
  if (community) {
    result = (
      <Fragment >
        <ConversionFormContainer
          submitRegularConversion={submitRegularConversion}
          submitExpressConversion={submitExpressConversion}
          gotoWhatNext={gotoWhatNext}
          community={community}
          concierge={concierge}
          express={false}
        />
        {modal}
      </Fragment>
    );
  }
  return result;
};

Concierge.propTypes = {
  community: object,
  concierge: object.isRequired,
  close: func.isRequired,
  gotoWhatNext: func.isRequired,
  submitExpressConversion: func.isRequired,
  submitRegularConversion: func.isRequired,
  submitAdvancedInfo: func.isRequired,

};

export default Concierge;
