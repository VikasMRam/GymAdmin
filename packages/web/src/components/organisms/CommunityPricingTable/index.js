import React from 'react';
import styled from 'styled-components';
import { arrayOf, object, bool } from 'prop-types';

import { community as communityPropType } from 'sly/web/propTypes/community';
import { palette, size } from 'sly/web/components/themes';
import pad from 'sly/web/components/helpers/pad';
import { Block, Span, Icon, Paragraph, Box } from 'sly/web/components/atoms';
import { isServer } from 'sly/web/config';
import { formatMoney } from 'sly/web/services/helpers/numbers';
import { withHydration } from 'sly/web/services/partialHydration';
import CommunityPricing from 'sly/web/components/molecules/CommunityPricing';

import UnhydratedGetCustomPricingButtonContainer from 'sly/web/containers/GetCustomPricingButtonContainer';

const GetCustomPricingButtonContainer = withHydration(UnhydratedGetCustomPricingButtonContainer);

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

const StyledGetPricingButton = styled(GetCustomPricingButtonContainer)`
  width: 100%;
  margin-bottom: ${size('spacing.xLarge')};
`;

const PaddedCommunityPricing = pad(CommunityPricing, 'large');

const CommunityPricingTable = ({
  pricesList, estimatedPriceList, isAlreadyPricingRequested, community: { id, startingRate, rates },
}) => {

  return (
    <>
    {startingRate > 0 && <PaddedCommunityPricing id={id} estimated={rates !=='Provided'} price={startingRate} tipId="pricingtable" />}
    {pricesList.length > 0 &&
        <StyledBlockNp itemScope itemType="http://schema.org/Table">
          <StyledTable>
            <thead>
              <tr>
                <StyledTh colSpan={2} color="slate" bgcolor="grey" itemProp="about">
                  Costs By Room Type
                </StyledTh>
              </tr>
            </thead>
            <tbody>
              <Tr color="grey" bgcolor="white"><StyledTd>Type</StyledTd><StyledTd>Average Monthly Cost*</StyledTd> </Tr>
              {pricesList.map((price) => {
              const { label, value } = price;
              return (
                <Tr key={label} color="slate" bgcolor="white"> <StyledTd>{label}</StyledTd><StyledTd><StyledNumberFormat weight="weight.regular" color="slate">{formatMoney(value)}</StyledNumberFormat></StyledTd></Tr>
              );
            })}
            </tbody>
          </StyledTable>
        </StyledBlockNp>
      }
      {pricesList.length === 0 && estimatedPriceList.length > 0 &&
        <StyledBlockNp>
          <StyledTable>
            <thead>
              <tr>
                <StyledTh colSpan={2} color="slate" bgcolor="grey">
                  Costs By Room Type
                </StyledTh>
              </tr>
            </thead>
            <tbody>
              <Tr color="grey" bgcolor="white"><StyledTd>Type</StyledTd><StyledTd>Average Monthly Cost*</StyledTd> </Tr>
              {estimatedPriceList.map((price) => {
              const { label, value } = price;
              return (
                <Tr key={label} color="slate" bgcolor="white"> <StyledTd>{label}</StyledTd><StyledTd><StyledNumberFormat weight="weight.regular" color="slate">{formatMoney(value)}</StyledNumberFormat></StyledTd></Tr>
              );
            })}
            </tbody>
          </StyledTable>
        </StyledBlockNp>
      }
      <Block>
        {(pricesList.length > 0 || estimatedPriceList.length > 0) &&
          <Paragraph>
            *Monthly price in assisted living communities can vary depending on additional community fees and care services. Click the button below to connect with your Local Senior Living Expert for more accurate pricing.
          </Paragraph>
        }
        <StyledGetPricingButton
          hasAlreadyRequestedPricing={isAlreadyPricingRequested}
          locTrack="pricing-table"
        >
          Get Detailed Pricing
        </StyledGetPricingButton>
      </Block>
    </>
  );
};

CommunityPricingTable.propTypes = {
  pricesList: arrayOf(object).isRequired,
  estimatedPriceList: arrayOf(object).isRequired,
  isAlreadyPricingRequested: bool,
  community: communityPropType,
};

export default CommunityPricingTable;

CommunityPricingTable.typeHydrationId = 'CommunityPricingTable';

