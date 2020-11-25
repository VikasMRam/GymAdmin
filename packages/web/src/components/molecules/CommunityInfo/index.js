import React, { Fragment, Component } from 'react';
import { bool, string, object } from 'prop-types';

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
  };

  static defaultProps = {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    direction: 'column',
    priceTextSize: 'subtitle',
  };

  render() {
    const {
      community, inverted, palette, headerIsLink, event, priceTextSize, swapRatingPrice, ...props
    } = this.props;
    const { propInfo = {}, propRatings, communitySize } = community;

    const { reviewsValue, numReviews } = propRatings || community;
    const typeCare = community.care || community.typeCare || propInfo.typeCare;
    const capacity = propInfo.capacity || community.capacity;
    const placeholder = communityDefaultIcon[communitySize || 'up to 20 Beds'];

    let livingTypeComponent = null;

    if (typeCare && typeCare.length) {
      livingTypeComponent = (
        <IconItem
          icon={placeholder}
          iconSize="body"
          iconPalette={inverted ? 'white' : 'slate'}
          palette={inverted ? 'white' : 'slate'}
          size="caption"
          pad="regular"
          title={typeCare.join(',')}
          clamped
        >
          {typeCare.slice(0, 3).map((livingType, i) =>
            <Fragment key={livingType}>{<>{i === 0 ? '' : ' · '}</>}{livingType}</Fragment>)}
        </IconItem>
      );
    }

    const headerContent  = (
      <Heading
        level="subtitle"
        size="subtitle"
        pad="regular"
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
            >
              {capacity}
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
            rating={reviewsValue}
            numReviews={numReviews}
            palette={inverted ? 'white' : 'primary'}
            size="caption"
          />
          {community.startingRate ? (
            <Block
              palette={palette || (inverted ? 'white' : 'primary')}
              size="caption"
              testID="Rate"
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
