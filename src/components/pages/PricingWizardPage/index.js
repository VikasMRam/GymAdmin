import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import Helmet from 'react-helmet';

import CommunityBookATourContactFormContainer from 'sly/containers/CommunityBookATourContactFormContainer';
import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { getCitySearchWithSizeUrl } from 'sly/services/helpers/url';
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
import FullScreenWizardController from 'sly/controllers/FullScreenWizardController';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';
import Modal from 'sly/components/molecules/Modal';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityPWEstimatedPricingFormContainer from 'sly/containers/CommunityPWEstimatedPricingFormContainer';
import CommunityPricingWizardWhatToDoNextFormContainer from 'sly/containers/CommunityPricingWizardWhatToDoNextFormContainer';
import CommunityPricingWizardExploreAffordableOptionsFormContainer
  from 'sly/containers/CommunityPricingWizardExploreAffordableOptionsFormContainer';

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
const Body = makeBody(styled.div``);
const Controls = makeControls(styled.div``);

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
  'schedule-tour': { heading: 'Schedule a Tour', subheading: 'We will help you schedule tours and, if you request, we can provide a local Advisor to accompany you. This is a free service. ' },
  'talk-advisor': { heading: 'Talk to an Advisor', subheading: 'Call us at (855) 866-4515 to talk to us. We offer complete support with an Partner Agent near you.  This is a no-obligation free service. ' },
  'learn-similar-communities': { heading: 'Learn about Similar Communities', subheading: 'We help you evaluate communities, so you can pick the best one. This is a free service. ' },
  'explore-affordable-options': { heading: 'Learn about Affordable Communities', subheading: 'We help you choose from more affordable options, so you can pick the best one. This is a free service. ' },
  'apply-financing': { heading: 'We Are Here to Help You', subheading: 'We have helped thousands of families to learn about and choose a community they love. This is a free service. ' },
};

const stepsWithoutControls = [2, 3];

class PricingWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userDetails: object,
    onComplete: func,
    isAdvisorHelpVisible: bool,
    onAdvisorHelpClick: func,
    history: object,
  };

  constructor(props) {
    super(props);

    const { community } = props;
    const { startingRate } = community;
    this.state = { estimatedPrice: startingRate };
  }

  handleRoomTypeChange = (e, newRoomTypes) => {
    const { community } = this.props;
    const { id } = community;
    this.roomTypes = newRoomTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('roomType-changed', id, newRoomTypes.toString());
  };

  handleCareTypeChange = (e, newCareTypes) => {
    const { community } = this.props;
    const { id } = community;
    this.careTypes = newCareTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('careType-changed', id, newCareTypes.toString());
  };

  handleStepChange = ({ currentStep, data, goto }) => {
    const { community } = this.props;
    const { id } = community;
    const { interest } = data;

    sendEvent('step-completed', id, currentStep);
    if (currentStep === 2 && interest !== 'explore-affordable-options') {
      goto(4);
    }
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

  render() {
    const {
      handleRoomTypeChange, handleCareTypeChange, handleStepChange,
    } = this;
    const {
      community, user, onComplete, userDetails,
    } = this.props;
    const { id, mainImage, name } = community;
    const { estimatedPrice } = this.state;
    const compiledWhatToDoNextOptions = [...WHAT_TO_NEXT_OPTIONS];
    const scheduleTourOption = compiledWhatToDoNextOptions.find(o => o.value === 'schedule-tour');
    scheduleTourOption.to = `/book-a-tour/${id}`;
    const similarCommunitiesOption = compiledWhatToDoNextOptions.find(o => o.value === 'learn-similar-communities');
    similarCommunitiesOption.to = getCitySearchWithSizeUrl(community);

    return (
      <FullScreenWizard>
        <Helmet>
          <meta name="robots" content="noindex" />
        </Helmet>
        <Header />
        <Column backgroundImage={mainImage}>
          <StyledCommunityInfo palette="white" community={community} />
        </Column>
        <FullScreenWizardController>
          {({
            isAdvisorHelpVisible, toggleAdvisorHelp, toggleConfirmationModal,
          }) => (
            <Fragment>
              <Modal closeable isOpen={isAdvisorHelpVisible} onClose={toggleAdvisorHelp}>
                <AdvisorHelpPopup onButtonClick={toggleAdvisorHelp} />
              </Modal>
              <WizardController
                formName="PricingWizardForm"
                onComplete={data => onComplete(data, toggleConfirmationModal)}
                onStepChange={handleStepChange}
              >
                {({
                  data, onSubmit, isFinalStep, submitEnabled, next, currentStep, ...props
                }) => {
                  let formHeading = null;
                  let formSubheading = null;
                  if (data.interest) {
                    const contactFormHeadingObj = contactFormHeadingMap[data.interest];
                    formHeading = contactFormHeadingObj.heading;
                    formSubheading = contactFormHeadingObj.subheading;
                  }
                  return (
                    <Fragment>
                      <Body>
                        <WizardSteps currentStep={currentStep} {...props}>
                          <WizardStep
                            component={CommunityPWEstimatedPricingFormContainer}
                            name="EstimatedPricing"
                            communityName={name}
                            onRoomTypeChange={handleRoomTypeChange}
                            onCareTypeChange={handleCareTypeChange}
                            userDetails={userDetails}
                          />
                          <WizardStep
                            component={CommunityPricingWizardWhatToDoNextFormContainer}
                            name="WhatToDoNext"
                            communityName={name}
                            estimatedPrice={estimatedPrice}
                            listOptions={compiledWhatToDoNextOptions}
                            onInterestChange={(e, interest) => sendEvent('pricing-next-interest', id, interest)}
                            onSubmit={onSubmit}
                          />
                          <WizardStep
                            component={CommunityPricingWizardExploreAffordableOptionsFormContainer}
                            name="ExploreAffordableOptions"
                            listOptions={EXPLORE_AFFORDABLE_PRICING_OPTIONS}
                            onBudgetChange={(e, budget) => sendEvent('budget-selected', id, budget)}
                            onSubmit={onSubmit}
                          />
                          <WizardStep
                            component={CommunityBookATourContactFormContainer}
                            name="Contact"
                            onAdvisorHelpClick={toggleAdvisorHelp}
                            user={user}
                            userDetails={userDetails}
                            heading={formHeading}
                            subheading={formSubheading}
                          />
                        </WizardSteps>
                      </Body>
                      <Controls>
                        {!stepsWithoutControls.includes(currentStep) &&
                          <PricingFormFooter
                            price={estimatedPrice}
                            onProgressClick={onSubmit}
                            isFinalStep={isFinalStep}
                            isButtonDisabled={!submitEnabled}
                          />
                        }
                      </Controls>
                    </Fragment>
                    );
                  }}
              </WizardController>
            </Fragment>
          )}
        </FullScreenWizardController>
      </FullScreenWizard>
    );
  }
}

export default PricingWizardPage;
