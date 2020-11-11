import React, { Component } from 'react';
import { bool, string, object, oneOf } from 'prop-types';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { Block, Heading, Link } from 'sly/common/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import { formatMoney } from 'sly/web/services/helpers/numbers';

const getAddress = ({ address, addressString }) => {
  if (address) {
    const { line1, line2, city, state, zip } = address;
    return `${line1}, ${line2}, ${city}, ${state} ${zip}`
      .replace(/, ,/g, ', ')
      .replace(/\s+/g, ' ');
  }

  return addressString;
};

export default class CommunityInfo extends Component {
  static propTypes = {
    community: communityPropType,
    inverted: bool,
    showFloorPlan: bool,
    palette: palettePropType,
    className: string,
    headerIsLink: bool,
    event: object,
    priceTextSize: string.isRequired,
    swapRatingPrice: bool,
    size: oneOf(['regular', 'small']).isRequired,
  };

  static defaultProps = {
    showFloorPlan: true,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    direction: 'column',
    priceTextSize: 'subtitle',
    size: 'regular',
  };

  render() {
    const {
      community, inverted, showFloorPlan, palette, headerIsLink, event, swapRatingPrice, size, ...props
    } = this.props;
    let { priceTextSize } = this.props;
    const { webViewInfo, propInfo = {}, propRatings, mainService } = community;

    if (size === 'small') {
      priceTextSize = 'body';
    }

    const address = getAddress(community);
    const { reviewsValue, numReviews } = propRatings || community;
    const typeCare = propInfo.typeCare || community.typeCare;

    let livingTypeComponent = null;
    let livingTypes = typeCare;
    if (webViewInfo) {
      const { firstLineValue } = webViewInfo;
      livingTypes = firstLineValue.split(',');
    }
    if (mainService) {
      livingTypes = mainService.split(',');
    }

    if (livingTypes && livingTypes.length) {
      const livingTypesStr = livingTypes.map((livingType, i) =>
        `${i ? `${i === livingTypes.length - 1 ? ' & ' : ', '}` : ''}${livingType}`);
      livingTypeComponent = size === 'small' ? (
        <Block size="caption" pad="regular" clamped>{livingTypesStr}</Block>
      ) : (
        <IconItem
          icon="hospital"
          iconSize="body"
          iconPalette={inverted ? 'white' : 'slate'}
          palette={inverted ? 'white' : 'slate'}
          size="caption"
          pad="regular"
          title={livingTypes.join(',')}
          clamped
        >
          {livingTypesStr}
        </IconItem>
      );
    }

    const headerContent  = (
      <Heading
        level="subtitle"
        size={size === 'small' ? 'body' : 'subtitle'}
        pad={size}
        title={community.name}
        palette={inverted ? 'white' : 'slate'}
        clamped
      >
        {community.name}
      </Heading>
    );

    const header = headerIsLink
      ? (
        <Link href={community.url} event={event}>
          {headerContent}
        </Link>
      ) : headerContent;

    return (
      <Block {...props}>
        <div>
          {header}
          {address && (
            size === 'small' ? <Block size="caption" pad="small" clamped>{address}</Block> : (
              <IconItem
                icon="location"
                iconPalette={inverted ? 'white' : 'slate'}
                iconSize="body"
                title={address}
                palette={inverted ? 'white' : 'slate'}
                size="caption"
                pad="small"
                clamped
              >
                {address}
              </IconItem>
            )
          )}
          {livingTypeComponent}
        </div>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          upToTablet={{
            flexDirection: 'row-reverse',
          }}
          direction={swapRatingPrice ? 'row-reverse' : undefined}
        >
          <CommunityRating
            seedId={community.id}
            rating={reviewsValue}
            numReviews={numReviews}
            palette={inverted ? 'white' : 'primary'}
            size="caption"
            marginRight="large"
          />
          {community.startingRate ? (
            <Block
              palette={palette || (inverted ? 'white' : 'primary')}
              size="caption"
              testID="Rate"
              overflow="hidden"
              clamped
            >
              <Block
                display="inline"
                weight="medium"
                size={priceTextSize}
              >
                {formatMoney(community.startingRate)}
              </Block>&nbsp;/&nbsp;month
            </Block>
          ) : null }
        </Block>
      </Block>
    );
  }
}
