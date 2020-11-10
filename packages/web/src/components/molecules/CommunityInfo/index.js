import React, { Fragment, Component } from 'react';
import { bool, string, object } from 'prop-types';

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
  };

  static defaultProps = {
    showFloorPlan: true,
    display: 'flex',
    height: '100%',
    justifyContent: 'space-between',
    direction: 'column',
    priceTextSize: 'subtitle',
  };

  render() {
    const {
      community, inverted, showFloorPlan, palette, headerIsLink, event, priceTextSize, swapRatingPrice, ...props
    } = this.props;
    const { propInfo = {}, propRatings } = community;

    const address = getAddress(community);
    const { reviewsValue, numReviews } = propRatings || community;
    const typeCare = propInfo.typeCare || community.typeCare;
    const capacity = propInfo.capacity || community.capacity;

    let livingTypeComponent = null;
    let livingTypes = typeCare;

    if (livingTypes && livingTypes.length) {
      livingTypeComponent = (
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
          {livingTypes.slice(0, 3).map((livingType, i) =>
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
          <IconItem
            icon="family"
            iconPalette={inverted ? 'white' : 'slate'}
            iconSize="body"
            title={address}
            palette={inverted ? 'white' : 'slate'}
            size="caption"
            pad="small"
            clamped
          >
            {capacity}
          </IconItem>
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
