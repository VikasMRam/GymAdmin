import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Heading } from 'sly/components/atoms';
import RoomTile from 'sly/components/molecules/RoomTile';
import PriceBar from 'sly/components/molecules/PriceBar';
import EstimatedCost from 'sly/components/molecules/EstimatedCost';
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
const LocalitiesWrapper = styled.div`
  width: 95%;
  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    width: 70%;
  }
  @media screen and (min-width: ${size('breakpoint.doubleModal')}) {
    width: 85%;
  }
`;
const SpacingBottomRegularWrapper = styled.div`
  margin-bottom: ${size('spacing.regular')};
`;
const StyledArticle = styled.article`
  margin-bottom: ${size('spacing.large')};

  @media screen and (min-width: ${size('breakpoint.tablet')}) {
    div:nth-child(3n) {
      margin-right: 0;
    }
  }
`;

export default class PricingAndAvailability extends Component {
    static propTypes = {
      communityName: PropTypes.string.isRequired,
      roomPrices: PropTypes.arrayOf(PropTypes.shape({
        roomType: PropTypes.string.isRequired,
        image: PropTypes.string,
        shareType: PropTypes.string.isRequired,
        price: PropTypes.number,
        priceShared: PropTypes.number,
        priceType: PropTypes.string.isRequired,
      })),
      address: PropTypes.shape({
        country: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
      }).isRequired,
      estimatedPrice: PropTypes.shape({
        providedAverage: PropTypes.number.isRequired,
        estimatedAverage: PropTypes.number.isRequired,
        cityAverage: PropTypes.number.isRequired,
        stateAverage: PropTypes.number.isRequired,
        nationalAverage: PropTypes.number.isRequired,
      }),
      getDetailedPricing: PropTypes.func,
      onInquireOrBookClicked: PropTypes.func,
    };

    static defaultProps = {
      roomPrices: [],
    };

    static findPercentage(price, maxPrice) {
      return +((price / maxPrice) * 100).toFixed(2);
    }

    static sortProperties(obj) {
      const sortable = [];
      Object.keys(obj).forEach((key) => {
        // each item is an array in format [key, value]
        sortable.push([key, obj[key]]);
      });

      // sort items by value
      sortable.sort((a, b) => a[1] - b[1]);
      // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
      return sortable;
    }

    render() {
      const {
        communityName,
        roomPrices,
        address,
        estimatedPrice,
        getDetailedPricing,
        onInquireOrBookClicked,
      } = this.props;

      const estimatedPriceLabelMap = {
        providedAverage: communityName,
        estimatedAverage: communityName, // TODO: figure out correct label
        cityAverage: address.city,
        stateAverage: address.state,
        nationalAverage: address.country,
      };

      let sortedEstimatedPrice = [];
      let maxPrice = 0;
      let estimatedPriceBase = 0;
      if (estimatedPrice) {
        sortedEstimatedPrice = this.constructor.sortProperties(estimatedPrice);
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
        estimatedPriceBase = estimatedPrice.providedAverage || estimatedPrice.estimatedAverage;
      }
      roomPrices.sort((a, b) => a.price - b.price);

      return (
        <section id="pricing-and-floor-plans">
          <StyledArticle id="pricing-and-floor-plans-price-tiles">
            {!roomPrices.length && estimatedPriceBase &&
              <EstimatedCost
                communityName={communityName}
                price={estimatedPriceBase}
                getDetailedPricing={getDetailedPricing}
              />
            }
            {roomPrices.map((object, i) => (
              <Item key={i}>
                <RoomTile onInquireOrBookClicked={onInquireOrBookClicked} {...object} />
              </Item>
            ))}
          </StyledArticle>
          {sortedEstimatedPrice.length > 0 &&
            <article id="pricing-and-floor-plans-comparison">
              <Heading level="subtitle">Compare to Local Assisted Living Costs</Heading>
              <LocalitiesWrapper>
                {sortedEstimatedPrice.map((object, i) => (
                  <SpacingBottomRegularWrapper key={i}>
                    {estimatedPriceLabelMap[object[0]]}
                    <PriceBar width={this.constructor.findPercentage(object[1], maxPrice)} price={object[1]} />
                  </SpacingBottomRegularWrapper>
                ))}
              </LocalitiesWrapper>
            </article>
          }
        </section>
      );
    }
}
