import React, { Component } from 'react';
import { func } from 'prop-types';

import { query } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import Intro from 'sly/web/containers/wizards/assesment/Intro';
import Who from 'sly/web/containers/wizards/assesment/Who';
import Feeling from 'sly/web/containers/wizards/assesment/Feeling';
import ADL from 'sly/web/containers/wizards/assesment/ADL';
import Budget from 'sly/web/containers/wizards/assesment/Budget';
import CurrentLiving from 'sly/web/containers/wizards/assesment/CurrentLiving';
import Dementia from 'sly/web/containers/wizards/assesment/Dementia';
import End from 'sly/web/containers/wizards/assesment/End';
import Medicaid from 'sly/web/containers/wizards/assesment/Medicaid';
import ResidentName from 'sly/web/containers/wizards/assesment/ResidentName';
import Timing from 'sly/web/containers/wizards/assesment/Timing';

@query('createAction', 'createUuidAction')

export default class AssesmentWizard extends Component {
  static propTypes = {
    createAction: func.isRequired,
  };

  handleComplete = () => {
  };

  render() {
    return (
      <WizardController
        formName="assesmentWizard"
        onComplete={this.handleComplete}
      >
        {({
          data: { lookingFor }, next, previous, ...props
        }) => (
          <WizardSteps {...props}>
            <WizardStep
              component={Intro}
              name="Intro"
            />
            <WizardStep
              component={Who}
              name="Who"
            />
            <WizardStep
              component={Feeling}
              name="Feeling"
            />
            <WizardStep
              component={ADL}
              name="ADL"
              whoNeedsHelp={lookingFor}
            />
            <WizardStep
              component={Dementia}
              name="Dementia"
              whoNeedsHelp={lookingFor}
            />
            <WizardStep
              component={Timing}
              name="Timing"
            />
            <WizardStep
              component={CurrentLiving}
              name="CurrentLiving"
              whoNeedsHelp={lookingFor}
            />
            <WizardStep
              component={Budget}
              name="Budget"
              whoNeedsHelp={lookingFor}
            />
            <WizardStep
              component={Medicaid}
              name="Medicaid"
              whoNeedsHelp={lookingFor}
            />
            <WizardStep
              component={ResidentName}
              name="ResidentName"
            />
            <WizardStep
              component={End}
              name="End"
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}
