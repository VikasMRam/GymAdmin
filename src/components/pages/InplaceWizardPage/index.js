import React, { Component, Fragment } from 'react';

import { object, func, bool } from 'prop-types';

import CommunityBookATourContactFormContainer from 'sly/containers/CommunityBookATourContactFormContainer';
import { community as communityPropType } from 'sly/propTypes/community';

import { getCitySearchUrl } from 'sly/services/helpers/url';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import SlyEvent from 'sly/services/helpers/events';
import { Experiment, Variant } from 'sly/services/experiments';

import {
  makeBody,
  makeControls,
} from 'sly/components/templates/FullScreenWizard';


import PricingFormFooter from 'sly/components/molecules/PricingFormFooter';
import AdvisorHelpPopup from 'sly/components/molecules/AdvisorHelpPopup';
import CommunityBookATourConfirmationPopup from 'sly/components/organisms/CommunityBookATourConfirmationPopup';
import GenericStepContainer from 'sly/containers/GenericStepContainer';
import GenericWizardInfoStep from 'sly/components/organisms/GenericWizardInfoStep';


const Body = makeBody('div');
const Controls = makeControls('div');


const eventCategory = 'InpageWizard';
const sendEvent = (action, label, value) => SlyEvent.getInstance().sendEvent({
  category: eventCategory,
  action,
  label,
  value,
});


const stepsWithoutControls = [1, 2, 4];

class InplaceWizardPage extends Component {
  static propTypes = {
    community: communityPropType,
    user: object,
    userAction: object,
    onComplete: func,
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
                        currentStep, data, goto, doSubmit, openConfirmationModal,
                      }) => {
    const { community, userActionSubmit, userAction } = this.props;
    const { id } = community;
    const { interest } = data;
    const { userDetails } = userAction;
    sendEvent('step-completed', id, currentStep);
    userActionSubmit(data);
    if (currentStep === 3) {
      if (interest === 'talk-advisor') {
        doSubmit(openConfirmationModal);
      } else if (interest !== 'explore-affordable-options') {
        goto(4);
      }
    }
    if (currentStep === 1 && userDetails && userDetails.phone && userDetails.fullName) {
      goto(3);
    }
  };


  openAdvisorHelp = () => {
    const { showModal, hideModal } = this.props;
    showModal(<AdvisorHelpPopup onButtonClick={hideModal} />);
  };

  openConfirmationModal = () => {
    const {
      showModal, hideModal, community,
    } = this.props;
    const { similarProperties, propInfo, address } = community;
    const heading = 'Thank you! Our team will be calling you from (855) 855-2629.';
    const subheading = 'Our partner agent will reach out via phone or email within the next day';
    const props = {
      similarCommunities: similarProperties,
      similarCommunititesHref: getCitySearchUrl({ propInfo, address }),
      onTileClick: hideModal,
      heading,
      subheading,
    };

    showModal(<CommunityBookATourConfirmationPopup {...props} />);
  };

  render() {
    const {
      handleStepChange, openAdvisorHelp, openConfirmationModal,
    } = this;

    const {
      community, user, onComplete, userAction,
    } = this.props;

    const { userDetails } = userAction;

    const { id, name } = community;
    const { estimatedPrice, communityPhone } = this.state;


    return (
        <WizardController
          formName="CommunityInpageWizardForm"
          onComplete={data => onComplete(data, openConfirmationModal)}
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
              title: 'What isn\'t working currently?',
              buttons: [
                { onClick: () => { sendEvent('wizard-select-care', 'time'); goto(5); }, text: 'I don\'t have enough time to provide care' },
                { onClick: () => { sendEvent('wizard-select-care', 'cost'); goto(5); }, text: 'Cost is becoming too high' },
                { onClick: () => { sendEvent('wizard-select-care', 'distance'); goto(5); }, text: 'I want to move closer to friends and family' },
                { onClick: () => { sendEvent('wizard-select-care', 'out-home'); goto(5); }, text: 'Care needs aren\'t being met at home' }
              ],
            };
            const resourcesStepData = {
              title: 'What did you want to learn more about?',
              caption: 'Tell us what you are interested in.',
              buttons: [
                { onClick: () => { sendEvent('wizard-select', 'care'); }, text: 'Senior housing types', to: '/resources/tags/housing', target: '_blank' },
                { onClick: () => { sendEvent('wizard-select', 'research'); }, text: 'Types of care', to: '/resources/', target: '_blank' },
                { onClick: () => { sendEvent('wizard-select', 'contact-resident'); }, text: 'Financial planning', to: '/resources/articles/veterans-benefits-for-assisted-living', target: '_blank' },
                { onClick: () => { sendEvent('wizard-select', 'other'); }, text: 'Veterans\' benefits', to: '/resources/', target: '_blank' },
              ],
              canStartOver:true,
              gotoStart: () => {sendEvent('wizard-select-care', 'time'); goto(1);}
            };
            const commPhoneStepData = {
              title: 'Great, we can help you with that!',
              caption: `Please contact ${name} directly at:`,
              bodyText: `${communityPhone}`,
              canStartOver:true,
              gotoStart: () => {sendEvent('wizard-select-care', 'time'); goto(1);}

            };

            const confirmationStepData = {
              title: 'Thank you!',
              bodyText: `You will be hearing from our partner agent within the next day.`,
              canStartOver:true,
              gotoStart: () => {sendEvent('wizard-select-care', 'time'); goto(1);}

            };

            const contactFormHeading = 'One of our partner agents is ready to help you';
            const subHeading = 'What is the best way to reach you?';


            return (
              <Fragment>
                <Body>
                  <WizardSteps currentStep={currentStep} {...props}>
                    <Experiment name="InplaceWizard_Step1" defaultVariant="wizard">
                      <Variant name="Step1A">
                        <WizardStep
                          component={GenericStepContainer}
                          name="Contact"
                          onAdvisorHelpClick={openAdvisorHelp}
                          user={user}
                          goto={goto}
                          userDetails={userDetails}
                          formData={step1DataA}
                        />
                      </Variant>
                      <Variant name="Step1B">
                        <WizardStep
                          component={GenericStepContainer}
                          name="Contact"
                          onAdvisorHelpClick={openAdvisorHelp}
                          user={user}
                          goto={goto}
                          userDetails={userDetails}
                          formData={step1DataB}
                        />
                      </Variant>
                    </Experiment>
                    <WizardStep
                      component={GenericStepContainer}
                      name="Care-Step 2"
                      onAdvisorHelpClick={openAdvisorHelp}
                      user={user}
                      userDetails={userDetails}
                      formData={careStepData}
                    />
                    <WizardStep
                      component={GenericStepContainer}
                      name="Resources-Step 3"
                      onAdvisorHelpClick={openAdvisorHelp}
                      user={user}
                      userDetails={userDetails}
                      formData={resourcesStepData}
                    />
                    <WizardStep
                      component={GenericWizardInfoStep}
                      name="Phone Confirmation- Step 4"
                      onAdvisorHelpClick={openAdvisorHelp}
                      user={user}
                      userDetails={userDetails}
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
                    />
                    <WizardStep
                      component={GenericWizardInfoStep}
                      name="Confirmation- Step 6"
                      onAdvisorHelpClick={openAdvisorHelp}
                      user={user}
                      userDetails={userDetails}
                      formData={confirmationStepData}
                    />
                  </WizardSteps>
                </Body>
                <Controls>
                  {currentStep == 5 &&
                  <PricingFormFooter
                    price={estimatedPrice}
                    onProgressClick={onSubmit}
                    isFinalStep={!!(userDetails && userDetails.phone && userDetails.fullName) || isFinalStep}
                    isButtonDisabled={!submitEnabled}
                  />
                  }
                </Controls>
              </Fragment>
            );
          }}
        </WizardController>
    );
  }
}

export default InplaceWizardPage;
