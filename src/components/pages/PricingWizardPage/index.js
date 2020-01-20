import React, { Component } from 'react';
import styled from 'styled-components';
import { object, func } from 'prop-types';
import Helmet from 'react-helmet';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import CommunityBookATourContactFormContainer from 'sly/containers/CommunityBookATourContactFormContainer';
import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import SlyEvent from 'sly/services/helpers/events';
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
  WHAT_TO_NEXT_OPTIONS,
  EXPLORE_AFFORDABLE_PRICING_OPTIONS,
} from 'sly/constants/pricingForm';
import { ABORT_WIZARD } from 'sly/constants/wizard';
import { hasCCRC, hasSNF } from 'sly/services/helpers/community';
import { FAMILY_DASHBOARD_FAVORITES_PATH } from 'sly/constants/dashboardAppPaths';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityPWEstimatedPricingFormContainer from 'sly/containers/CommunityPWEstimatedPricingFormContainer';
import CommunityPricingWizardWhatToDoNextFormContainer from 'sly/containers/CommunityPricingWizardWhatToDoNextFormContainer';
import CommunityPricingWizardLandingContainer from 'sly/containers/CommunityPricingWizardLandingContainer';
import CommunityWizardAcknowledgementContainer from 'sly/containers/CommunityWizardAcknowledgementContainer';
import CommunityPricingWizardExploreAffordableOptionsFormContainer
  from 'sly/containers/CommunityPricingWizardExploreAffordableOptionsFormContainer';
import Modal from 'sly/components/molecules/Modal';

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

const eventCategory = 'PricingWizard';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});

const contactFormHeadingMap = {
  'schedule-tour': { heading: 'Schedule a Tour', subheading: 'We will help you schedule tours and, if you request, we can provide a Partner Agent to accompany you. This is a free service. ' },
  'talk-advisor': { heading: 'Talk to an Advisor', subheading: 'Call us at (855) 866-4515 to talk to us. We offer complete support with an Partner Agent near you.  This is a no-obligation free service. ' },
  'learn-similar-communities': { heading: 'Learn about Similar Communities', subheading: 'We help you evaluate communities, so you can pick the best one. This is a free service. ' },
  'explore-affordable-options': { heading: 'No Problem! We have options in your budget.', subheading: 'Many of our partner agents specialize in options that are hard to find online and are in your price range. How can we reach you? ' },
  'apply-financing': { heading: 'We Are Here to Help You', subheading: 'We have helped thousands of families to learn about and choose a community they love. This is a free service. ' },
};

const stepsWithoutControls = ['Landing', 'WhatToDoNext', 'ExploreAffordableOptions'];

export default class PricingWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userHas: func,
    uuidAux: object,
    userActionSubmit: func,
    redirectTo: func,
    match: object,
    submitActionAndCreateUser: func,
    updateUuidAux: func,
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
    const { community } = this.props;
    const { id } = community;
    this.roomTypes = newRoomTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('roomType-changed', id, newRoomTypes.toString());
  };
  handleMoveTimelineChange = (e, moveTimeline) => {
    const { community } = this.props;
    const { id } = community;
    sendEvent('moveTimeline-changed', id, moveTimeline.toString());
  };

  handleCareTypeChange = (e, newCareTypes) => {
    const { community } = this.props;
    const { id } = community;
    this.careTypes = newCareTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('careType-changed', id, newCareTypes.toString());
  };

  handleBudgetChange = (e, budget) => {
    const { community } = this.props;
    const { id } = community;
    this.budget = budget;
    sendEvent('budget-selected', id, budget.toString());
  };

  // This function is called after the step is changed
  handleStepChange = ({
    currentStep, data, goto, doSubmit,
  }) => {
    const { community, userHas, submitActionAndCreateUser, updateUuidAux, match } = this.props;
    const { id } = community;
    const { interest } = data;

    sendEvent('step-completed', id, currentStep);

    if (currentStep === 'EstimatedPricing') {
      // return promise so that wizard will wait till api call is complete
      return updateUuidAux(data).then(() => {
        if (userHas(['name', 'phoneNumber'])) {
          return submitActionAndCreateUser(data).then(() => goto('WhatToDoNext'));
        }
        return null;
      });
    }

    if (currentStep === 'Contact') {
      return submitActionAndCreateUser(data, currentStep);
    }

    if (currentStep === 'WhatToDoNext' && interest === 'talk-advisor') {
      return doSubmit({ redirectLink: `${match.url}/thank-you` }).then(() => goto(null));
    }

    return updateUuidAux(data);
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

  handleComplete = (data, { redirectLink }) => {
    const { redirectTo, community, updateUuidAux } = this.props;

    sendEvent('pricing-requested', community.id);

    return updateUuidAux(data).then(() => redirectTo(redirectLink));
  };

  handleHelpHover = (type) => {
    sendEvent('help-tooltip-hover', type);
  }

  render() {
    const {
      community, user, uuidAux, userHas, match, redirectTo,
    } = this.props;

    if (!community) {
      return <Redirect to="/" />;
    }

    const { id, mainImage, name } = community;
    const { estimatedPrice } = this.state;
    const compiledWhatToDoNextOptions = [...WHAT_TO_NEXT_OPTIONS];
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
            data, onSubmit, isFinalStep, submitEnabled, next, currentStep, ...props
          }) => {
            let formHeading = 'See your estimated pricing in your next step. We need your information to connect you to our partner agent.';
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
                      component={CommunityPricingWizardWhatToDoNextFormContainer}
                      name="WhatToDoNext"
                      communityName={name}
                      estimatedPrice={estimatedPrice}
                      showEstimatePrice={!hasCCRC(community) && !hasSNF(community)}
                      listOptions={compiledWhatToDoNextOptions}
                      onInterestChange={(e, interest) => sendEvent('pricing-next-interest', id, interest)}
                      onSubmit={onSubmit}
                    />
                    <WizardStep
                      component={CommunityPricingWizardExploreAffordableOptionsFormContainer}
                      name="ExploreAffordableOptions"
                      listOptions={EXPLORE_AFFORDABLE_PRICING_OPTIONS}
                      onBudgetChange={this.handleBudgetChange}
                      onSubmit={onSubmit}
                    />
                    <WizardStep
                      component={CommunityPricingWizardLandingContainer}
                      name="Landing"
                      buttonText="View Dashboard"
                      onBeginClick={onSubmit}
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
