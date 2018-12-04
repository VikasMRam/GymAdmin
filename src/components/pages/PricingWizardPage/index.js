import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import Helmet from 'react-helmet';

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
import { EST_ADDL_COST_ACCOMODATION, EST_ADDL_COST_CARE_SERVICE } from 'sly/constants/pricingForm';
import FullScreenWizardController from 'sly/controllers/FullScreenWizardController';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';
import Modal from 'sly/components/molecules/Modal';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityPWEstimatedPricingFormContainer from 'sly/containers/CommunityPWEstimatedPricingFormContainer';

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

class PricingWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userDetails: object,
    onComplete: func,
    isAdvisorHelpVisible: bool,
    onAdvisorHelpClick: func,
  };

  constructor(props) {
    super(props);

    const { community } = props;
    const { startingRate } = community;
    this.state = { estimatedPrice: startingRate };
  }

  onRoomTypeChange = (e, newRoomTypes) => {
    const { community } = this.props;
    const { id } = community;
    this.roomTypes = newRoomTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('roomType-changed', id, newRoomTypes.toString());
  };

  onCareTypeChange = (e, newCareTypes) => {
    const { community } = this.props;
    const { id } = community;
    this.careTypes = newCareTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
    sendEvent('careType-changed', id, newCareTypes.toString());
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
    const { onRoomTypeChange, onCareTypeChange } = this;
    const {
      community, user, onComplete, userDetails,
    } = this.props;
    const { id, mainImage, name } = community;
    const { estimatedPrice } = this.state;
    const formHeading = 'How can we contact you about your pricing?';
    const formSubheading = 'Your agent will help get your exact pricing according to your care needs and room accommodations.';

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
                formName="PWizardForm"
                onComplete={data => onComplete(data, toggleConfirmationModal)}
                onStepChange={step => sendEvent('step-completed', id, step - 1)}
              >
                {({
                  data, onSubmit, isFinalStep, submitEnabled, ...props
                }) => (
                  <Fragment>
                    <Body>
                      <WizardSteps {...props}>
                        <WizardStep
                          component={CommunityPWEstimatedPricingFormContainer}
                          name="EstimatedPricing"
                          communityName={name}
                          onRoomTypeChange={onRoomTypeChange}
                          onCareTypeChange={onCareTypeChange}
                          userDetails={userDetails}
                        />
                        <WizardStep
                          component={CommunityBookATourContactFormContainer}
                          name="Contact"
                          onAdvisorHelpClick={toggleAdvisorHelp}
                          user={user}
                          userDetails={userDetails}
                          form="PWizardForm"
                          heading={formHeading}
                          subheading={formSubheading}
                        />
                      </WizardSteps>
                    </Body>
                    <Controls>
                      <PricingFormFooter
                        price={estimatedPrice}
                        onProgressClick={onSubmit}
                        isFinalStep={isFinalStep}
                        isButtonDisabled={!submitEnabled}
                      />
                    </Controls>
                  </Fragment>
                )}
              </WizardController>
            </Fragment>
          )}
        </FullScreenWizardController>
      </FullScreenWizard>
    );
  }
}

export default PricingWizardPage;
