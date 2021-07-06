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

export default class EntityInfo extends Component {
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
    alignItems: 'stretch',
    justifyContent: 'space-between',
    flexDirection: 'column',
    priceTextSize: 'title-xs-azo',
    type: 'list',
  };

  render() {
    const {
      entity, inverted, color, headerIsLink, event, swapRatingPrice, type, index, ...props
    } = this.props;
    const { priceTextSize } = this.props;
    const { propInfo = {}, propRatings, communitySize, startingRate, maxRate, secondLine, thirdLine  } = entity;

    const { reviewsValue, numReviews } = propRatings || entity;
    const typeCare = entity.care || entity.typeCare || propInfo.typeCare;
    const capacity = thirdLine || propInfo.capacity || entity.capacity;
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

    if (thirdLine) {
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
          color={inverted ? 'white' : 'slate.lighter-40'}
          pad="xxs"
          title={secondLine}
        >
          {secondLine}
        </Span>
      );
    }

    const headerContent  = (
      <Heading
        font={type === 'map' ? 'title-xs-azo' : 'title-m'}
        pad={type === 'map' ? 'xxs' : 'xs'}
        title={entity.name}
        color={inverted ? 'white' : 'slate'}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {index && `${index}. `}
        {entity.name}
      </Heading>
    );

    const header = headerIsLink
      ? (
        <Link href={entity.url} event={event}>
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
            font="body-s"
            color={inverted ? 'white' : 'slate.lighter-40'}
            pad="xxs"
            title={typeCare ? typeCare.join('.') : null}
          >
            {capacity}
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
            seedId={entity.id}
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
