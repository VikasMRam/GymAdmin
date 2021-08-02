import React, { Component } from 'react';
import { bool, string, object, oneOf, number } from 'prop-types';

import EntityInfoDescription from './EntityInfoDescription';

import { palette as palettePropType } from 'sly/common/propTypes/palette';
import { community as communityPropType } from 'sly/common/propTypes/community';
import { entity as entityPropType } from 'sly/common/propTypes/entity';
import { Heading, Link, Block } from 'sly/common/system';
import CommunityRating from 'sly/web/components/molecules/CommunityRating';
import { formatMoney } from 'sly/web/services/helpers/numbers';

export default class EntityInfo extends Component {
  static propTypes = {
    community: communityPropType,
    entity: entityPropType,
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
    const { propInfo = {}, propRatings, startingRate, maxRate, secondLine, thirdLine, resourceType = ''  } = entity;

    const { reviewsValue, numReviews } = propRatings || entity;
    const typeCare = entity.care || entity.typeCare || propInfo.typeCare;
    const capacity = propInfo.capacity || entity.capacity;
    let livingTypeComponent = null;

    if ((typeCare && typeCare.length) || secondLine) {
      livingTypeComponent = (
        <EntityInfoDescription
          type={type}
          inverted={inverted}
        >
          {(!!typeCare && typeCare.join(' . ')) || (!!secondLine && secondLine)}
        </EntityInfoDescription>


      );
    }


    const headerContent  = (
      <Heading
        font={type === 'map' ? 'title-s' : 'title-s'}
        pad={type === 'map' ? 'xxs' : 'xs'}
        title={entity.name}
        color={inverted ? 'white' : 'slate'}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        sx={{
          fontSize: type === 'map' && '0.875rem',
          lineHeight: type === 'map' && '1.43',
        }}
        sx$tablet={{
          font: type === 'map' && 'title-s',
        }}
        sx$laptop={{
          fontSize: type === 'map' && '0.875rem',
          lineHeight: type === 'map' && '1.43',
        }}
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
          {((capacity || thirdLine) !== '' && (capacity || thirdLine) !== ' resident capacity') &&
          <EntityInfoDescription
            type={type}
            inverted={inverted}
          >
            {capacity || thirdLine}{capacity && !capacity.includes('resident') ? ' resident capacity' : null}
          </EntityInfoDescription>

          }
        </div>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={swapRatingPrice ? 'row-reverse' : undefined}
          paddingTop={type === 'map' ? '0' : 'm'}
          sx$tablet={{
            paddingTop: type === 'map' && 'm',
          }}
          sx$laptop={{
            paddingTop: type === 'map' && '0',
          }}
        >
          <CommunityRating
            seedId={entity.id}
            rating={reviewsValue}
            numReviews={numReviews}
            color={inverted ? 'white' : 'primary'}
            sx={{
              font: type === 'map' && 'body-s',
            }}
            sx$tablet={{
              font: type === 'map' && 'body-m',
            }}
            sx$laptop={{
              font: type === 'map' && 'body-s',
            }}
            marginRight="s"
          />
          {startingRate ? (
            <Block
              color={color || (inverted ? 'white' : 'primary')}
              sx={{
                font: type === 'map' ? 'body-xs' : 'body-m',
              }}
              sx$tablet={{
                font: type === 'map' && 'body-m',
              }}
              sx$laptop={{
                font: type === 'map' && 'body-xs',
              }}
              testID="Rate"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              <Block
                display="inline"
                font={type === 'map' ? 'body-s' : priceTextSize}
                fontWeight="500"
                sx$tablet={{
                  font: type === 'map' ? 'body-m' : priceTextSize,
                  fontWeight: '500',
                }}
                sx$laptop={{
                  font: type === 'map' ? 'body-s' : priceTextSize,
                  fontWeight: '500',
                }}
              >
                {formatMoney(startingRate)}{maxRate && maxRate !== 0 ? ` - ${formatMoney(maxRate)}` : ''}
              </Block>/month {resourceType === 'Listing' && '+ care fees'}
            </Block>
          ) : null }
        </Block>
      </Block>
    );
  }
}
