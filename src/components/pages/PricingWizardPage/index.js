import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import Helmet from 'react-helmet';

import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import {
  FullScreenWizard,
  makeBody,
  makeColumn,
  makeControls,
  makeHeader,
} from 'sly/components/templates/FullScreenWizard';
import { WEIGHT_ACCOMODATION, WEIGHT_CARE_SERVICE } from 'sly/constants/pricingForm';
import FullScreenWizardController from 'sly/controllers/FullScreenWizardController';
import HeaderContainer from 'sly/containers/HeaderContainer';
import CommunityInfo from 'sly/components/molecules/CommunityInfo';
import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';
import Modal from 'sly/components/molecules/Modal';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityPWEstimatedPricingFormContainer from 'sly/containers/CommunityPWEstimatedPricingFormContainer';
import CommunitySATContactFormContainer from 'sly/containers/CommunitySATContactFormContainer';

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

class PricingWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    onStepChange: func,
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
    this.roomTypes = newRoomTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
  };

  onCareTypeChange = (e, newCareTypes) => {
    this.careTypes = newCareTypes;
    const { roomTypes = [], careTypes = [] } = this;
    this.calculatePrice(roomTypes, careTypes);
  };

  calculatePrice = (roomTypes, careTypes) => {
    const { community } = this.props;
    const { startingRate } = community;
    const roomTypeWeights = [];
    const careTypeWeights = [];

    roomTypes.forEach((roomType) => {
      const roomTypeWeight = WEIGHT_ACCOMODATION[roomType];
      if (roomTypeWeight) {
        roomTypeWeights.push(roomTypeWeight);
      }
    });
    careTypes.forEach((careType) => {
      const careTypeWeight = WEIGHT_CARE_SERVICE[careType];
      if (careTypeWeight) {
        careTypeWeights.push(careTypeWeight);
      }
    });

    const maxWa = roomTypeWeights.length ? Math.max(...roomTypeWeights) / 100 : 0;
    const maxWc = careTypeWeights.length ? Math.max(...careTypeWeights) / 100 : 0;

    const estimatedPrice = startingRate * (1 + maxWa) * (1 + maxWc);
    this.setState({
      estimatedPrice,
    });
  };

  render() {
    const { onRoomTypeChange, onCareTypeChange } = this;
    const {
      community, user, onStepChange, onComplete,
    } = this.props;
    const { mainImage } = community;
    const { estimatedPrice } = this.state;
    const formHeading = 'How can we contact you about your pricing?';
    const formSubheading = 'Your advisor will help get your custom pricing according to your care needs and room accomodations.';

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
                onStepChange={onStepChange}
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
                          onRoomTypeChange={onRoomTypeChange}
                          onCareTypeChange={onCareTypeChange}
                        />
                        <WizardStep
                          component={CommunitySATContactFormContainer}
                          name="Contact"
                          onAdvisorHelpClick={toggleAdvisorHelp}
                          user={user}
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
