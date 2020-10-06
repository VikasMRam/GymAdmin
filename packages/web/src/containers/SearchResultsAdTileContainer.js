import React, { Component } from 'react';
import { func, oneOf, string } from 'prop-types';
import styled from 'styled-components';

import { withRouter } from 'react-router';
import { size } from 'sly/common/components/themes';
import { assetPath } from 'sly/web/components/themes';
import { query } from 'sly/web/services/api';
import SlyEvent from 'sly/web/services/helpers/events';
import { CONSULTATION_REQUESTED, EXTERNAL_LINK_CLICK, HOME_CARE_REQUESTED } from 'sly/web/services/api/constants';
import { hcaAdEnabled } from 'sly/web/services/helpers/tileAds';
import withNotification from 'sly/web/controllers/withNotification';
import AdTile from 'sly/web/components/organisms/AdTile';
import { ResponsiveImage } from 'sly/web/components/atoms';
import Modal, { HeaderWithClose, PaddedHeaderWithCloseBody } from 'sly/web/components/atoms/NewModal';
import AskQuestionToAgentFormContainer from 'sly/web/containers/AskQuestionToAgentFormContainer';
import ExperimentalAdTileContainer from 'sly/web/containers/ExperimentalAdTileContainer';


const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

@withNotification
@withRouter
@query('createAction', 'createUuidAction')

export default class SearchResultsAdTileContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
    type: oneOf(['askAgent', 'getOffer', 'homeCare']).isRequired,
    city: string,
    locationLabel: string,
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
      modalMessagePrompt: 'Please give us a little more information on what services you are currently looking for?',
      modalHeading: 'In-home caregivers can serve as a vital support system to keep seniors cared for and safe.',
      modalMessagePlaceholder: 'Type your care needs here',
      modalAction: HOME_CARE_REQUESTED,
    });
  };

  handleGetInstantOfferClick = () => {
    const { createAction, locationLabel, location: { pathname } } = this.props;

    SlyEvent.getInstance().sendEvent({
      action: 'click-ZillowAd',
      category: 'SearchResultsAdTile',
      label: locationLabel,
    });

    return createAction({
      type: 'UUIDAction',
      attributes: {
        actionType: EXTERNAL_LINK_CLICK,
        actionPage: pathname,
        actionInfo: {
          target: 'https://www.zillow.com/offers/?t=seniorly-0220',
          source: 'searchResults',
          slug: locationLabel,
        },
      },
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
    const { type, locationLabel } = this.props;
    const { isModalOpen, modalHeading, modalMessagePrompt, modalAction, modalMessagePlaceholder } = this.state;
    const isHCA = hcaAdEnabled({ cityState: locationLabel });
    const hcaAdTitle = `Home Care Assistance in ${locationLabel}`;
    return (
      <>
        {type === 'askAgent' &&
          <ExperimentalAdTileContainer {...this.props} handleClick={this.handleAskExpertQuestionClick} />
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
        {type === 'homeCare' && isHCA &&
          <AdTile
            title="During Covid-19 In-Home Care can be a safe temporary option."
            buttonText="Get Free Consultation"
            buttonPosition="left"
            image={assetPath('images/homecare-2.png')}
            buttonProps={{ onClick: this.handleUseHomecareClick }}
            showSecondary
            linkProps={{ href: 'tel:+18558668719' }}
            linkText="(855) 866-8719"
            {...this.props}
          >
            Have pre-screened caregivers at your home
          </AdTile>
        }
        {type === 'homeCare' && !isHCA &&
        <AdTile
          title="During Covid-19 In-Home Care can be a safe temporary option."
          buttonText="Get Free Consultation"
          buttonPosition="left"
          image={assetPath('images/homecare-ad.png')}
          buttonProps={{ onClick: this.handleUseHomecareClick }}
          {...this.props}
        >
          Have pre-screened caregivers at your home
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
                hideMessage
              />
            </PaddedHeaderWithCloseBody>
          </Modal>
        }
      </>
    );
  }
}
