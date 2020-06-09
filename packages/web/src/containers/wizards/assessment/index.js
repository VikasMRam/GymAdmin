import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { community as communityPropType } from 'sly/web/propTypes/community';
import { query, withUser } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import withWS from 'sly/web/services/ws/withWS';
import { withRedirectTo } from 'sly/web/services/redirectTo';
import { NOTIFY_AGENT_MATCHED, NOTIFY_AGENT_MATCHED_TIMEOUT } from 'sly/web/constants/notifications';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
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

@withWS
@withUser
@withRedirectTo
@query('getAgent', 'getAgent')
@query('createAction', 'createUuidAction')

export default class AssessmentWizard extends Component {
  static typeHydrationId = 'AssessmentWizardContainer';
  static propTypes = {
    createAction: func.isRequired,
    user: userPropType,
    skipIntro: bool,
    ws: object,
    getAgent: func.isRequired,
    community: communityPropType,
    city: string,
    state: string,
    redirectTo: func.isRequired,
    hasTip: bool,
  };

  state = {
    agent: null,
    hasNoAgent: false,
  };

  handleComplete = (data, { redirectLink }) => {
    const { redirectTo } = this.props;

    return redirectTo(redirectLink);
  };

  waitForAgentMatched = () => {
    const { ws } = this.props;

    ws.setup(true);
    this.agentMatchTimeout = setTimeout(this.onNoAgentMatch, NOTIFY_AGENT_MATCHED_TIMEOUT);
    ws.pubsub.on(NOTIFY_AGENT_MATCHED, this.onMessage, { capture: true });
  };

  handleStepChange = ({ currentStep, goto, data: { whatToDoNext } }) => {
    const { user } = this.props;

    SlyEvent.getInstance().sendEvent({
      category: 'assesmentWizard',
      action: 'step-completed',
      label: currentStep,
    });

    if (currentStep === 'Intro' && whatToDoNext === 'no-thanks') {
      if (user) {
        goto('ResidentName');
        return this.waitForAgentMatched();
      }
      return goto('Auth');
    }

    if (currentStep === 'ResidentName') {
      this.waitForAgentMatched();
    }
    return null;
  };

  onMessage = ({ payload: { agentSlug } }) => {
    const { getAgent } = this.props;
    clearTimeout(this.agentMatchTimeout);

    if (agentSlug) {
      getAgent({ id: agentSlug })
        .then((resp) => {
          const agent = normJsonApi(resp);
          this.setState({
            agent,
          });
        });
    }
  };

  onNoAgentMatch = () => {
    this.setState({
      hasNoAgent: true,
    });
  };

  render() {
    const { user, skipIntro, community, hasTip } = this.props;
    let { city, state } = this.props;
    let amount = 4000;
    const { agent, hasNoAgent } = this.state;

    if (community) {
      ({ address: { city, state }, startingRate: amount = 4000 } = community);
    }

    if (!city || !state) {
      throw Error('community or state and city is required');
    }

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
              hasTip={hasTip}
            />
            <WizardStep
              component={Feeling}
              name="Feeling"
              hasTip={hasTip}
            />
            <WizardStep
              component={ADL}
              name="ADL"
              whoNeedsHelp={lookingFor}
              hasTip={hasTip}
            />
            <WizardStep
              component={Dementia}
              name="Dementia"
              whoNeedsHelp={lookingFor}
              hasTip={hasTip}
            />
            <WizardStep
              component={Timing}
              name="Timing"
              hasTip={hasTip}
            />
            <WizardStep
              component={CurrentLiving}
              name="CurrentLiving"
              whoNeedsHelp={lookingFor}
              hasTip={hasTip}
            />
            <WizardStep
              component={Budget}
              name="Budget"
              whoNeedsHelp={lookingFor}
              city={city}
              state={state}
              amount={amount}
              hasTip={hasTip}
            />
            <WizardStep
              component={Medicaid}
              name="Medicaid"
              whoNeedsHelp={lookingFor}
              hasTip={hasTip}
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
                signUpSubmitButtonText="Get Pricing"
                signUpHasPassword={false}
              />
            }
            <WizardStep
              component={ResidentName}
              name="ResidentName"
              numberOfPeople={lookingFor === 'parents' || lookingFor === 'myself-and-spouse' ? 2 : 1}
              hasTip={hasTip}
            />
            <WizardStep
              component={End}
              name="End"
              agent={agent}
              hasNoAgent={hasNoAgent}
              community={community}
              city={city}
            />
          </WizardSteps>
        )}
      </WizardController>
    );
  }
}
