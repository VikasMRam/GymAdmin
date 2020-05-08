import React from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';

import { community as communityPropType } from 'sly/propTypes/community';
import { size } from 'sly/components/themes';
import { calculatePricing, findPercentage } from 'sly/services/helpers/pricing';
import pad from 'sly/components/helpers/pad';
import { Block } from 'sly/components/atoms';
import PriceBar from 'sly/components/molecules/PriceBar';

const StyledPriceBar = styled(PriceBar)`
  margin-bottom: ${ifProp('last', size('spacing.large'), size('spacing.regular'))};
`;

const PaddedBlock = pad(Block, 'regular');

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
      {!topSectionPrices.length && !bottomSectionPrices.length && <div>No pricing info available.</div> }
      {topSectionPrices.length > 0 &&
        <>
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
        </>
      }
      {bottomSectionPrices.length > 0 &&
        <>
          <PaddedBlock size="body" weight="medium">Compare cost to other care options</PaddedBlock>
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
          {hasAdultDayAverage && <Block size="tiny" palette="grey">1 The estimate above is based on data provided by Genworth&apos;s Cost of Care estimate. Home care assumes 44 hours per week, and Adult Day assumes 5 days per week.</Block>}
        </>
      }
    </article>
  );
};

CommunityPricingComparison.propTypes = {
  community: communityPropType.isRequired,
};

export default CommunityPricingComparison;
