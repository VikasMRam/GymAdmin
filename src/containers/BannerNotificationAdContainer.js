import React, { PureComponent } from 'react';
import { oneOf } from 'prop-types';
import SlyEvent from 'sly/services/helpers/events';
import { Link } from 'sly/components/atoms';
import BannerNotification from 'sly/components/molecules/BannerNotification';
import { assetPath } from 'sly/components/themes';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/components/atoms/NewModal';
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import { CONSULTATION_REQUESTED, HOME_CARE_REQUESTED } from 'sly/services/api/constants';
import withNotification from 'sly/controllers/withNotification';
import pad from 'sly/components/helpers/pad';

const StyledBannerNotification = pad(BannerNotification, 'large');

@withNotification

export default class BannerNotificationAdContainer extends PureComponent {
  static typeHydrationId = 'BannerNotificationAdContainer';

  static propTypes = {
    type: oneOf(['askAgent', 'getOffer','homeCare']).isRequired,
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
    const { isModalOpen, modalHeading, modalMessagePrompt, modalAction, modalMessagePlaceholder } = this.state;
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

      {isModalOpen &&
      <Modal onClose={this.handleClose}>
        <HeaderWithClose onClose={this.handleClose} />
        <PaddedHeaderWithCloseBody>
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
        </PaddedHeaderWithCloseBody>
      </Modal>
      }
      </>
    );
  }
}
