import React, { Component } from 'react';
import { func, oneOf } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import SlyEvent from 'sly/services/helpers/events';
import withNotification from 'sly/controllers/withNotification';
import SearchResultsAdTile from 'sly/components/organisms/SearchResultsAdTile';
import { ResponsiveImage } from 'sly/components/atoms';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/components/atoms/NewModal';
import TalkToAgentFormContainer from 'sly/containers/TalkToAgentFormContainer';

const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

@withNotification

export default class SearchResultsAdTileContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
    type: oneOf(['askAgent', 'getOffer']).isRequired,
  };

  static defaultProps = {
    type: 'askAgent',
  };

  state = {
    isModalOpen: false,
  };

  handleAskExpertQuestionClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-ask-our-experts-question-button',
      category: 'AskAgentAdTile',
    });
    this.setState({
      isModalOpen: true,
    });
  };

  handleGetInstantOfferClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-get-instant-offer-button',
      category: 'AskAgentAdTile',
    });
  };

  handleClose = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'close-ask-agent-question-modal',
      category: 'AskAgentAdTile',
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
    const { isModalOpen } = this.state;

    return (
      <>
        {type === 'askAgent' &&
          <SearchResultsAdTile
            title="Get Help Finding Assisted Living Communities in San Francisco"
            description="Our Local Senior Living Experts can help you with X"
            buttonText="Ask Our Experts A Question"
            image={assetPath('images/agents.png')}
            onButtonClick={this.handleAskExpertQuestionClick}
            {...this.props}
          />
        }
        {type === 'getOffer' &&
          <SearchResultsAdTile
            title="Selling a home to pay the cost of senior living?"
            description={(
              <>
                Our partner <StyledResponsiveImage src={assetPath('images/zillow.png')} /> will make you an Instant Offer.
              </>
            )}
            buttonText="Get Instant Offer"
            buttonPosition="right"
            onButtonClick={this.handleGetInstantOfferClick}
            image={assetPath('vectors/house-sold.svg')}
            buttonProps={{
              target: '_blank',
              href: 'https://zillow.com',
            }}
            {...this.props}
          />
        }
        {isModalOpen &&
          <Modal onClose={this.handleClose}>
            <HeaderWithClose />
            <PaddedHeaderWithCloseBody>
              <TalkToAgentFormContainer
                heading="Our Local Senior Living Experts can help you with your search."
                image={assetPath('images/agents.png')}
                buttonKind="regular"
                hasLocation={false}
                postSubmit={this.handleComplete}
                showMessageFieldFirst
              />
            </PaddedHeaderWithCloseBody>
          </Modal>
        }
      </>
    );
  }
}
