import React, { Component } from 'react';
import styled from 'styled-components';
import { object, func, string, bool } from 'prop-types';
import Helmet from 'react-helmet';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import { community as communityPropType } from 'sly/propTypes/community';
import userPropType from 'sly/propTypes/user';
import agentPropType from 'sly/propTypes/agent';
import { size } from 'sly/components/themes';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import {
  FullScreenWizard,
  makeBody,
  makeColumn,
  makeControls,
  makeHeader,
} from 'sly/components/templates/FullScreenWizard';
import {
  EST_ADDL_COST_ACCOMODATION,
  EST_ADDL_COST_CARE_SERVICE,
  // WHAT_TO_NEXT_OPTIONS,
} from 'sly/constants/pricingForm';
import { getIsCCRC } from 'sly/services/helpers/community';
import { FAMILY_DASHBOARD_FAVORITES_PATH } from 'sly/constants/dashboardAppPaths';
import CommunityBookATourContactFormContainer from 'sly/containers/CommunityBookATourContactFormContainer';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityPWEstimatedPricingFormContainer from 'sly/containers/CommunityPWEstimatedPricingFormContainer';
import CommunityWizardAcknowledgementContainer from 'sly/containers/CommunityWizardAcknowledgementContainer';
import MatchedAgentContainer from 'sly/containers/MatchedAgentContainer';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import Modal from 'sly/components/molecules/Modal';
import ConversionWizardInfoStep from 'sly/components/organisms/ConversionWizardInfoStep';

const Header = makeHeader(HeaderContainer);

const columnBackground = ({ backgroundImage }) => `url(${backgroundImage})`;
const Column = makeColumn(styled.div`
  @media screen and (min-width: ${size('breakpoint.laptop')}) {
    background-image: ${columnBackground};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: flex-end;
    height: 100%;
  }
`);
const Body = makeBody('div');
const Controls = makeControls('div');

const StyledCommunityInfo = styled(CommunityInfo)`
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  padding: ${size('spacing.large')};
  padding-top: ${size('spacing.xxxLarge')};
`;

const contactFormHeadingMap = {
  'schedule-tour': { heading: 'Schedule a Tour', subheading: 'We will help you schedule tours and, if you request, we can provide a Partner Agent to accompany you. This is a free service. ' },
  'talk-advisor': { heading: 'Talk to an Advisor', subheading: 'Call us at (855) 866-4515 to talk to us. We offer complete support with an Partner Agent near you.  This is a no-obligation free service. ' },
  'learn-similar-communities': { heading: 'Learn about Similar Communities', subheading: 'We help you evaluate communities, so you can pick the best one. This is a free service. ' },
  'explore-affordable-options': { heading: 'No Problem! We have options in your budget.', subheading: 'Many of our partner agents specialize in options that are hard to find online and are in your price range. How can we reach you? ' },
  'apply-financing': { heading: 'We Are Here to Help You', subheading: 'We have helped thousands of families to learn about and choose a community they love. This is a free service. ' },
};

const stepsWithoutControls = [
  'Landing',
  'WhatToDoNext',
  'ExploreAffordableOptions',
  'MedicaidWarning',
  'CCRCWarning',
  'PostConversionGreeting',
];

export default class PricingWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    agent: agentPropType,
    user: userPropType,
    userHas: func,
    uuidAux: object,
    userActionSubmit: func,
    redirectTo: func,
    match: object,
    submitActionAndCreateUser: func,
    updateUuidAux: func,
    type: string,
    sendEvent: func,
    hasNoAgent: bool,
  };

  static defaultProps = {
    type: 'pricing',
  };

  state = { estimatedPrice: 0 };

  constructor(props) {
    super(props);

    const { community } = props;

    if (community) {
      const { startingRate } = community;
      this.state = { estimatedPrice: startingRate };
    }
  }

  handleRoomTypeChange = (e, newRoomTypes) => {
    const { community, sendEvent } = this.props;
    const { id } = community;
    this.roomTypes = newRoomTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('roomType-changed', id, newRoomTypes.toString());
  };
  handleMoveTimelineChange = (e, moveTimeline) => {
    const { community, sendEvent } = this.props;
    const { id } = community;
    sendEvent('moveTimeline-changed', id, moveTimeline.toString());
  };

  handleCareTypeChange = (e, newCareTypes) => {
    const { community, sendEvent } = this.props;
    const { id } = community;
    this.careTypes = newCareTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('careType-changed', id, newCareTypes.toString());
  };

  handleBudgetChange = (e, budget) => {
    const { community, sendEvent } = this.props;
    const { id } = community;
    this.budget = budget;
    sendEvent('budget-selected', id, budget.toString());
  };

  // This function is called after the step is changed
  handleStepChange = ({
    currentStep, data, goto, doSubmit,
  }) => {
    const { community, userHas, submitActionAndCreateUser, updateUuidAux, match, sendEvent, uuidAux } = this.props;
    const { id } = community;
    const { interest, medicaidCoverage } = data;

    sendEvent('step-completed', id, currentStep);

    if (currentStep === 'EstimatedPricing') {
      // return promise so that wizard will wait till api call is complete
      return updateUuidAux(data).then(() => {
        if (userHas(['name', 'phoneNumber'])) {
          return submitActionAndCreateUser(data).then(() => {
            if (medicaidCoverage === 'yes' || medicaidCoverage === 'not-sure' ||
              (uuidAux && uuidAux.uuidInfo && uuidAux.uuidInfo.financialInfo && uuidAux.uuidInfo.financialInfo.medicaid === false)) {
              // it's important to check for false value as even if key is missing or it's null, undefined condition will become true
              if (!getIsCCRC(community)) {
                return goto('PostConversionGreeting');
              }
              return goto('MedicaidWarning');
            }
            if (!getIsCCRC(community)) {
              return goto('PostConversionGreeting');
            }
            return goto('CCRCWarning');
          });
        }

        if (medicaidCoverage === 'yes' || medicaidCoverage === 'not-sure' ||
          (uuidAux && uuidAux.uuidInfo && uuidAux.uuidInfo.financialInfo && uuidAux.uuidInfo.financialInfo.medicaid === false)) {
          // it's important to check for false value as even if key is missing or it's null, undefined condition will become true
          return goto('MedicaidWarning');
        }
        return goto('Contact');
      });
    }

    if (currentStep === 'Contact') {
      return submitActionAndCreateUser(data, currentStep).then(() => {
        if (!getIsCCRC(community)) {
          goto('PostConversionGreeting');
        }
      });
    }

    if (currentStep === 'WhatToDoNext' && interest === 'talk-advisor') {
      return doSubmit({ redirectLink: `${match.url}/thank-you` }).then(() => goto(null));
    }

    return updateUuidAux(data);
  };

  handleComplete = (data, { redirectLink }) => {
    const { redirectTo, community, updateUuidAux, sendEvent } = this.props;

    sendEvent('pricing-requested', community.id);

    return updateUuidAux(data).then(() => redirectLink && redirectTo(redirectLink));
  };

  handleCompletePostConversion = (data, { interest, redirectLink }) => {
    const { redirectTo, community, updateUuidAux, sendEvent } = this.props;

    if (interest) {
      sendEvent('pricing-referal-rejected', community.id);
      data = {
        ...data,
        interest,
      };
    }
    // here the user can patch interest to do-not-refer
    return updateUuidAux(data).then(() => redirectLink && redirectTo(redirectLink));
  };

  calculatePrice = (roomTypes, careTypes) => {
    const { community } = this.props;
    const { startingRate } = community;
    const roomTypeWeights = [];

    roomTypes.forEach((roomType) => {
      const roomTypeAddlCost = EST_ADDL_COST_ACCOMODATION[roomType];
      if (roomTypeAddlCost) {
        roomTypeWeights.push(roomTypeAddlCost);
      }
    });

    let addlCareCost = 0;
    careTypes.forEach((careType) => {
      const careTypeAddlCost = EST_ADDL_COST_CARE_SERVICE[careType];
      if (careTypeAddlCost) {
        addlCareCost += careTypeAddlCost;
      }
    });

    const maxWa = roomTypeWeights.length ? Math.max(...roomTypeWeights) : 0;

    const estimatedPrice = startingRate + maxWa + addlCareCost;
    this.setState({
      estimatedPrice,
    });
  };

  handleHelpHover = (type) => {
    const { sendEvent } = this.props;
    sendEvent('help-tooltip-hover', type);
  };

  render() {
    const {
      community, user, uuidAux, userHas, match, redirectTo, type, sendEvent, agent, hasNoAgent,
    } = this.props;

    if (!community) {
      return <Redirect to="/" />;
    }

    const { id, mainImage, name, propInfo = {} } = community;
    const { websiteUrl = 'https://www.seniorly.com/resources/articles/understanding-continuing-care-retirement-communities' } = propInfo;
    const { estimatedPrice } = this.state;
    // const compiledWhatToDoNextOptions = [...WHAT_TO_NEXT_OPTIONS];
    // const scheduleTourOption = compiledWhatToDoNextOptions.find(o => o.value === 'schedule-tour');
    // scheduleTourOption.to = `/book-a-tour/${id}`;

    const openHelpModal = () => redirectTo(`${match.url}/help`);

    return (
      <FullScreenWizard>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>

        <Header />

        <Column backgroundImage={mainImage}>
          <StyledCommunityInfo inverted community={community} headerIsLink />
        </Column>

        <WizardController
          formName="PricingWizardForm"
          onComplete={this.handleComplete}
          onStepChange={this.handleStepChange}
        >
          {({
              data, onSubmit, isFinalStep, submitEnabled, next, currentStep, goto, ...props
          }) => {
            let formHeading = `Thank you! Our Local Senior Living Expert will be contacting you shortly with ${type}. What is the best way to reach you?`;
            let formSubheading = null;
            if (data.interest) {
              const contactFormHeadingObj = contactFormHeadingMap[data.interest];
              formHeading = contactFormHeadingObj.heading;
              formSubheading = contactFormHeadingObj.subheading;
            }

            return (
              <>
                <Body>
                  <WizardSteps {...props}>
                    <WizardStep
                      component={CommunityPWEstimatedPricingFormContainer}
                      name="EstimatedPricing"
                      communityName={name}
                      onRoomTypeChange={this.handleRoomTypeChange}
                      onMoveTimelineChange={this.handleMoveTimelineChange}
                      onCareTypeChange={this.handleCareTypeChange}
                      onHelpHover={this.handleHelpHover}
                      uuidAux={uuidAux}
                      type={type}
                    />
                    <WizardStep
                      component={ConversionWizardInfoStep}
                      name="MedicaidWarning"
                      heading="Let's double check your Medicaid qualification."
                      description="To qualify for Medicaid you must have:"
                      buttons={[
                        {
                          text: 'I qualify for Medicaid',
                          props: {
                            href: 'https://www.communityresourcefinder.org/',
                            target: '_blank',
                            onClick: () => sendEvent('pricing-medicaid-warning', id, 'i-qualify'),
                          },
                        },
                        {
                          text: 'I do NOT qualify for Medicaid',
                          props: {
                            onClick: () => {
                              sendEvent('pricing-medicaid-warning', id, 'i-do-not-qualify');
                              if (userHas(['name', 'phoneNumber'])) {
                                if (!getIsCCRC(community)) {
                                  return goto('PostConversionGreeting');
                                }
                                return goto('CCRCWarning');
                              }
                              return next();
                            },
                          },
                        },
                      ]}
                      points={['Asset limit in most states $1,600 to $15,750', 'Income limit is typically less than $2,360/month']}
                    />
                    <WizardStep
                      component={CommunityBookATourContactFormContainer}
                      name="Contact"
                      onAdvisorHelpClick={openHelpModal}
                      user={user}
                      community={community}
                      heading={formHeading}
                      subheading={formSubheading}
                    />
                    <WizardStep
                      component={ConversionWizardInfoStep}
                      name="CCRCWarning"
                      heading="This is a Continuing Care Retirement Community (CCRC)"
                      description="The buying process for CCRCs is different from Assisted Living or Independent Living."
                      buttons={[
                        {
                          text: 'I understand and want more info on this CCRC',
                          props: {
                            href: websiteUrl,
                            target: '_blank',
                            onClick: () => sendEvent('ccrc-warning', id, 'i-want-info'),
                          },
                        },
                        {
                          text: "I'd like to talk to a Local Expert about different options",
                          props: {
                            onClick: () => {
                              sendEvent('ccrc-warning', id, 'talk-to-local-expert');
                              next();
                            },
                          },
                        },
                      ]}
                      points={['A CCRC is a community with multiple levels of care', 'Often they have $100,000+ entrance fees']}
                    />
                    <WizardStep
                      component={MatchedAgentContainer}
                      name="PostConversionGreeting"
                      community={community}
                      agent={agent}
                      hasNoAgent={hasNoAgent}
                      onSubmit={onSubmit}
                    />
                  </WizardSteps>
                </Body>
                {currentStep && !stepsWithoutControls.includes(currentStep) &&
                  <Controls>
                    <PricingFormFooter
                      price={estimatedPrice}
                      onProgressClick={onSubmit}
                      isFinalStep={userHas(['phoneNumber', 'name']) || isFinalStep}
                      isButtonDisabled={!submitEnabled}
                    />
                  </Controls>
                }
              </>
            );
          }}
        </WizardController>

        <Route path={`${match.url}/thank-you`}>
          {routeProps => (
            <Modal isOpen={!!routeProps.match} onClose={() => redirectTo(community.url)} closeable>
              <CommunityWizardAcknowledgementContainer
                heading="Thank you! Our team will be calling you from (855) 855-2629."
                subheading="We received your request and your Seniorly Partner Agent will work with you to get your exact pricing and availability."
                similarCommunities={community.similarProperties}
                buttonTo={FAMILY_DASHBOARD_FAVORITES_PATH}
                type="pricingWizard"
              />
            </Modal>
          )}
        </Route>

        <Route path={`${match.url}/help`}>
          {routeProps => (
            <Modal isOpen={!!routeProps.match} onClose={() => redirectTo(match.url)} closeable>
              <AdvisorHelpPopup onButtonClick={() => redirectTo(match.url)} />
            </Modal>
          )}
        </Route>
      </FullScreenWizard>
    );
  }
}
