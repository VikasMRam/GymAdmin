import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Heading, Box, Icon } from 'sly/components/atoms';
import RoomTile from 'sly/components/molecules/RoomTile';
import PriceBar from 'sly/components/molecules/PriceBar';
import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import ConciergeController from 'sly/controllers/ConciergeController';
import GetCurrentAvailabilityFormContainer from 'sly/containers/GetCurrentAvailabilityFormContainer';
import {createBooleanValidator, email, required, usPhone} from "sly/services/validation";

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

const DoneBox = styled(Box)`
  margin-bottom: ${size('spacing.xLarge')};
  display: flex;

  > :first-child {
    margin-right: ${size('spacing.regular')};
  }
`;

const DoneText = styled.span`
  font-weight: bold;
`;

const CompareHeading = styled(Heading)`
  margin-bottom: ${size('spacing.large')};
`;

const PriceLabel = styled.div`
  margin-bottom: ${size('spacing.small')};
`;

export const findPercentage = (price, maxPrice) => ((price / maxPrice) * 100);

const hasAllUserData = createBooleanValidator({
  fullName: [required],
  email: [required, email],
  phone: [required, usPhone],
});

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

export default class PricingAndAvailability extends Component {
    static propTypes = {
      community: communityPropType.isRequired,
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
      onLiveChatClicked: PropTypes.func,
    };

    static defaultProps = {
      roomPrices: [],
    };

    renderEstimatedPricing = ({ roomsLength, estimatedBase }) => (roomsLength && estimatedBase)? (
      <Rate>
        {'Estimated '}
        <NumberFormat value={startingRate} displayType="text" thousandSeparator prefix="$" />
        {'/mo'}
      </Rate>
    ) : null;

    render() {
      const {
        community,
        isCCRC,
        roomPrices,
        address,
        estimatedPrice,
        getDetailedPricing,
        onInquireOrBookClicked,
        onLiveChatClicked,
        queryParams,
        setQueryParams,
      } = this.props;
      if (estimatedPrice && estimatedPrice.providedAverage) {
        estimatedPrice.providedAverage = community.startingRate || estimatedPrice.providedAverage;
      }
      if (estimatedPrice && estimatedPrice.estimatedAverage) {
        estimatedPrice.estimatedAverage = community.startingRate || estimatedPrice.estimatedAverage;
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
      if (estimatedPrice) {
        sortedEstimatedPrice = sortProperties(estimatedPrice);
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
        estimatedPriceBase = community.startingRate || estimatedPrice.providedAverage || estimatedPrice.estimatedAverage;
      }

      roomPrices.sort((a, b) => a.price - b.price);

      return (
        <section id="pricing-and-floor-plans">
          <StyledArticle id="pricing-and-floor-plans-price-tiles">
            {(!roomPrices.length && estimatedPriceBase) ?
              (
                <ConciergeController communitySlug={community.id} queryParams={queryParams} setQueryParams={setQueryParams}>
                  {({getPricing}) =>
                    <EstimatedCost
                      getPricing={getPricing}
                      community={community}
                      price={estimatedPriceBase}
                    />
                  }
                </ConciergeController>
              ) : null
            }
            {roomPrices.map((object, i) => (
              <Item key={i}>
                <RoomTile onInquireOrBookClicked={onInquireOrBookClicked} {...object} />
              </Item>
            ))}
          </StyledArticle>
          <ConciergeController communitySlug={community.id} queryParams={queryParams} setQueryParams={setQueryParams}>
            {({ concierge, submitExpressConversion, userDetails }) => {
                if (concierge.contactRequested) {
                  if (!hasAllUserData(userDetails)) {
                    return (
                      <DoneBox>
                        <Icon icon='round-checkmark' />
                        <DoneText>

                          We received your request, check your inbox shortly.

                        </DoneText>
                      </DoneBox>
                    );
                  } else {
                    return (
                      <DoneBox>
                        <Icon icon='round-checkmark' />
                        <DoneText>
                          Your Seniorly Guide will reach out to you regarding this community.
                        </DoneText>
                      </DoneBox>
                    );
                  }

                } else {
                  return (
                    <GetCurrentAvailabilityFormContainer
                      submitExpressConversion={submitExpressConversion}
                      community={community}
                    />
                  );
                }
              }
            }
          </ConciergeController>

          {sortedEstimatedPrice.length > 0 &&
            <article id="pricing-and-floor-plans-comparison">
              <CompareHeading level="subtitle" size="subtitle">
                Compare to Local Assisted Living Costs
              </CompareHeading>
              {sortedEstimatedPrice.map((object, i) => (
                <Fragment key={`${object[0]}_${i}`}>
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
    }
}
