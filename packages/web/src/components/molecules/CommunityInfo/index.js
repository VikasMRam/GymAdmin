import React, { Component } from 'react';
import { bool, string, object, oneOf } from 'prop-types';
import { css } from 'styled-components';

import { upTo, startingWith } from 'sly/common/components/helpers';
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
    type: oneOf(['list', 'map']).isRequired,
  };

  static defaultProps = {
    showFloorPlan: true,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    direction: 'column',
    priceTextSize: 'subtitle',
    type: 'list',
  };

  render() {
    const {
      community, inverted, showFloorPlan, palette, headerIsLink, event, swapRatingPrice, type, ...props
    } = this.props;
    let { priceTextSize } = this.props;
    const { webViewInfo, propInfo = {}, propRatings, mainService } = community;

    if (type === 'map') {
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
      livingTypeComponent = (
        <IconItem
          icon="hospital"
          iconSize="body"
          iconPalette={inverted ? 'white' : 'slate'}
          palette={inverted ? 'white' : 'slate'}
          size="caption"
          pad="regular"
          title={livingTypes.join(',')}
          type={type}
          clamped
          css={type === 'map' ? css`
            ${upTo('tablet', `
              *:first-child {
                display: none;
              }
            `)}
            ${startingWith('laptop', css`
              *:first-child {
                display: none;
              }
            `)}
          ` : null}
        >
          {livingTypesStr}
        </IconItem>
      );
    }

    const headerContent  = (
      <Heading
        level="subtitle"
        size={type === 'map' ? 'body' : 'subtitle'}
        pad={type === 'map' ? 'small' : 'regular'}
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
            <IconItem
              icon="location"
              iconPalette={inverted ? 'white' : 'slate'}
              iconSize="body"
              title={address}
              palette={inverted ? 'white' : 'slate'}
              size="caption"
              pad="small"
              type={type}
              clamped
              css={type === 'map' ? css`
              ${upTo('tablet', `
                *:first-child {
                  display: none;
                }
              `)}
              ${startingWith('laptop', css`
                *:first-child {
                  display: none;
                }
              `)}
            ` : null}
            >
              {address}
            </IconItem>
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
