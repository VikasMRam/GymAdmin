import React, { Component } from 'react';
import { bool, string, object, oneOf, number } from 'prop-types';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { Heading, Link, Block, Span } from 'sly/common/system';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import { CommunitySizeLarge, CommunitySizeMedium, CommunitySizeSmall, Family } from 'sly/common/icons';


const communityDefaultIcon = {
  'up to 20 Beds': <CommunitySizeSmall mr="s" />,
  '20 - 51 Beds': <CommunitySizeMedium mr="s" />,
  '51 +': <CommunitySizeLarge mr="s" />,
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
    color: palettePropType,
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
    flexDirection: 'column',
    priceTextSize: 'title-xs-azo',
    type: 'list',
  };

  render() {
    const {
      community, inverted, color, headerIsLink, event, swapRatingPrice, type, index, ...props
    } = this.props;
    const { priceTextSize } = this.props;
    const { propInfo = {}, propRatings, communitySize, startingRate, maxRate } = community;

    const { reviewsValue, numReviews } = propRatings || community;
    const typeCare = community.care || community.typeCare || propInfo.typeCare;
    const capacity = propInfo.capacity || community.capacity;
    const placeholder = getPlaceholderIcon(communitySize);

    let livingTypeComponent = null;

    if (typeCare && typeCare.length) {
      livingTypeComponent = (


        <Span
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          display="flex"
          width="100%"
          sx={type === 'map' ? {
            '*:first-child': {
              display: 'none',
              '@tablet': {
                display: 'unset',
              },
              '@laptop': {
                display: 'none',
              },
            },
          } : null}
          font="body-s"
          color={inverted ? 'white' : 'slate'}
          pad="xxs"
          title={typeCare.join('.')}
        >
          {placeholder}{typeCare.join(' . ')}
        </Span>


      );
    }

    const headerContent  = (
      <Heading
        font={type === 'map' ? 'title-xs-azo' : 'title-m'}
        pad={type === 'map' ? 'xxs' : 'xs'}
        title={community.name}
        color={inverted ? 'white' : 'slate'}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
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
          <Span
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            display="flex"
            maxWidth="100%"
            sx={type === 'map' ? {
              '*:first-child': {
                display: 'none',
              '@tablet': {
                display: 'unset',
                },
              '@laptop': {
                display: 'none',
                },
              },
            } : null}
            font="body-s"
            color={inverted ? 'white' : 'slate'}
            pad="xxs"
            title={typeCare ? typeCare.join('.') : null}
          >
            <Family mr="s" /> {`${capacity} resident capacity`}
          </Span>

          }
        </div>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={swapRatingPrice ? 'row-reverse' : undefined}
        >
          <CommunityRating
            seedId={community.id}
            rating={reviewsValue}
            numReviews={numReviews}
            color={inverted ? 'white' : 'primary'}
            font={type === 'map' ? 'body-xs' : null}
            marginRight="s"
          />
          {startingRate ? (
            <Block
              color={color || (inverted ? 'white' : 'primary')}
              font="body-s"
              testID="Rate"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              <Block
                display="inline"
                font={priceTextSize}
              >
                {formatMoney(startingRate)}{maxRate && maxRate !== 0 ? ` - ${formatMoney(maxRate)}` : ''}
              </Block>&nbsp;/&nbsp;month
            </Block>
          ) : null }
        </Block>
      </Block>
    );
  }
}
