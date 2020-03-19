import React, { Component } from 'react';
import { func, oneOf, string } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import SlyEvent from 'sly/services/helpers/events';

import AdTile from 'sly/components/organisms/AdTile';
import { ResponsiveImage } from 'sly/components/atoms';


const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;
export default class CommunityProfileAdTileContainer extends Component {
  static typeHydrationId = 'CommunityProfileAdTileContainer';
  static propTypes = {
    type: oneOf(['askAgent', 'getOffer','homeCare']).isRequired,
    profileId: string.isRequired,
  };

  static defaultProps = {
    type: 'getOffer',
  };

  state = {
    isModalOpen: false,
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

  render() {
    const { type } = this.props;
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
      </>
    );
  }
}
