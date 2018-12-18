import React, { Fragment } from 'react';
import { string, number, shape, func } from 'prop-types';
import styled from 'styled-components';

import { Heading } from 'sly/components/atoms';
import PriceBar from 'sly/components/molecules/PriceBar';
import EstimatedCost from 'sly/components/molecules/EstimatedCost';
import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import { calculatePricing, findPercentage } from 'sly/services/helpers/pricing';

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

const PricingAndAvailability = ({
  community,
  address,
  estimatedPrice,
  gotoGetCustomPricing,
}) => {
  const {
    estimatedPriceBase, estimatedPriceLabelMap, sortedEstimatedPrice, maxPrice,
  } = calculatePricing({
    community, estimatedPrice, address,
  });

  return (
    <section id="pricing-and-floor-plans">
      <StyledArticle id="pricing-and-floor-plans-price-tiles">
        {estimatedPriceBase ?
          (<EstimatedCost
            getPricing={gotoGetCustomPricing}
            price={estimatedPriceBase}
          />
          ) : null
        }
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

export default PricingAndAvailability;
