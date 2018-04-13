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
const ArticleWrapper = styled.article`
  margin-bottom: ${size('spacing.large')};
`;

export default class PricingAndAvailability extends Component {
    static propTypes = {
      propertyName: PropTypes.string.isRequired,
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
      onGetDetailedPricingClicked: PropTypes.func,
      onInquireOrBookClicked: PropTypes.func,
    };

    static defaultProps = {
      roomPrices: [],
    };

    static findPercentage(price, maxPrice) {
      return (price / maxPrice) * 100;
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
        propertyName,
        roomPrices,
        address,
        estimatedPrice,
        onGetDetailedPricingClicked,
        onInquireOrBookClicked,
      } = this.props;
      const estimatedPriceLabelMap = {
        providedAverage: propertyName,
        estimatedAverage: propertyName, // TODO: figure out correct label
        cityAverage: address.city,
        stateAverage: address.state,
        nationalAverage: address.country,
      };
      let sortedEstimatedPrice = null;
      let maxPrice = 0;
      let estimatedPriceBase = 0;
      if (estimatedPrice) {
        sortedEstimatedPrice = this.constructor.sortProperties(estimatedPrice);
        [, maxPrice] = sortedEstimatedPrice[sortedEstimatedPrice.length - 1];
        estimatedPriceBase = estimatedPrice.providedAverage || estimatedPrice.estimatedAverage;
      }
      roomPrices.sort((a, b) => a.price - b.price);

      return (
        <section id="pricing-and-floor-plans">
          <ArticleWrapper>
            {!roomPrices.length && estimatedPriceBase &&
              <EstimatedCost
                propertyName={propertyName}
                price={estimatedPriceBase}
                onGetDetailedPricingClicked={onGetDetailedPricingClicked}
              />
            }
            {roomPrices.map((object, i) => {
              return (
                <Item key={i}>
                  <RoomTile onInquireOrBookClicked={onInquireOrBookClicked} {...object} />
                </Item>
              );
            })}
          </ArticleWrapper>
          {estimatedPrice &&
            <article>
              <Heading size="subtitle">Compare to Local Assisted Living Costs</Heading>
              <LocalitiesWrapper>
                {sortedEstimatedPrice.map((object, i) => {
                  // don't display zeros
                  if (!object[1]) {
                    return null;
                  }
                  return (
                    <SpacingBottomRegularWrapper key={i}>
                      {estimatedPriceLabelMap[object[0]]}
                      <PriceBar width={`${this.constructor.findPercentage(object[1], maxPrice)}%`} price={object[1]} />
                    </SpacingBottomRegularWrapper>
                  );
                })}
              </LocalitiesWrapper>
            </article>
          }
        </section>
      );
    }
}
