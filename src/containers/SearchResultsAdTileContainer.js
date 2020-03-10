import React, { Component } from 'react';
import { func, oneOf, string } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import SlyEvent from 'sly/services/helpers/events';
import { CONSULTATION_REQUESTED } from 'sly/services/newApi/constants';
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
    const { isModalOpen } = this.state;
    return (
      <>
        {type === 'askAgent' &&
          <ExperimentalAdTileContainer {...this.props} handleClick={this.handleAskExpertQuestionClick}/>
        }
        {type === 'getOffer' &&
          <AdTile
            title="Selling a home to pay the cost of senior living?"
            buttonText="Get Instant Offer"
            buttonPosition="right"
            image={assetPath('vectors/house-sold.svg')}
            buttonProps={{
              target: '_blank',
              href: 'https://zillow.com',
              onClick: this.handleGetInstantOfferClick,
            }}
            {...this.props}
          >
            Our partner <StyledResponsiveImage src={assetPath('vectors/zillow.svg')} /> will make you an Instant Offer.
          </AdTile>
        }
        {isModalOpen &&
          <Modal onClose={this.handleClose}>
            <HeaderWithClose onClose={this.handleClose} />
            <PaddedHeaderWithCloseBody>
              <AskQuestionToAgentFormContainer
                heading="Our Local Senior Living Experts can help you with your search."
                image={assetPath('images/agents.png')}
                buttonKind="regular"
                postSubmit={this.handleComplete}
                actionType={CONSULTATION_REQUESTED}
                showMessageFieldFirst
              />
            </PaddedHeaderWithCloseBody>
          </Modal>
        }
      </>
    );
  }
}
