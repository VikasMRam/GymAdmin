import React, { Component } from 'react';
import { func, oneOf, string } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import SlyEvent from 'sly/services/helpers/events';
import { CONSULTATION_REQUESTED,HOME_CARE_REQUESTED } from 'sly/services/newApi/constants';
import withNotification from 'sly/controllers/withNotification';
import AdTile from 'sly/components/organisms/AdTile';
import { ResponsiveImage } from 'sly/components/atoms';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/components/atoms/NewModal';
import AskQuestionToAgentFormContainer from 'sly/containers/AskQuestionToAgentFormContainer';
import ExperimentalAdTileContainer from 'sly/containers/ExperimentalAdTileContainer';

const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

@withNotification

export default class SearchResultsAdTileContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
    type: oneOf(['askAgent', 'getOffer','homeCare']).isRequired,
    city: string,
    tocLabel: string,
  };

  static defaultProps = {
    type: 'askAgent',
  };

  state = {
    isModalOpen: false,
    modalAction: CONSULTATION_REQUESTED,
    modalMessagePrompt: 'What can we help you with?',
    modalHeading: 'Our Local Senior Living Experts can help you with your search.',
  };

  componentDidMount() {
    const { type, city, tocLabel } = this.props;
    SlyEvent.getInstance().sendEvent({
      action: 'view',
      category: `SearchResultsAdTile-${type}`,
      label: `${tocLabel}-${city}`,
      nonInteraction: true,
    });
  }

  handleAskExpertQuestionClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-ask-our-experts-question-button',
      category: 'SearchResultsAdTile',
    });
    this.setState({
      isModalOpen: true,
    });
  };

  handleUseHomecareClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-use-homecare-button',
      category: 'SearchResultsAdTile',
    });
    this.setState({
      isModalOpen: true,
      modalMessagePrompt: 'What kinds of care do you need at home?',
      modalHeading: 'We Can Help You Find the Best Home Care',
      modalAction: HOME_CARE_REQUESTED,
    });
  };

  handleGetInstantOfferClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-get-instant-offer-button',
      category: 'SearchResultsAdTile',
    });
  };

  handleClose = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'close-ask-agent-question-modal',
      category: 'SearchResultsAdTile',
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
    const { type } = this.props;
    const { isModalOpen, modalHeading, modalMessagePrompt, modalAction } = this.state;
    return (
      <>
        {type === 'askAgent' &&
          <ExperimentalAdTileContainer {...this.props} handleClick={this.handleAskExpertQuestionClick}/>
        }
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
        {type === 'homeCare' &&
          <AdTile
            title="Get In-Home Care for Seniors"
            buttonText="Get Home Care"
            buttonPosition="right"
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
