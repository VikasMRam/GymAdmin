import React, { Fragment } from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import { calculatePricing, findPercentage } from 'sly/services/helpers/pricing';
import { Block } from 'sly/components/atoms';
import PriceBar from 'sly/components/molecules/PriceBar';

const StyledPriceBar = styled(PriceBar)`
  margin-bottom: ${ifProp('last', size('spacing.large'), size('spacing.regular'))};
`;

const StyledBlock = styled(Block)`
  margin-bottom: ${size('spacing.regular')};
`;

const CommunityPricingComparison = ({ community }) => {
  const { rgsAux, name } = community;
  const { estimatedPrice } = rgsAux;
  const allowed = ['providedAverage', 'estimatedAverage', 'cityAverage', 'homeCareMAverage', 'adultDayAverage'];
  const bottomSection = ['homeCareMAverage', 'adultDayAverage'];
  const filteredEstimatedPrice = Object.keys(estimatedPrice)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      const nobj = obj;
      nobj[key] = estimatedPrice[key];
      return nobj;
    }, {});
  const {
    estimatedPriceLabelMap, sortedEstimatedPrice, maxPrice,
  } = calculatePricing(community, filteredEstimatedPrice);
  const topSectionPrices = sortedEstimatedPrice
    .filter(price => !bottomSection.includes(price[0]));
  const bottomSectionPrices = sortedEstimatedPrice
    .filter(price => bottomSection.includes(price[0]));
  const hasAdultDayAverage = !!bottomSectionPrices.find(p => p[0] === 'adultDayAverage');

  return (
    <article>
      {topSectionPrices.length > 0 &&
        <Fragment>
          {topSectionPrices.map((object, i) => (
            <StyledPriceBar
              width={findPercentage(object[1], maxPrice)}
              price={object[1]}
              key={object[1]}
              palette={name === estimatedPriceLabelMap[object[0]] ? 'grey' : undefined}
              variation={name === estimatedPriceLabelMap[object[0]] ? 'background' : undefined}
              last={i === topSectionPrices.length - 1}
            >
              {estimatedPriceLabelMap[object[0]]}
            </StyledPriceBar>
          ))}
        </Fragment>
      }
      {bottomSectionPrices.length > 0 &&
        <Fragment>
          <StyledBlock size="body" weight="medium">Compare to other care options</StyledBlock>
          {bottomSectionPrices.map((object, i) => (
            <StyledPriceBar
              width={findPercentage(object[1], maxPrice)}
              price={object[1]}
              key={object[1]}
              last={i === bottomSectionPrices.length - 1}
            >
              {estimatedPriceLabelMap[object[0]]}
              {object[0] === 'adultDayAverage' && <sup>1</sup>}
            </StyledPriceBar>
          ))}
          {hasAdultDayAverage && <Block size="tiny" palette="grey">1 This text is contains details/disclaimer about the number of hours for Adult Daycare</Block>}
        </Fragment>
      }
    </article>
  );
};

CommunityPricingComparison.propTypes = {
  community: communityPropType.isRequired,
};

export default CommunityPricingComparison;
