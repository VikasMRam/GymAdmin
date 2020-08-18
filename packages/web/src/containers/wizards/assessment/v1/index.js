import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { query } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import withWS from 'sly/web/services/ws/withWS';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';
import { getWizardEndAd } from 'sly/web/services/helpers/adtiles';
import { NOTIFY_AGENT_MATCHED, NOTIFY_AGENT_MATCHED_TIMEOUT } from 'sly/web/constants/notifications';
import {
  ASSESSMENT_WIZARD_MATCHED_AGENT,
  ASSESSMENT_WIZARD_COMPLETED,
  ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES,
} from 'sly/web/constants/wizards/assessment';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
import SlyEvent from 'sly/web/services/helpers/events';
// import Intro from 'sly/web/containers/wizards/assessment/Intro';
import Who from 'sly/web/containers/wizards/assessment/v1/Who';
import Feeling from 'sly/web/containers/wizards/assessment/v1/Feeling';
import ADL from 'sly/web/containers/wizards/assessment/v1/ADL';
import Budget from 'sly/web/containers/wizards/assessment/v1/Budget';
import CurrentLiving from 'sly/web/containers/wizards/assessment/v1/CurrentLiving';
import Dementia from 'sly/web/containers/wizards/assessment/v1/Dementia';
import End from 'sly/web/containers/wizards/assessment/v1/End';
import Medicaid from 'sly/web/containers/wizards/assessment/v1/Medicaid';
import ResidentName from 'sly/web/containers/wizards/assessment/v1/ResidentName';
import Timing from 'sly/web/containers/wizards/assessment/v1/Timing';
import Auth from 'sly/web/containers/wizards/assessment/v1/Auth';

@withWS
@withRedirectTo
@query('getAgent', 'getAgent')

export default class AssessmentWizard extends Component {
  static typeHydrationId = 'AssessmentWizard';
  static propTypes = {
    skipIntro: bool,
    ws: object,
    getAgent: func.isRequired,
    community: communityPropType,
    city: string,
    state: string,
    toc: string,
    redirectTo: func.isRequired,
    updateUuidAux: func.isRequired,
    hasTip: bool,
    status: object,
    className: string,
  };

  state = {
    agent: null,
    hasNoAgent: false,
  };

  componentDidMount() {
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: 'open',
    });
  }

  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  handleComplete = (data, { redirectLink }) => {
    const { redirectTo } = this.props;

    return redirectTo(redirectLink);
  };

  onNoAgentMatch = () => {
    const { community } = this.props;

    if (!this.skipped) {
      localStorage.setItem(ASSESSMENT_WIZARD_COMPLETED, ASSESSMENT_WIZARD_COMPLETED);
    }
    if (community) {
      recordEntityCta(ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES, community.id);
    }

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
      category: 'assessmentWizard',
      action: 'step-completed',
      label: currentStep,
    });
    this.scrollToTop();

    if (currentStep === 'Intro' && whatToDoNext === 'no-thanks') {
      this.skipped = true;
      return goto('Auth');
    }

    if (currentStep === 'ResidentName') {
      this.waitForAgentMatched();
    }

    return null;
  };

  onMessage = ({ payload: { agentSlug } }) => {
    const { getAgent, community } = this.props;
    clearTimeout(this.agentMatchTimeout);
    if (!this.skipped) {
      localStorage.setItem(ASSESSMENT_WIZARD_COMPLETED, ASSESSMENT_WIZARD_COMPLETED);
    }
    if (community) {
      recordEntityCta(ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES, community.id);
    }

    if (agentSlug) {
      localStorage.setItem(ASSESSMENT_WIZARD_MATCHED_AGENT, agentSlug);
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
        category: 'assessmentWizard',
        action: 'step-skipped',
        label: from,
        value: to,
      });
    }
    if (from === 'ResidentName') {
      this.waitForAgentMatched();
    }
    this.scrollToTop();
  };

  handlePrevious = ({ from, to }) => {
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: 'step-back',
      label: from,
      value: to,
    });
    this.scrollToTop();
  };

  render() {
    const { community, hasTip, className, toc } = this.props;
    let { city, state } = this.props;
    let amount = 4000;
    const { agent, hasNoAgent } = this.state;

    if (community) {
      ({ address: { city, state }, startingRate: amount = 4000 } = community);
    }

    if (!city || !state) {
      throw Error('community or state and city is required');
    }
    const adTile = getWizardEndAd({ community, toc, city });

    return (
      <section className={className}>
        <WizardController
          formName="assessmentWizard"
          onComplete={this.handleComplete}
          onStepChange={this.handleStepChange}
          onPrevious={this.handlePrevious}
          onNext={this.handleNext}
        >
          {({
            data, next, previous, ...props
          }) => (
            <WizardSteps {...props}>
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
                updateUuidAux={this.updateUuidAux}
              />
              <WizardStep
                component={Auth}
                name="Auth"
                signUpHeading={data.whatToDoNext === 'start' ?
                  'Almost done! Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'
                  : 'Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'}
                onAuthSuccess={next}
                community={community}
                updateUuidAux={this.updateUuidAux}
              />
              <WizardStep
                component={ResidentName}
                name="ResidentName"
                numberOfPeople={data.lookingFor === 'parents' || data.lookingFor === 'myself-and-spouse' ? 2 : 1}
                hasTip={hasTip}
                onSkipClick={next}
                whatToDoNext={data.whatToDoNext}
              />
              <WizardStep
                component={End}
                name="End"
                agent={agent}
                hasNoAgent={hasNoAgent}
                community={community}
                city={city}
                adTile={adTile}
              />
            </WizardSteps>
          )}
        </WizardController>
      </section>
    );
  }
}
