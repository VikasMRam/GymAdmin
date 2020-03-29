import React, { Component } from 'react';
import { oneOf, string } from 'prop-types';
import { community as communityProptype } from 'sly/propTypes/community';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import SlyEvent from 'sly/services/helpers/events';
import { hcaAdEnabled } from 'sly/services/helpers/tileAds';

import AdTile from 'sly/components/organisms/AdTile';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/components/atoms/NewModal';
import { ResponsiveImage } from 'sly/components/atoms';
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import { CONSULTATION_REQUESTED, HOME_CARE_REQUESTED } from 'sly/services/newApi/constants';
import withNotification from 'sly/controllers/withNotification';


const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

@withNotification
export default class CommunityProfileAdTileContainer extends Component {
  static typeHydrationId = 'CommunityProfileAdTileContainer';
  static propTypes = {
    type: oneOf(['askAgent', 'getOffer','homeCare']).isRequired,
    zip: string.isRequired,
    community: communityProptype,
  };

  static defaultProps = {
    type: 'getOffer',
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
      category: `CommunityProfileAdTile-${type}`,
      label: profileId,
      nonInteraction: true,
    });
  }

  handleGetInstantOfferClick = () => {
    const { profileId } = this.props;
    SlyEvent.getInstance().sendEvent({
      action: 'click-get-instant-offer-button',
      category: 'CommunityProfileAdTile',
      label: profileId,
    });
  };

  handleUseHomecareClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-use-homecare-button',
      category: 'CommunityProfileAdTile',
    });
    this.setState({
      isModalOpen: true,
      modalMessagePrompt: 'What kinds of care do you need at home?',
      modalHeading: 'We Can Help You Find the Best Home Care',
      modalMessagePlaceholder: 'Type your care needs here',
      modalAction: HOME_CARE_REQUESTED,
    });
  };

  handleClose = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'close-ask-agent-question-modal',
      category: 'CommunityProfileAdTile',
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
    const { type, community  } = this.props;
    const { isModalOpen, modalHeading, modalMessagePrompt, modalAction, modalMessagePlaceholder } = this.state;
    const { address: {zip, city, state }} = community;
    const isHCA = hcaAdEnabled({ zip });
    const hcaAdTitle = `Home Care Assistance in ${city}, ${state}`;
    return (
      <>
        {type === 'getOffer' &&
        <AdTile
          title="Moving into senior living and selling your home?"
          buttonText="Get Your Cash Offer"
          buttonPosition="right"
          image={assetPath('vectors/house-sold.svg')}
          buttonProps={{
            target: '_blank',
            href: 'https://www.zillow.com/offers/?t=seniorly-0220',
            onClick: this.handleGetInstantOfferClick,
          }}
          {...this.props}
        >
          Check out <StyledResponsiveImage src={assetPath('vectors/zillow.svg')} /> Offers for a no obligation cash offer.
        </AdTile>
        }
        {type === 'homeCare' && isHCA &&
        <AdTile
          title={hcaAdTitle}
          buttonText="Get Home Care"
          buttonPosition="left"
          image={assetPath('images/homecare-2.png')}
          buttonProps={{ onClick: this.handleUseHomecareClick }}
          showSecondary
          linkProps={{href:"tel:+18558668719"}}
          linkText="(855) 866-8719"
          {...this.props}
        >
          Help Keep Seniors Safe at Home
        </AdTile>
        }
        {type === 'homeCare' && !isHCA &&
        <AdTile
          title="Get In-Home Care for Seniors"
          buttonText="Get Home Care"
          buttonPosition="left"
          image={assetPath('images/homecare-ad.png')}
          buttonProps={{ onClick: this.handleUseHomecareClick }}
          {...this.props}
        >
          Our team will help you find the best caregivers nationwide.
        </AdTile>
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
            />
          </PaddedHeaderWithCloseBody>
        </Modal>
        }
      </>
    );
  }
}
