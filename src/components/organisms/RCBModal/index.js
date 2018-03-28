import React, { Component } from 'react';
import { oneOf } from 'prop-types';

import Modal from 'sly/components/molecules/Modal';
import Thankyou from 'sly/components/organisms/Thankyou';
import AdvancedInfoContainer from 'sly/containers/AdvancedInfoContainer';
import SimilarCommunitiesContainer from 'sly/containers/SimilarCommunitiesContainer';

const steps = { 
  advancedInfo: AdvancedInfoContainer,
  similarCommunities: SimilarCommunitiesContainer,
  thankyou: Thankyou,
};

export default class RCBModal extends Component {
  static propTypes = {
    currentStep: oneOf(Object.keys(steps)).isRequired,
  };

  static defaultProps = {
    currentStep: 'advancedInfo',
  };

  nextStep = () => {
    const { currentStep } = this.props;
    const stepKeys = Object.keys(steps);
    const stepIndex = stepKeys.indexOf(currentStep);
    if(stepIndex + 1 < stepKeys.length) {
      this.setState({ currentStep: stepKeys[stepIndex + 1] }); 
    }
  };

  onSubmit = (...args) => {
    const { onSubmit } = this.props;
    onSubmit(...args);
    console.log('submitting', args);
  };

  render() {
    const { currentStep, onClose, isOpen, ...props } = this.props;
    console.log('currentStep', currentStep);

    const StepComponent = steps[currentStep];

    return (
      <Modal onClose={onClose} isOpen={isOpen}>
        <StepComponent {...props} />
      </Modal>
    );
  }
}
