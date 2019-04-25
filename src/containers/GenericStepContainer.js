import React, { Component } from 'react';

import GenericWizardActionStep from 'sly/components/organisms/GenericWizardActionStep';


class GenericStepContainer extends Component {

  render() {
    return <GenericWizardActionStep {...this.props} />;
  }
}

export default GenericStepContainer;
