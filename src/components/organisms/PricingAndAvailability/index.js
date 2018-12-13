import React, { Fragment } from 'react';
import { string, number, shape, func, arrayOf } from 'prop-types';
import styled from 'styled-components';

import { Heading } from 'sly/components/atoms';
import RoomTile from 'sly/components/molecules/RoomTile';
import PriceBar from 'sly/components/molecules/PriceBar';
import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';

const Item = styled.div`
  display: inline-block;
  margin-bottom: ${size('spacing.large')};
  width: 100%;
  @media screen and (min-width: ${size('breakpoint.mobile')}) {
    margin-right: ${size('spacing.large')};
    width: auto;
  }
`;

const StyledPriceBar = styled(PriceBar)`
  margin-bottom: ${size('spacing.small')};
`;

const StyledArticle = styled.article`
  margin-bottom: ${size('spacing.xLarge')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    div:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

const CompareHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const PriceLabel = styled.div`
  margin-bottom: ${size('spacing.small')};
`;

export const findPercentage = (price, maxPrice) => ((price / maxPrice) * 100);

export const sortProperties = (obj) => {
  const sortable = [];
  Object.keys(obj).forEach((key) => {
    // each item is an array in format [key, value]
    sortable.push([key, obj[key]]);
  });

  // sort items by value
  sortable.sort((a, b) => a[1] - b[1]);
  // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  return sortable;
};

const PricingAndAvailability = ({
  community,
  roomPrices,
  address,
  estimatedPrice,
  onInquireOrBookClicked,
  gotoGetCustomPricing,
}) => {
  const mEstimatedPrice = { ...estimatedPrice };
  if (mEstimatedPrice && mEstimatedPrice.providedAverage) {
    mEstimatedPrice.providedAverage = community.startingRate || mEstimatedPrice.providedAverage;
  }
  if (mEstimatedPrice && mEstimatedPrice.estimatedAverage) {
    mEstimatedPrice.estimatedAverage = community.startingRate || mEstimatedPrice.estimatedAverage;
  }

  const estimatedPriceLabelMap = {
    providedAverage: community.name,
    estimatedAverage: community.name, // TODO: figure out correct label
    cityAverage: address.city,
    stateAverage: address.state,
    nationalAverage: address.country,
  };

  let sortedEstimatedPrice = [];
  let maxPrice = 0;
  let estimatedPriceBase = 0;
  if (mEstimatedPrice) {
    sortedEstimatedPrice = sortProperties(mEstimatedPrice);
    // remove items with 0 price
    sortedEstimatedPrice = sortedEstimatedPrice.filter(price => price[1] > 0);
    if (sortedEstimatedPrice.length) {
      // what if only providedAverage or estimatedAverage is non zero. just show nothing
      if (sortedEstimatedPrice.length === 1 &&
        (sortedEstimatedPrice[0][0] === 'providedAverage' || sortedEstimatedPrice[0][0] === 'estimatedAverage')) {
        sortedEstimatedPrice = [];
      } else {
        [, maxPrice] = sortedEstimatedPrice[sortedEstimatedPrice.length - 1];
      }
    }
    estimatedPriceBase = community.startingRate || mEstimatedPrice.providedAverage || mEstimatedPrice.estimatedAverage;
  }

  roomPrices.sort((a, b) => a.price - b.price);

  return (
    <section id="pricing-and-floor-plans">
      <StyledArticle id="pricing-and-floor-plans-price-tiles">
        {(!roomPrices.length && estimatedPriceBase) ?
          (<EstimatedCost
            // getPricing={getPricing} getPricing is a prop from children of ConciergeController
            getPricing={gotoGetCustomPricing}
            community={community}
            price={estimatedPriceBase}
          />
          ) : null
        }
        {roomPrices.map(object => (
          <Item key={`${object.price}-${object.priceType}-${object.roomType}`}>
            <RoomTile onInquireOrBookClicked={onInquireOrBookClicked} {...object} />
          </Item>
        ))}
      </StyledArticle>
      {sortedEstimatedPrice.length > 0 &&
        <article id="pricing-and-floor-plans-comparison">
          <CompareHeading level="subtitle" size="subtitle">
            Compare to Local Assisted Living Costs
          </CompareHeading>
          {sortedEstimatedPrice.map(object => (
            <Fragment key={object[1]}>
              <PriceLabel>{estimatedPriceLabelMap[object[0]]}</PriceLabel>
              <StyledPriceBar
                width={findPercentage(object[1], maxPrice)}
                price={object[1]}
              />
            </Fragment>
          ))}
        </article>
      }
    </section>
  );
};

PricingAndAvailability.propTypes = {
  community: communityPropType.isRequired,
  roomPrices: arrayOf(shape({
    roomType: string.isRequired,
    image: string,
    shareType: string.isRequired,
    price: number,
    priceShared: number,
    priceType: string.isRequired,
  })),
  address: shape({
    country: string.isRequired,
    city: string.isRequired,
    state: string.isRequired,
  }).isRequired,
  estimatedPrice: shape({
    providedAverage: number.isRequired,
    estimatedAverage: number.isRequired,
    cityAverage: number.isRequired,
    stateAverage: number.isRequired,
    nationalAverage: number.isRequired,
  }),
  onInquireOrBookClicked: func,
  gotoGetCustomPricing: func,
};

PricingAndAvailability.defaultProps = {
  roomPrices: [],
};

export default PricingAndAvailability;
