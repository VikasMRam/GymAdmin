import React, { Component } from 'react';
import { oneOf } from 'prop-types';
import styled from 'styled-components';

import { Heading, Block } from 'sly/components/atoms';
import Modal from 'sly/components/molecules/Modal';
import AdvancedInfoContainer from 'sly/containers/AdvancedInfoContainer';
import SimilarCommunitiesContainer from 'sly/containers/SimilarCommunitiesContainer';
import Thankyou from 'sly/components/molecules/Thankyou';

const CommunityHeading = ({ community }) => [ 
  <Heading>Send a message to {community.name}</Heading>,
  <Block>{community.description}</Block>
];

const SimilarHeading = () => [ 
  <Heading>Send your message to similar communities</Heading>,
  <Block>We found that this communities have similar features that you are looking for</Block>
];

const steps = {
  advancedInfo: { 
    heading: CommunityHeading,
    content: AdvancedInfoContainer,
    layout: 'double' 
  },
  similarCommunities: { 
    heading: SimilarHeading,
    content: SimilarCommunitiesContainer, 
    layout: 'single'
  },
  thankyou: { 
    content: Thankyou
  },
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
    const { currentStep, onClose, isOpen, community, ...props } = this.props;

    const layout = steps[currentStep].layout;
    const HeadingComponent = steps[currentStep].heading;
    const StepComponent = steps[currentStep].content;

    const heading = HeadingComponent && <HeadingComponent community={community} />

    return (
      <Modal onClose={onClose} isOpen={isOpen} layout={layout} closeable heading={heading} {...props}>
        <StepComponent community={community} {...props} />
      </Modal>
    );
  }
}

