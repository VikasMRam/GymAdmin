import React, { Component } from 'react';
import { func, bool, object, string } from 'prop-types';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { withRedirectTo } from 'sly/common/services/redirectTo';
import { query } from 'sly/web/services/api';
import { WizardController, WizardStep, WizardSteps } from 'sly/web/services/wizard';
import withWS from 'sly/web/services/ws/withWS';
import { recordEntityCta } from 'sly/web/services/helpers/localStorage';
import { getModalFromEntry  } from 'sly/web/services/helpers/wizard';
import { NOTIFY_AGENT_MATCHED, NOTIFY_AGENT_MATCHED_TIMEOUT } from 'sly/web/constants/notifications';
import { FAMILY_DASHBOARD_HOME_PATH } from 'sly/web/constants/dashboardAppPaths';
import {
  ASSESSMENT_WIZARD_MATCHED_AGENT,
  ASSESSMENT_WIZARD_COMPLETED,
  ASSESSMENT_WIZARD_COMPLETED_COMMUNITIES,
  ASSESSMENT_WIZARD_NO_PROGRESS_BAR_STEPS,
} from 'sly/web/constants/wizards/assessment';
import { normJsonApi } from 'sly/web/services/helpers/jsonApi';
import SlyEvent from 'sly/web/services/helpers/events';
/* Wizard Step Imports */
import {
  Location,
  Who,
  Timing,
  ADL,
  Budget,
  Auth,

} from 'sly/web/containers/wizards/assessment/common';
import Intro from 'sly/web/containers/wizards/assessment/v1_1/Intro';
import Services from 'sly/web/containers/wizards/assessment/v1_1/Services';
import Medicaid from 'sly/web/containers/wizards/assessment/v1_1/Medicaid';
import { Wrapper } from 'sly/web/components/wizards/assessment/Template';
import ProgressBar from 'sly/web/components/molecules/ProgressBar';

@withWS
@withRedirectTo
@query('getAgent', 'getAgent')

export default class AssessmentWizardV2 extends Component {
  static typeHydrationId = 'AssessmentWizard_V2';
  static propTypes = {
    skipIntro: bool,
    entry: string,
    ws: object,
    getAgent: func.isRequired,
    community: communityPropType,
    city: string,
    state: string,
    toc: string,
    redirectTo: func.isRequired,
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

  handleComplete = () => {
    const { redirectTo, entry } = this.props;
    const modal = getModalFromEntry(entry);
    // Add entry modal for homepage
    // TODO: ADD CUSTOMIZATION FROM DATA
    const redirectPath = `${FAMILY_DASHBOARD_HOME_PATH}?modal=${modal}`;
    return redirectTo(redirectPath);
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

    if (currentStep === 'LocalExpert') {
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
    if (from === 'Auth') {
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
    const { community, hasTip, className, toc, skipIntro } = this.props;
    let { city, state } = this.props;
    let amount = 4000;
    let skipOptionText = 'No thanks, connect me to an expert now.';
    const showSkipOption = true;
    const { agent, hasNoAgent } = this.state;
    console.log('toc and agent and hasNoAgent', agent, hasNoAgent, toc);
    if (community) {
      ({ address: { city, state }, startingRate: amount = 4000 } = community);
      skipOptionText = 'No thanks, I just want pricing.';
    }
    const hadNoLocation = !city || !state || city === 'undefined' || state === 'undefined';

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
            <section className={className}>
              {currentStep && !ASSESSMENT_WIZARD_NO_PROGRESS_BAR_STEPS.includes(currentStep) &&
                <Wrapper>
                  <ProgressBar label pad="xLarge" totalSteps={hadNoLocation ? 9 : 8} currentStep={props.currentStepIndex} />
                </Wrapper>
              }
              <WizardSteps {...props}>
                {!skipIntro && <WizardStep
                  component={Intro}
                  name="Intro"
                  showSkipOption={showSkipOption}
                  skipOptionText={skipOptionText}
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
                  component={Auth}
                  name="Auth"
                  signUpHeading={data.whatToDoNext === 'start' ?
                    'Almost done! Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'
                    : 'Please provide your contact details so we can connect with you regarding your detailed pricing and personalized senior living and care options.'}
                  onAuthSuccess={next}
                  community={community}
                />
              </WizardSteps>
            </section>
          );
        }}
      </WizardController>
    );
  }
}
