import React, { Component } from 'react';
import { func, oneOf, string } from 'prop-types';
import styled from 'styled-components';

import { size, assetPath } from 'sly/components/themes';
import SlyEvent from 'sly/services/helpers/events';

import withNotification from 'sly/controllers/withNotification';
import AdTile from 'sly/components/organisms/AdTile';
import { ResponsiveImage } from 'sly/components/atoms';


const StyledResponsiveImage = styled(ResponsiveImage)`
  vertical-align: middle;
  margin-left: ${size('spacing.regular')};
  margin-right: ${size('spacing.regular')};
`;

@withNotification

export default class PostConversionAdTileContainer extends Component {
  static propTypes = {
    notifyInfo: func.isRequired,
    type: oneOf(['askAgent', 'getOffer']).isRequired,
    city: string,
    tocLabel: string,
  };

  static defaultProps = {
    type: 'getOffer',
  };

  state = {
    isModalOpen: false,
  };

  componentDidMount() {
    const { type } = this.props;
    SlyEvent.getInstance().sendEvent({
      action: 'view',
      category: `PostConversionAdTile-${type}`,
      nonInteraction: true,
    });
  }



  handleGetInstantOfferClick = () => {
    SlyEvent.getInstance().sendEvent({
      action: 'click-get-instant-offer-button',
      category: 'PostConversionAdTile',
    });
  };

  render() {
    const { type } = this.props;
    return (
      <>
        {type === 'getOffer' &&
        <AdTile
          title="Moving into senior living and selling your home?"
          buttonText="Find out if my home is eligible"
          layout="row"
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
