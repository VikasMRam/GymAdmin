import React, { Component, Fragment } from 'react';
import { object, func, bool } from 'prop-types';
import styled from 'styled-components';

import { isBrowser } from 'sly/config';
import Modal from 'sly/components/molecules/Modal';
import ConversionFormContainer from 'sly/containers/ConversionFormContainer';
import AdvancedInfoContainer from 'sly/containers/AdvancedInfoContainer';
// import SimilarCommunitiesContainer from 'sly/containers/SimilarCommunitiesContainer';
import Thankyou from 'sly/components/molecules/Thankyou';
import CalendlyAppointment from 'sly/components/molecules/CalendlyAppointment';
import CalendlyConcierge from 'sly/components/molecules/CalendlyConcierge';

import { Experiment, Variant } from 'sly/services/experiments';

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
  // similarCommunities: SimilarCommunitiesContainer,
  calendlyAppointment: CalendlyAppointment,
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
    launchCalendly: func.isRequired,
  };

  render() {
    const {
      community,
      concierge,
      close,
      submitRegularConversion,
      submitExpressConversion,
      submitAdvancedInfo,
      launchCalendly,
      ...props
    } = this.props;

    const { modalIsOpen, currentStep, callbackRequested } = concierge;

    const StepComponent = steps[currentStep];
    
    const url = community.url;

    const disabled = url.indexOf('california/san-francisco/') === -1
      && url.indexOf('california/los-angeles/') === -1;
    
    return (
      <Fragment>
        <Experiment name="Organisms_Concierge_Calendly" disabled={disabled}>
          <Variant name="original_flow">
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
          </Variant>
          <Variant name="calendly_flow">
          <CalendlyConcierge launchCalendly={launchCalendly} />
        </Variant>
        </Experiment>

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

