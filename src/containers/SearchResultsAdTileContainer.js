import React, { Component } from 'react';
import { func, oneOf, string } from 'prop-types';
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
    city: string,
    tocLabel: string,
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
      category: 'SearchResultsAdTile',
    });
    this.setState({
      isModalOpen: true,
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
    const { type, city, tocLabel } = this.props;
    const { isModalOpen } = this.state;
    const agentAdTitle = `Get Help Finding ${tocLabel} Communities in ${city}`;
    return (
      <>
        {type === 'askAgent' &&
          <SearchResultsAdTile
            title={agentAdTitle}
            buttonText="Ask Our Experts A Question"
            image={assetPath('images/agents.png')}
            onButtonClick={this.handleAskExpertQuestionClick}
            {...this.props}
          >
            Our Local Senior Living Experts can help you now.
          </SearchResultsAdTile>
        }
        {type === 'getOffer' &&
          <SearchResultsAdTile
            title="Selling a home to pay the cost of senior living?"
            buttonText="Get Instant Offer"
            buttonPosition="right"
            onButtonClick={this.handleGetInstantOfferClick}
            image={assetPath('vectors/house-sold.svg')}
            buttonProps={{
              target: '_blank',
              href: 'https://zillow.com',
            }}
            {...this.props}
          >
            Our partner <StyledResponsiveImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
          </SearchResultsAdTile>
        }
        {isModalOpen &&
          <Modal onClose={this.handleClose}>
            <HeaderWithClose onClose={this.handleClose} />
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
