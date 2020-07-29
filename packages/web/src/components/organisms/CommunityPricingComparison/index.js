import React from 'react';
import styled from 'styled-components';

import { community as communityPropType } from 'sly/common/propTypes/community';
import { size, palette } from 'sly/common/components/themes';
import { calculatePricing } from 'sly/web/services/helpers/pricing';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import { Block } from 'sly/web/components/atoms';

const StyledNumberFormat = styled.span`
  font-weight: ${p => size(p.weight)};
  color: ${p => palette(p.color, 'base')};
`;

const StyledTh = styled.th`
  text-align: left;
  font-weight: ${size('weight.medium')};
  color:${palette('slate', 'base')};
  background-color:${palette('grey', 'background')};
  padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const Tr = styled.tr`
  border-top: ${size('border.regular')} solid ${palette('grey', 'filler')};
  border-bottom: ${size('border.regular')} solid ${palette('grey', 'filler')};
  padding: ${size('spacing.medium')} ${size('spacing.xLarge')};
  background-color: ${p => palette(p.bgcolor, 'base')};
  color: ${p => palette(p.color, 'base')};
`;

const StyledTd = styled.td`
  border: none;
  padding: ${size('spacing.regular')} ${size('spacing.xLarge')};
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  position: relative;
  border-radius: ${size('spacing.small')};
  border: ${size('border.regular')} solid ${palette('grey', 'filler')};
`;

const StyledBlockNp = styled(Block)`
   padding-top: 0px;
   padding-bottom: ${size('spacing.xLarge')};

`;

const CommunityPricingComparison = ({ community }) => {
  const { rgsAux } = community;
  const { estimatedPrice } = rgsAux;
  const allowed = ['providedAverage', 'estimatedAverage', 'cityAverage', 'stateAverage', 'nationalAverage'];
  const filteredEstimatedPrice = Object.keys(estimatedPrice)
    .filter(key => allowed.includes(key))
    .reduce((obj, key) => {
      const nobj = obj;
      nobj[key] = estimatedPrice[key];
      return nobj;
    }, {});
  const {
    estimatedPriceLabelMap, sortedEstimatedPrice,
  } = calculatePricing(community, filteredEstimatedPrice);

  return (
    <article>
      {!sortedEstimatedPrice.length  && <div>No pricing info available.</div> }
      {sortedEstimatedPrice.length > 0 &&
        <StyledBlockNp>
          <StyledTable>
            <thead>
            <tr>
              <StyledTh colSpan={2} color="slate" bgcolor="grey">
                Compare costs of assisted living
              </StyledTh>
            </tr>
            </thead>
            <tbody>
            <Tr color="grey" bgcolor="white">
              <StyledTd>Type</StyledTd>
              <StyledTd>Average Monthly Cost*</StyledTd>
            </Tr>
            {sortedEstimatedPrice.map((object, i) => (
              <Tr key={estimatedPriceLabelMap[object[0]]} color="slate" bgcolor="white">
                <StyledTd>{estimatedPriceLabelMap[object[0]]}</StyledTd>
                <StyledTd>
                  <StyledNumberFormat weight="weight.regular" color="slate">
                    {formatMoney(object[1])}
                  </StyledNumberFormat>
                </StyledTd>
              </Tr>
            ))}
            </tbody>
          </StyledTable>
        </StyledBlockNp>
      }
      </article>

  );
};

CommunityPricingComparison.propTypes = {
  community: communityPropType.isRequired,
};

export default CommunityPricingComparison;
