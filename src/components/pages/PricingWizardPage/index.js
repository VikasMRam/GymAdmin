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

const stepsWithoutControls = [3, 4];

class PricingWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userDetails: object,
    onComplete: func,
    userActionSubmit: func,
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


  handleStepChange = ({
    currentStep, data, goto, doSubmit, toggleConfirmationModal,
  }) => {
    const { community, userActionSubmit, userDetails } = this.props;
    const { id } = community;
    const { interest } = data;

    sendEvent('step-completed', id, currentStep);

    if (currentStep === 3) {
      if (interest === 'talk-advisor') {
        doSubmit(toggleConfirmationModal);
      } else if (interest !== 'explore-affordable-options') {
        goto(4);
      }
    }
    if (currentStep === 2) {
      userActionSubmit(data);
    }
    if (currentStep === 1 && userDetails.phone && userDetails.fullName) {
      goto(3);
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
    // const scheduleTourOption = compiledWhatToDoNextOptions.find(o => o.value === 'schedule-tour');
    // scheduleTourOption.to = `/book-a-tour/${id}`;

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
                onStepChange={params => handleStepChange({ ...params, toggleConfirmationModal })}
              >
                {({
                  data, onSubmit, isFinalStep, submitEnabled, next, currentStep, ...props
                }) => {
                  let formHeading = 'See your estimated pricing in your next step. We need your information to connect you to our partner agent. We do not share your information with anyone else.';
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
                            component={CommunityBookATourContactFormContainer}
                            name="Contact"
                            onAdvisorHelpClick={toggleAdvisorHelp}
                            user={user}
                            userDetails={userDetails}
                            heading={formHeading}
                            subheading={formSubheading}
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
                        </WizardSteps>
                      </Body>
                      <Controls>
                        {!stepsWithoutControls.includes(currentStep) &&
                          <PricingFormFooter
                            price={estimatedPrice}
                            onProgressClick={onSubmit}
                            isFinalStep={!!(userDetails.phone && userDetails.fullName) || isFinalStep}
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
