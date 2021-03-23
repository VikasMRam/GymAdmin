import React, { Component } from 'react';
import { bool, string, object, oneOf, number } from 'prop-types';
import { css } from 'styled-components';

import { upTo, startingWith } from 'sly/common/components/helpers';
import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { Block, Heading, Link } from 'sly/common/components/atoms';
import IconItem from 'sly/web/components/molecules/IconItem';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import { formatMoney } from 'sly/web/services/helpers/numbers';

const communityDefaultIcon = {
  'up to 20 Beds': 'community-size-small',
  '20 - 51 Beds': 'community-size-medium',
  '51 +': 'community-size-large',
};

const validSizes = Object.keys(communityDefaultIcon);

const getPlaceholderIcon = communitySize => communityDefaultIcon[
  (communitySize && validSizes.includes(communitySize))
    ? communitySize
    : 'up to 20 Beds'
];

export default class CommunityInfo extends Component {
  static propTypes = {
    community: communityPropType,
    inverted: bool,
    palette: palettePropType,
    className: string,
    headerIsLink: bool,
    event: object,
    priceTextSize: string.isRequired,
    swapRatingPrice: bool,
    type: oneOf(['list', 'map']).isRequired,
    index: number,
  };

  static defaultProps = {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    direction: 'column',
    priceTextSize: 'subtitle',
    type: 'list',
  };

  render() {
    const {
      community, inverted, palette, headerIsLink, event, swapRatingPrice, type, index, ...props
    } = this.props;
    let { priceTextSize } = this.props;
    const { propInfo = {}, propRatings, communitySize } = community;

    if (type === 'map') {
      priceTextSize = 'body';
    }

    const { reviewsValue, numReviews } = propRatings || community;
    const typeCare = community.care || community.typeCare || propInfo.typeCare;
    const capacity = propInfo.capacity || community.capacity;
    const placeholder = getPlaceholderIcon(communitySize);

    let livingTypeComponent = null;

    if (typeCare && typeCare.length) {
      livingTypeComponent = (
        <IconItem
          icon={placeholder}
          iconSize="body"
          iconPalette={inverted ? 'white' : 'slate'}
          palette={inverted ? 'white' : 'slate'}
          size="caption"
          pad="small"
          type={type}
          title={typeCare.join(',')}
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
          {typeCare.join(' · ')}
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
        {index && `${index}. `}
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
          {livingTypeComponent}
          {capacity !== '' &&
          <IconItem
            icon="family"
            iconPalette={inverted ? 'white' : 'slate'}
            iconSize="body"
            title={capacity}
            palette={inverted ? 'white' : 'slate'}
            size="caption"
            pad="small"
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
            {`${capacity} resident capacity`}
          </IconItem>
          }
        </div>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
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
