import React, { PureComponent } from 'react';
import { oneOf, func, string, bool } from 'prop-types';

import SlyEvent from 'sly/services/helpers/events';
import { Link } from 'sly/components/atoms';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import { assetPath } from 'sly/components/themes';
import { WizardController, WizardStep, WizardSteps } from 'sly/services/wizard';
import { CONSULTATION_REQUESTED, HOME_CARE_REQUESTED } from 'sly/services/api/constants';
import pad from 'sly/components/helpers/pad';
import textDecoration from 'sly/components/helpers/textDecoration';
import withNotification from 'sly/controllers/withNotification';
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import ImportantCovid19UpdatesStepContainer from 'sly/containers/ImportantCovid19UpdatesStepContainer';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/components/atoms/NewModal';

const PaddedBannerNotification = pad(BannerNotification, 'large');

const DecoratedLink = textDecoration(Link);

@withNotification

export default class BannerNotificationAdContainer extends PureComponent {
  static typeHydrationId = 'BannerNotificationAdContainer';

  static propTypes = {
    type: oneOf(['askAgent', 'getOffer', 'homeCare', 'covid-19', 'covid-19-community']).isRequired,
    notifyInfo: func.isRequired,
    profileId: string,
    noMarginBottom: bool,
  };

  static defaultProps = {
    type: 'homeCare',
  };

  state = {
    isModalOpen: false,
    modalAction: CONSULTATION_REQUESTED,
    modalMessagePrompt: 'What can we help you with?',
    modalHeading: 'Our Local Senior Living Experts can help you with your search.',
  };

  componentDidMount() {
    const { type, profileId } = this.props;
    SlyEvent.getInstance().sendEvent({
      action: 'view',
      category: `BannerNotificationAd-${type}`,
      label: profileId,
      nonInteraction: true,
    });
  }

  handleGetInstantOfferClick = () => {
    const { profileId } = this.props;
    SlyEvent.getInstance().sendEvent({
      action: 'click-get-instant-offer-button',
      category: 'BannerNotificationAd',
      label: profileId,
    });
  };

  handleUseHomecareClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-use-homecare-button',
      category: 'BannerNotificationAd',
    });
    this.setState({
      isModalOpen: true,
      modalMessagePrompt: 'Please give us a little more information on what services you are currently looking for?',
      modalHeading: 'In-home caregivers can serve as a vital support system to keep seniors cared for and safe.',
      modalMessagePlaceholder: 'Type your care needs here',
      modalAction: HOME_CARE_REQUESTED,
    });
  };

  handleCovid19Click = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-covid19-learn-more-button',
      category: 'BannerNotificationAd',
    });
    this.setState({
      isModalOpen: true,
      modalAction: CONSULTATION_REQUESTED,
    });
  };

  handleAdmissionPoliciesContact = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-covid19-admission-policies-button',
      category: 'BannerNotificationAd',
    });
    this.setState({
      modalHeading: 'Our Local Senior Living Expert will contact you as soon as possible with updated admissions policies.',
    });
  };

  handleInhomeCareContact = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-covid19-home-care-button',
      category: 'BannerNotificationAd',
    });
    this.setState({
      modalHeading: 'Our in-home care agency partners will contact you as soon as possible with up to date information.',
    });
  };

  handleCovid19StepChange = ({ data: { typeOfUpdate } }) => {
    if (typeOfUpdate === 'home-care') {
      this.handleInhomeCareContact();
    } else {
      this.handleAdmissionPoliciesContact();
    }
  };

  handleClose = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'close-ask-agent-question-modal',
      category: 'BannerNotificationAd',
    });
    this.setState({
      isModalOpen: false,
    });
  };

  handleComplete = () => {
    const { notifyInfo } = this.props;

    notifyInfo('We have received your request and we will get back to you soon.');
    this.handleClose();
  };

  render() {
    const { type, noMarginBottom } = this.props;
    const {
      isModalOpen,
      modalHeading,
      modalMessagePrompt,
      modalAction,
      modalMessagePlaceholder,
    } = this.state;
    const BannerComponent = noMarginBottom ? BannerNotification : PaddedBannerNotification;

    return (
      <>
        {type === 'getOffer' &&
          <BannerComponent palette="warning" childrenPalette="slate">
            <Link onClick={this.handleGetInstantOfferClick}>
              Moving into senior living and selling your home? Check out Zillow Offers for a no obligation cash offer.
            </Link>
          </BannerComponent>
        }
        {type === 'homeCare' &&
          <BannerComponent palette="warning" childrenPalette="slate">
            <Link onClick={this.handleUseHomecareClick}>
              During Covid-19 In-Home Care can be a safe temporary option. Get Free Consultation
            </Link>
          </BannerComponent>
        }
        {type.includes('covid-19') &&
          <BannerComponent palette="warning" childrenPalette="slate">
            Important COVID-19 senior living and in-home care updates.&nbsp;
            <DecoratedLink onClick={this.handleCovid19Click}>
              Click here to learn more.
            </DecoratedLink>
          </BannerComponent>
        }
        {isModalOpen &&
          <Modal onClose={this.handleClose}>
            <HeaderWithClose onClose={this.handleClose} />
            <PaddedHeaderWithCloseBody>
              {!type.includes('covid-19') &&
                <AskQuestionToAgentFormContainer
                  heading={modalHeading}
                  messagePrompt={modalMessagePrompt}
                  messagePlaceholder={modalMessagePlaceholder}
                  image={assetPath('images/agents.png')}
                  buttonKind="regular"
                  postSubmit={this.handleComplete}
                  actionType={modalAction}
                  showMessageFieldFirst
                  hideMessage
                />
              }
              {type.includes('covid-19') &&
                <WizardController
                  formName="bannerAdCovid19"
                  onStepChange={this.handleCovid19StepChange}
                  onComplete={this.handleComplete}
                >
                  {({
                    data, ...props
                  }) => (
                    <WizardSteps {...props}>
                      <WizardStep
                        component={ImportantCovid19UpdatesStepContainer}
                        name="Choose"
                        buttons={[
                          {
                            label: 'Get updated info on senior living communities near you',
                            value: 'admission-policies',
                          },
                          {
                            label: 'Get updated info on in-home care agencies near you',
                            value: 'home-care',
                          },
                        ]}
                      />
                      <WizardStep
                        component={AskQuestionToAgentFormContainer}
                        name="Form"
                        heading={modalHeading}
                        messagePrompt={modalMessagePrompt}
                        messagePlaceholder={modalMessagePlaceholder}
                        buttonKind="regular"
                        postSubmit={this.handleComplete}
                        actionType={modalAction}
                        hasLocation={type !== 'covid-19-community'}
                        hideMessage
                      />
                    </WizardSteps>
                  )}
                </WizardController>
              }
            </PaddedHeaderWithCloseBody>
          </Modal>
        }
      </>
    );
  }
}
