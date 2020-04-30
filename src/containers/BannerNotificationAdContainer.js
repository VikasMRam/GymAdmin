import React, { PureComponent } from 'react';
import { oneOf, func, string } from 'prop-types';
import { reduxForm } from 'redux-form';

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

const StyledBannerNotification = pad(BannerNotification, 'large');

const DecoratedLink = textDecoration(Link);

@withNotification

export default class BannerNotificationAdContainer extends PureComponent {
  static typeHydrationId = 'BannerNotificationAdContainer';

  static propTypes = {
    type: oneOf(['askAgent', 'getOffer', 'homeCare', 'covid-19']).isRequired,
    notifyInfo: func.isRequired,
    profileId: string,
  };

  static defaultProps = {
    type: 'homeCare',
  };

  state = {
    isModalOpen: false,
    modalAction: CONSULTATION_REQUESTED,
    modalMessagePrompt: 'What can we help you with?',
    modalHeading: 'Our Local Senior Living Experts can help you with your search.',
    covid19ContactType: null, // todo: remove when fieldbutton molecule is added
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

  handleAdmissionPoliciesContact = (next) => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-covid19-admission-policies-button',
      category: 'BannerNotificationAd',
    });
    this.setState({
      covid19ContactType: 'admission-policies',
      modalHeading: 'Our Local Senior Living Expert will contact you as soon as possible with updated admissions policies.',
    });
    next();
  };

  handleInhomeCareContact = (next) => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-covid19-home-care-button',
      category: 'BannerNotificationAd',
    });
    this.setState({
      covid19ContactType: 'home-care',
      modalHeading: 'Our in-home care agency partners will contact you as soon as possible with up to date information.',
    });
    next();
  };

  handleCovid19StepChange = (data) => {
    console.log(data);
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
    const { type  } = this.props;
    const {
      isModalOpen,
      modalHeading,
      modalMessagePrompt,
      modalAction,
      modalMessagePlaceholder,
      covid19ContactType,
    } = this.state;

    return (
      <>
        {type === 'getOffer' &&
          <StyledBannerNotification palette="warning" childrenPalette="slate" onCloseClick={this.handleBannerCloseClick}>
            <Link onClick={this.handleGetInstantOfferClick}>
              Moving into senior living and selling your home? Check out Zillow Offers for a no obligation cash offer.
            </Link>
          </StyledBannerNotification>
        }
        {type === 'homeCare' &&
          <StyledBannerNotification palette="warning" childrenPalette="slate" onCloseClick={this.handleBannerCloseClick}>
            <Link onClick={this.handleUseHomecareClick}>
              During Covid-19 In-Home Care can be a safe temporary option. Get Free Consultation
            </Link>
          </StyledBannerNotification>
        }
        {type === 'covid-19' &&
          <StyledBannerNotification palette="warning" childrenPalette="slate" onCloseClick={this.handleBannerCloseClick}>
            Important COVID-19 senior living and in-home care updates.&nbsp;
            <DecoratedLink onClick={this.handleCovid19Click}>
              Click here to learn more.
            </DecoratedLink>
          </StyledBannerNotification>
        }
        {isModalOpen &&
          <Modal onClose={this.handleClose}>
            <HeaderWithClose onClose={this.handleClose} />
            <PaddedHeaderWithCloseBody>
              {type !== 'covid-19' &&
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
              {type === 'covid-19' &&
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
                            label: 'Get information about senior living communities that are currently accepting new residents',
                            value: 'admission-policies',
                          },
                          {
                            label: 'Get information about in-home caregivers if you are interested in delaying your move',
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
