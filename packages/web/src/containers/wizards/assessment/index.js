import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { community as communityPropType } from 'sly/web/propTypes/community';
import { query } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import withWS from 'sly/web/services/ws/withWS';
import { withRedirectTo } from 'sly/web/services/redirectTo';
import { NOTIFY_AGENT_MATCHED, NOTIFY_AGENT_MATCHED_TIMEOUT } from 'sly/web/constants/notifications';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
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
import Auth from 'sly/web/containers/wizards/assessment/Auth';

@withWS
@withRedirectTo
@query('getAgent', 'getAgent')

export default class AssessmentWizard extends Component {
  static typeHydrationId = 'AssessmentWizardContainer';
  static propTypes = {
    skipIntro: bool,
    ws: object,
    getAgent: func.isRequired,
    community: communityPropType,
    city: string,
    state: string,
    redirectTo: func.isRequired,
    hasTip: bool,
    status: object,
    className: string,
  };

  state = {
    agent: null,
    hasNoAgent: false,
  };

  handleComplete = (data, { redirectLink }) => {
    const { redirectTo } = this.props;

    return redirectTo(redirectLink);
  };

  onNoAgentMatch = () => {
    this.setState({
      hasNoAgent: true,
    });
  };

  waitForAgentMatched = () => {
    const { ws } = this.props;

    ws.setup(true);
    this.agentMatchTimeout = setTimeout(this.onNoAgentMatch, NOTIFY_AGENT_MATCHED_TIMEOUT);
    ws.pubsub.on(NOTIFY_AGENT_MATCHED, this.onMessage, { capture: true });
  };

  handleStepChange = ({ currentStep, goto, data: { whatToDoNext } }) => {
    SlyEvent.getInstance().sendEvent({
      category: 'assesmentWizard',
      action: 'step-completed',
      label: currentStep,
    });

    if (currentStep === 'Intro' && whatToDoNext === 'no-thanks') {
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

  handleNext = ({ from, to }) => {
    if (from !== 'Auth' && from !== 'Intro') {
      SlyEvent.getInstance().sendEvent({
        category: 'assesmentWizard',
        action: 'step-skipped',
        label: from,
        value: to,
      });
    }
    if (from === 'ResidentName') {
      this.waitForAgentMatched();
    }
  };

  handlePrevious = ({ from, to }) => {
    SlyEvent.getInstance().sendEvent({
      category: 'assesmentWizard',
      action: 'step-back',
      label: from,
      value: to,
    });
  };

  render() {
    const { skipIntro, community, hasTip, className } = this.props;
    let { city, state } = this.props;
    let showSkipOption = false;
    let amount = 4000;
    const { agent, hasNoAgent } = this.state;

    if (community) {
      ({ address: { city, state }, startingRate: amount = 4000 } = community);
      showSkipOption = true; // When a community is present this wizard offers a shortcut to skip to final step.
    }

    if (!city || !state) {
      throw Error('community or state and city is required');
    }

    return (
      <section className={className}>
        <WizardController
          formName="assesmentWizard"
          onComplete={this.handleComplete}
          onStepChange={this.handleStepChange}
          onPrevious={this.handlePrevious}
          onNext={this.handleNext}
        >
          {({
            data, next, previous, ...props
          }) => (
            <WizardSteps {...props}>
              {!skipIntro &&
                <WizardStep
                  component={Intro}
                  name="Intro"
                  showSkipOption={showSkipOption}
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
                onSkipClick={next}
                onBackClick={previous}
              />
              <WizardStep
                component={ADL}
                name="ADL"
                whoNeedsHelp={data.lookingFor}
                hasTip={hasTip}
                onSkipClick={next}
                onBackClick={previous}
              />
              <WizardStep
                component={Dementia}
                name="Dementia"
                whoNeedsHelp={data.lookingFor}
                hasTip={hasTip}
                onSkipClick={next}
                onBackClick={previous}
              />
              <WizardStep
                component={Timing}
                name="Timing"
                hasTip={hasTip}
                onSkipClick={next}
                onBackClick={previous}
              />
              <WizardStep
                component={CurrentLiving}
                name="CurrentLiving"
                whoNeedsHelp={data.lookingFor}
                hasTip={hasTip}
                onSkipClick={next}
                onBackClick={previous}
              />
              <WizardStep
                component={Budget}
                name="Budget"
                whoNeedsHelp={data.lookingFor}
                city={city}
                state={state}
                amount={amount}
                hasTip={hasTip}
                onSkipClick={next}
                onBackClick={previous}
              />
              <WizardStep
                component={Medicaid}
                name="Medicaid"
                whoNeedsHelp={data.lookingFor}
                hasTip={hasTip}
                onSkipClick={next}
                onBackClick={previous}
              />
              <WizardStep
                component={Auth}
                name="Auth"
                signUpHeading={data.whatToDoNext === 'start' ?
                  'Almost done! Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'
                  : 'Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'}
                onAuthSuccess={next}
                community={community}
              />
              <WizardStep
                component={ResidentName}
                name="ResidentName"
                numberOfPeople={data.lookingFor === 'parents' || data.lookingFor === 'myself-and-spouse' ? 2 : 1}
                hasTip={hasTip}
                onSkipClick={next}
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
      </section>
    );
  }
}
