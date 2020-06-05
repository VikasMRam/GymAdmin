import React, { Component } from 'react';
import { func, bool } from 'prop-types';

import { query, withUser } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import AuthContainer from 'sly/web/services/auth/containers/AuthContainer';
import userPropType from 'sly/web/propTypes/user';
import SlyEvent from 'sly/web/services/helpers/events';
import Intro from 'sly/web/containers/wizards/assessment/Intro';
import Who from 'sly/web/containers/wizards/assessment/Who';
import Feeling from 'sly/web/containers/wizards/assessment/Feeling';
import ADL from 'sly/web/containers/wizards/assessment/ADL';
import Budget from 'sly/web/containers/wizards/assessment/Budget';
import CurrentLiving from 'sly/web/containers/wizards/assessment/CurrentLiving';
import Dementia from 'sly/web/containers/wizards/assessment/Dementia';
import End from 'sly/web/containers/wizards/assessment/End';
import Medicaid from 'sly/web/containers/wizards/assessment/Medicaid';
import ResidentName from 'sly/web/containers/wizards/assessment/ResidentName';
import Timing from 'sly/web/containers/wizards/assessment/Timing';

@withUser
@query('createAction', 'createUuidAction')

export default class AssessmentWizard extends Component {
  static typeHydrationId = 'AssessmentWizardContainer';
  static propTypes = {
    createAction: func.isRequired,
    user: userPropType,
    skipIntro: bool,
  };

  handleComplete = () => {
  };

  handleStepChange = ({ currentStep, goto, data: { whatToDoNext } }) => {
    SlyEvent.getInstance().sendEvent({
      category: 'assesmentWizard',
      action: 'step-completed',
      label: currentStep,
    });

    if (currentStep === 'Intro' && whatToDoNext === 'no-thanks') {
      goto('Auth');
    }
  };

  render() {
    const { user, skipIntro } = this.props;

    return (
      <WizardController
        formName="assesmentWizard"
        onComplete={this.handleComplete}
        onStepChange={this.handleStepChange}
      >
        {({
          data: { lookingFor, whatToDoNext }, next, previous, ...props
        }) => (
          <WizardSteps {...props}>
            {!skipIntro &&
              <WizardStep
                component={Intro}
                name="Intro"
              />
            }
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
            {!user &&
              <WizardStep
                component={AuthContainer}
                name="Auth"
                type="inline"
                onAuthenticateSuccess={next}
                initialStep="Signup"
                signUpHeading={whatToDoNext === 'start' ?
                  'Almost done! Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'
                  : 'Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'}
              />
            }
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
