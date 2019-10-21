import React, { Component } from 'react';
import { object, func, bool } from 'prop-types';
import styled from 'styled-components';

import { size, palette } from 'sly/components/themes/index';
import CommunityBookATourContactFormContainer from 'sly/containers/CommunityBookATourContactFormContainer';
import { community as communityPropType } from 'sly/propTypes/community';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import SlyEvent from 'sly/services/helpers/events';
import { Experiment, Variant } from 'sly/services/experiments';
import {
  makeBody,
  makeControls,
} from 'sly/components/templates/FullScreenWizard';
import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import GenericWizardActionStep from 'sly/components/organisms/GenericWizardActionStep';
import GenericWizardInfoStep from 'sly/components/organisms/GenericWizardInfoStep';


const Body = makeBody('div');
const Controls = makeControls('div');

const StyledBody = styled(Body)`
  border: ${size('border.regular')} solid ${palette('grey', 'stroke')};
  margin-bottom: ${size('spacing.xLarge')};
  
`;

const eventCategory = 'InpageWizard';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});


class InplaceWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userDetails: object,
    userActionSubmit: func,
    isAdvisorHelpVisible: bool,
    onAdvisorHelpClick: func,
    history: object,
    showModal: func,
    hideModal: func,
  };

  constructor(props) {
    super(props);

    const { community } = props;
    const { startingRate, propInfo } = community;
    const { communityPhone } = propInfo;
    this.state = { estimatedPrice: startingRate, communityPhone };
  }

  handleStepChange = ({
    currentStep, data,
  }) => {
    const { community, userActionSubmit } = this.props;
    const { id } = community;
    sendEvent('step-completed', id, currentStep);
    userActionSubmit(data);
  };


  openAdvisorHelp = () => {
    const { showModal, hideModal } = this.props;
    showModal(<AdvisorHelpPopup onButtonClick={hideModal} />);
  };


  render() {
    const {
      handleStepChange, openAdvisorHelp, openConfirmationModal,
    } = this;

    const {
      community, user, userDetails,
    } = this.props;

    const { name } = community;
    const { estimatedPrice, communityPhone } = this.state;

    const phoneDisplay = communityPhone || "Phone Number Can't Be Found";
    return (
      <WizardController
        formName="CommunityInpageWizardForm"
        onStepChange={params => handleStepChange({ ...params, openConfirmationModal })}
      >
        {({
              data, goto, onSubmit, isFinalStep, submitEnabled, next, currentStep, ...props
            }) => {
            const step1DataA = {
              title: 'We\'re here to help you.',
              imagePath: 'images/team-avatars.png',
              caption: 'What brings you to Seniorly?',
              buttons: [
                { onClick: () => { sendEvent('wizard-select', 'care'); goto(2); }, text: 'I want to explore other care solutions' },
                { onClick: () => { sendEvent('wizard-select', 'research'); goto(3); }, text: 'I am researching' },
                { onClick: () => { sendEvent('wizard-select', 'contact-resident'); goto(4); }, text: 'I want to contact a resident' },
                { onClick: () => { sendEvent('wizard-select', 'other'); goto(5); }, text: 'I cannot find what I am looking for' },
                ],
            };
            const step1DataB = {
              title: 'Didn\'t find what you are looking for?',
              caption: 'Tell us what you are interested in.',
              imagePath: 'images/team-avatars.png',

              buttons: [
                { onClick: () => { sendEvent('wizard-select', 'care'); goto(2); }, text: 'I want to explore other care solutions' },
                { onClick: () => { sendEvent('wizard-select', 'research'); goto(3); }, text: 'I am researching' },
                { onClick: () => { sendEvent('wizard-select', 'contact-resident'); goto(4); }, text: 'I want to contact a resident' },
                { onClick: () => { sendEvent('wizard-select', 'other'); goto(5); }, text: 'I cannot find what I am looking for' },
              ],
            };

            const careStepData = {
              imagePath: 'images/team-avatars.png',
              title: 'What isn\'t working currently?',
              caption: 'We can help narrow down your choices.',
              buttons: [
                { onClick: () => { sendEvent('wizard-select-care', 'time'); goto(5); }, text: 'I don\'t have enough time to provide care' },
                { onClick: () => { sendEvent('wizard-select-care', 'cost'); goto(5); }, text: 'Cost is becoming too high' },
                { onClick: () => { sendEvent('wizard-select-care', 'distance'); goto(5); }, text: 'I want to move closer to friends and family' },
                { onClick: () => { sendEvent('wizard-select-care', 'out-home'); goto(5); }, text: 'Care needs aren\'t being met at home' },
              ],
            };

            const resourcesStepData = {
              imagePath: 'images/team-avatars.png',
              title: 'What did you want to learn more about?',
              caption: 'Tell us what you are interested in.',
              buttons: [
                {
 onClick: () => { sendEvent('wizard-select', 'care'); }, text: 'Senior housing types', to: '/resources/tags/housing', target: '_blank',
},
                {
 onClick: () => { sendEvent('wizard-select', 'research'); }, text: 'Types of care', to: '/resources/memory-care', target: '_blank',
},
                {
 onClick: () => { sendEvent('wizard-select', 'contact-resident'); }, text: 'Financial planning', to: '/resources/articles/how-to-manage-the-finances-of-an-aging-parent', target: '_blank',
},
                {
 onClick: () => { sendEvent('wizard-select', 'other'); }, text: 'Veterans\' benefits', to: '/resources/articles/veterans-benefits-for-assisted-living', target: '_blank',
},
              ],
              canStartOver: true,
              gotoStart: () => { sendEvent('wizard-select-care', 'time'); goto(1); },
            };

            const commPhoneStepData = {
              imagePath: 'images/team-avatars.png',
              title: 'Great, we can help you with that!',
              caption: `Please contact ${name} directly at:`,
              bodyText: `${phoneDisplay}`,
              canStartOver: true,
              gotoStart: () => { sendEvent('wizard-select-care', 'time'); goto(1); },

            };

            const confirmationStepData = {
              title: 'Thank you!',
              bodyText: 'You will be hearing from our partner agent within the next day.',
              canStartOver: true,
              gotoStart: () => { sendEvent('wizard-select-care', 'time'); goto(1); },

            };

            const contactFormHeading = 'One of our partner agents is ready to help you';
            let subHeading = '';
            if (userDetails && userDetails.phone) {
               subHeading = 'Tell us how we can best help you.';
            } else {
              subHeading = 'What is the best way to reach you?';
            }

            return (
              <>
                <StyledBody>
                  <WizardSteps currentStep={currentStep} {...props}>
                    <Experiment name="InplaceWizard_Step1" defaultVariant="wizard">
                      <Variant name="Step1A">
                        <WizardStep
                          component={GenericWizardActionStep}
                          name="Contact"
                          user={user}
                          formData={step1DataA}
                        />
                      </Variant>
                      <Variant name="Step1B">
                        <WizardStep
                          component={GenericWizardActionStep}
                          name="Contact"
                          user={user}
                          goto={goto}
                          formData={step1DataB}
                        />
                      </Variant>
                    </Experiment>
                    <WizardStep
                      component={GenericWizardActionStep}
                      name="Care-Step 2"
                      user={user}
                      userDetails={userDetails}
                      formData={careStepData}
                    />
                    <WizardStep
                      component={GenericWizardActionStep}
                      name="Resources-Step 3"
                      user={user}
                      userDetails={userDetails}
                      formData={resourcesStepData}
                    />
                    <WizardStep
                      component={GenericWizardInfoStep}
                      name="Phone Confirmation- Step 4"
                      user={user}
                      formData={commPhoneStepData}
                    />
                    <WizardStep
                      component={CommunityBookATourContactFormContainer}
                      name="Contact-Step 5"
                      onAdvisorHelpClick={openAdvisorHelp}
                      user={user}
                      userDetails={userDetails}
                      heading={contactFormHeading}
                      subheading={subHeading}
                      displayContext="wizard"
                    />
                    <WizardStep
                      component={GenericWizardInfoStep}
                      name="Confirmation- Step 6"
                      user={user}
                      formData={confirmationStepData}
                    />
                  </WizardSteps>
                  <Controls>
                    {currentStep === 5 &&
                    <PricingFormFooter
                      price={estimatedPrice}
                      onProgressClick={onSubmit}
                      isFinalStep={!!(userDetails && userDetails.phone && userDetails.fullName) || isFinalStep}
                      isButtonDisabled={!submitEnabled}
                    />
                    }
                  </Controls>
                </StyledBody>
              </>
            );
          }}
      </WizardController>
    );
  }
}

export default InplaceWizardPage;
