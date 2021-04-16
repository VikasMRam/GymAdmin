import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { query } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import withWS from 'sly/web/services/ws/withWS';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';
import { objectToURLQueryParams } from 'sly/web/services/helpers/url';
import { getWizardContentFromCta, getModalFromEntry  } from 'sly/web/services/helpers/wizard';
import { NOTIFY_AGENT_MATCHED, NOTIFY_AGENT_MATCHED_TIMEOUT } from 'sly/web/constants/notifications';
import { FAMILY_DASHBOARD_HOME_PATH } from 'sly/web/constants/dashboardAppPaths';
import {
  ASSESSMENT_WIZARD_MATCHED_AGENT,
  ASSESSMENT_WIZARD_COMPLETED,
  ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES,
  ASSESSMENT_WIZARD_NO_PROGRESS_BAR_STEPS,
  WIZARD_EXPERIMENT_ZIP_CODES } from 'sly/web/constants/wizards/assessment';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
import SlyEvent from 'sly/web/services/helpers/events';
/* Wizard Step Imports */
import {
  Location,
  Who,
  Timing,
  ADL,
  Budget,
  Conversion,
  End,
  Agent,
} from 'sly/web/containers/wizards/assessment/common';
import Intro from 'sly/web/containers/wizards/assessment/v1_1/Intro';
import Services from 'sly/web/containers/wizards/assessment/v1_1/Services';
import Medicaid from 'sly/web/containers/wizards/assessment/v1_1/Medicaid';
import { ProgressBarWrapper } from 'sly/web/components/wizards/assessment/Template';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';
import { Experiment, Variant } from 'sly/web/services/experiments';


@withWS
@withRedirectTo
@query('getAgent', 'getAgent')

export default class AssessmentWizardV2 extends Component {
  static typeHydrationId = 'AssessmentWizard_V2';
  static propTypes = {
    skipIntro: bool,
    entry: string,
    cta: string,
    ws: object,
    getAgent: func.isRequired,
    community: communityPropType,
    city: string,
    zip: string,
    state: string,
    toc: string,
    redirectTo: func.isRequired,
    hasTip: bool,
    status: object,
    className: string,
  };

  state = {
    // agent: null,
    hasNoAgent: false,
  };

  componentDidMount() {
    const { entry } = this.props;
    SlyEvent.getInstance().sendEvent({
      category: 'assessmentWizard',
      action: 'open',
      label: entry,
    });
  }

  scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  handleComplete = () => {
    const { redirectTo, entry, community = {} } = this.props;
    const qp = {};
    const modal = getModalFromEntry(entry);
    if (modal) {
      qp.modal = modal;
    }
    // Add entry modal for homepage
    if (community && community.name) {
      qp.communityName = community.name;
      recordEntityCta(ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES, community.id);
    }
    if (!this.skipped) {
      localStorage.setItem(ASSESSMENT_WIZARD_COMPLETED, ASSESSMENT_WIZARD_COMPLETED);
    }
    const redirectPath = `${FAMILY_DASHBOARD_HOME_PATH}?${objectToURLQueryParams(qp)}`;
    return redirectTo(redirectPath);
  };

  onNoAgentMatch = () => {
    this.setState({
      hasNoAgent: true,
    });
    // redirect
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

    if (currentStep === 'Auth') {
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

  handleNext = (data) => {
    const { from, to }  = data;
    if (from !== 'Auth' && from !== 'Intro') {
      SlyEvent.getInstance().sendEvent({
        category: 'assessmentWizard',
        action: 'step-skipped',
        label: from,
        value: to,
      });
    }
    if (from === 'LocalExpert') {
      this.waitForAgentMatched();
    }
    if (from === 'End') {
      this.handleComplete(data);
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
    const { community, hasTip, className, toc, skipIntro, cta, entry } = this.props;
    let { city, state, zip } = this.props;
    let amount = 4000;
    let skipOptionText = 'No thanks, connect me to an expert now.';
    // const showSkipOption = true;
    const { hasNoAgent, agent } = this.state;
    // Add agent presence
    const conversionInfo = { toc, cta, entry, hasNoAgent };
    if (agent && agent.name) {
      conversionInfo.agentName = agent.name;
    }
    // console.log('toc and agent and hasNoAgent', agent, hasNoAgent, toc);
    if (community) {
      ({ address: { city, state, zip }, startingRate: amount = 4000 } = community);
      skipOptionText = 'No thanks, I just want to see pricing.';
    }
    const hadNoLocation = !city || !state || city === 'undefined' || state === 'undefined';
    const { intro = {} }  = getWizardContentFromCta(cta);
    return (
      <WizardController
        formName="assessmentWizard"
        onComplete={this.handleComplete}
        onStepChange={this.handleStepChange}
        onPrevious={this.handlePrevious}
        onNext={this.handleNext}
      >
        {({
            data, next, previous, currentStep, ...props
          }) => {
          if (data.location) {
            [city, state] = data.location.displayText.split(', ');
          }
          return (
            community && WIZARD_EXPERIMENT_ZIP_CODES.includes(zip) ?
              <Experiment name="DirectMarketWizard">
                <Variant name="Reduced_Steps">
                  <section className={className}>
                    {currentStep && !ASSESSMENT_WIZARD_NO_PROGRESS_BAR_STEPS.includes(currentStep) &&
                    <ProgressBarWrapper>
                      <ProgressBar totalSteps="3" currentStep={props.currentStepIndex} />
                    </ProgressBarWrapper>
                    }
                    <WizardSteps {...props}>
                      {!skipIntro && <WizardStep
                        component={Intro}
                        name="Intro"
                        skipOptionText={skipOptionText}
                        {...intro}
                      />}
                      <WizardStep
                        component={ADL}
                        name="ADL"
                        stepName="step-2:ADL-Reduced_Steps"
                        hasTip={hasTip}
                        onSkipClick={next}
                        onBackClick={previous}
                      />

                      <WizardStep
                        component={Medicaid}
                        name="Medicaid"
                        stepName="step-3:Medicaid-Reduced_Steps"
                        hasTip={hasTip}
                        onSkipClick={next}
                        onBackClick={previous}
                      />

                      <WizardStep
                        component={Conversion}
                        name="Auth"
                        signUpHeading={data.whatToDoNext === 'start' ?
                  'Almost done! Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'
                  : 'Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'}
                        stepName="step-4:Conversion-Reduced_Steps"
                        onAuthSuccess={next}
                        onSubmit={next}
                        onSkipClick={next}
                        onBackClick={previous}
                        whoNeedsHelp={data.lookingFor}
                        data={data}
                        community={community}
                        entry={entry}
                        conversionInfo={conversionInfo}
                      />
                      <WizardStep
                        component={End}
                        name="End"
                        onComplete={next}
                        whoNeedsHelp={data.lookingFor}
                        hasTip={hasTip}
                      />
                    </WizardSteps>
                  </section>
                </Variant>
                <Variant name="New_Steps">
                  <section className={className}>
                    {currentStep && !ASSESSMENT_WIZARD_NO_PROGRESS_BAR_STEPS.includes(currentStep) &&
                    <ProgressBarWrapper>
                      <ProgressBar totalSteps={3} currentStep={props.currentStepIndex} />
                    </ProgressBarWrapper>
                    }
                    <WizardSteps {...props}>
                      {!skipIntro && <WizardStep
                        component={Intro}
                        name="Intro"
                        skipOptionText={skipOptionText}
                        {...intro}
                      />}
                      <WizardStep
                        component={ADL}
                        name="ADL"
                        stepName="step-2:ADL-New_Steps"
                        hasTip={hasTip}
                        onSkipClick={next}
                        onBackClick={previous}
                      />
                      <WizardStep
                        component={Agent}
                        name="Agent"
                        hasTip={hasTip}
                        onSkipClick={next}
                        onBackClick={previous}
                      />
                      <WizardStep
                        component={Conversion}
                        name="Auth"
                        signUpHeading={data.whatToDoNext === 'start' ?
                  'Almost done! Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'
                  : 'Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'}
                        experimentDescription={data.agent === 'no-agent' ? "We'll get back to you on your request soon." : null}
                        stepName="step-4:Conversion:New_Steps"
                        onAuthSuccess={next}
                        onSubmit={next}
                        onSkipClick={next}
                        onBackClick={previous}
                        data={data}
                        community={community}
                        entry={entry}
                        conversionInfo={conversionInfo}
                      />
                      <WizardStep
                        component={End}
                        name="End"
                        onComplete={next}
                        hasTip={hasTip}
                      />
                    </WizardSteps>
                  </section>
                </Variant>
              </Experiment>
            :
              <section className={className}>
                {currentStep && !ASSESSMENT_WIZARD_NO_PROGRESS_BAR_STEPS.includes(currentStep) &&
                <ProgressBarWrapper>
                  <ProgressBar totalSteps={hadNoLocation ? 8 : 7} currentStep={props.currentStepIndex} />
                </ProgressBarWrapper>
              }
                <WizardSteps {...props}>
                  {!skipIntro && <WizardStep
                    component={Intro}
                    name="Intro"
                    skipOptionText={skipOptionText}
                    {...intro}
                  />}
                  {hadNoLocation &&
                  <WizardStep
                    component={Location}
                    name="Location"
                    hasTip={hasTip}
                  />
                  }
                  <WizardStep
                    component={Who}
                    name="Who"
                    hasTip={hasTip}
                    onSkipClick={next}
                    onBackClick={previous}
                  />
                  <WizardStep
                    component={Timing}
                    name="Timing"
                    hasTip={hasTip}
                    onBackClick={previous}
                    onSkipClick={next}
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
                    component={Services}
                    name="Services"
                    whoNeedsHelp={data.lookingFor}
                    hasTip={hasTip}
                    onSkipClick={next}
                    onBackClick={previous}
                  />
                  <WizardStep
                    component={Conversion}
                    name="Auth"
                    signUpHeading={data.whatToDoNext === 'start' ?
                    'Almost done! Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'
                    : 'Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'}
                    onAuthSuccess={next}
                    onSubmit={next}
                    onSkipClick={next}
                    onBackClick={previous}
                    whoNeedsHelp={data.lookingFor}
                    data={data}
                    community={community}
                    entry={entry}
                    conversionInfo={conversionInfo}
                  />
                  <WizardStep
                    component={End}
                    name="End"
                    onComplete={next}
                    whoNeedsHelp={data.lookingFor}
                    hasTip={hasTip}
                  />
                </WizardSteps>
              </section>
          );
        }}
      </WizardController>
    );
  }
}
